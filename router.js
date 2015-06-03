var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var commonHeader = {'content-Type': 'text/html'};
var querystring = require("querystring");

//Handle HTTP route GET / and POST / i.e. home
var home = function(request, response) {
  //if the url = "/" && GET
  if (request.url === "/") {
    if (request.method.toLowerCase() === "get") {
      //show search
      response.writeHead(200, commonHeader);
      renderer.view("header",{}, response);
      renderer.view("search",{}, response);
      renderer.view("footer",{}, response);
      response.end();
    } else {
      //get post data from body, get the username and redirect
      request.on("data", function(postBody) {
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {"Location":"/" + query.username});
        response.end();
      });
    };
  };
};

 

//Handle HTTP route GET /: username i.e. /chalkers
var user = function(request, response) {
   //if url === "/..."
  var username = request.url.replace("/","");
  if (username.length > 0) {
    
    //header
    response.writeHead(200, commonHeader);    
    renderer.view("header",{}, response);
    
    //get JSON from Treehouse
    var studentProfile = new Profile(username); 
     
    //on "end"
    studentProfile.on('end', function(profileJSON) {
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badgeCount: profileJSON.badges.length,
        JavaScriptPoints: profileJSON.points.JavaScript
      };
     renderer.view("profile", values, response);
     renderer.view('footer', {}, response);
     response.end();
    });
  
    //on "error"
    studentProfile.on('error', function(error) {
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view("search",{}, response);
      renderer.view("footer",{}, response);
      response.end();
    });
  } 
};

module.exports.home = home;
module.exports.user = user;