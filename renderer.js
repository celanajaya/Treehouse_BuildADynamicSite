//Write a function that handles the reading of files and merge in the values.
   //read from a file and get a string
   //merge values into a string
var fs = require('fs');

var mergeValues = function(values, content) {
  for (var key in values) {
    content = content.replace("{{" + key + "}}", values[key]);
  }
  return content;
}

var view = function(templateName, values, response) {
  //read from the template file
  var fileContents = fs.readFileSync('./Views/' + templateName + '.html', {encoding: "utf8"}); 
  //Insert values into the content
   fileContents = mergeValues(values, fileContents);
  //Write out the response
   response.write(fileContents);
};
              
module.exports.view = view;