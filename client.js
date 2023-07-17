import FailSafeSocket from "./socket.js";

const client = new FailSafeSocket({port: 9838});


setInterval(() => {
    client.send(process.memoryUsage())
}, 1000);