var ReactDOMServer = require('react-dom/server');
var React = require('react');
var express = require('express');

var path = require('path');

var pageRoot = path.normalize(path.join(__dirname, "..", "pages"))
var componentRoot = path.normalize(path.join(__dirname, "..", "components"))

var app = express();
app.use(express.static('public'));

app.get(/^\/([^/]+)?(?:\/(.+))?$/, function(req, res, next) {
	var page = req.params[0] || "index";
	var pagePath = path.join(pageRoot, page, page.charAt(0).toUpperCase() + page.slice(1) + "Page");

	res.set("Content-Type", "text/html; charset=utf-8");

	// console.log(require.cache); 
	if (process.env.NODE_ENV === 'development') {
		Object.keys(require.cache).forEach(function(file) {
			if (file.indexOf(pageRoot) > -1) {
				delete require.cache[file];
			} else if (file.indexOf(componentRoot) > -1) {
				delete require.cache[file];
			}
		})
	}

	try {
		var page = require(pagePath);

		var pathElements = req.params[1] ? req.params[1].split(/\//) : [];

		const pageContent = page(req.query, pathElements, req, res);

		if (pageContent.then) {
			pageContent.then(function(xxx) {
				var content = ReactDOMServer.renderToStaticMarkup(xxx);
				res.end(content);
			})
		} else {
			var content = ReactDOMServer.renderToStaticMarkup(pageContent);
			res.end(content);
		}
	} catch (e) {
		console.log(e);
		res.end(`<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<title>Fail!</title>
			</head>
			<body>
				${e}
			</body>
		</html>
		`);
	}
})

app.listen(5000, function() {
	console.log("server ready on " + 5000);
});
