var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");

var csvParse = function(csvFile) {
  var arrOfObj = [];
  var arr = csvFile.split('\n');
  arr = arr.slice(0, arr.length -1);
  var keys = arr.shift().split(',');
  for (var i = 0; i < arr.length; i++) {
    var obj = {};
    var contact = arr[i].split(',');
    for (var j = 0; j < contact.length; j++) {
      obj[keys[j]] = contact[j];
    }
    arrOfObj.push(obj);
  };
  return arrOfObj;
};

console.log(csvParse(csvFile));
