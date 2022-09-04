const express = require('express')
const router = express.Router()

const usuarioController = require('../controlller/usuarios/usuarioController')

router.post('/usuarios/creat', usuarioController.criarUsuario)
router.post('/usuarios/login', usuarioController.login)

router.get('/', (req, res)=>{
    res.send("Home")
})


module.exports = router