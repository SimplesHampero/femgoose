const API_CONFIG = require("../../config/app");

class StartUpManager {
	
	constructor () {}

	static validateInit () {

		let return_data = {
			result: true,
			current_environment: process.env.NODE_ENV,
			message: "Success"
		};

		//Check for an environment variable being passed
		if (typeof return_data.current_environment == "undefined") {
			
			return_data.result = false;
			return_data.message = "Please provide environment variable NODE_ENV. Available environments = [ "+ API_CONFIG.environments_available.join(", ") + " ]";
			return return_data;
		}

		return return_data;
	}
}

module.exports = StartUpManager;