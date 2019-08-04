import pool from './sqlPool';

async function countFriends(userId) {
  const [totalFriends, fields] = await pool.execute('select count(*) from friends where userId = ?', [userId]);
  return { Id: userId, status: true, msg: totalFriends };
}
async function getFriendById(friendId) {
  console.log('friendId', friendId);
  const friend = pool.execute('select * from friends where userId = ?', [friendId]);
  return friend;
}
async function addFriend(senderId, friendRequest) {
  await pool.execute('insert into friends(userId, friendId, senderFirstName, senderSurname, receiverFirstName, receiverSurname, Profile_image) values(?,?,?,?,?,?,?)', [friendRequest.receiverId, senderId, friendRequest.senderFirstName, friendRequest.senderSurname, friendRequest.receiverFirstName, friendRequest.receiverSurname, friendRequest.senderImage]);
  await pool.execute('insert into friends(userId, friendId, senderFirstName, senderSurname, receiverFirstName, receiverSurname,Profile_image) values(?,?,?,?,?,?,?)', [senderId, friendRequest.receiverId, friendRequest.receiverFirstName, friendRequest.receiverSurname, friendRequest.senderFirstName, friendRequest.senderSurname, friendRequest.receiverImage]);
  return { Id: friendRequest.friendId, status: true, msg: 'friend successfully inserted' };
}
async function deleteFriend(friendRequest) {
  await pool.execute('delete from friends where friendId = ? and userId = ?', [friendRequest.friendId, friendRequest.userId]);
  await pool.execute('delete from friends where friendId = ? and userId = ?', [friendRequest.userId, friendRequest.friendId]);
  return { Id: friendRequest.friendId, status: true, msg: 'friend successfully removed' };
}
async function getFriends(friendId) {
  console.log('friendId', friendId);
  const friend = pool.execute('select * from friends where userId = ?', [friendId]);
  return friend;
}
module.exports = {
  countFriends:countFriends,
  getFriendById:getFriendById,
  addFriend:addFriend,
  deleteFriend:deleteFriend,
  getFriends:getFriends,
};
