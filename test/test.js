"use strict";

var co = require('co')
var API = require('../index');
var config = require('./config');
let api = new API(config.org_name, config.app_name, config.client_id, config.client_secret);
var i = +process.argv[2], result;

co(function*() {

  switch (i) {
    case 11:    //Create a user
      return yield api.createUser('user101', '123456');
      break;
    case 12:    //Create multiple users
      return yield api.createUsers([{
        username: 'user101',
        password: '123456'
      }, {
        username: 'user102',
        password: '123456'
      }, {
        username: 'user103',
        password: '123456'
      }]);
      break;
    case 13:    //Get a user
      return yield api.getUser('user001');
      break;
    case 14:    //Get users in batch
      return yield api.getUsers(5);
      break;
    case 15:    //Delete a user
      return yield api.deleteUser('user001');
      break;
    case 16:    //Delete users in batch
      return yield api.deleteUsers(2);
      break;
    case 17:    //Reset user's password
      return yield api.resetPassword('user101', '123456', '654321');
      break;
    case 18:    //Update user's nickname
      return yield api.editNickname('user101', 'Aily');
      break;
    case 19:    //Add a friend for user
      return yield api.addFriend('user101', 'user102');
      break;
    case 20:    //Delete a friend for user
      return yield api.deleteFriend('user101', 'user102');
      break;
    case 21:    //Get user's friends list
      return yield api.showFriends('user101');
      break;
    case 22:    //Get user's blacklist
      return yield api.getBlacklist('user101');
      break;
    case 23:    //Block user(s)
      return yield api.addUserForBlacklist('user101', ['user102', 'user103']);
      break;
    case 24:    //UnBlock user(s)
      return yield api.deleteUserFromBlacklist('user101', 'user102');
      break;
    case 25:    //Get user online status
      return yield api.isOnline('user101');
     /*{
      action: 'get',
      uri: 'http://a1.easemob.com/1178161127115226/zhongdou/users/user101/status',
      entities: [],
      data: { user101: 'offline' },
      timestamp: 1495188780687,
      duration: 8,
      count: 0 }
      */
      break;
    case 26:    //Get offline message count
      return yield api.getOfflineMessages('user101');
      /*{
       action: 'get',
       uri: 'http://a1.easemob.com/1178161127115226/zhongdou/users/user101/offline_msg_count',
       entities: [],
       data: { user101: 0 },
       timestamp: 1495188747261,
       duration: 8,
       count: 0 }
       */
      break;
    case 27:    //Get offline message status
      return yield api.getOfflineMessageStatus('user101', '${msgid}');
      break;
    case 28:    //Deactivate user account
      return yield api.deactivateUser('user101');
      break;
    case 29:    //Activation user account
      return yield api.activateUser('user101');
      break;
    case 30:    //Logout user
      return yield api.disconnectUser('user101');
      break;
    // case 31:    //Get chat history
    //   return yield api.getChatMessages(`select * where timestamp<` + Date.now(), 10);
    //   break;
    case 32:    //Send text message
      return yield api.sendText({
        type: 'users',
        target: ['user101'],
        content: 'this text is from admin',
        from: 'admin',
        ext: {a: 'a', b: 'b', c: 'c'}
      });
      /*{ action: 'post',
       application: 'bb8fade0-3490-11e7-bca7-0f8805bad1cf',
       path: '/messages',
       uri: 'https://a1.easemob.com/1178161127115226/zhongdou/messages',
       data: { user101: 'success' },
       timestamp: 1495189202631,
       duration: 0,
       organization: '1178161127115226',
       applicationName: 'zhongdou' }
       */
      break;
    case 33:    //Send image message
      return yield api.sendImage({
        type: 'users',
        target: ['user101', 'user102'],
        url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/61611e30-9b5c-11e6-b3d9-9d52b6f6416b',
        filename: 'dog.jpg',
        secret: 'YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc',
        frome: 'admin',
        ext: {a: 'a', b: 'b'}
      });
      break;
    case 34:    //Send audio message
      return yield api.sendAudio({
        type: 'users',
        target: ['user101', 'user102'],
        url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/83419440-9b79-11e6-a408-01f417d892b0',
        filename: 'song.mp3',
        length: 10,
        secret: 'g0GUSpt5Eea-E78LqsqYRGrpCneE0xwEXPN8uvq327wtIiJ2',
        frome: 'admin',
        ext: {a: 'a', b: 'b'}
      });
      break;
    case 35:    //Send video message
      return yield api.sendVideo({
        type: 'users',
        target: ['user101', 'user102'],
        url: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/a4eaacd0-9b79-11e6-992f-b32958bd06ae',
        filename: 'web.mp4',
        thumb: 'https://a1.easemob.com/dihon/loveofgod/chatfiles/17b55630-13d5-11e5-9570-e1734d6149fa',
        length: 10,
        file_length: 42190,
        thumb_secret: 'F7VWOhPVEeWrHbXQmsnDQAdyk4NuijHO1CemodZL8WMZRY1u',
        secret: 'pOqs2pt5EeaLsPXcXfAk0UrWaF5EEV9SNsCwxhMmT-ClN0PG',
        frome: 'admin',
        ext: {a: 'a', b: 'b'}
      });
      break;
    case 36:    //Send commend message
      return yield api.sendCmd({
        type: 'users',
        target: ['user101', 'user102'],
        action: 'this action is from admin',
        from: 'admin',
        ext: {a: 'a', b: 'b'}
      });
      break;
    case 37:    //Get all groups
      return yield api.getGroups();
      break;
    case 38:    //Get group(s) detial
      return yield api.getGroupDetail('16558751547393');
      break;
    case 39:    //Create a group
      return yield api.createGroup({
        groupname: 'group999',
        desc: 'this is a new group created from user101',
        public: true,
        maxusers: 200,
        approval: true,
        owner: 'user101',
        members: ['user102', 'user103']
      });
      break;
    case 40:    //Modify group information
      return yield api.modifyGroupInfo('16558751547393', {
        groupname: 'man',
        description: 'update groupinfo',
        maxusers: 500
      });
      break;
    case 41:    //Delete a group
      return yield api.deleteGroup('16558751547393');
      break;
    case 42:    //Get members of Group
      return yield api.getGroupUsers('16558751547393');
      break;
    case 43:    //Add a user to group
      return yield api.addGroupMember('16558751547393', 'user102');
      break;
    case 44:    //Add multiple users to group
      return yield api.addGroupMembers('16558751547393', ['user102', 'user103']);
      break;
    case 45:    //Remove a member from group
      return yield api.deleteGroupMember('16558751547393', 'user102');
      break;
    case 46:    //Remove multiple members from group
      return yield api.deleteGroupMembers('16558751547393', ['user103']);
      break;
    case 47:    //Get a list of groups of user joined
      return yield api.getGroupsForUser('user101');
      break;
    case 48:    //Update group owner
      return yield api.changeGroupOwner('16558751547393','user102');
      break;
    case 49:    //Get group blocked user
      return yield api.getGroupBlackList('16558751547393');
      break;
    case 50:    //Add user to blacklist of group
      return yield api.addGroupBlackMember('16558751547393', 'user101');
      break;
    case 51:    //Remove user from blacklist of group
      return yield api.deleteGroupBlackMember('16558751547393', 'user101');
      break;
    case 52:    //Upload file
      return yield api.uploadFile('./resources/video/web.mp4');
      break;
    case 53:    //Download file
      return yield api.downloadFile('bb8fade0-3490-11e7-bca7-0f8805bad1cf', 'YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc');
      break;
    case 54:    //Download thumbnail
      return yield api.downloadThumbnail('61611e30-9b5c-11e6-b3d9-9d52b6f6416b','YWEeOptcEeaG8D-LXrAmEykZ07q6Q_d5jLK49nlbDAc7s3Yc');
      break;
    case 55:    //Create a chat room
      return yield api.createChatRoom({
        name: 'test7',
        description: 'this chatromm is created by fengpei',
        maxusers: 200,
        owner: 'user101',
        members: ['user102']
      });
      break;
    case 56:    //Update chat room details
      return yield api.modifyChatRoom('16578083094529', {
        name: 'fengpeichatroom',
        description: 'this chatromm is created by fengpei in 2015',
        maxusers: 500
      });
      break;
    case 57:    //Delete a chat room
      return yield api.deleteChatRoom('16578083094529');
      break;
    case 58:    //Get all chat rooms
      return yield api.getChatRooms();
      break;
    case 59:    //Get chat room detail
      return yield api.getChatRoomDetail('16578039054337');
      break;
    case 60:    //Get all chat room of user joined
      return yield api.getChatRoomJoined('user101');
      break;
    case 61:    //Add a member to chat room
      return yield api.addChatRoomMember('16578039054337', 'user102');
      break;
    case 62:    //Add multiple members to chat room
      return yield api.addChatRoomMembers('16578039054337', ['user103', 'user101']);
      break;
    case 63:    //Remove a member from chat room
      return yield api.deleteChatRoomMember('16578039054337', 'user101');
      break;
    case 64:    //Remove multiple member from chat room
      return yield api.deleteChatRoomMembers('16578039054337', 'user102,user101');
      break;
  }
}).then(ret => {
  console.log({data: ret})
}).catch(e => {
  console.error(e)
})


