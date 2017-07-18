const router = require("express").Router();
const ProcessorData = require("../../classes/processor-data");
const UserCreateProcessor = require("../../processors/public/create-account");
const AuthenticateProcessor = require("../../processors/public/jwt-auth");


router.post("/createaccount", (req, res) => {
	
	UserCreateProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}

		return res.json(result.data); 
	});
});

router.get("/authenticate", (req, res) => {
	
	AuthenticateProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}

		return res.json(result.data); 
	});
});

module.exports = router;