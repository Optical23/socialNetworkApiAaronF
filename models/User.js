const { Schema, model } = require('mongoose');

const opts = { toJSON: { virtual: true }, id: false };
const UserSchema = new Schema(
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
        thoughts: {

        },
        friends: {

        }
    }, opts
);

UserSchema.virtual('friendCount').get(function() {
    return 
})

const User = model('User', UserSchema);
module.exports = User;