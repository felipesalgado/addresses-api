var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var processor = require('./controllers/processor');
var logger = require('./controllers/logger');
var config = require('./config.json');
var Address = require('./models/address');
var app = express();

var port = config.SERVER_PORT;
mongoose.connect(config.DB_CONECTION);

app.use(bodyParser.json());

/*
* Endpoint in order to process an address,
* getting the cordinates and elevation through
* the processor module.
*/
app.post('/api/address', function(req, res)
{
  var _inputAddress = req.body.address;

  // Checks if in the body there is the address property,
  // Before to use the processor module.
  if(_inputAddress === undefined)
  {
    var _emptyAddress = "The address is required!";
    logger.log(_emptyAddress);
    res.status(400).json({ message: _emptyAddress });
  }
  else
  {
    logger.log("The processor has a new input address.");
    processor.start(_inputAddress,res);
  }
});

/*
* Endpoint in order to process list the stored addresses,
* @param id = place_id (string), *optional*
*/
app.get('/api/address/:id?', function(req, res)
{
  // If the user does not specify a number of records to list, the system
  // will show all of them.
  var _query = (req.params.id === undefined) ? {} : { id: req.params.id };

  // Getting the addresses from the database,
  // { _id:0, __v:0 } is for to exclude that fields of the result.
  Address.find(_query, { _id:0, __v:0 }, function(err, addresses)
  {
    if(err)
    {
      var _errorGetting = "Error getting addresses from database.";
      logger.log(_errorGetting);
      res.json(_errorGetting)
    }
    else
    {
      // If there is not addresses related to that id (place_id),
      // the system shows the proper answer.
      var _queryResult = (addresses.length === 0) ? { message: "There is not records related to that place id." } : addresses;
      logger.log("Query performed successfully.");
      res.json(_queryResult);
    }
  });
});

app.listen(port, function()
{
  console.log("The API has started successfully on port "+port);
});
