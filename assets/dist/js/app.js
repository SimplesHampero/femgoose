(function (APP) {

	var createHttpRequest = function  () {
		var httpRequest;
		if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
		    httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE 6 and older
		    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}

		return httpRequest;
	};


	//View Handling
	(function () {
		var httpRequest = createHttpRequest();

		APP.viewTemplate = function (file_name) {
			var file_name = file_name  || "user";
			httpRequest.open("GET", "http://localhost:5555/templates/" + file_name + ".html", true);
			httpRequest.send();
		};

		httpRequest.onreadystatechange = function (res){
		   
		    //We'll inject the ajax response into this document fragment, 
		    //then append it to the dom
		    var frag = document.createDocumentFragment();
		    var tmp_div = document.createElement("div");
		    var main_content = document.getElementById("main");

		    if (httpRequest.readyState === XMLHttpRequest.DONE) {
				
				if (httpRequest.status === 200) {
					

					tmp_div.innerHTML = httpRequest.responseText;
					frag.appendChild(tmp_div);
					main_content.innerHTML = "";
					main_content.appendChild(frag);
				} 
				else {
					console.log('There was a problem with the request.');
				}
			}
		};
	})();


	//API calls
	(function () {

		APP.createUser = function () {
		
			var httpRequest = createHttpRequest();
		    var frag = document.createDocumentFragment();

			var form_data = {
				username: document.getElementById("username").value,
				password: document.getElementById("password").value,
			};

			httpRequest.open("POST", "http://localhost:5555/api/user", true);

			httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			createHttpRequest.onreadystatechange = function () {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					console.log("HIT")
					if (httpRequest.status === 200) {
						

						tmp_div.innerHTML = "<p>You created a user!</p>";
						frag.appendChild(tmp_div);
						main_content.appendChild(frag);
					} 
					else {
						console.log('There was a problem with the request.');
					}
				}
			}
			httpRequest.send(JSON.stringify(form_data));
			return false;
		};

		APP.getUsers = function () {
		
			var httpRequest = createHttpRequest();
		    var content = document.getElementById("user-list");
		    var frag = document.createDocumentFragment();
			var tmp_li = document.createElement("li");
			var users = [];


			httpRequest.open("GET", "http://localhost:5555/api/user", true);

			httpRequest.onreadystatechange = function () {
				
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					
					if (httpRequest.status === 200) {
						
						users = JSON.parse(httpRequest.response);
						console.log(users);
						console.log("users");

						for (var i = 0, max = users.length; i < max; i++) {
							tmp_li.innerHTML = "<p>" + users[i].username + "</p>";
							frag.appendChild(tmp_li);
							tmp_li = document.createElement("li");
						}

						content.appendChild(frag);
					} 
					else {
						console.log('There was a problem with the request.');
					}
				}
			}
			httpRequest.send();
			return false;
		};
		
	})();
	

		
	

})(window.APP || (window.APP = {}));
