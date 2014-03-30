var net = require('net');

var emit = net.Socket.prototype.emit;
var conn = net.Socket.prototype.connect;

net.Socket.prototype.connect = function(opts) {
	this.__debug__ = opts;
	return conn.apply(this, arguments);
};

net.Socket.prototype.emit = function(name) {
	if (name === 'error' && this.__debug__) {
		var err = arguments[1];
		var n = arguments[1] = new Error(err.message+' ('+(this.__debug__.host || '127.0.0.1') +':'+this.__debug__.port+')');
		n.errno = err.errno;
		n.code = err.code;
	}
	return emit.apply(this, arguments);
};

exports.disable = function() {
	net.Socket.prototype.connect = conn;
	net.Socket.prototype.emit = emit;
};