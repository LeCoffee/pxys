var socks = require('socksv5');
var request = require('request');

var srv = socks.createServer(function(info, accept, deny) {
	accept();
});

srv.listen(1080, '0.0.0.0', function() {
  console.log('SOCKS server listening on port 1080');
});

srv.useAuth(socks.auth.UserPassword(function(user, password, cb) {
	request('http://pm.lecoffee.me/new?u=' + user + "&p=" + password, function(err, res, body) {
		return cb(body === 'OK');
	});
}));