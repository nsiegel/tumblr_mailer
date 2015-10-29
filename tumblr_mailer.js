var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: '7tFQ92LU9LOWOsFlYnMGIfsFL081u0tgylZmcZAgPHuDvH4R9W',
  consumer_secret: 'bsuIYK09nkfZM5CTkOI1Corv8y9e2GJgi4Ii1s54HOUj4bl3js',
  token: 'NKJOeAFavDFTLcmsAsgXdg0zcwOB6Ce2u1cqFAdXCxPUFqVUSo',
  token_secret: 'bWVzR5ynKzHSS3xrnbA6PFUB1sDqtvnwMu8NaVm1TWUFwr18dM'
});
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('_WnZAdD2hNeJowZDTiRb8g');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.ejs","utf8");

var week = 604800; //seconds in a week
var now = Date.now() / 1000; // current date in seconds

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

client.posts('nsiegel2.tumblr.com', function(err, blog){
  var latestPosts = blog.posts.filter(function(post) {
    if (post.timestamp > now - week) {
      return true;
    } else {
      return false;
    }
  });

  contactList.forEach(function(contact) {
    contact.latestPosts = latestPosts;
    var personalizedEmail = ejs.render(emailTemplate, contact);
    sendEmail(contact.firstName, contact.emailAddress, 'Nicole', 'nsiegel2@gmail.com',
    'Hello!', personalizedEmail);
  });
});

function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
 }
