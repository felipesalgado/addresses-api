var fs = require('fs');
var moment = require('moment');

/*
* Module that logs an input message with the proper time.
* @param message (string)
*/
module.exports =
{
  log: function(message)
  {
    fs.appendFile('transactions.log', moment().format('YYYY-MM-DD HH:mm:ss')+" - "+message, function(err)
    {
      if(err){ console.log(err); }
    });
  }
};
