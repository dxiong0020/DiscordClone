const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4} = require('uuid');

// socket.io
const io = require('socket.io')(server);
app.set('view engine', 'ejs');

// Peer-to-Peer
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

// use static files such as javascript and CSS
app.use(express.static('public'));

// use Peer-to-Peer
app.use('/peerjs', peerServer);

// Redirect to Discord room
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

// Discord Room
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

// Listen to socket 
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId); // connect socket to room
        socket.to(roomId).broadcast.emit('user-connected', userId); // Alert users that someone has joined the room
    })
})
server.listen(3030, (req, res) => {
    console.log("listening to port 3030");
});