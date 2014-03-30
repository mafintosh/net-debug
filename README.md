# net-debug

Debug ECONNRESET and friends by adding host:port to the stack trace

	npm install net-debug

## Usage

Simply require `net-debug` in the top of program

``` js
var netDebug = require('net-debug');

var net = require('net');
var socket = net.connect(42424);
```

The above program should fail with the error message

```
Error: connect ECONNREFUSED (127.0.0.1:42424)
```

`net-debug` works by monkey patching `emit` on tcp sockets and intercepting error events and adding the host and port to the message.
Performance impact should be very minimal.

If (for some reason) you want to disable the debug on runtime call `netDebug.disable()`

## License

MIT