const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        required: true,
        minlength:4
    },
    status: {
        type: String,
        required: true,
        minlength:3
    },
    items: [ 
        {
            tag: String,
            name: String,
            price: String,
            image: String,
            quantity: String,
        }
    ],
    amount: {
        type: String,
        required: true,
        minlength:1
    },
    currency: {
        type: String,
        required: true,
        minlength:1
    },
    receipt: {
        type: String,
        required: true,
        minlength:1
    },
    shippingCharges: {
        type: String,
        required: true,
        minlength:1
    },
    paymentMethod: {
        type: String,
        required: true,
        minlength:1
    }
   
});

module.exports = mongoose.model('AllOrder', OrderSchema);