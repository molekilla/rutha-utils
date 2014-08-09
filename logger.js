var winston = require('winston');

function Logger(options) {
 var opts = {
    filename: options.filename,
    maxSize: options.maxSize || 1048576,
    maxFiles: options.maxFiles || 1,
    level: options.level || 'silly'
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
