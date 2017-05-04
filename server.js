const express = require("express");
const APP_CONFIG = require("./config/app");
const bodyParser = require("body-parser");
const App = require("./classes/app");
const compression = require("compression");
const db = require("./db");

//Perform intial initialization validation
const initialised = App.validateEnv(); 

if(initialised.result === false) {
	console.log(initialised.message);
	return false;
}	

//Define the express app object
let app = express();

app.use(bodyParser.json());

//Static file handling
app.use(express.static(__dirname + "/assets/dist", { maxage: '7d' }));

app.use("/api/auth", require("./controllers/auth"));

app.use("/api/user", require("./controllers/user"));

app.use(require("./controllers/views"));

//body-parser, used to parse request data

//Compress request responses
app.use(compression());

//Start the application
App.run(app);