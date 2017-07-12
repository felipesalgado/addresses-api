var request = require('request');
var config = require('../config.json');

/*
* Module that requests the coordinates of an address to the google's API.
* @param address (string)
* @param resolve (object)
*/
module.exports =
{
  geocoding: function(address, resolve)
  {
    var options =
    {
      method: 'GET',
      url: config.GEO_API_URL,
      qs:
      {
         address: address,
         key: config.GEO_API_KEY
      },
      headers:
      {
         'cache-control': 'no-cache'
      }
    };

    request(options, function (error, response, body)
    {
      if (error) throw new Error(error);

      resolve(body);
    });
  }
};
