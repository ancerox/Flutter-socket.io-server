
const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addNewBand( new Band ( 'Boehmia Rapsody' ) );
bands.addNewBand( new Band ( 'Metalica' ) );
bands.addNewBand( new Band ( 'Mago de oz' ) );
bands.addNewBand( new Band ( 'Imagine Dragons' ) );

// console.log(bands);

// mensajes de sockets
io.on('connection', client => {

    console.log('cliente conectado');

    // client.emit('active-bands', bands.getBands())

   

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    // client.on('mensaje', (payload) => {
    //     console.log('el mensaje resivido fue', payload );
    // });

    // client.emit('presentacion',  'Hola mundo mi nombre es winston f');

    
    // client.on('em', (payload)=> {
    //     console.log(payload);
    //     console.log(num);
    // });

});

