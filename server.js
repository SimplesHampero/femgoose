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

//For parsing request JSON
app.use(bodyParser.json());

//Enables gzip compression
app.use(compression());

//Static file handling
app.use(express.static(__dirname + "/assets/dist", { maxage: "1d" }));

//Publicaly accessible API routes
app.use("/api/public", require("./controllers/public/index"));

//This protects anything inside the /api url namespace
// app.use("/api", require("./middleware/auth-jwt"));

app.use("/api/user", require("./controllers/user/index"));

app.use(require("./controllers/views"));

//Start the application
App.run(app);