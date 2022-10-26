const { Router } = require('express');

const router = Router();

const apiDirecciones = require('./api/direcciones');
const apiUsuarios = require('./api/usuarios');
const apiAparcadores = require('./api/aparcadores');
const apiConductores = require('./api/conductores');

router.use('/direcciones', apiDirecciones);
router.use('/usuarios', apiUsuarios);
//router.use('/aparcadores', apiAparcadores);
//router.use('/conductores', apiConductores);

module.exports = router;
    