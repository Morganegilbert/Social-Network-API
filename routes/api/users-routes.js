const router = require('express').Router();

// add addFriend and removeFriend later for bonus
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    updateFriends
} = require('../../controllers/users-controller');

// /api/users
router.route('/').get(getAllUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// update to addFriend and removeFriend later for bonus
// router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;


// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id
router.route('/:userId').put(updateUser);

// DELETE to remove user by its _id
router.route('/:userId').delete(deleteUser);

// BONUS: Remove a user's associated thoughts when deleted.
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend).put(updateFriends);

// DELETE to remove a friend from a user's friend list
// router.route('/:userId/friends/friendId');
