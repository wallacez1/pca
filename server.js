const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;

require('dotenv').config()

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));

const dbConfig = require('./config/config')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

//Conexão com o banco
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.dbStringConexao, {
    useNewUrlParser: true
})
// mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
    console.log('db.error', err);
});
mongoose.connection.on('connected', () => {
    console.log('db.ready');
});


//Middleware com as rotas
require('./controllers/authcontroller')(app);
require('./controllers/loginController')(app);
// const login = require('./routes/loginRoutes')

const posts = require('./routes/postRoutes')
const search = require('./routes/searchRoutes')
const qualify = require('./routes/qualifyRoutes');

app.use('/api', posts)
app.use('/api', search)
app.use('/api', qualify)

app.listen(PORT, () => {
    console.log('running on port ' + PORT)
})