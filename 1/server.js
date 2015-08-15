var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('server-private-key.pem'),
  cert: fs.readFileSync('server-certificate.pem'),

  // This is necessary only if using the client certificate authentication.
  // Without this some clients don't bother sending certificates at all, some do
  requestCert: true,
 
  // Do we reject anyone who certs who haven't been signed by our recognised certificate authorities
  rejectUnauthorized: true,

  // This is necessary only if the client uses the self-signed certificate and you care about implicit authorization
  ca: [ fs.readFileSync('client-certificate.pem') ],

  
};
a="hello";
var server = tls.createServer(options, function(cleartextStream) {
console.log(a);
  //Show the certificate info as supplied by the client
  console.log(cleartextStream.getPeerCertificate());

  console.log('server connecteeed',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');
  cleartextStream.write("welcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
}); 
server.listen(1000, function() {
  console.log('server bound');
});