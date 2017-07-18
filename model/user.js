const db = require("../db");
const APP_CONFIG = require("../config/app");
const bcrypt = require("bcryptjs");

let User = new db.Schema({
	
	email: { 
		type: String, 
		required: false, 
		select: false, 
		unique: true,
		default: "", 
	},
	password: { 
		type: String, 
		required: true, 
		select: false 
	},
	first_name: { 
		type: String, 
		required: false, 
		select: false, 
		default: "" 
	},
	last_name: { 
		type: String, 
		required: false, 
		select: false, 
		default: "" 
	},
	username: { 
		type: String, 
		required: false, 
		select: false 
	}
});

/*
	Validate a user's password

	returns cb (error, result) => result = {true, false}
*/
User.methods.validatePassword = function (password, cb) {

	bcrypt.compare(password, this.password, (err, result) => {
		
		if (err) {
			return cb(err);
		}

		return cb(null, result);
	});
};

/*
	Validate a user's password syncronously

	returns Boolean
*/
User.methods.validatePasswordSync = function (password, cb) {
	return bcrypt.compareSync(password, this.password);
};

/*
	Generate a new hash 

	returns a hashed value
*/
User.statics.generateHash = function (password, cb)  {
	return bcrypt.hash(password, APP_CONFIG.auth.password_salt_iterations, cb);
};

/*
	Generate a new hash 

	returns a hashed value
*/
User.statics.generateHashSync = function (password)  {

	return bcrypt.hashSync(password, APP_CONFIG.auth.password_salt_iterations);
};

/*
* Query helpers
*/

/*
* @function findByUsername Adds a regular expression query for the username field
* @param {String} name String to match against the username
*/
User.statics.findByUsername = function(name, cb) {

	let expression = "";

	if (name.length > 0) {
		expression = new RegExp(data.props.query.toLowerCase());
	}
	
	return this.find({ username: expression }, cb);
};

/*
* End Query helpers
*/

/*
* Pre / Post Hooks
*/

/*
* @desc Set username to (first_name + last_name).toLower() for efficient text searching.
*/
User.pre("save", function (next) {

	//Perform any logic on the model before saving...
	
	next();
});


/*
* End Pre / Post Hooks
*/


let UserModel = db.model("User", User);

module.exports = UserModel;