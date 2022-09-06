const router = require('express').Router();
let Product = require('../models/product.model');

// Fetch all products
router.route('/').get((req, res) => {
    console.log("Calling get")
    Product.find()
        .then(product => {res.json(product)
        console.log(product)})
        .catch(err => res.status(400).json('Error: ' + err));
})

//Add Products to List
router.route('/add').post(async (req, res) => {
    const newProduct = new Product();
    newProduct.tag = req.body.tag; 
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.image = req.body.image;
    newProduct.quantity = req.body.quantity;
    console.log("Calling Add", newProduct);
    newProduct.save()
        .then(() => res.json(newProduct._id))
        .catch(err => res.status(400).json('Error: ' + err));
    
});
//fetch all the products with the respect tag
router.route('/').post((req, res) => {
    //tag : 'dairy', 'cereal'
    const tag = req.body.tag
    console.log("Calling get by tag")
    Product.find({ tag })
        .then(product => {res.json(product)
        console.log(product)})
        .catch(err => res.status(400).json('Error: ' + err));
})

// fetch speific product info with ID
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(login => res.json(login))
        .catch(err => res.status(400).json('Error: ' + err));
})

// delete speific product info with ID
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            console.log('error in deleting!');
            throw error;
        } else {
            console.log('Product has been deleted', data);
            res.status(204).json(data);
        }
    });
})
//Update Products based on the ID
router.route('/:id').put((req, res) => {
    if (!req.params.id) {
        res
        .status(404)
        .json({
          "message": "Not found, bookid is required"
        });
    }

    Product.findById(req.params.id)
        .then(product => {
            product.tag = req.body.tag; 
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.quantity = req.body.quantity;
            console.log("Calling update", product);
            product.save()
                .then(() => res.json(product))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));

    
    
});
module.exports = router