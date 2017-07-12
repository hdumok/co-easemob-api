
const fs = require('fs');
const FormData = require('form-data');

//Upload file
//Warning: File cannot be over 10MB, otherwise will fail.
exports.uploadFile = function*(filePath) {
  let url = this.prefix + 'chatfiles';
  let form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  return yield this.request(url, {
    method: 'POST',
    headers: {
      //restrict-access – 是否限制访问权限。注意：这个 API 并没有考虑这个属性的值，而是有这个属性即可。
      'restrict-access': true,
      'Content-Type': 'multipart/form-data',
    },
    body: form
  });
};

//Download file
exports.downloadFile = function*(uuid, shareSecret) {
  let url = this.prefix + 'chatfiles/' + uuid;
  return yield this.request(url, {
    method: 'GET',
    headers: {
      'accept': ' application/octet-stream',
      //share-secret" 上传成功后返回，发送消息时需要用到
      'share-secret': shareSecret
    }
  });
};

//Download thumbnail(下载缩略图)
exports.downloadThumbnail = function*(uuid, shareSecret) {
  let url = this.prefix + 'chatfiles/' + uuid;
  this.request(url, {
    method: 'GET',
    headers: {
      'accept': ' application/octet-stream',
      'share-secret': shareSecret,
      'thumbnail': true
    }
  });
};



