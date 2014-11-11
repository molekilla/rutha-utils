var config = require('./config'),
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

