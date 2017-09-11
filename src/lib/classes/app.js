const API_CONFIG = require("../../../config").application;
const JSHelp = require("./js-help");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");

class App {
	
	constructor () {}

	static validateEnv () {

		let return_data = {
			result: true,
			current_environment: process.env.NODE_ENV,
			message: "Success"
		};

		//Check for an environment variable being passed
		if (JSHelp.typeof(return_data.current_environment) === "undefined") {
			
			return_data.result = false;
			return_data.message = "Please provide environment variable NODE_ENV. Available environments = [ "+ API_CONFIG.environments_available.join(", ") + " ]";
			return return_data;
		}

		//Check for invalid values
		if (API_CONFIG.environments_available.indexOf(return_data.current_environment) === -1) {
			
			return_data.result = false;
			return_data.message = "Invalid environment variable passed to NODE_ENV. Available environments = [ "+ API_CONFIG.environments_available.join(", ") + " ]";
			return return_data;
		}

		return return_data;
	}

	static run (app) {

		let env = process.env.NODE_ENV;

		if (env === "development") {

			//Development
			app.listen(API_CONFIG.port, () => {
				console.log("App listening on port " + API_CONFIG.port);
			});
		}
		else {
			//Production
			if (cluster.isMaster) {

				// Fork workers.
				for (let i = 0; i < numCPUs; i++) {
					cluster.fork();
				}

				cluster.on('online', (worker, code, signal) => {
					console.log(`worker ${worker.process.pid} online`);
				})
				.on('exit', (deadWorker, code, signal) => {
					//If a worker dies restart it
					var worker = cluster.fork();

				    // Note the process IDs
				    var newPID = worker.process.pid;
				    var oldPID = deadWorker.process.pid;

				    // Log the event
				    console.log('worker '+oldPID+' died.');
				    console.log('worker '+newPID+' born.');
				});
			} 
			else {

				// Start the server
				app.listen(API_CONFIG.port, () => {
					console.log("App listening on port " + API_CONFIG.port);
				});
			}
		}
	}
}

module.exports = App;