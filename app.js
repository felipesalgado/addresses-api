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

app.listen(port, function()
{
  console.log("The API has started successfully on port "+port);
});
