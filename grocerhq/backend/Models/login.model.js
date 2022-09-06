const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength:1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:1
    },
    password: {
        type: String,
        required: false,
        minlength:1
    }
});

module.exports = mongoose.model('Login', loginSchema);