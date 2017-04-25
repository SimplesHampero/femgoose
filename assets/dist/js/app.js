(function (APP) {

	if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
	    httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 6 and older
	    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}

	APP.viewTemplate = function (file_name) {
		var file_name = file_name  || "user";
		httpRequest.open("GET", "http://localhost:5555/templates/" + file_name + ".html", true);
		httpRequest.send();
	};
	// window.onload = function () {
		// Old compatibility code, no longer needed.
		

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

		
		
	// };
	

})(window.APP || (window.APP = {}));
