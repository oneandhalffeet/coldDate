import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name']
    }, // name of the user
    email: {
        type: String,
        required: [true, 'Please Enter your email'],
        validate: {
            validator: function(v) {
                return /(\w|\d)+@(\w|\d)+\.(\w|\d)+/.test(v);
            },
            message: props => `${props.value} is not a valid Email !`
        }
    },
    password: {
        type: String,
        required: [true, 'Please Enter a password']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;