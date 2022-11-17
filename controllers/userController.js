const { User, Thought } = require("../models");

//gather all users
const userController = {
  getallUsers(req, res) {
    User.find()
      .select("-__v")
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //make a new user
  createUser(req, res) {
    User.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  //update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  //get single user by their ID
  getuserbyId(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((data) => {
        if (data) {
          return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "No user found with this ID!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  //can add friends through URL
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};
module.exports = userController;
