const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatdate = require('../utils/FormatDate');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatdate(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        converttoJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('countReaction').get(function() {
    return this.reaction.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;