/**
* @description Example file upload export, replicate this for any file uploads your app handles.
* As an example, you would create a file upload export for a user's profile picture upload.
*/
const multer = require("multer");
const crypto = require("crypto");
const BASE_URL = require("../../config").application.asset_base_url;
const File = require("../lib/file");
const EXAMPLE_PATH = "/"

module.exports = multer({ 

	//Define a multer storage object, this handles the logic involved in processing
	//a particular file upload.
	storage: multer.diskStorage({
	    destination: function (req, file, cb) {

	        const path = file.mkdir(BASE_URL + EXAMPLE_PATH);
	        
	        cb(null, path);
	    },
	    filename: function (req, file, cb) {

	    	//WOrk out the file extension
	        const file_extension = file.mimetype.split("/")[1] || "jpg";
	        
	        //Generate a unique filename 
	        const seed = crypto.randomBytes(20);
	        const uniqueSHA1String = crypto.createHash("sha1").update(seed).digest("hex");

	        cb(null, file.fieldname + '-' + uniqueSHA1String + "." + file_extension);
	    }
	})
});