exports.sendText = function*(msg) {
  let url = this.prefix + 'messages';
  let data = {
    target_type: msg.type,
    target: msg.target,
    msg: {
      type: 'txt', 
      msg: msg.content
    },
    from: msg.from
  };
  msg.ext && (data.ext = msg.ext);
  return yield this.request(url, this.postJSON(data));
}

//Send image message
exports.sendImage = function*(image) {
  let url = this.prefix + 'messages';
  let data = {
    target_type: image.type,
    target: image.target,
    msg: {
      type: 'img',
      url: image.url,
      filename: image.filename,
      secret: image.secret,
      size: {width: 480, height: 720}
    },
    from: image.from,
  };
  image.ext && (data.ext = image.ext);
  return yield this.request(url, this.postJSON(data));
}

//Send audio message
exports.sendAudio = function*(audio) {
  let url = this.prefix + 'messages';
  let data = {
    target_type: audio.type,
    target: audio.target,
    msg: {
      type: 'audio', 
      url: audio.url, 
      filename: audio.filename, 
      length: audio.length, 
      secret: audio.secret
    },
    from: audio.from,
  };

  audio.ext && (data.ext = audio.ext);
  return yield this.request(url, this.postJSON(data));
}

//Send video message
exports.sendVideo = function*(video) {
  let url = this.prefix + 'messages';
  let data = {
    target_type: video.type,
    target: video.target,
    msg: {
      type: 'video',
      url: video.url,
      filename: video.filename,
      thumb: video.thumb,
      length: video.length,
      file_length: video.file_length,
      thumb_secret: video.thumb_secret,
      secret: video.secret
    },
    from: video.from,
  };
  video.ext && (data.ext = video.ext);
  return yield this.request(url, this.postJSON(data));
}

//Send commend message
exports.sendCmd = function *(cmd) {
  let url = this.prefix + 'messages';
  let data = {
    target_type: cmd.type,
    target: cmd.target,
    msg: {type: 'cmd', action: cmd.action},
    from: cmd.from,
  };
  cmd.ext && (data.ext = cmd.ext);
  return yield this.request(url, this.postJSON(data));
}
