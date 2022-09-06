const router = require('express').Router();
const Category = require('../models/category.model');

// send response function
const sendResponse = (res,statusCode,message=null,data=null,err=null) => {
    res.status(statusCode).json({message:message, data: data, error: err});
}

//get all categories
router.route('/').get( async (req, res) => {
    console.log("Calling get all categories")
    try {
        let categories = await Category.find();
        sendResponse(res, 200, "Success", categories);
    } catch (error) {
        sendResponse(res, 400, null, null, error);
    }
});

module.exports = router;