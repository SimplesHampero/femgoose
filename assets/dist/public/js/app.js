/**
 * @param {Object} APP Application object, all app logic is stored within this object. 
 */
(function (App) {

    "use strict";

    //API endpoint.
    var API_BASE_URL = "http://localhost:5556/";

    /**
     * @function namespace Non-destructive namespacing function
     */
	App.namespace = function (namespace_string) {

		var parts = namespace_string.split("."),
			parent = App,
			i = 0

		//strip redundant leading global if it exists
		if (parts[0] === "BPP") {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i++) {
			//Create a property if it doesn't exist
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}
		
		return parent;
	};

    App.namespace("auth");

    
    /**
     * @function login Attempts to retrieve an authentication token from the API
     * @param {String} email Email address for a user account
     * @param {String} password Password for a user account
     */
    App.auth.login = function (email, password) {
        console.log("Login.");

        fetch(API_BASE_URL + "api/public/login", {
            method: "POST",
            body: JSON.stringify({email: "leebrindley@gmail.com", password: "password"})
        })
        .then(function (res) {
            console.log("Fetch callback")
            res.json().then(function (data) {
                console.log("data");
                console.log(data);
            });
        });
    };

})(window.App || (window.App = {}));