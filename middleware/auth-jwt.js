const jwt = require("jwt-simple");
const APP_CONFIG = require("../config/app");

module.exports = (req, res, next) => {

	//Get the token from the request
	let token = req.headers["x-auth"] || req.params.jwt || req.query.jwt;
	let decoded = null;

	if (!token) {
		return res.status(401).json({message: "No token sent with request."});
	}

	//Try decode the JWT token
	try {
		decoded = jwt.decode(token, APP_CONFIG.auth.jwt_secret);
	} catch (e) {
		//Catch any errors & return 
		return res.status(401).json({message: "Error decoding token."});
	}
	finally {

		if (!decoded) {
			return res.status(401).json({message: "Unauthorized."});
		}
	}

	//Set the decoded JWT as the 'user' property on the req object
	//All routes will be able to access the decoded jwt's properties using req.user
	//e.g. req.user._id || req.user.permissions, etc. 
	req.user = decoded;

	//Continue with the request chain...
	next();
};
