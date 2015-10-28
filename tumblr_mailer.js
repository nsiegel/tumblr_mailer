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

var contactList = csvParse(csvFile);

contactList.forEach(function(contact) {
  var personalizeEmail = emailTemplate.replace(/FIRST_NAME/g, contact.firstName);
  personalizeEmail= personalizeEmail.replace(/NUM_MONTHS_SINCE_CONTACT/g, contact.numMonthsSinceContact);
  console.log(personalizeEmail);
});
