const express = require("express");
const router = express.Router();
const path = require("path");
const view_dir = path.join(__dirname, "../views");

router.use(express.static(view_dir, { 
	redirect : false, 
	maxAge: "7 days"
}));

router.get("*", (req, res) => {
	res.sendFile(view_dir + "/index.html", {root: path.join(__dirname, "../")});
});

module.exports = router;