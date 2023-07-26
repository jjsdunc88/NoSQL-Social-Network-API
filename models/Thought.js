const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
    { 
        thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
        createdAt: {
                type: Date,
                default: Date.now(),
                get: function (dateTime) {
                    return dayjs(dateTime).format("MM/DD/YYYY hh:mm:ss A")
                },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

)

thoughtSchema.virtual('reactionCount').get (function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;