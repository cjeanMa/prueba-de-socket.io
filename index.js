var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('Servidor corriendo en http://localhost:3000');
});

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/admin.html');
});

io.on('connect', function (socket) {
    console.log('Un cliente se ha conectado');

    socket.on('client-admin-m2', data => {
        console.log(data);
        io.emit('server-m2', data);
    });

    socket.on('client-admin-m1', data => {
        console.log(data);
        io.emit('server-m1', data);
    });

    socket.on('client-admin-m3', data => {
        console.log(data);
        io.emit('server-m3', data);
    })


})

