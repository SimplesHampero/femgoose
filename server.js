const express = require("express");
const APP_CONFIG = require("./config/app");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const App = require("./classes/app");
const compression = require("compression");
const db = require("./db");
const es6Renderer = require("express-es6-template-engine");

//Perform intial initialization validation
const initialised = App.validateEnv(); 

//Check the app initialised OK
if(initialised.result === false) {
	console.log(initialised.message);
	return false;
}	

//Define the express app object
let app = express();

//For parsing request JSON
app.use(bodyParser.json());

// trust first proxy, this should be enabled if you're running the app behind a proxy
app.set('trust proxy', 1) 

//Setup template rendering
app.engine("html", es6Renderer);

//Set the root view directory
app.set("views", "./views");

//Assign the template engine as the default view engine of express
app.set("view engine", "html");

//Setup session config
app.use(session({

	//Uses mongodb store as the default persistent session store.
	store: new MongoStore({ mongooseConnection: db.connection }),
	secret: "sdf%T£%dvvd_+_df322",
	maxAge: 600000,
	resave: true,
  	saveUninitialized: true,
  	cookie: { secure: false } //Needs to map to NODE_ENV really...
}))

//Enables gzip compression
app.use(compression());

//Static file handling
app.use(express.static(__dirname + "/assets/dist", { maxage: "1d" }));

//Publicly accessible API routes
app.use("/api/public", require("./controllers/public/index"));

//Serve views for the public context
//!!!!!!!! This seems to be getting hit when the user is authenticated...
app.use(/^\/(?!app).*/, require("./controllers/views/public"));

//This protects anything inside the /api url namespace
app.use(["/app", "/api"], require("./middleware/auth-jwt"));

//Custom controller definitions
app.use("/api/user", require("./controllers/user/index"));

//Serve the app context's views
app.use("/app", require("./controllers/views/private"));

//Start the application
App.run(app);