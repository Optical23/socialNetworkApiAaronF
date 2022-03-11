const { Schema, model } = require('mongoose');

const opts = { toJSON: { virtual: true, getters: true }, id: false };
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought content is Required',
            validate: [({ length }) => length <= 280, "Thought content can't be longer than 280 characters"]
        },
        createdAt : {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        reactions: [reactionSchema]
    }, opts
);

const reactionSchema = new Schema(
    {
        
    }
)

ThoughtsSchema.virtual('reactionCount').get(function() {
    return 
})


const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;