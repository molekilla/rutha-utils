rutha-utils
===========

## Rutha Utilities for Rutha Dev Stack

### RuthaUtils.Config

Uses winston

### RuthaUtils.Logger

Uses nconf

### RuthaUtils.MongooseClient

An instantiated Mongoose client. 


### How to use

Simply define the config folder path containing your config files and for mongoose models, where the models folder is. For now copy/paste the models/index.js until we are able to create a better feature (e.g. rutha-mongoose)

```javascript
var RuthaUtils = require('rutha-utils');

var utils = new RuthaUtils.create({
      path: {
        config: __dirname + '/config',
        models: __dirname + '/models'
      }
    });
```

### License
MIT

