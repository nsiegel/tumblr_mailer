var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.ejs","utf8");

var csvParse = function(csvFile) {
  var arrOfObj = [];
  var arr = csvFile.split('\n');
  arr = arr.slice(0, arr.length -1);
  var keys = arr.shift().split(',');
  arr.forEach(function(contact) {
    var obj = {};
    contact = contact.split(',');
    contact.forEach(function(item, i) {
      obj[keys[i]] = item;
    });
    arrOfObj.push(obj);
  });
  return arrOfObj;
};

var contactList = csvParse(csvFile);

contactList.forEach(function(contact) {
  var personalizedEmail = ejs.render(emailTemplate, contact);
  console.log(personalizedEmail);
});
