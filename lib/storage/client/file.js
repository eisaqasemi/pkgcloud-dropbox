var fs = require('fs');
var tmp = require('tmp');
var stream = require("stream");
var buffer = require("buffer");

function streamError(errStream, err, cb) {
    process.nextTick(function() {
      errStream.emit('error', err);
      cb && cb(null, err);
    });
    return errStream;
}
  
var writeStreamError = streamError.bind(null, new stream.Writable());
var readStreamError = streamError.bind(null, new stream.Readable());
  
exports.upload = function(options,cb){    
    var self = this;
    var remotePath = '/'+ options.container +'/'+ options.remote;
    try {
        var tmpName = tmp.tmpNameSync();
        var stream = fs.createWriteStream(tmpName);
        
        stream.on('finish', function () {
            fs.readFile(tmpName,function (err,data){
                if(err){
                    throw err
                }
                self.client.filesUpload({path:remotePath,contents:data}).
                then(function (response) {
                  console.log(response)
                    stream.emit('success');
                    fs.unlinkSync(tmpName);
                  }).catch(function (err) {
                    console.log(err)
                    throw err
                  });
            })
        });
        return stream;
      } catch (e) {
        return writeStreamError(e, cb);
      }
}

exports.download = function(options,cb){
    var self = this;
    var remotePath = '/'+options.container +'/'+ options.remote;
    try {
        var tmpName = tmp.tmpNameSync();
        stream = new stream.Readable({read:function(){}});
        
        self.client.filesDownload({path:remotePath}).then((response)=>{
          stream.unshift(buffer.Buffer.from(response.fileBinary,'binary'));
          fs.writeFileSync('fs version.png',response.fileBinary.toString(),'binary');
          stream.emit('end');
        })
        .catch(err=>{throw(err)})

        return stream;

      } catch (e) {
        return writeStreamError(e, cb);
      }
}

exports.getFiles = ()=>{}
exports.getFile = ()=>{}
exports.removeFile = ()=>{}