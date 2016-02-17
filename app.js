var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: 'congyuandong' });

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
 
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  });
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message);
})

handler.on('push', function (event) {
  console.log(event.payload);
  run_cmd('sh', ['./deploy-io.sh'], function(text){ console.log(text) });
})