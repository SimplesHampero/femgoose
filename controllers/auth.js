const router = require("express").Router();
const jwt = require("jwt-simple");
const APP_CONFIG = require("../config/app");
const User = require("../model/user");


/**
 * Authenticate a user, allowing them to access the API
 * @param username
 * @param password
 */
router.post("/authenticate", (req, res, next) => {

    const username = req.body.username || "";
    const password = req.body.password || "";

    User
        .findOne({
            username: username
        })
        .select("username password")
        .exec((err, user) => {
            
            if (err) {
                return res.status(500).json({ message: "Error finding user." });
            }
            if (!user) {
                return res.status(404).json({ message: "No user found." });
            }
            
            //Validate the user's password
            user.validatePassword(password, (err, result) => {
                
                //We'll pass this back to the client if successful 
                let api_token = "";

                if (err) {
                    return res.status(500).json({message: "Error validating password."});
                }

                if (result === false) {
                    return res.status(401).json({message: "Invalid password."});
                }

                //Clear the user password before sending back the resposne
                user.password = null;

                //Encode the client's API token
                api_token = jwt.encode({
                    _id: user._id
                }, APP_CONFIG.auth.jwt_secret);

                return res.json({message: "Success", api_token});
            });
        });
});


module.exports = router;