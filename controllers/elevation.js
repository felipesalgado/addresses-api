var request = require('request');
var config = require('../config.json');

/*
* Module that requests the elevation of an address to the google's API.
* @param lat (float)
* @param lng (float)
* @param resolve (object)
*/
module.exports =
{
  elevation: function(lat, lng, resolve)
  {
    var options =
    {
      method: 'GET',
      url: config.ELV_API_URL,
      qs:
      {
        locations: lat+','+lng,
        key: config.ELV_API_KEY
      },
      headers:
      {
        'cache-control': 'no-cache'
      }
    };

    request(options, function (error, response, body)
    {
      if (error) throw new Error(error);

      resolve(body)
    });
  }
};
