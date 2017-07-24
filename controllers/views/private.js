const express = require("express");
const router = express.Router();
const path = require("path");
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

	console.log("HELLLO")

	//Check the user is present on the request, therefore authenticated to access the private context
	if (req.user) {
		res.sendFile("views/layouts/private.html", options);					
	}
	else {

		//Redirect them back to the public context if they're not authenticated.
		res.redirect("/");
	}

});

module.exports = router;