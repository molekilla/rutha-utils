var Mongoose = require('mongoose');
var _ = require('underscore');

function MongooseClient(options) {
  var self = this;
  var fs = require('fs'),
      modelPath = options.modelsPath,
      connectionString = options.connectionString;

  console.log(connectionString);
  Mongoose.connect(connectionString);

  Mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + connectionString);
  });

  Mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error:' + err);
  });

  Mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', function() {
    Mongoose.connection.close(function() {
      console.log('Mongoose disconnected through appp termination');
      process.exit(0);
    });
  });


  fs.readdirSync(modelPath).forEach(function(key) {
    var schema = require(modelPath + '/' + key);
    schema(Mongoose);
  });

  this.client = Mongoose;
}

module.exports = MongooseClient;
