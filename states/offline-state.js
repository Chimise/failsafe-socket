import net from 'node:net';
import JsonSocket from 'json-socket';

class OfflineState {
    constructor(failSafeSocket) {
        this.failSafeSocket = failSafeSocket;
    }

    send(data) {
        this.failSafeSocket.queue.push(data);
    }

    activate() {
        const retry = () => {
            setTimeout(() => this.activate(), 1000)
        }
        this.failSafeSocket.socket = new net.Socket();
        this.failSafeSocket.jsonSocket = new JsonSocket(this.failSafeSocket.socket);

        this.failSafeSocket.jsonSocket.connect(this.failSafeSocket.options.port, this.failSafeSocket.options.host || 'localhost');

        this.failSafeSocket.jsonSocket.on('connect', () => {
            console.log('Connection established');
            this.failSafeSocket.socket.removeListener('error', retry);
            this.failSafeSocket.changeState('online');
            
        })

        this.failSafeSocket.socket.once('error', retry);
    }
}

export default OfflineState;