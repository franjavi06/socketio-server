const path = require('path');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Start the Server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})

//Websockets
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })    

})