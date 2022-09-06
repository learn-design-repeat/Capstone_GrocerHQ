const router = require('express').Router();
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const randomString = require('randomstring')

const Cart = require('../models/cart.model');
const Login = require('../models/login.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const AllOrder = require('../models/orders_san.model'); 
const PaymentDetails = require('../models/paymentdetails.model');

const razorpay = new Razorpay({
    key_id: 'rzp_test_SaZq2c9ROy1KmS',
    key_secret: 'a6nQ3biydOhxSybwm3QX13nZ'
});


// send response function
const sendResponse = (res,statusCode,message=null,data=null,err=null) => {
    res.status(statusCode).json({message:message, data: data, error: err});
}

//router for do payment

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        let allCartData = [];
        const {userId} = req.body;
        const user = await Login.findById({_id: userId});
        console.log(user);
        if(!user){
            return sendResponse(res, 200, "User not found", null, null);
        }
        const cart = await Cart.find({user_id: userId});
        if(!cart){
            return sendResponse(res, 200, "Cart is empty", null, null);
        }else{
            for(const item of cart) {
                let data = {};
                data.cart = item;
                let category = await Category.findById(item.category_id);
                // console.log("category", category);
                let product = await Product.findById(item.product_id);
                // console.log("product", product);
                data.category = category;
                data.product = product;
                console.log("data", data);
                allCartData.push(data);
            };
        }
        const orderDetails = {
            user: user,
            cartItems: allCartData
        }
        sendResponse(res, 200, "Success", orderDetails);
    } catch (error) {
        console.log(error);
        sendResponse(res, 400, null, null, error);
    }
});

// do payment
router.post('/paymentinitiated', async (req, res) => {
    console.log(req.body);
    const shippingCharges = {
        "Instore-pickup": 0,
        "Ground": 10,
        "2nd Day Air": 20,
        "Next Day Air": 30,
      }
    const cart = await Cart.find({user_id: req.body.userId});
    console.log("cart", cart);
    if(!cart){
        return sendResponse(res, 200, "Cart is empty", null, null);
    }else{
        let allCartData = [];
        for(const item of cart) {
            let data = {};
                data.cart = item;
            let product = await Product.findById(item.product_id);
            // console.log("product", product);
            data.product = product
            allCartData.push(data);
        };
        console.log("allCartData", allCartData);
        if(!allCartData){
            return sendResponse(res, 200, "Cart is empty", null, null);
        }
        let cartTotal = allCartData.reduce((acc, curr) => {return acc + parseFloat(curr.product.price) * parseInt(curr.cart.quantity)} , 0);
        let totalAmount = cartTotal + shippingCharges[req.body.shippingMethord];
        console.log(cartTotal, totalAmount);
        try {
            const options = {
                amount: totalAmount? (totalAmount*100).toString():"0",
                currency: 'USD',
                receipt: randomString.generate(7),
                payment_capture: 1
            };
            razorpay.orders.create(options).then(async (response) => {
                console.log(response);
                const {id,amount,currency,receipt} = response;
                const order = new AllOrder({
                    user_id: req.body.userId,
                    status: "pending",
                    items: allCartData,
                    amount: cartTotal,
                    currency: currency,
                    receipt: receipt,
                    shippingCharges: shippingCharges[req.body.shippingMethord],
                    paymentMethod: req.body.paymentMethod
                });
                const orderRes = await order.save();
                console.log("orderRes", orderRes);

                sendResponse(res, 200, "Success", {orderId:orderRes._id,id,amount,currency,receipt}, null);
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
            sendResponse(res, 400, null, null, error);
        }
    }
});
        


router.post('/paymentcompleted',async (req, res) => {
    console.log(req.body);
    const {orderId, userId,razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    //update status pending to completed
    try {
        const order = await AllOrder.findByIdAndUpdate({_id: orderId}, {status: "completed"});
        console.log("order", order);
        const paymentDetails = new PaymentDetails({
            user_id: userId,
            order_id: orderId,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature
        });
        const paymentDetailsRes = await paymentDetails.save();
        console.log("paymentDetailsRes", paymentDetailsRes);
        if(order && paymentDetailsRes){
            //delete cart items
            const cart = await Cart.deleteMany({user_id: userId});
            console.log("cart", cart);
        }
        sendResponse(res, 200, "Success", paymentDetailsRes, null);
    }catch(error){
        console.log(error);
        sendResponse(res, 400, null, null, error);
    }
});

module.exports = router;