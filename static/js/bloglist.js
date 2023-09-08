function loadBloglist() {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://gazzetta.oicn.icu/cache.json');
	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			console.log("Cache loaded");
			var cacheData = JSON.parse(request.responseText);
			var blogList = document.getElementById("bloglist");
			if(cacheData && cacheData.sources) {
				for (var i = 0; i < cacheData.sources.length; i++) {
					var blog = cacheData.sources[i];
					var linkElement = document.createElement("a");
					linkElement.setAttribute("href", blog.siteUrl);
					linkElement.innerText = blog.title;
					var textElement = document.createTextNode(" - post attualmente in Gazzetta: " + blog.articles.length);
					var blogElement = document.createElement("li");
					blogElement.appendChild(linkElement);
					blogElement.appendChild(textElement);
					blogList.appendChild(blogElement);
				}
			} else {
				displayError("Cache vuota o assente");
			}
		} else {
			displayError("Impossibile caricare la cache dei blog");
		}
	}

	request.send();
}

function displayError(error) {
	document.getElementById("error").innerHtml = "<p>" + error + "</p>";
}