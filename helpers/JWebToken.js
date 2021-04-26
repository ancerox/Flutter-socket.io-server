const jwt = require('jsonwebtoken');


const generateJWT = ( uid ) => {

return new Promise( ( resolve, reject ) => {
    const payload = { uid };

    jwt.sign(payload, process.env.JWT_KEY,{
        expiresIn: '24h'
    },(err,token)=>{

        if (err){
            //Tenemos un error con el token
            reject('no se pudo generar el tken')
        } else { 
            // tenemos el token
            resolve(token);
        }

    });
});


}
module.exports = {

    generateJWT

}

