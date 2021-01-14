const { readFileSync } = require('fs')
const https = require('https');
const WebSocketServer = require('ws').Server;

const server = https.createServer({
  key: readFileSync('localhost+4-key.pem'),
  cert: readFileSync('localhost+4.pem')
})

const wsServer = new WebSocketServer({ server });

wsServer.on('connection', function(ws) {
    console.log('-- websocket connected --');
    ws.on('message', function(message) {
        wsServer.clients.forEach(function each(client) {
            if (isSame(ws, client)) {
                console.log('- skip sender -');
            }
            else {
                client.send(message);
            }
        });
    });
});

function isSame(ws1, ws2) {
    // -- compare object --
    return (ws1 === ws2);
}

const port = 3001;
server.listen(port);

console.log('websocket server start. port=' + port);
