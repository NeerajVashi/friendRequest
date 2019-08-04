import express from 'express';
import sqlQuery from '../config/query';

const router = express.Router();


router.get('/:id', async (req, res) => {
  const friendId = req.params.id;
  console.log('friend request Id:', friendId);
  const [friend, fields]= await sqlQuery.getFriendById(friendId);
  console.log(friend);
  res.status(200).json({ Id: friend, status: true, msg: 'friend is successfully fetched ' });
});

router.get('/friend/:id', async (req, res) => {
  const friendId = req.params.id;
  console.log('friend request Id:', friendId);
  const [friend, fields] = await sqlQuery.getFriends(friendId);
  console.log(friend);
  res.status(200).json(friend);
});

router.get('/count/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('display no of friends of user', userId);
  const [totalFriends, fields] = await sqlQuery.countFriends(userId);
  console.log(totalFriends);
  res.status(200).json({ Id: userId, status: true, msg: totalFriends });
});

router.post('/insert/:id', async (req, res) => {
  const senderId = req.params.id;
  const insertRequest = req.body;
  console.log('inside insert', senderId, insertRequest);
  const newFriend = await sqlQuery.addFriend(senderId, insertRequest);
  res.status(200).json(newFriend);
});

router.delete('/delete/:id', async (req, res) => {
  const deleteRequest = req.body;
  const request = {
    userId: deleteRequest.userId,
    friendId: req.params.id,
  };
  console.log(request);
  const deleteStatus = await sqlQuery.deleteFriend(request);
  res.status(200).json(deleteStatus);
});

module.exports = router;
