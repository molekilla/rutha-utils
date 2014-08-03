var Mongoose = require('mongoose');
var inflection = require('inflection');
var _ = require('underscore');

function MongooseClient(options) {
  var connectionString = options.config.get('mongodb:connectionString');
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

  this.client = Mongoose;
  var schemas = require(options.modelsPath);
  _.each(schemas, function(schema, key) {
    Mongoose.model(key, schema, inflection.pluralize(key));
  });
}

module.exports = MongooseClient;
