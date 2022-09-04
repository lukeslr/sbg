const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors({credentials: true, origen: 'http:localhost:3000'}))
const port = 5000

app.use(express.static('public'))

const usuarioController = require('./controlller/usuarios/usuarioController')

const usuriosRoute = require('./routes/usuariosRoutes')

app.post('/usuarios/creat', usuriosRoute)
app.post('/usuarios/login', usuriosRoute)
app.get('/', usuriosRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})