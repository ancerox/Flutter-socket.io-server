const mongoose = require('mongoose');

const dbconnection = async () => {

try {

    await mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    console.log('Db Online');

   
    
} catch (error) {
    console.log(error);
    throw new Error('Error en el servidor')
}


}


module.exports = {

dbconnection

}