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
    // console.log(params);
    Thought.create(body)
      .then((dbThoughtData) => {
        // console.log("this is body", body);
        return User.findByIdAndUpdate(
          body.userId,
          { $push: { "thoughts": dbThoughtData._id } },
          { new: true, upsert: true }
        );
      })
      .then(dbThoughtData => {
        // console.log(dbThoughtData);
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
    // console.log("RemoveThought Params", params);
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(removeThought => {
        // console.log("Remove Thought", removeThought);
        if (!removeThought) {
          // console.log("this is remove thought", removeThought);
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        // console.log("This is params", params);
        return User.findOneAndUpdate(
          { _id: removeThought.userId },
          { $pull: { thoughts: params.thoughtId } },
          {  new: true }
        );
      })
      .then(dbUserData => {
        // console.log("This is DBUser", dbUserData);
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
    console.log("This is params", params);
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: {reactionId: params.reactionId} } },
        { safe: true, multi: true, returnOriginal: false }
      )
      .then(dbThoughtData => {
        console.log("This is DBThought", dbThoughtData);
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
