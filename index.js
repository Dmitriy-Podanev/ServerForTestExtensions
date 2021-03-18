const app = require('express')();
const http = require('http').Server(app);



const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {

    console.log('connected: ' + socket.id);
    socket.on('chat message',(msg)=>{
        console.log("message: " + msg)});

    socket.on('disconnect', () => {
        console.log('disconnected: '+ socket.id);
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});