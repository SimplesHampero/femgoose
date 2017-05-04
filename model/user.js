const db = require("../db");
const bcrypt = require("bcryptjs");

let User = db.model("user", {
	
	username: { type: String, required: true, select: false, unique: true },
	password: { type: String, required: true, select: false },
	
	email: { type: String, required: false, select: false, default: "" },
	first_name: { type: String, required: false, select: false, default: "" },
	last_name: { type: String, required: false, select: false, default: "" },
});


/*
	Validate a user's password

	returns cb (error, result) => result = {true, false}
*/
User.methods.validatePassword = (password, cb) => {
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
User.methods.validatePasswordSync = (password, cb) => {
	return bcrypt.compareSync(password, this.password);
};

User.statics.generateHash = (password, cb) =>  {};
User.statics.generateHashSync = () =>  {};

module.exports = User;