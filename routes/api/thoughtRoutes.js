const router = require('express').Router();

// requiring all the functions in the thoughtController
const {
    getallThoughts,
    getonethoughtbyID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


// Api to get and post a thought
router.route('/').get(getallThoughts).post(createThought);


// Update thoughts
router.route('/:thoughtId').get(getonethoughtbyID).put(updateThought).delete(deleteThought)

// 

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;


