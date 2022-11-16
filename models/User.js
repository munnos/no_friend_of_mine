const { Schema, model } = require("mongoose");

// Defining relevant fields for the schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 50,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/,
                'Please insert a valid email address'
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: "User",
            },
        ], 
    },
    {
        converttoJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

userSchema.virtual('countFriend').get(function () {
    return this.friends.length;
});

// Passing Schema (blueprint) and mongoose will take this and give us a model (equivalent to a table in sequel)
// Based on the schema we have passed
const User = model("User", userSchema);

module.exports = User;

