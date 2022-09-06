const router = require('express').Router();
let AllOrder = require('../models/orders_san.model');

// Fetch all products
router.route('/').get((req, res) => {
    console.log("Calling get")
    AllOrder.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
        
    })
});

//Add Products to List
router.route('/add').post(async (req, res) => {
    console.log("Add a new order"   , req.body._id, req.body.status, req.body.items.length);
    const newOrder = new AllOrder();
    newOrder.userid = req.body.userid; 
    newOrder.status = req.body.status;
    req.body.items.forEach(item => {
        newOrder.items.push(item)
    })  
    console.log("Calling Add", newOrder);
    newOrder.save()
        .then(() => res.json(newOrder._id))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

//Add Products to List
router.route('/:id').put(async (req, res) => {
    AllOrder.findById(req.params.id)
    .then((data) => {
        console.log(data);
        data.status = req.body.status;
        console.log("Updaated Data: ", data);
        data.save()
        .then((product) => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router