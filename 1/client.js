var tls = require('tls');
var fs = require('fs');
 
var options = {
  // These are necessary only if using the client certificate authentication (so yeah, you need them)
  key: fs.readFileSync('client-private-key.pem'),
  cert: fs.readFileSync('client-certificate.pem'),
 rejectUnauthorized: true,
 requestCert: true,

  // This is necessary only if the server uses the self-signed certificate
  ca: [ fs.readFileSync('server-certificate.pem') ],
  
};
 
var cleartextStream = tls.connect(1000,'server', options, function() {
  console.log(cleartextStream.getPeerCertificate());
  console.log('client connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(cleartextStream);
  
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
  console.log(data);
});
cleartextStream.on('end', function() {
  server.close();
});