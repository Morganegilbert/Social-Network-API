const router = require('express').Router();

// add addFriend and removeFriend later for bonus
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/users-controller');

// /api/users
router.route('/').get(getAllUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// PUT to update a user by its _id
router.route('/:userId').put(updateUser);

// DELETE to remove user by its _id
router.route('/:userId').delete(deleteUser);


// /api/users/:userId/friends/:friendId - add and remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
