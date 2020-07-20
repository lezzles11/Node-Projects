const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  js: "text/javascript",
  css: "text/css",
};

const server = http.createServer((req, res) => {
  var uri = url.parse(req.url).pathname;
  var fileName = path.join(process.cwd(), unescape(uri));
  console.log("Loading: " + uri);
  var stats;
  try {
    stats = fs.lstatSync(fileName);
  } catch (e) {
    // if it doesn't find the file, then it will throw a 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.writeHead("404 Not found\n");
    res.end();
    return;
  }
  if (stats.isFile()) {
    // Getting the extension of the file
    var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
    res.writeHead(200, { "Content-type": mimeType });
    // Create a read stream (reading the file name)
    var fileStream = fs.createReadStream(fileName);
    //
    fileStream.pipe(res);
    // If it is a directory
  } else if (stats.isDirectory()) {
    // Then send 302, redirection, and location will be index.html 
    res.writeHead(302, {
      Location: "index.html",
    });
    res.end();
  } else {
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("500 Internal Error\n");
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
