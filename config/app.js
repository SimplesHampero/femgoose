module.exports = {
	
	//Default port to run the express application on
	"port": 5556,

	"auth": {

		//Input your own JWT secret in here
		"jwt_secret": "X)72w(]LCXHn!j8{bR2;K<eDYth4",

		"password_salt_iterations": 10
	},

	//Accepted environments variables to be passed to the app via NODE_ENV on startup
	//e.g. NODE_ENV=dev node server.js || NODE_ENV=prod forever start server.js, etc.
	"environments_available": [
		"development",
		"production"
	]	
};