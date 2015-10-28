var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.html","utf8");

var csvParse = function(csvFile) {
  var arrOfObj = [];
  var arr = csvFile.split('\n');
  arr = arr.slice(0, arr.length -1);
  var keys = arr.shift().split(',');
  arr.forEach(function(contact) {
    var obj = {};
    contact = contact.split(',');
    for (var i = 0; i < contact.length; i++) {
      obj[keys[i]] = contact[i];
    }
    arrOfObj.push(obj);
  });
  return arrOfObj;
};

console.log(csvParse(csvFile));
