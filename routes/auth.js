// Path = api/singIn 



const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, reNewToken} = require('../controllers/auth');
const { campoValidator } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-JSWT');

const router = Router();



router.post('/new', [

    check('name', 'its not defined').not().isEmpty(),
    check('pass', 'its not defined').not().isEmpty(),
    check('email', 'its not defined').isEmail(),

    campoValidator
], crearUsuario);

router.post('/', [
    check('pass', 'its not defined').not().isEmpty(),
    check('email', 'its not defined').isEmail(),
    login
]);

router.get('/renew', validateJWT ,reNewToken);



module.exports = router;
