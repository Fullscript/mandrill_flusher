var Nightmare = require('nightmare');


var username = 'XXXXXXXXXXXXXXXXXXXX';
var password = 'YYYYYYYYYYYYYYYYYYYY';

var html = new Nightmare()
  .goto('https://mandrillapp.com/login/')
    .type('#username', username)
    .type('#password', password)
    .click('.button-primary')
    .wait()
  .goto("https://mandrillapp.com/settings/webhooks")
    .click('p.stat > a')
    .wait()
      .evaluate(function (page) {
        return document.documentElement.innerHTML;
      }, function (res) {
        // console.log(res);

        //https://mandrillapp.com/settings/webhooks/curl-batch?id=3&batch=2014-10-07%2021:31:27.861136539
        var matches = res.match(new RegExp("(\/settings\/webhooks\/curl-batch\?[\w\d:;=\-\s\.&]+)\""));
        console.log(matches);
      }).
    run();
