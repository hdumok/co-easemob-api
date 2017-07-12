//Create a chat room
exports.createChatRoom = function*(room) {
  let url = this.prefix + 'chatrooms';
  let data = {
    name: room.name,
    description: room.description,
    maxusers: room.maxusers,
    owner: room.owner,
    members: room.members
  };
  return yield this.request(url, this.postJSON(data));
};

//Update chat room details
exports.modifyChatRoom = function*(chatroomid, room) {
  let url = this.prefix + 'chatrooms/' + chatroomid;
  let data = {
    name: room.name,
    description: room.description,
    maxusers: room.maxusers
  };
  return yield this.request(url, this.putJSON(data));
};

//Delete a chat room
exports.deleteChatRoom = function*(chatroomid) {
  let url = this.prefix + 'chatrooms/' + chatroomid;
  return yield this.request(url, {
    method: 'DELETE'
  });
};

//Get all chat rooms
exports.getChatRooms = function*() {
  let url = this.prefix + 'chatrooms';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get chat room detail
exports.getChatRoomDetail = function*(chatroomid) {
  let url = this.prefix + 'chatrooms/' + chatroomid;
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get all chat room of user joined
exports.getChatRoomJoined = function*(username) {
  let url = this.prefix + 'users/' + username + '/joined_chatrooms';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Add a member to chat room
exports.addChatRoomMember = function*(chatroomid, username) {
  let url = this.prefix + 'chatrooms/' + chatroomid + '/users/' + username;
  return yield this.request(url, this.postJSON({}));
};

//Add multiple members to chat room
exports.addChatRoomMembers = function*(chatroomid, usernames) {
  let url = this.prefix + 'chatrooms/' + chatroomid + '/users/';
  return yield this.request(url, this.postJSON({usernames}));
};

//Remove a member from chat room
exports.deleteChatRoomMember = function*(chatroomid, username) {
  let url = this.prefix + 'chatrooms/' + chatroomid + '/users/' + username;
  return yield this.request(url, {
    method: 'DELETE'
  });
};

//Remove multiple member from chat room
exports.deleteChatRoomMembers = function*(chatroomid, usernames) {
  let url = this.prefix + 'chatrooms/' + chatroomid + '/users/' + usernames;
  return yield this.request(url, {
    method: 'DELETE'
  });
};
