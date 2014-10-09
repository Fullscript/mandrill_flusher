Nightmare - Mandrill Flusher
================


This is Nightmare plugin for clearing out failed Mandrill webhooks. 

We currently have a problem where we get Mandrill webhooks fails, which build up and stop sending. 
These webhooks can be procuessed when we manually submit them using curl command, 
and the a file the Mandrill provides.

This plugin navigates the Mandrill webhooks, and downloads all the needed files and sends the curl command.


How to Run
----------
Make sure all packages are installed properly, and run the following commmand:

`node index.js 'username' 'password'`


Functions
---------

### .login(username, password)

Login to your account.

### .getWebHooks()

Grabs all the webhook url's and saves them in a webhooks array

### .collectWebHook()

Iterates over the collections of webhook urls and passes them off to .runWebHooks

### .runWebHooks(webhook)

Goes to a mandrill url and scraps the webpages for the mandrill request file, and writes to a file.
Then execs the curl command

### .giveUpHooks()

Closes all open webhook fails.

