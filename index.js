const express = require('express');
const path = require('path');
require('dotenv').config();


// app de express
const app = express();

// call mongo

require('./database/config').dbconnection();


// lectura del body

app.use(express.json());


// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');



// path publico 
const publicPath = path.resolve(__dirname , 'public');
app.use(express.static(publicPath));



// rustas 

app.use('/api/login', require('./routes/auth'));



//serve
server.listen(process.env.PORT, (err) => {

    if (err) throw Error(err);

console.log('coriendo en puerto', process.env.PORT);
});