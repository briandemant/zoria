var ReactDOMServer = require('react-dom/server');
var React = require('react');
var express = require('express');

var path = require('path');
var fs = require('fs');
var purify = require('purify-css');

var pageRoot = path.normalize(path.join(__dirname, "..", "pages"))
var componentRoot = path.normalize(path.join(__dirname, "..", "components"))

var app = express();
// app.use(express.compress());
app.use(express.static('public',{maxAge:'30s'}));

function sendError(e, res) {
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

function renderAndSend(xxx, pageName, res) {
	var content = ReactDOMServer.renderToStaticMarkup(xxx);
	res.end(content);
	var options = {
		output : `./public/css/${pageName}.purified.css`,

		// Will minify CSS code in addition to purify.
		minify: true,

		// Logs out removed selectors.
		rejected : true
	};
	console.log(options.output);

	const cssSource = fs.readFileSync('./public/css/base.css', {encoding : 'utf8'});
	purify(content, cssSource, options);

 
	
}
app.get(/^\/([^/]+)?(?:\/(.+))?$/, function(req, res, next) {
	var pageName = req.params[0] || "index";
	var pagePath = path.join(pageRoot, pageName, pageName.charAt(0).toUpperCase() + pageName.slice(1) + "Page");

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
				renderAndSend(xxx, pageName, res);
			}).catch(function(err) {
				sendError(err, res)
			});
		} else {
			renderAndSend(pageContent, pageName, res);
		}
	} catch (e) {
		sendError(e, res);
	}
})

app.listen(5000, function() {
	console.log("server ready on " + 5000);
});
