// Create By: @patvice & @uri
// Takes to arguments, first is the username and second is the password


var Nightmare = require('nightmare');
var mandrill = require('./mandrill-webhooks.js');

var username = process.argv[2];
var password = process.argv[3];


var mandrill = new Nightmare()
  .use( mandrill.login(username, password) )
  .use( mandrill.getWebHooks() )
  //mandrill.webhooks is an array with all the webhooks links
  .use( mandrill.collectWebHook( mandrill.webhooks) )
  .run()
