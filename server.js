const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(' a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnect');
    });


    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
    });



});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server listening into port :', PORT));