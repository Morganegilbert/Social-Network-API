const { Thought, User,  } = require('../models');

const thoughtController = {

  // get all Thought
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add thought to user
  addThought({body}, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findByIdAndUpdate(
          body.userId,
          { $push: { "thoughts": dbThoughtData._id } },
          { new: true, upsert: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // get one Thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(removeThought => {
        if (!removeThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        // removes thought from userId
        return User.findOneAndUpdate(
          { _id: removeThought.userId },
          { $pull: { thoughts: params.thoughtId } },
          {  new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(204).json({});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update user by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true
    })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: {reactionId: params.reactionId} } },
        { safe: true, multi: true, returnOriginal: false }
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(200).json({});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = thoughtController;
