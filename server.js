import net from 'node:net';
import JsonSocket from 'json-socket';

const port = 9838;
const server = net.createServer();


server.on('connection', function(socket) {
    socket = new JsonSocket(socket);
    
    socket.on('message', function(message) {
        console.log('Client data', message);
    });

});

server.listen(port, () => {
    console.log('Server running on %d', port);
});