const { Schema, model, Types } = require('mongoose');

const opts = { toJSON: { virtual: true }, id: false };
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is Required'
        },
        email: {
            type: String,
            unique: true,
            required: 'Email is Required',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, opts
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;