const router = require('express').Router();
const Cart = require('../models/cart.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

// send response function
const sendResponse = (res,statusCode,message=null,data=null,err=null) => {
    res.status(statusCode).json({message:message, data: data, error: err});
}

// Fetch all products in cart
router.route('/').get( async (req, res) => {
    console.log("Calling get")
    try {
        let allCartData = [];
        let cart = await Cart.find();
        console.log("cart", cart);
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
        console.log("allCartData", allCartData);
        sendResponse(res, 200, "Success", allCartData);
    } catch (error) {
        console.log("error", error);
        sendResponse(res, 400, null, null, error);
    }

});

//Add Products to cart list
router.route('/add').post(async (req, res) => {
    console.log("Calling Add", req.body);
    try {
        let cartItems = await Cart.find({tag: req.body.tag, product_id: req.body.product_id});
        console.log("cartItems", cartItems);
        if(cartItems.length > 0) {
            let cartQuantity = parseInt(cartItems[0].quantity)+1;
            let cart = await Cart.findByIdAndUpdate(cartItems[0]._id, {quantity: cartQuantity.toString()}, {new: true});
            console.log("cart", cart);
            sendResponse(res, 200, "Success", cart);
        } else { 
            const newItem = new Cart();
            newItem.user_id = req.body.user_id;
            newItem.product_id = req.body.product_id;
            newItem.tag = req.body.tag; 
            newItem.quantity = "1";
            console.log("Calling Add", newItem);
            let resp = await newItem.save()
            sendResponse(res, 200,"Product added to cart",resp,null);
        }
    } catch (error) {
        console.log(error);
        sendResponse(res, 400,"Error in adding product to cart",null,error);
    }
    
});

//delete product from cart list
router.route('/delete/:id').delete(async (req, res) => {
    console.log("Calling delete", req.params.id);
    try {
        let resp = await Cart.findByIdAndDelete(req.params.id);
            console.log('Product has been deleted', resp);
            sendResponse(res, 200,"Product deleted from cart",resp,null);
    } catch (error) {
        console.log(error);
        sendResponse(res, 400,"Error in deleting product from cart",null,error);
    }
});

//Update Products based on the ID
router.route('/update/:id').put(async (req, res) => {
    console.log("Calling update", req.params.id, req.body);
    try {
        let resp = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
            console.log('Product has been updated', resp);
            sendResponse(res, 200,"Product updated in cart",resp,null);
    } catch (error) {
        console.log(error);
        sendResponse(res, 400,"Error in updating product in cart",null,error);
    }
});



module.exports = router;