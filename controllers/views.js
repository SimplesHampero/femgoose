const express = require("express");
const router = express.Router();
const path = require("path");
const view_dir = path.join(__dirname, "../views");

router.use(express.static(view_dir, { 
	redirect : false, 
	maxAge: "7 days"
}));

router.get("*", (req, res) => {

	const parts = req.originalUrl.split("/");
		
	//Response options
	var options = {
		root: path.join(__dirname, "../"),
	};


	if (parts[1] == "app") {

		//Check the user is present on the request, therefore authenticated to access the private context
		if (req.user) {
			res.sendFile("views/layouts/private.html", options);					
		}
		else {

			//Redirect them back to the public context if they're not authenticated.
			res.redirect("/");
		}
	}
	else {
		res.sendFile("views/layouts/public.html", options);			
	}
});

module.exports = router;