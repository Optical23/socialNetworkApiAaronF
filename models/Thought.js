const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const opts = { toJSON: { virtual: true, getters: true }};
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought text is Required',
            minLength: 1,
            maxLength: [280, 'Too many characters']
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
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            require: 'Reaction body is Required'
        },
        username: {
            type: String,
            require: 'Username is Required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);
module.exports = Thought;