const router = require("express").Router();
const User = require("../model/user");

router.get("/", (req, res) => {
	
	User
		.count({})
		.exec((err, count) => {

			User
				.find({})
				.select("username email first_name last_name")
				.exec((err, users) => {
					// if (err) {}
					// if (!users) {}

					return res.json(users);
				});
		});
});

router.post("/", (req, res) => {
	
	var user = new User(req.body);

	user.save((err, user) => {

		if (err) {
			console.log("User POST - Error saving user");
			console.log(err);
			return res.status(500).json({message: "Error saving user."});
		}
		return res.json({message: "Success", data: user});
	});
});

module.exports = router;