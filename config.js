var nconf = require('nconf');

function Config(options) {
  options = options || {};
  nconf.argv().env('_');
  var environment = nconf.get('NODE_ENV') || 'development';
  var file = (options.config || 'config') + '/' + environment + '.json';
  nconf.file(environment, file);
}

module.exports = Config;

Config.prototype.get = function(key) {
  return nconf.get(key);
};




