var geoProcess = require('./geocoding');
var elvProcess = require('./elevation');
var logger = require('./logger');
var Address = require('../models/address');

/*
* Module that gets the coordinates and elevation asynchronously.
* @param inputAddress (string)
* @param res (object) in order to manage the user's request.
*/
module.exports =
{
  start: function(inputAddress, res)
  {
    // Getting the coordinates through the geocoding module (asynchronously).
    new Promise(function(resolve, reject)
    {
      logger.log("Geocoding Promise.");
      geoProcess.geocoding(inputAddress, resolve);
    })
    .then(function(geoAns)
    {
      // Parsing the body's answer in order to assign the correct content
      // to the variables.
      var _geoBody = JSON.parse(geoAns);
      var _id = _geoBody.results[0].place_id;
      var _address = _geoBody.results[0].formatted_address;
      var _lat = _geoBody.results[0].geometry.location.lat;
      var _lng = _geoBody.results[0].geometry.location.lng;

      // Checks if the Google's API answered in to continue
      // with the elevation process.
      if(_geoBody.status === 'OK')
      {
        // Getting the elevation through the elevation module (asynchronously).
        new Promise(function(resolve, reject)
        {
          logger.log("Elevation Promise.");
          elvProcess.elevation(_lat, _lng, resolve);
        })
        .then(function(elvAns)
        {
          // Parsing the body's answer in order to assign the correct content
          // to the variables.
          var _elvBody = JSON.parse(elvAns);
          var _elevation = _elvBody.results[0].elevation;
          var _result =
          {
             id: _id,
             address: _address,
             latitude: _lat,
             longitude: _lng,
             elevation: _elevation
           };

          logger.log("The process has finished, the place id is: "+_id);

          // Stores the result of the process in the database.
          Address.create(_result, function(err, address)
          {
            if(err)
            {
              var _errorSaving = "Error saving address in database.";
              logger.log(_errorSaving);
              res.json({ error: _errorSaving});
            }
            else
            {
              logger.log("Data stored successfully.");
              res.json(address);
            }
          });
        })
        .catch(function(err)
        {
          console.log(err);
          var _badCordinates = "Error!, please check the lat and lng cordinates and try again.";
          logger.log(_badCordinates);
          res.status(400).json({ message: _badCordinates });
        });
      }
      else
      {
        logger.log("Promise rejection.");
        reject();
      }
    })
    .catch(function(err)
    {
      var _badAddress = "Error!, please check the address and try again.";
      logger.log(_badAddress);
      res.status(400).json({ message: _badAddress });
    });
  }
};
