exports.Client = require('./client').Client;
exports.Container = require('./container').Container;
exports.File  = require('./file').File;
module.exports.storage = module.exports;

exports.createClient = function (options) {
  return new exports.Client(options);
}
