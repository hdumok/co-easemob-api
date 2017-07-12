exports.createUser = function*(user) {
  let url = this.prefix + 'users';
  return yield this.request(url, this.postJSON(user));
};

//Create multiple users
exports.createUsers = function*(users) {
  let url = this.prefix + 'users';
  return yield this.request(url, this.postJSON(users));
};

//Get a user
exports.getUser = function*(username) {
  let url = this.prefix + 'users/' + username;
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get users in batch
exports.getUsers = function*(limit, cursor) {
  let url = this.prefix + 'users';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    query: {'limit': limit, 'cursor': cursor}
  });
};

//Delete a user
exports.deleteUser = function*(username) {
  let url = this.prefix + 'users/' + username;
  return yield this.request(url, {
    method: 'DELETE'
  });
};

//Delete users in batch
//删除某个 APP 下指定数量的环信账号。可一次删除 N 个用户，数值可以修改。
//建议这个数值在100-500之间，不要过大。需要注意的是，这里只是批量的一次性删除掉 N个用户，具体删除哪些并没有指定，可以在返回值中查看到哪些用户被删除掉了。
exports.deleteUsers = function*(limit) {
  let url = this.prefix + 'users';
  return yield this.request(url, {
    method: 'DELETE',
    query: {'limit': limit}
  });
};

//Reset user's password
exports.resetPassword = function*(username, oldpwd, newpwd) {
  let url = this.prefix + 'users/' + username + '/password';
  let data = {oldpassword: oldpwd, newpassword: newpwd};
  return yield this.request(url, this.putJSON(data));
};

//Update user's nickname
exports.editNickname = function*(username, nickname) {
  console.log(arguments)
  let url = this.prefix + 'users/' + username;
  let data = {nickname};
  return yield this.request(url, this.putJSON(data));
};

//Add a friend for user
exports.addFriend = function*(username, friendname) {
  let url = this.prefix + 'users/' + username + '/contacts/users/' + friendname;
  return yield this.request(url, this.postJSON({}));
};

//Delete a friend for user
exports.deleteFriend = function*(username, friendname) {
  let url = this.prefix + 'users/' + username + '/contacts/users/' + friendname;
  return yield this.request(url, {
    method: 'DELETE'
  });
};

//Get user's friends list
exports.showFriends = function*(username) {
  let url = this.prefix + 'users/' + username + '/contacts/users';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get user's blacklist
exports.getBlacklist = function*(username) {
  let url = this.prefix + 'users/' + username + '/blocks/users';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Block user(s)
exports.addUserForBlacklist = function*(username, usernames) {
  let url = this.prefix + 'users/' + username + '/blocks/users';
  return yield this.request(url, this.postJSON({usernames}));
};

//UnBlock user(s)
exports.deleteUserFromBlacklist = function*(username, blackuser) {
  let url = this.prefix + 'users/' + username + '/blocks/users/' + blackuser;
  return yield this.request(url, {
    method: 'DELETE'
  });
};

//Get user online status
exports.isOnline = function*(username) {
  let url = this.prefix + 'users/' + username + '/status';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get offline message count
exports.getOfflineMessages = function*(username) {
  let url = this.prefix + 'users/' + username + '/offline_msg_count';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Get offline message status
exports.getOfflineMessageStatus = function*(username, msgid) {
  let url = this.prefix + 'users/' + username + '/offline_msg_status/' + msgid;
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};

//Deactivate user account
exports.deactivateUser = function*(username) {
  let url = this.prefix + 'users/' + username + '/deactivate';
  return yield this.request(url, this.postJSON({}));
};

//Deactivate user account
exports.activateUser = function*(username) {
  let url = this.prefix + 'users/' + username + '/activate';
  return yield this.request(url, this.postJSON({}));
};

//Activation user account
exports.disconnectUser = function*(username) {
  let url = this.prefix + 'users/' + username + '/activate';
  return yield this.request(url, this.postJSON({}));
};

//Logout user
exports.disconnectUser = function*(username) {
  let url = this.prefix + 'users/' + username + '/disconnect';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
};
