const { User, Thought } = require('../models');

const thoughtsController = {
getallThoughts (req, res) {
    Thought.find()
    .sort({ createdAt: -1 })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
},

getonethoughtbyID(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
    console.log(_id.thoughtId)
    .then((data) => {
        if (!data) {
            return res.status(404).json({message: 'No thought exists with this ID!'});
        }
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
});

},
  
createThought(req,res) {
    Thought.create(req.body)
    .then((data) => {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            { $push: { thoughts: data._id} },
            { new: true }
        );
    })
    .then((userData) => {
        if (!userData) {
            return res.status(404).json({ message: "Thought added but no user found with this ID."});
        }

        res.json({ message: 'Thought successfully created and attributed to chosen user'})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
},

UpdateThought(req,res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set: req.body}, { runValidators: true, new: true })
    .then

}

deleteThought(req,res) {

}