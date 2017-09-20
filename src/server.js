const express = require("express");
const APP_CONFIG = require("../config").application;
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const App = require("./lib/classes/app");
const compression = require("compression");
const db = require("./db/main");
const cors = require("cors");
const fs = require("fs");
const es6Renderer = require("express-es6-template-engine");
const path = require("path");

//Check the app initialised OK
if(initialised.result === false) {
	console.log(initialised.message);
	return false;
}	

//Define the express app object
let app = express();


app.use(session({
	//Uses mongodb store as the default persistent session store.
	store: new MongoStore({ mongooseConnection: db.connection }),
	secret: "sdf%T£%dvvd_+_df322",
	maxAge: 600000,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false } //Needs to map to NODE_ENV really...
}));

//For parsing request JSON
app.use(bodyParser.json());

//Permit cross origin requests 
app.use(cors());

// trust first proxy, this should be enabled if you're running the app behind a proxy
app.set('trust proxy', 1) 

//Setup template rendering
app.engine("html", es6Renderer);

//Set the root view directory
app.set("views", "./src/views");

//Assign the template engine as the default view engine of express
app.set("view engine", "html");

//Enables gzip compression
app.use(compression());

//Static file handling
app.use(express.static(path.join(__dirname, "../assets/dist"), { maxage: "1d" }));

//Publicly accessible API routes
app.use("/api/public", require("./controllers/public/index"));

//This protects anything inside the /api url namespace
app.use("/api", require("./middleware/jwt-auth"));
app.use("/app", require("./middleware/session")); 
	
//Serve views for the public context
//!!!!!!!! This seems to be getting hit when the user is authenticated...
app.use("/", require("./controllers/views/public"));


//Programmatically require all of the private API controllers 
fs.readdir("./src/controllers/private", (err, files) => {
	
	if (err) {
		console.warn("Error reading files for controller requires.");
		console.warn(err);
		process.exit(1);
	}

	files.forEach((file) => {
		app.use(`/api/${file}`, require(`./controllers/private/${file}/index`));
	});


	//Serve the app context's views
	app.use("/app", require("./controllers/views/private"));


	//Final route, if nothing is hit, redirect to the public page
	app.get("*", (req, res) => {
		console.log("ASda")
		res.status(404).redirect("/");
	});

	//Start the application, we're now live!
	App.run(app);
});

