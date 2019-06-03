module.exports ={
//dbStringConexao:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@pca-ullbn.mongodb.net/test`,
dbStringConexao:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@leandro-alencar-1vk7b.mongodb.net/test?retryWrites=true&w=majority`,
secret: 'segredoJwt'
}