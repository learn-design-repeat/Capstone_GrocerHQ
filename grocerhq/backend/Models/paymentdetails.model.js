const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentDetailsSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        required: true,
        minlength:4
    },
    order_id: {
        type: Schema.ObjectId,
        required: true,
        minlength:4
    },
    razorpay_payment_id : {
        type: String,
        required: true,
        minlength:1
    },
    razorpay_order_id : {
        type: String,
        required: true,
        minlength:1
    },
    razorpay_signature : {
        type: String,
        required: true,
        minlength:1
    }
});

module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema);