

const { response, json } = require('express');
const bcrypt  = require('bcryptjs')

const User = require('../models/user')
const { generateJWT } = require('../helpers/JWebToken')



const crearUsuario = async (req, res = response) => {

    
    const { email,pass, } = req.body;
    
    try {

        const emailexist = await User.findOne({email : email})
        
        if ( emailexist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este email ya existe'
            });
        }


        const user = new User(req.body);

        // Encryp Pass
        const salt = bcrypt.genSaltSync();

        user.pass = bcrypt.hashSync(pass,salt)

        // generate web Token

        const token = await generateJWT(user.id)



        await user.save();       
        
        res.json({
            ok: true,
             user,
             token
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mesg: 'Error por favor comuniquese con el admin'
        });
    }


    

}

const login = async (req,res = response) => {

try {

    const { email,pass } = req.body;

    const userDB = await User.findOne({email});
    if(!userDB){
        return res.status(400).json({
            ok: false,
            msg: ' no se pudo encontar el email '
        });
    }

    const validPass = bcrypt.compareSync(pass, userDB.pass);
    if (!validPass){
        return res.status(400).json({
            ok: false,
            msg: 'the pass is not valid'
        });
    }

    const token = await generateJWT(userDB.id);

    res.json({
        ok: true,
        userDB,
        token
    });



    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el admin'
        });

        
}
}


const reNewToken = async (req, res = response ) => {

    const uid = req.uid;

    const token = await generateJWT(uid);

    const user = await User.findById(uid);


    return res.json({
        ok: true,
        user,
        token
    });

};




module.exports = { 

    crearUsuario,
    login,
    reNewToken

} 