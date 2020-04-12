const socketServer = require('socket.io')();
const port = 4321;

// start socket server
socketServer.listen(port);
console.log('Socket server is ready and listening at port 4321');
