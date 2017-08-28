var util  = require('util'),
base  = base  = require('pkgcloud').storage,
_ = require('lodash');

var File = exports.File = function File(client, details) {
base.File.call(this, client, details);
};

util.inherits(File, base.File);

File.prototype._setProperties = function (details) {
  self = this;
  Object.getOwnPropertyNames(details).forEach(function(value){
    self[value]= details[value]
  })
};
