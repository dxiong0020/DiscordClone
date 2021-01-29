const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4} = require('uuid');

app.set('view engine', 'ejs');

// use static files such as javascript and CSS
app.use(express.static('public'));

// Redirect 
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

// Discord Room
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})


server.listen(3000, (req, res) => {
    console.log("listening to port 3000");
});