/**
 * Created by hdumok on 2017/5/20.
 */

'use strict'

let co = require('co');
let _ = require('lodash');
let Redis = require('ioredis');
let EasemobApi = require('./index');

let r = null, a = null;

class Easemob {

  ﻿constructor(conf) {
    this.conf = conf;

    let redis = r ? r : r = new Redis(this.conf);
    this.api = a ? a : a = new EasemobApi(this.conf.org_name, this.conf.app_name, this.conf.client_id, this.conf.client_secret,
      function*() {
        let token = yield redis.get('easemob:token');
        try {
          token = JSON.parse(token)
        } catch (e) {
          return;
        }

        return token
      },
      function *(token) {
        console.debug('easemob save token %j', token);
        return yield redis.set('easemob:token', JSON.stringify(token));
      }
    );
  }

  createUser(user) {
    let api = this.api;
    return co(function*() {
      return yield api.createUser(user);
    });
  }

  createUsers(users) {
    let api = this.api;
    return co(function*() {
      return yield api.createUsers(users);
    })
  }

  deleteUser(username) {
    let api = this.api;
    return co(function*() {
      // deleteUser('user001');
      return yield api.deleteUser(username);
    });
  }

  getUser(username, user) {
    let api = this.api;
    return co(function*() {
      // getUser('user001');
      return yield api.getUser(username);
    });
  }

  getUserFriends(username) {
    let api = this.api;
    return co(function*() {
      // showFriends('user101');
      return yield api.showFriends(username);
    });
  }

  getUserGroups(username) {
    let api = this.api;
    return co(function*() {
      // getGroupsForUser('user101');
      return yield api.getGroupsForUser(username);
    });
  }

  deleteFriend(username, friend) {
    let api = this.api;
    return co(function*() {
      // deleteFriend('user101', 'user102');
      return yield api.deleteFriend(username, friend);
    });
  }

  addFriend(username, friend) {
    let api = this.api;

    return co(function*() {
      // addFriend('user101', 'user102');
      return yield api.addFriend(username, friend);
    });
  }

  editNickname(username, nickname) {
    let api = this.api;
    return co(function*() {
      // editNickname('user101', 'Aily');
      return yield api.editNickname(username, nickname);
    });
  }

  createGroup(group) {
    let api = this.api;
    return co(function*() {
      // editNickname('user101', 'Aily');
      return yield api.createGroup(group)
    });
  }

  deleteGroup(groupid) {
    let api = this.api;
    return co(function*() {
      // deleteGroup('16558751547393');
      return yield api.deleteGroup(groupid);
    });
  }

  getGroup(groupid) {
    let api = this.api;
    return co(function*() {
      // getGroupDetail('16558751547393');
      return yield api.getGroupDetail(groupid);
    });
  }

  getGroupUsers(groupid) {
    let api = this.api;
    return co(function*() {
      // getGroupUsers('16558751547393');
      return yield api.getGroupUsers(groupid);
    });
  }

  modifyGroupInfo(groupid, group) {
    let api = this.api;
    return co(function*() {
      // modifyGroupInfo('16558751547393', {
      //   groupname: 'man',
      //   description: 'update groupinfo',
      //   maxusers: 500
      // });
      return yield api.modifyGroupInfo(groupid, group);
    });
  }

  addGroupMembers(groupid, usernames) {
    let api = this.api;
    return co(function*() {
      // addGroupMembers('16558751547393', ['user102', 'user103']);
      return yield api.addGroupMembers(groupid, usernames);
    });
  }

  deleteGroupMembers(groupid, usernames) {
    let api = this.api;
    return co(function*() {
      // deleteGroupMembers('16558751547393', ['user103']);
      return yield api.deleteGroupMembers(groupid, usernames);
    });
  }

  changeGroupOwner(groupid, username) {
    let api = this.api;
    return co(function*() {
      // changeGroupOwner('16558751547393','user102');
      return yield api.changeGroupOwner(groupid, username);
    });
  }

  sendMessage(uid, message) {
    let api = this.api;
  }

  // isOnline('user101');
  // getOfflineMessages('user101');
  // getOfflineMessageStatus('user101', '${msgid}');
  // sendText({
  //   type: 'users',
  //   target: ['user101'],
  //   content: 'this text is from admin',
  //   from: 'admin',
  //   ext: {a: 'a', b: 'b', c: 'c'}
  // });
  // sendImage({
  //   type: 'users',
  //   target: ['user101', 'user102'],
  //   url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/61611e30-9b5c-11e6-b3d9-9d52b6f6416b',
  //   filename: 'dog.jpg',
  //   secret: 'YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc',
  //   frome: 'admin',
  //   ext: {a: 'a', b: 'b'}
  // });
  // sendAudio({
  //   type: 'users',
  //   target: ['user101', 'user102'],
  //   url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/83419440-9b79-11e6-a408-01f417d892b0',
  //   filename: 'song.mp3',
  //   length: 10,
  //   secret: 'g0GUSpt5Eea-E78LqsqYRGrpCneE0xwEXPN8uvq327wtIiJ2',
  //   frome: 'admin',
  //   ext: {a: 'a', b: 'b'}
  // });
  // sendVideo({
  //   type: 'users',
  //   target: ['user101', 'user102'],
  //   url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/a4eaacd0-9b79-11e6-992f-b32958bd06ae',
  //   filename: 'web.mp4',
  //   thumb: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/17b55630-13d5-11e5-9570-e1734d6149fa',
  //   length: 10,
  //   file_length: 42190,
  //   thumb_secret: 'F7VWOhPVEeWrHbXQmsnDQAdyk4NuijHO1CemodZL8WMZRY1u',
  //   secret: 'pOqs2pt5EeaLsPXcXfAk0UrWaF5EEV9SNsCwxhMmT-ClN0PG',
  //   frome: 'admin',
  //   ext: {a: 'a', b: 'b'}
  // });
  // sendCmd({
  //   type: 'users',
  //   target: ['user101', 'user102'],
  //   action: 'this action is from admin',
  //   from: 'admin',
  //   ext: {a: 'a', b: 'b'}
  // });


  // uploadFile('./resources/video/web.mp4');
  // downloadFile('bb8fade0-3490-11e7-bca7-0f8805bad1cf', 'YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc');
  // downloadThumbnail('61611e30-9b5c-11e6-b3d9-9d52b6f6416b','YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc');
}

