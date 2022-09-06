const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        required: true,
        minlength:1
    },
    tag: { 
        type: String, 
        required: true, 
        minlength:1 
    },
    product_id: {
        type: Schema.ObjectId,
        minlength:1
    },
    quantity: {
        type: String,
        required: true,
        minlength:1
    }
});
module.exports = mongoose.model('Cart', cartSchema);