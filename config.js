var nconf = require('nconf');

var Config = function Config(path) {
  this.path = path;
};

Config.prototype.load = function(env) {
  env = env || 'development';
  nconf.argv().env();
  var environment = nconf.get('NODE_ENV') || env;
  var file = (this.path || 'config') + '/' + environment + '.json';
  
  nconf.use('file', { file: file });

  return this;
};

Config.prototype.get = function(key) {
  return nconf.get(key);
};

Config.prototype.isFeatureEnabled  = function(key) {
  
    if (!nconf.get('_featureToggles')) {
      throw new Error('Missing _featureToggles config section');
    }
    return !!nconf.get('_featureToggles:' + key);  
};

module.exports = Config;



