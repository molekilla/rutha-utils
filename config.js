var nconf = require('nconf');

var Config = function Config(path) {
  nconf.argv().env('_');
  var environment = nconf.get('NODE_ENV') || 'development';
  var file = (path || 'config') + '/' + environment + '.json';
  nconf.file(environment, file);
};

Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = Config;



