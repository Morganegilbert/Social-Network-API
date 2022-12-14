const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  
  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: {friends: params.friendId } },
      { safe: true, multi: true, returnOriginal: false }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(200).json({});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

};

module.exports = userController;
