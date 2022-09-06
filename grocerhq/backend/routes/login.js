const router = require('express').Router();
let Login = require('../models/login.model');
const bcrypt = require("bcrypt");

//get all user data
router.route('/').get((req, res) => {
    console.log("Calling get")
    Login.find()
        .then(login => {res.json(login)
        console.log(login)})
        .catch(err => res.status(400).json('Error: ' + err));
})

// fetch speific user info with ID
router.route('/:id').get((req, res) => {
    Login.findById(req.params.id)
        .then(login => res.json(login))
        .catch(err => res.status(400).json('Error: ' + err));
})
//Post request for login
router.route('/').post((req, res) => {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    Login.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) 
            return res.status(200).json(false)

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                console.log(password, user.password, data)
                // //if error than throw error
                // if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.status(200).json(user)
                } else {
                    return res.status(200).json(data)
                }
            })
        })
})

router.route('/register').post(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const newUser = new Login();

    newUser.username = req.body.username;
    newUser.email = req.body.email;
    console.log(req.body);
    if (req.body.password != null) {
        newUser.password  = await bcrypt.hash(req.body.password, salt);
        console.log("Calling Add with password", newUser, newUser.password);
    }
    console.log("Calling Add", newUser, newUser.password);
    newUser.save()
        .then(() => res.json(newUser._id))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router