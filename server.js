const express = require("express");
const APP_CONFIG = require("./config/app");
const bodyParser = require("body-parser");
const StartUpManager = require("./classes/start-up-manager");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");
const compression = require("compression");

//Perform intial initialization validation
let initialised = StartUpManager.validateInit(); 

if(initialised.result === false) {
	console.log(initialised.message);
	return false;
}	

//Define the express app object
let app = express();

//Static file handling
app.use(express.static(__dirname + "/assets/dist", { maxage: '7d' }));

app.use(require("./controllers/views"));

//body-parser, used to parse request data
app.use(bodyParser.json());

//Compress request responses
app.use(compression());

if (initialised.current_environment === "dev") {

	//Development setup

	app.listen(APP_CONFIG.port, () => {
		console.log("App listening on port " + APP_CONFIG.port);
	});
}
else {
	//Production setup

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
		app.listen(APP_CONFIG.port, () => {
			console.log("App listening on port " + APP_CONFIG.port);
		});
	}
}