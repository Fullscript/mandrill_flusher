//Create By: @patvice & @uri

var exec = require('child_process').exec;
var fs = require ('fs');

var webhooks = exports.webhooks = [];

var login = exports.login = function(username, password) {
  return function (nightmare) {
    nightmare
    .viewport(800, 1600)
    .goto('https://mandrillapp.com/login/')
      .type('#username', username)
      .type('#password', password)
      .click('.button-primary')
    .wait()
  };
};

var collectWebHook = exports.collectWebHook = function () {
  return function (nightmare) {
    if (webhooks.length == 0)
      return
    webhooks.forEach(function (webhook, index){
      nightmare
        .use(runWebHook(webhook, index))
    })
  };
};

var getWebHooks = exports.getWebHooks = function () {
  return function(nightmare) {
    nightmare
      .goto("https://mandrillapp.com/settings/webhooks")
      .click('p.stat > a')
      .wait()
      .evaluate(function (page) {
        return document.documentElement.innerHTML;
      }, function (res) {
        rgEx = /(\/settings\/webhooks\/curl-batch\?[\w\d:;=\-\s\.&]+)/g;
        var matches = res.match(rgEx);

        matches.forEach(function (match, index, array) {
          var temp = match.replace(" ", "%20");
          temp = temp.replace("&amp;", "&")
          webhooks.push(temp);
        });
        console.log('\nFound all Webhooks urls')
      });
  };
};

var runWebHook = exports.runWebHooks = function (webhook, index) {
  return function (nightmare) {
    nightmare
      .goto('https://mandrillapp.com'+webhook)
      .wait()
      .evaluate(function (page) {
        return document.querySelector('pre > code');
      }, function (res) {

        fs.openSync('mandrill-webhook.txt', 'w')
        fs.writeFile('mandrill-webhook.txt', res.innerHTML, function (err) {
          if(err){
            console.log(err);
          }
        });

      })
      .evaluate (function (page) {
        return document.documentElement.innerHTML;
      }, function (res) {
        console.log('Clean webhook #'+(index+1)+"\n--------------------------------\n")
        rgExCurl = /(curl .*\')/;
        var curl = res.match(rgExCurl);
        exec(curl, function (err, stdout, stderr) {
          console.log('\n' + stdout)
          console.log('\n'+ stderr)
          if (err !== null){
            console.log('exec err: ' + err);
          }
        });
      })
  };
};

var giveUpHooks = exports.giveUpHooks = function (){
  return function (nightmare) {
    if(webhooks.length == 0)
      return
    webhooks.forEach(function (){
      nightmare
        .goto("https://mandrillapp.com/settings/webhooks/batches?id=3")
        .click('td > a.btn.btn-small.btn-danger')
        .wait()
    })
  };
};
