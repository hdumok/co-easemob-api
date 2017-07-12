//Get all groups
exports.getGroups = function*() {
  let url = this.prefix + 'chatgroups';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
}

//Get group(s) detial
exports.getGroupDetail = function*(groupids) {
  let url = this.prefix + 'chatgroups/' + (Array.isArray(groupids) ? groupids.join(',') : groupids);
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
}

//Create a group
exports.createGroup = function*(groupinfo) {
  let url = this.prefix + 'chatgroups';
  let data = {
    groupname: groupinfo.groupname || '', //群组名称，此属性为必须的
    desc: groupinfo.desc || '', //群组描述，此属性为必须的
    public: groupinfo.public || true,  //是否是公开群，此属性为必须的
    maxusers: groupinfo.maxusers || 200, //默认值200，最大值2000，此属性为可选的
    approval: groupinfo.approval || false, //加入公开群是否需要批准，默认值是false（加入公开群不需要群主批准），此属性为必选的，私有群必须为true
    owner: groupinfo.owner, //群组的管理员，此属性为必须的
  };

  if (groupinfo.members && groupinfo.members.length > 0) {
    data.members = groupinfo.members //群组成员，此属性为可选的，但是如果加了此项，数组元素至少一个（注：群主jma1不需要写入到members里面）
  }

  return yield this.request(url, this.postJSON(data));
}

//Modify group information
exports.modifyGroupInfo = function*(groupid, groupinfo) {

  let url = this.prefix + 'chatgroups/' + groupid;

  let data = {};
  if (typeof groupinfo.groupname != 'undefined') {
    data.groupname = groupinfo.groupname;
  }
  if (typeof groupinfo.groupname != 'undefined') {
    data.description = groupinfo.description;
  }
  if (typeof groupinfo.groupname != 'undefined') {
    data.maxusers = groupinfo.maxusers;
  }

  if (JSON.stringify(data) == '{}') throw 'modifyGroupInfo change nothing';

  return yield this.request(url, this.putJSON(data));
}

//Delete a group
exports.deleteGroup = function*(groupid) {
  let url = this.prefix + 'chatgroups/' + groupid;
  return yield this.request(url, {
    method: 'DELETE'
  });
}

//Get members of Group
exports.getGroupUsers = function*(groupid) {
  let url = this.prefix + 'chatgroups/' + groupid + '/users';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
}

//Add a user to group
exports.addGroupMember = function*(groupid, username) {
  let url = this.prefix + 'chatgroups/' + groupid + '/users/' + username;
  return yield this.request(url, this.postJSON({username}));
}

//Add multiple users to group
exports.addGroupMembers = function*(groupid, usernames) {
  let url = this.prefix + 'chatgroups/' + groupid + '/users';
  return yield this.request(url, this.postJSON({usernames}));
}

//Remove a member from group
exports.deleteGroupMember = function*(groupid, username) {
  let url = this.prefix + 'chatgroups/' + groupid + '/users/' + username;
  return yield this.request(url, {
    method: 'DELETE'
  });
}

//Remove multiple members from group
exports.deleteGroupMembers = function*(groupid, usernames) {
  let url = this.prefix + 'chatgroups/' + groupid + '/users/' + usernames.join(',');
  return yield this.request(url, {
    method: 'DELETE'
  });
}

//Get a list of groups of user joined
exports.getGroupsForUser = function*(username) {
  let url = this.prefix + 'users/' + username + '/joined_chatgroups';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
}

//Update group owner
exports.changeGroupOwner = function*(groupid, newowner) {
  let url = this.prefix + 'chatgroups/' + groupid;
  return yield this.request(url, this.putJSON({newowner}));
}

//Get group blocked user
exports.getGroupBlackList = function*(groupid) {
  let url = this.prefix + 'chatgroups/' + groupid + '/blocks/users';
  return yield this.request(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
}

//Add user to blacklist of group
exports.addGroupBlackMember = function*(groupid, username) {
  let url = this.prefix + 'chatgroups/' + groupid + '/blocks/users/' + username;
  return yield this.request(url, this.postJSON({}));
}

//Remove user from blacklist of group
exports.deleteGroupBlackMember = function*(groupid, username) {
  let url = this.prefix + 'chatgroups/' + groupid + '/blocks/users/' + username;
  return yield this.request(url, {
    method: 'DELETE'
  });
}
