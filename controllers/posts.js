const Joi = require('joi')
const ProdutoOnlineModel = require('../models/produtoOnline')
const ProdutoFisicoModel = require('../models/produtoFisico')
const ProdutoFisicoJoiSchema = require('../helpers/produtoFisicoJoiSchema')
const ServicoModel = require('../models/servico')

module.exports = {
    AddPost(req, res) {
        const tipo = req.query.tipo
        if (tipo === 'pf') {

            const data = req.body
            console.log()

            Joi.validate(data, ProdutoFisicoJoiSchema, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'erro ao salvar produto',
                        data: err
                    });
                } else {


                    var produto = {
                        nomeProduto: req.body.payload.name,
                        tipoProduto: req.body.payload.category,
                        valorProduto: req.body.payload.value,
                        nomeEstabelecimento: req.body.payload.place,
                        imagePath: req.body.payload.imagePath,
                        loc: {
                            endereco: {
                                rua: req.body.location.street,
                                numero: req.body.location.house_number,
                                estado: req.body.location.state,
                                pais: req.body.location.country,
                            },
                            geo: {
                                coordinates: [req.body.location.lat, req.body.location.long]
                            }
                        }
                    }

                    ProdutoFisicoModel.create(produto).then(user => {
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

                payload: {
                    value: Joi.number().required(),
                    name: Joi.string().required(),
                    category: Joi.string().required(),
                    place: Joi.string().required(),
                    url: Joi.string().required()
                }
            });


            Joi.validate(data, schemaProdutoOnline, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'erro ao inserir o produto',
                        data: data
                    });
                } else {


                    const body = {
                        emailUsuario: req.body.emailUsuario,
                        valorProduto: req.body.value,
                        nomeProduto: req.body.name,
                        tipoProduto: req.body.category,
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
                payload: {
                    value: Joi.number().required(),
                    name: Joi.string().required(),
                    category: Joi.string().required(),
                    place: Joi.string().required(),
                    description: Joi.string().required()
                },
                location: {
                    street: Joi.number().required(),
                    house_number: Joi.number().required(),
                    city: Joi.number().required(),
                    state: Joi.number().required(),
                    short_state: Joi.number().required(),
                    country: Joi.number().required(),
                    short_country: Joi.number().required(),
                }

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
                        valorServico: req.body.value,
                        nomeServico: req.body.name,
                        tipoProduto: req.body.category,
                        nomeEstabelecimento: req.body.place,
                        descricao: req.body.description,
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