const { io } = require('../index');


// mensajes de sockets
io.on('connection', client => {

    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('el mensaje resivido fue', payload );
    });

    client.emit('presentacion', {presentacion: 'Hola mundo mi nombre es winston f'});


});