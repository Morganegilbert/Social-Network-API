const router = require('express').Router();

const {
    gettAllThought,
    addThought,
    getThoughtById,
    removeThought,
    updateThought,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router.route('/').get(gettAllThought).post(addThought);

// /api/users/:userId
router.route('/:userId/thoughts').get(getThoughtById).put(updateThought).delete(removeThought);

// update to addFriend and removeFriend later for bonus
// router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value