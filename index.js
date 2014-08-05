var config = require('./config'),
    mongooseClient = require('./mongoose_client'),
    logger = require('./logger');


exports.create = function(options) {
  if (options && options.path && options.path.config && options.path.models) {
    // Create config, logger and mongoose client
    var Config = new config(options.path);
    var Logger = new logger({
     config: Config
    });

    var MongooseClient = new mongooseClient({
      logger: Logger,
      connectionString: Config.get('mongodb:connectionString'),
      modelsPath: options.path.models
    });

    return {
      Config: Config,
      Logger: Logger,
      MongooseClient: MongooseClient.client
    };
  } else {
    throw new Error('Missing options.path');
  }
};
