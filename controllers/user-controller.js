const { User } = require('../models');

const userController = {
    // get all Users
    getAllUsers(req, res) {
      User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one User by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createUser
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  
    // update User by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // delete User
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
      User.findOneAndUpdate({ _id: params.id }, {$push: {friends: params.friendId}})
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({params}, res) {
      User.findOneAndUpdate({ _id: params.id }, {
        $pullAll: {
          friends: [{_id: params.friendId}],
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};
  

module.exports = userController;