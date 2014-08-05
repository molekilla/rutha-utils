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
    options.logger.info('Mongoose connected to ' + connectionString);
  });

  Mongoose.connection.on('error', function(err) {
    options.logger.error('Mongoose connection error:' + err);
  });

  Mongoose.connection.on('disconnected', function() {
    options.logger.info('Mongoose disconnected');
  });

  process.on('SIGINT', function() {
    Mongoose.connection.close(function() {
      options.logger.info('Mongoose disconnected through appp termination');
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
