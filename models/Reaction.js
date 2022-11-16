const { Schema, Types } = require('mongoose');

// Defining relevant fields for the schema
const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,

    }
    },
    {
        converttoJSON: {
            getters: trusted
        },
        id: false
    }
);

module.exports = reactionSchema;
