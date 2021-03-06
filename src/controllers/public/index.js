const router = require("express").Router();
const ProcessorData = require("../../lib/classes/processor-data");
const UserCreateProcessor = require("../../processors/public/create-account");
const LoginProcessor = require("../../processors/public/login");


router.post("/createaccount", (req, res) => {
	
	UserCreateProcessor(new ProcessorData(req), (result) => {
		
		if (result.err) {
			return res.status(result.status).json(result.data);
		}
		return res.json(result.data); 
	});
});

router.post("/login", (req, res) => {
	
	LoginProcessor(new ProcessorData(req), (result) => {

		if (result.err) {

			return res.status(result.status).json(result.data);
		}

		//Return early if no session is required, i.e. a mobile app user is logging in
		if (req.headers["x-client"] === "app") {
			return res.json(result.data); 		
		}

		//Indicates that the response to the request can be exposed to the page
		res.setHeader("Access-Control-Allow-Credentials", "true");
						
		//Set the user model on the session
		req.session.user = result.data.user;

		//Set the access token on the session so we can inject it into the web context
		req.session.access_token = result.data.jwt;

		//Save the session explitely so we know it will be up-to-date when the front-end redirects to /app
		req.session.save(function () {

			
			return res.json(result.data);			
		});
	});
});

module.exports = router;