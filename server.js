const express = require("express");
const APP_CONFIG = require("./config/app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
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
app.set('trust proxy', 1) // trust first proxy
// app.use(cookieParser({secret: "sdf%T£%dvvd_+_df322"}));
app.use(session({
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

app.use(/^\/(?!app).*/, require("./controllers/views/public"));

//This protects anything inside the /api url namespace
app.use(["/app", "/api"], require("./middleware/auth-jwt"));

app.use("/api/user", require("./controllers/user/index"));

app.use("/app", require("./controllers/views/private"));

//Start the application
App.run(app);