const router = require("express").Router();
const ProcessorData = require("../../classes/processor-data");
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

		return res.json(result.data); 
	});
});

module.exports = router;