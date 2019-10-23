console.log("I am in route/user.js");
// Importing modules
const express = require('express');
const router = express.Router();

// Importing User Schema
const User = require('../models/user');

// User login api

router.post('/login', (req, res) =>{
	// Find user with requested email
	User.findOne({email: req.body.email}, function(err, user){
		console.log('---------- ', user);
		if (user === null){
			return res.status(400).send({
				message: "User not found"
			});
		}else{
			if(user.validPassword(req.body.password)){
				return res.status(201).send({
					message: "User logged in"
				});
			}else{
				return res.status(400).send({
					message: "Wrong Password"
				});
			}
		}
	});
});

router.post('/signup',(req, res, next) =>{
	console.log("----inside route/user-------"+req);
	// Creating empty user object
	let newUser = new User();

	// Intialize newUser object with request data 
	newUser.name = req.body.name;
	newUser.email = req.body.email;

	// Call setPassword function to hash password
	newUser.setPassword(req.body.password);

	// Save newUser object to database
	console.log('------------------new user------------'+newUser)
	newUser.save((err, User) =>{
		console.log('------------------user after save------------'+ User);
		if (err){
			return res.status(400).send({
				message: "Failed to add User"
			});
		}else{
			return res.status(201).send({				
				message: "User added succesfully."
			});
		}
	});
});

// Export module to allow it to be imported in other files 
module.exports = router;
