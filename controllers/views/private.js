const express = require("express");
const router = express.Router();
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const view_dir = path.join(__dirname, "../../views");

router.use(express.static(view_dir, { 
	redirect : false, 
	maxAge: "7 days"
}));

router.get("*", (req, res) => {
	
	//Response options
	var options = {
		root: path.join(__dirname, "../../"),
	};

	//Redirect them back to the public context if they're not authenticated.
	if (!req.user) {
		return res.redirect("/");
	}

	let token = req.jwt;

	fs.readFile("views/layouts/private.html", (err, data) => {

		//This should be handled better.
		if (err) {
			return res.redirect("/");
		}

		return res.render("layouts/private", {
			locals: {
				token: token
			}
		});
	});


});

module.exports = router;