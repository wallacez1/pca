const express = require('express')
const mongoose = require('mongoose')

const app = express();

const dbConfig = require('./config/config')

mongoose.Promise = global.Promise;

//Conexão com o banco
mongoose.connect(dbConfig.dbStringConexao, {useNewUrlParser:true})

//Middleware com as rotas
const login = require('./routes/loginRoutes')

app.use('/api',login)

app.listen(3000, () =>{
    console.log('running on port 3000')
})