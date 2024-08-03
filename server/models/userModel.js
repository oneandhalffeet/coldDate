const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter a password']
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

// before saving we are encrypting the password
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;