const Joi = require('joi')
const ProdutoOnlineModel = require('../models/produtoOnline')
const ProdutoFisicoModel = require('../models/produtoFisico')
const ServicoModel = require('../models/servico')

module.exports = {
    AddPost(req, res) {
        const tipo = req.query.tipo


        if (tipo === 'pf') {

            const data = req.body;

            const schemaProdutoFisico = Joi.object().keys({

                emailUsuario: Joi.string().email().required(),
                valorProduto: Joi.number().required(),
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
                    const body = {
                        emailUsuario: req.body.emailUsuario,
                        valorProduto: req.body.valorProduto,
                        nomeProduto: req.body.nomeProduto,
                        tipoProduto: req.body.tipoProduto,
                        imagePath: req.body.imagePath,
                        nomeEstabelecimento: req.body.nomeEstabelecimento,
                    }

                    ProdutoFisicoModel.create(body).then(user => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        })
                    })
                }

            });



        }



        if (tipo === 'po') {

            const data = req.body;


            const schemaProdutoOnline = Joi.object().keys({

                emailUsuario: Joi.string().required(),
                valorProduto: Joi.number().required(),
                nomeProduto: Joi.string().required(),
                tipoProduto: Joi.string().required(),
                url: Joi.string().required()


            });


            Joi.validate(data, schemaProdutoOnline, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Produto inserido com sucesso',
                        data: data
                    });
                } else {


                    const body = {
                        emailUsuario: req.body.emailUsuario,
                        valorProduto: req.body.valorProduto,
                        nomeProduto: req.body.nomeProduto,
                        tipoProduto: req.body.tipoProduto,
                        url: req.body.url,
                    }

                    ProdutoOnlineModel.create(body).then(post => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        })
                    }).catch(erro => {
                        res.status(500).json({
                            message: "Erro ao cadastrar",
                        })
                    })


                }

            });



        }


        if (tipo === 'se') {

            const data = req.body;

            const schemaServico = Joi.object().keys({

                emailUsuario: Joi.string().required(),
                valorServico: Joi.number().required(),
                nomeServico: Joi.string().required(),
                tipoProduto: Joi.string().required(),
                nomeEstabelecimento: Joi.string().required(),
                descricao: Joi.string().required()


            });

            Joi.validate(data, schemaServico, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid request data',
                        data: data
                    });
                } else {
                    const body = {
                        emailUsuario: req.body.email,
                        valorServico: req.body.valorServico,
                        nomeServico: req.body.nomeServico,
                        tipoProduto: req.body.tipoProduto,
                        nomeEstabelecimento: req.body.nomeEstabelecimento,
                        descricao: req.body.descricao,
                    }


                    ServicoModel.create(body).then(post => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        })
                    }).catch(erro => {
                        res.status(500).json({
                            message: "Erro ao cadastrar",
                        })
                    })



                }

            });


        }
    }
}