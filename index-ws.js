const express = require('express');
const httpServer = require('http').createServer();
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

httpServer.on('request', app);
httpServer.listen(PORT, () => { console.log('Server started at port 3000') });

/** Begin WebSockets */

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
    const numClients = wss.clients.size;
    console.log(`Clients connected: ${numClients}`);

    wss.broadcast(`Current visitors: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send('Welcome to my server!');
    }

    ws.on('close', function close() {
        wss.broadcast(`Current visitors: ${numClients}`);
        console.log('A client has disconnected');
    });
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
