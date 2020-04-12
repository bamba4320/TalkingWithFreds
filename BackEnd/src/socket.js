const socketServer = require('socket.io')();
const port = 4321;


// connection
socketServer.on('connection',(client)=>{
    client.on('subscribeToMessageSent')
});



// start socket server
socketServer.listen(port);
console.log('Socket server is ready and listening at port 4321');
