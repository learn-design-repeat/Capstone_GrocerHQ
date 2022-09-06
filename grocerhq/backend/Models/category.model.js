const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        minlength:1
    },
});
module.exports = mongoose.model('Category', Category);
