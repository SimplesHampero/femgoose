const DB_CONFIG = require("./config/db");
const mongoose = require("mongoose");
const CONNECTION_STRING = "mongodb://localhost:" + DB_CONFIG.port + "/" + DB_CONFIG.name;

let options = {
	// db: { 
	//     native_parser: true 
	// },
	// server: { 
	// 	poolSize: 5 
	// },
	// replset: { 
	//     rs_name: "" 
	// },
	// user: "",
	// pass: "",
	// user: "",
	// pass: "",
	// auth: {
 //        authdb: "admin"
 //    }
}

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/fs-express-mongoose", options, () => {
	console.log("MongoDB connected.");
});

module.exports = mongoose;