const Joi =  require("joi")
const HttpStatus = require("http-status-codes")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const dbConfig = require('../config/config')
module.exports = {
    async criarUsuario(req,res){
        const schema = Joi.object().keys({
            nome: Joi.string(),
            idade: Joi.number(),
            usuario:Joi.string().required(),
            sexo:Joi.string(),
            email:Joi.string().email().required(),
            senha:Joi.string().min(5).required(),
            telefone:Joi.number()
        })

        const {error, value} = Joi.validate(req.body, schema);
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({error: error.details})
        }

        // Verificar se o email ja existe

        const emailUsuario = await Usuario.findOne({email: req.body.email.toLowerCase()});

        if(emailUsuario){
            return res.status(HttpStatus.CONFLICT).json({message: "Email já existe"})
        }
        
        // Verificar se o usuario ja existe ja existe
        const user = await Usuario.findOne({usuario: req.body.usuario.toLowerCase()})

        if(user){
            return res.status(HttpStatus.CONFLICT).json({error: "Usuário já existente"})
        }

        //Criando hash da senha
        return bcrypt.hash(req.body.senha, 10, (err,hash)=>{
            if(err){
                return res.status(HttpStatus.CONFLICT).json({message: "error ao encriptar a senha"})
            }
            //Criando Elemento para salvar
            const body = {
                usuario: req.body.usuario.toLowerCase(),
                email: req.body.email.toLowerCase(),
                senha: hash
            }
            // Salvando no banco
            Usuario.create(body).then(user =>{
                const token = jwt.sign({data:user}, dbConfig.secret)
                console.log(dbConfig.secret)
                res.status(HttpStatus.CREATED).json({message: "Usuário criado com sucesso",user,token})
            })
            res.cookie('auth',token)
            .catch(err => {
                console.log(err)
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json({ message: 'Error ao salvar' });
              });
        })
    }
}