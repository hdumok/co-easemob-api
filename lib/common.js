'use strict';

// 本文件用于easemob API，基础文件，主要用于Token的处理和mixin机制,参考co-wechat-api的token处理
const fs = require('fs');
const httpx = require('httpx');
const urllib = require('url');
const fetch = require('node-fetch');

let AccessToken = function (accessToken, expireTime) {
  if (!(this instanceof AccessToken)) {
    return new AccessToken(accessToken, expireTime);
  }
  this.accessToken = accessToken;
  this.expireTime = expireTime;
};

/*!
 * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比 * Examples:
 * ```
 * token.isValid();
 * ```
 */
AccessToken.prototype.isValid = function () {
  return !!this.accessToken && (new Date().getTime()) < this.expireTime;
};

/**
 * 根据client_id和client_secret创建API的构造函数
 * 如需跨进程跨机器进行操作Wechat API（依赖access token），access token需要进行全局维护
 * 使用策略如下： * 1. 调用用户传入的获取token的异步方法，获得token之后使用
 * 2. 使用client_id/client_secret获取token。并调用用户传入的保存token方法保存 * Tips: * - 如果跨机器运行wechat模块，需要注意同步机器之间的系统时间。 * Examples:
 * ```
 * let API = require('easemob-api');
 * let api = new API('client_id', 'client_secret');
 * ```
 * 以上即可满足单进程使用。
 * 当多进程时，token需要全局维护，以下为保存token的接口。
 * ```
 * let api = new API('org_name', 'app_name', 'client_id', 'client_secret', function* () {
 *   // 传入一个获取全局token的方法
 *   let txt = yield fs.readFile('access_token.txt', 'utf8');
 *   return JSON.parse(txt);
 * }, function* (token) {
 *   // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
 *   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
 *   yield fs.writeFile('access_token.txt', JSON.stringify(token));
 * });
 * ```
 *
 * @param {String} org_name 在环信平台上申请得到的org_name
 * @param {String} app_name 在环信平台上申请得到的app app_name
 * @param {String} client_id 在环信平台上申请得到的client_id
 * @param {String} client_secret 在环信平台上申请得到的app client_secret
 * @param {Generator} getToken 可选的。获取全局token对象的方法，多进程模式部署时需在意
 * @param {Generator} saveToken 可选的。保存全局token对象的方法，多进程模式部署时需在意
 */
let API = function (org_name, app_name, client_id, client_secret, getToken, saveToken) {
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.getToken = getToken || function*() {
      return this.store;
    };
  this.saveToken = saveToken || function*(token) {
      this.store = token;
      if (process.env.NODE_ENV === 'production') {
        console.warn('Don\'t save token in memory, when cluster or multi-computer!');
      }
    };
  this.prefix = 'https://a1.easemob.com/' + org_name + '/' + app_name + '/';
  this.defaults = {};
};

/**
 * 用于设置urllib的默认options * Examples:
 * ```
 * api.setOpts({timeout: 15000});
 * ```
 * @param {Object} opts 默认选项
 */
API.prototype.setOpts = function (opts) {
  this.defaults = opts;
};

API.prototype.setCa = function (ca) {
  this.ca = ca;
};

API.prototype.setCaPath = function (path) {
  this.ca = fs.readFileSync(path, "utf8");
};

API.prototype.postJSON = function (data = {}) {
  return {
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
};

API.prototype.putJSON = function (data = {}) {
  return {
    method: 'PUT',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
};

API.prototype.request = function*(url, opts, retry) { //TODO ca: [ca] data

  if (typeof retry === 'undefined') {
    retry = 3;
  }

  if (url.slice(-5) !== 'token') {
    let token = yield this.ensureAccessToken();
    opts.headers = opts.headers || {};
    opts.headers['Authorization'] = 'Bearer ' + token.accessToken;
  }

  url = url + (opts.query ? urllib.format({query: opts.query}) : '');

  //send request
  let options = {};
  Object.assign(options, this.defaults);
  let keys = Object.keys(opts);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (key !== 'headers') {
      options[key] = opts[key];
    } else {
      if (opts.headers) {
        options.headers = options.headers || {};
        Object.assign(options.headers, opts.headers);
      }
    }
  }

  if (options.headers['Content-Type'] === 'multipart/form-data') {
    return yield fetch(url, options)
  }

  let res = yield httpx.request(url, options);
  let buffer = yield httpx.read(res);
  let contentType = res.headers['content-type'];
  if (contentType.indexOf('application/json') !== -1) {
    try {
      buffer = JSON.parse(buffer);
    } catch (ex) {
      let err = new Error('JSON.parse error. buffer is ' + buffer.toString());
      err.name = 'EasemobAPIError';
      throw err;
    }
  }

  if (res.statusCode == 401 && retry > 0) {
    // 销毁已过期的token
    yield this.saveToken(null);
    return yield this.request(url, opts, retry - 1);
  }
  else if (res.statusCode == 429 || res.statusCode == 503) {
    //限流
    yield this.delay(Math.random() * 1000);
    return yield this.request(url, opts);
  }
  else if (res.statusCode < 200 || res.statusCode > 204) {
    let err = new Error();
    err.name = 'EasemobAPIError';
    err.url = url;
    err.statusCode = res.statusCode;
    err.msg = buffer.error;
    err.description = buffer.error_description;
    err.req = options;

    throw err;
  }

  return buffer;
};

/*!
 * 根据创建API时传入的client_id和client_secret获取access token
 * 进行后续所有API调用时，需要先获取access token
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=获取access_token> * 应用开发者无需直接调用本API。 * Examples:
 * ```
 * let token = yield api.getAccessToken();
 * ```
 * - `err`, 获取access token出现异常时的异常对象
 * - `result`, 成功时得到的响应结果 * Result:
 * ```
 * {"access_token": "ACCESS_TOKEN","expires_in": 7200}
 * ```
 */
API.prototype.getAccessToken = function*() {
  let url = this.prefix + 'token';
  let data = {
    grant_type: 'client_credentials',
    client_id: this.client_id,
    client_secret: this.client_secret
  };

  let result = yield this.request(url, this.postJSON(data));

  // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
  let expireTime = (new Date().getTime()) + (result.expires_in - 10) * 1000;
  let token = AccessToken(result.access_token, expireTime);
  yield this.saveToken(token);
  return token;
};

/*!
 * 需要access token的接口调用如果采用preRequest进行封装后，就可以直接调用。
 * 无需依赖getAccessToken为前置调用。
 * 应用开发者无需直接调用此API。
 * Examples:
 * ```
 * yield api.ensureAccessToken();
 * ```
 */
API.prototype.ensureAccessToken = function*() {
  // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
  let token = yield this.getToken();
  let accessToken;
  if (token && (accessToken = AccessToken(token.accessToken, token.expireTime)).isValid()) {
    return accessToken;
  }
  return yield this.getAccessToken();
};

API.prototype.delay = function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
};

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * API.mixin(require('./lib/common'));
 * ```
 * @param {Object} obj 要合并的对象
 */
API.mixin = function (obj) {
  for (let key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: ' + key);
    }
    API.prototype[key] = obj[key];
  }
};

API.AccessToken = AccessToken;

module.exports = API;
