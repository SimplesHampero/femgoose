const router = require("express").Router();
const User = require("../model/user");

router.get("/", (req, res) => {
	
	User
		.find({})
		.exec((err, users) => {
			// if (err) {}
			// if (!users) {}
			return res.json(users);
		});
});

router.post("/", (req, res) => {
	
	var user = new User(req.body);

	user.save((err, user) => {
		// if (err) {}
		return res.json(user);
	});
});

module.exports = router;