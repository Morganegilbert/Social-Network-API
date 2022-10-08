const router = require('express').Router();

const {
    getAllThought,
    addThought,
    getThoughtById,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router.route('/').get(getAllThought).post(addThought);

// /api/users/:userId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(removeThought);

// POST to create a reaction stored in a single thought's reactions array field
// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reactions').post(addReaction);

// DEL to remove a reaction from single thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;
