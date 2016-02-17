var http = require('http');
var createHandler = require('github-webhook-handler');
var handlerIO = createHandler({ path: '/io', secret: 'congyuandong' });
var handlerSelf = createHandler({ path: '/self', secret: 'congyuandong' });

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
 
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handlerIO(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  });
  handlerSelf(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  });
}).listen(7777)

handlerIO.on('error', function (err) {
  console.error('Error:', err.message);
})

handlerIO.on('push', function (event) {
  run_cmd('sh', ['./deploy-io.sh'], function(text){ console.log(text) });
})

handlerSelf.on('error', function (err) {
  console.error('Error:', err.message);
})

handlerSelf.on('push', function (event) {
  run_cmd('sh', ['./deploy-self.sh'], function(text){ console.log(text) });
})

