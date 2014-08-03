var winston = require('winston');

function Logger(options) {
 var opts = {
    filename: options.config.get('logger:filename'),
    maxSize: 1048576,
    maxFiles: 1,
    level: options.config.get('logger:level')
 };

 try {
   return winston.add(winston.transports.File, opts);
 }
 catch (e) {
   if (e.toString().indexOf('Transport already attached'))  {
    return winston
            .remove(winston.transports.File, opts)
            .add(winston.transports.File, opts);
   } else {
    throw e;
   }

 }
}

module.exports = Logger;
