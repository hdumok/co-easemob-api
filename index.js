
'use strict';

var API = require('./lib/common');
// 用户接口
API.mixin(require('./lib/user'));
// 群组管理
API.mixin(require('./lib/group'));
// 文件相关
API.mixin(require('./lib/files'));
// 消息接口
API.mixin(require('./lib/message'));
// 聊天室接口
API.mixin(require('./lib/room'));

module.exports = API;
