const express = require('express')
const mongoose = require('mongoose')

const app = express();

const dbConfig = require('./config/config')

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.dbStringConexao, {useNewUrlParser:true})

app.listen(3000, () =>{
    console.log('running on port 3000')
})