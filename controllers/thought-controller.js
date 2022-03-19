const { Thought, User } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one Thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createThought
    createThought({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {
                    username: dbThoughtData.username
                }, 
                {
                    $push: {
                        thoughts: dbThoughtData._id
                    }
                })
                .then(dbUserData => {
                    if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                    }
                })
                .catch(err => res.json(err));
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },
  
    // update Thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // delete Thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
}

module.exports = thoughtController