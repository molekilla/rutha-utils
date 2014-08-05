rutha-utils
===========

## Rutha Utilities for Rutha Dev Stack

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

Simply define the config folder path containing your config files and for mongoose models, where the models folder is. For now copy/paste the models/index.js until we are able to create a better feature (e.g. rutha-mongoose)

```javascript
var RuthaUtils = require('rutha-utils');

var utils = new RuthaUtils.create({
      path: {
        config: __dirname + '/config',
        models: __dirname + '/models'
      }
    });

// adding to Hapi as pack app vars
server.pack.app = {
  models: utils.MongooseClient.models,
  config: utils.Config,
  logger: utils.Logger
};
```

### License
MIT

