const Joi = require('joi')
const ProdutoOnlineModel = require('../models/produtoOnline')
const ProdutoFisicoModel = require('../models/produtoFisico')
const ServicoModel = require('../models/produtoFisico')

module.exports = {
    AddPost(req, res) {
        const tipo = req.query.tipo
        const data = req.body;

        if (tipo === 'pf') {

            const schemaProdutoFisico = Joi.object().keys({

                email: Joi.string().email().required(),
                valor: Joi.number().required(),
                nomeProduto: Joi.string().required(),
                tipoProduto: Joi.string().required(),
                imagePath: Joi.string().required(),
                nomeEstabelecimento: Joi.string().required()
            });

            Joi.validate(data, schemaProdutoFisico, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid request data',
                        data: data
                    });
                } else {
                    res.json({
                        status: 'success',
                        message: 'Produto inserido com sucesso',
                    });
                }

            });

            const body = {
                email: req.body.email,
                valor: req.body.valor,
                nomeProduto: req.body.nomeProduto,
                tipoProduto: req.body.tipoProduto,
                imagePath: req.body.imagePath,
                estabelecimentoProduto: req.body.nomeEstabelecimento,
            }

            ProdutoFisicoModel.create(body).then(user => {
                res.status(HttpStatus.CREATED).json({
                    message: "Usuário criado com sucesso",
                    user,
                    token
                })
            })

        }



        if (tipo === 'po') {

            const data = req.body;

            // define the validation schema
            const schemaProdutoOnline = Joi.object().keys({

                email: Joi.string().required(),
                valor: Joi.number().required(),
                nomeProduto: Joi.string().required(),
                tipoProduto: Joi.string().required(),
                url: Joi.string().required()


            });


            Joi.validate(data, schemaProdutoOnline, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid request data',
                        data: data
                    });
                } else {
                    res.json({
                        status: 'success',
                        message: 'Produto inserido com sucesso',
                    });
                }

            });

            ProdutoOnlineModel.create(produtoOnline).then(post => {
                res.status(200)
            }).catch(erro => {
                res.status(500)
            })

        }


        if (tipo === 'se') {


            // define the validation schema
            const schemaServico = Joi.object().keys({

                email: Joi.string().required(),
                valor: Joi.number().required(),
                nomeProduto: Joi.string().required(),
                tipoProduto: Joi.string().required(),
                url: Joi.string().required()


            });


            Joi.validate(data, schemaServico, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid request data',
                        data: data
                    });
                } else {
                    res.json({
                        status: 'success',
                        message: 'Produto inserido com sucesso',
                    });
                }

            });

            ServicoModel.create().then(post => {
                res.status(200)
            }).catch(erro => {
                res.status(500)
            })

        }
    }
}