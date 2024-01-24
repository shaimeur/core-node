const http = require("http");
const fs = require("fs");
const url = require("url");
const slugify = require("slugify");

const port = 8000;

const replaceTemplate = require("./utiles/replaceTemplate");

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/fs/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);
console.log(typeof dataObj);
const slugs = dataObj.map((item) => slugify(item.productName, { lower: true }));
console.log(slugs);
console.log(slugify("Fresh Avocado", { lower: true }));

const server = http.createServer();

server.on("request", (req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// OVERVIEW PAGE :

	if (pathname === "/" || pathname === "/overview") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});

		const cardHtml = dataObj.map((item) => replaceTemplate(tempCard, item)).join("");
		console.log(cardHtml);
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
		res.end(output);
	}
	// Product Page
	else if (pathname === "/product") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		const product = dataObj[query.id];

		const output = replaceTemplate(tempProduct, product);

		// console.log(query)

		res.end(output);
	}
	// API
	else if (pathname === "/api") {
		//  fs.readFile("./starters/fs-starter/dev-data/data.json",'utf-8',(err,data)=>{
		//     if(err){
		//         res.end("errror!!")
		//     }
		//      const productData =  JSON.parse(data)
		res.writeHead(200, {
			"Content-type": "application/json",
		});
		res.end(data);
	}
	// Not Found
	else {
		res.writeHead(404, {
			"Content-type": "text/html",
		});
		res.end("<h1>Page not found</h1>");
	}
});

server.listen(port, "127.0.0.1", () => {
	console.log(`server listen on port :${port}`);
});
