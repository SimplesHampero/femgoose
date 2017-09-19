var fs = require("fs");
const BASE_URL = require("../../config").application.asset_base_url;


module.exports = {

	/**
	* @function ensureDir Creates a directory if it does not exist. 
	* @param {String} dir Directory to create if it does not exist.
	*/
	mkdir: (dir = BASE_URL) => {

		if (!fs.existsSync(dir)){

			fs.mkdirSync(dir);
		}

		return dir;
	}
};
