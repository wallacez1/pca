const HttpStatus = require("http-status-codes")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
module.exports = {
    async login(req,res){
        
      if(!req.body.usuario || !req.body.senha){
          return res.status(HttpStatus.NOT_FOUND).json({error: "Campos em branco não são permitidos"})
      }

      await Usuario.findOne({usuario:req.body.usuario.toLowerCase()}).then(usuario =>{
          if(!usuario){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: "usuário não encontrado"})
          }

          return bcrypt.compare(req.body.senha, usuario.senha).then((resultado)=>{
              if(!resultado){
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: "senha incorreta"})
              }

              return res.status(HttpStatus.OK).json({message: "ok"})
          })
      }).catch(err => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err})
      })
    }
}