var dbox  = require("dropbox");
var util = require("util");
var file = require("./file");
var container = require("./container");
var _ = require("lodash")

var Client = exports.Client = DboxClient;

function DboxClient(options) {
  console.log(options)
  this.client = new dbox({ accessToken: options.access_token }); 
  _.extend(this,file)
  _.extend(this,container) 
  return this;
};