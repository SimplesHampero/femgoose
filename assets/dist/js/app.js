(function () {

	window.onload = function () {
		// Old compatibility code, no longer needed.
		if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
		    httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE 6 and older
		    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}

		httpRequest.onreadystatechange = function (res){
		    // Process the server response here.
		    console.log(httpRequest);
		    //We'll inject the ajax response into this document fragment, then append it to the dom
		    var frag = document.createDocumentFragment();
		    var tmp_div = document.createElement("div");

		    if (httpRequest.readyState === XMLHttpRequest.DONE) {
				
				if (httpRequest.status === 200) {
					
					tmp_div.innerHTML = httpRequest.responseText;
					frag.appendChild(tmp_div);
					document.getElementById("main").appendChild(frag);
				} 
				else {
					console.log('There was a problem with the request.');
				}
			}
		};

		httpRequest.open('GET', 'http://localhost:5555/templates/user.html', true);
		
		httpRequest.send();
	};
	

})();
