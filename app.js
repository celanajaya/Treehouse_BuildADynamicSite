var router = require("./router.js");
//Problem: Need a simple way to view a user's badge count and JavaScript points
//Solution: Use Node.js to perform the profile look ups and serve our templates via http.

//Create a web server
var http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000);
console.log('Server running at http://<workspace-url>/');




