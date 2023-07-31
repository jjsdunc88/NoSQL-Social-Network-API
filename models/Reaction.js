const { Schema, Types, } = require('mongoose');
const dayjs = require('dayjs');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function (dateTime) {
                return dayjs(dateTime).format("MM/DD/YYYY hh:mm:ss A")
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

    
);

module.exports = reactionSchema;