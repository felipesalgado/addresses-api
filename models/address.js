var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema(
{
  id: String,
  address: String,
  latitude: Number,
  longitude: Number,
  elevation: Number
});

module.exports = mongoose.model('Address', AddressSchema);
