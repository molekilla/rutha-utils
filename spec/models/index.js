var requireDirectory = require('require-directory');
var inflection = require('inflection');


function Capitalize(name) {
  return inflection.capitalize(name);
}

module.exports = requireDirectory(module, __dirname, {
  rename: Capitalize
});
