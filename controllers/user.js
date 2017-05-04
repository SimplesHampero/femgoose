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

	User.generateHash(user.password, (err, hash) => {
		if (err) {
			return res.status(500).json({message:"Error generating password."});
		}

		//Update the password with the hash
		user.password = hash;

		user.save((err, user) => {

			if (err) {
				console.log("User POST - Error saving user");
				console.log(err);
				return res.status(500).json({message: "Error saving user."});
			}

			//Clear the password from the response
			user.password = null;
			
			return res.json({message: "Success", data: user});
		});
	});
});

module.exports = router;