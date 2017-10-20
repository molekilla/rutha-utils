rutha-utils
===========

## Rutha Utilities for Rutha Dev Stack

Contains plug and play wrappers for nconf, winston and mongoose. Just that. No magic.

### RuthaUtils.Config

Uses [nconf](https://www.npmjs.org/package/nconf)

Call `utils.Config.get('key')` to read config attributes.

### RuthaUtils config feature toggles

#### config.isFeatureEnabled(key)

Where key is defined in a _featureToggles section

### RuthaUtils.Logger

Uses [winston](https://www.npmjs.org/package/winston)


### How to use

#### Install from npm

`npm install rutha-utils`

#### Configure

From RuthaUtils, use any of these three features:

`createConfig` to get the `nconf` instance. To load an environment, call `config.load()` or `config.load(env)`
`createLogger` to get the `winston` instance

#### Mongoose Utils
Add require `require('rutha-utils/mongoose')`.

* `bindEvents(mongooseClient)` to display mongoose events
* `bindModels(opts{mongooseClient, modelsPath})` to bind models

##### Rutha stack HapiJS server example

```javascript
var Hapi = require('hapi');
var debug = require('debug')('api:main');
var RuthaUtils = require('rutha-utils');
var MongooseHandler = require('rutha-utils/mongoose');

// nconf config
var config = RuthaUtils.createConfig({
  path: {
    config: __dirname + '/../../config'
  }
}).load();
 
// winston logger
var logger = RuthaUtils.createLogger({
  filename: config.get('logger:filename'),
  level: config.get('logger:level')
});
 
// Instantiate Mongoose
var mongooseClient = Mongoose.connect(config.get('mongodb:connectionString'));

// Bind events
MongooseHandler.bindEvents(mongooseClient);

// Bind models
MongooseHandler.bindModels({
    mongoose: mongooseClient,
    modelsPath: __dirname + '/../models'
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
 
debug('Set config and logger dependencies');
 
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

### Changelog

* 1.1.0: added feature toggles
* 1.0.0: Fixed config environment issue, use load. Deprecated Mongoose Client, use new Mongoose utils


### License
MIT

