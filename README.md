rutha-utils
===========

## Rutha Utilities for Rutha Dev Stack

Contains plug and play wrappers for nconf, winston and mongoose. Just that. No magic.

### RuthaUtils.Config

Uses [nconf](https://www.npmjs.org/package/nconf)

Call `utils.Config.get('key')` to read config attributes.

### RuthaUtils.Logger

Uses [winston](https://www.npmjs.org/package/winston)


### RuthaUtils.MongooseClient

An instantiated Mongoose client.

### How to use

#### Install from npm

`npm install rutha-utils`

#### Configure

From RuthaUtils, use any of these three features:

`createConfig` to get the `nconf` instance
`createLogger` to get the `winston` instance
`createModels` to get the `mongoose` models loaded up

##### Rutha stack HapiJS server example

```javascript
var Hapi = require('hapi');
var debug = require('debug')('api:main');
var RuthaUtils = require('rutha-utils');
 
// nconf config
var config = RuthaUtils.createConfig({
  path: {
    config: __dirname + '/../../config'
  }
});
 
// winston logger
var logger = RuthaUtils.createLogger({
  filename: config.get('logger:filename'),
  level: config.get('logger:level')
});
 
// mongoose client
var mongooseClient = RuthaUtils.createModels({
  client: 'mongoose',
  connectionString: config.get('mongodb:connectionString'),
  models: __dirname + '../../shared_models'
});
 
// Create a server with a host and port
var server = module.exports = Hapi.createServer(config.get('apiServer:host'), config.get('apiServer:port'));
 
// health check
server.route({
  method: 'GET',
  path: '/api/health',
  handler: function(req, reply) {
    reply('OK');
  }
});
 
// Dependencies
server.pack.app = {
  mongoose: mongooseClient,
  config: config,
  logger: logger
};
 
debug('Set mongoose, config, logger dependencies');
 
var controllers = [
  {
    plugin: require('lout'),
    options:
    {
      endpoint: '/api/docs'
    }
  },
  {
    plugin: require('../controllers/users/index'),
  }
];
 
  server.pack.register(controllers,
   {
     route: {
       prefix: '/api'
     }
   }, function() {
    if (!module.parent) {
      server.start(function () {
        console.log('Server started at port ' + server.info.port);
      });
    }
  });
```

### License
MIT

