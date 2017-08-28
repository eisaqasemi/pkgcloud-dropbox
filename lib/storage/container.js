var util = require('util'),
base  = require('pkgcloud').storage,
_ = require('lodash');

var Container = exports.Container = function Container(client, details) {
base.Container.call(this, client, details);
};

util.inherits(Container, base.Container);

Container.prototype._setProperties = function (details) {
  self = this;
  Object.getOwnPropertyNames(details).forEach(function(value){
    self[value]= details[value]
  })
};