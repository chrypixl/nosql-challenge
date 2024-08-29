const router = require('express').Router();
const {
  getUsers,
  createUser,
  addFriend,
  removeFriend,
  getSingleUser
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);

// /api/students/:studentId
// router.route('/:userId').get(getSingleUser).delete(deleteUser);
router.route('/:userId/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
