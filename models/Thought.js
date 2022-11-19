const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatdate = require('../utils/FormatDate');
// Defining relevant fields for the schema
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
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

// Passing Schema (blueprint) and mongoose will take this and give us a model (equivalent to a table in sequel)
// Based on the schema we have passed
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;