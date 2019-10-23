console.log("I am in models/user.js");
// Importing modules 
const mongoose = require('mongoose');
var crypto = require('crypto');

// Creating user schema
const userSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	hash: String,
	salt: String
});

// Method to set salt and hash the password for a user
// setPassword method first creates a salt unique for every user
// then it hashes the salt with user password and creates a hash
// this hash is stored in the database as user password

userSchema.methods.setPassword = function(password){
	// Creating a unique salt for a particular user
	console.log('------inside setpasswrod fucntion-------');
	this.salt = crypto.randomBytes(16).toString('hex');

	// 'pbkdf2Sync' is synchronus version of encryption for asynchronius we can use 'pbkdf2' which take 6 argument and last one is callback but pbkdf2Sync take only 5 arguments

	// Hashing user's salt and password with 2048 iterations, 64 length and sha512 digest	
	this.hash = crypto.pbkdf2Sync(password, this.salt, 2048, 64, `sha512`).toString(`hex`); 
};

// Method to check the entered password is correct or not 
// valid password method checks whether the user password is correct or not 
// It takes the user password from the request and salt from user database entry 
// It then hashes user password and salt then checks if this generated hash is equal 
// to user's hash in the database or not 
// If the user's hash is equal to generated hash then the password is correct otherwise not 

userSchema.methods.validPassword = function(password){
	console.log('Inside validPassword '+ this.salt);
	var hash = crypto.pbkdf2Sync(password, this.salt, 2048, 64, 'sha512').toString('hex');
	return this.hash === hash;
};

// Exporting module to allow it to be imported in other files
const User = module.exports = mongoose.model('User', userSchema);