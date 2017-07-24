const router = require("express").Router();
const ProcessorData = require("../../classes/processor-data");
const UserCreateProcessor = require("../../processors/public/create-account");
const LoginProcessor = require("../../processors/public/login");


router.post("/createaccount", (req, res) => {
	
	console.log(req.body);
	console.log("req.body");
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
			console.log("Returning error");
			console.log(result);
			return res.status(result.status).json(result.data);
		}

		if (req.headers["x-client"] === "web") {

			
			req.session.user = {
				_id: result.data
			};

			res.setHeader("Access-Control-Allow-Credentials", "true");
			req.session.save(function () {
				res.json(true);			
			});
			
		}
		else {
			return res.json(result.data); 		
		}
	});
});

module.exports = router;