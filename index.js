var config = require('./config'),
    MongooseClient = require('./mongoose_client'),
    logger = require('./logger');

function RuthaUtils() {
}

RuthaUtils.createConfig = function(options) {

  if (options && options.path && options.path.config) {
    return new config(options.path.config);
  } else {
    throw new Error('Missing options.path.config');
  }
};

RuthaUtils.createModels = function(options) {
  if (options && options.client && options.connectionString && options.models) {

    if (options.client === 'mongoose') {
      return new MongooseClient({
        connectionString: options.connectionString,
        modelsPath: options.models
      });
    } else {
      return new Error('Undefined options.client');
    }

  } else {
    throw new Error('Missing createModels options');
  }
};


RuthaUtils.createLogger = function(options) {
  if (options && options.filename) {

    return new logger({
     filename: options.filename,
     level: options.level,
     maxSize: options.maxSize,
     maxFiles: options.maxFiles
    });

  } else {
    throw new Error('Missing createLogger options');
  }
};

module.exports = RuthaUtils;

