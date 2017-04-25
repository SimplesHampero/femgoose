const db = require("../db");

let User = db.model("user", {
	
	username: { type: String, required: true, select: false, unique: true },
	password: { type: String, required: true, select: false },
	
	email: { type: String, required: false, select: false, default: "" },
	first_name: { type: String, required: false, select: false, default: "" },
	last_name: { type: String, required: false, select: false, default: "" },
});

module.exports = User;