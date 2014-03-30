var netDebug = require('net-debug');
var net = require('net');
var tape = require('tape');

tape('error.message host:port', function(t) {
	var socket = net.connect(42242);
	socket.on('error', function(err) {
		t.same(err.message, 'connect ECONNREFUSED (127.0.0.1:42242)');
		t.end();
	});
});

tape('tls error.message host:port', function(t) {
	var socket = require('tls').connect(42242);
	socket.on('error', function(err) {
		t.same(err.message, 'connect ECONNREFUSED (127.0.0.1:42242)');
		t.end();
	});
});

tape('netDebug.disable()', function(t) {
	var socket = net.connect(42242);
	netDebug.disable();
	socket.on('error', function(err) {
		t.same(err.message, 'connect ECONNREFUSED');
		t.end();
	});
});
