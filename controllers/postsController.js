const Joi = require('joi')
const ProdutoOnlineModel = require('../models/produtoOnline')
const ProdutoFisicoModel = require('../models/produtoFisico')
const ServicoModel = require('../models/servico')
const ProdutoFisicoJoiSchema = require('../helpers/produtoFisicoJoiSchema')
const ProdutoOnlineJoiSchema = require('../helpers/produtoOnlineJoiSchema')
const ServicoJoiSchema = require('../helpers/servicoJoiSchema')


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
                        data: data + err
                    });
                } else {


                    var produtoFisico = {
                        emailUsuario: req.userEmail,
                        nomeProduto: req.body.payload.name,
                        categoria: req.body.payload.category,
                        valorProduto: req.body.payload.value,
                        nomeEstabelecimento: req.body.payload.place,
                        imagePath: req.body.payload.imagePath,
                        loc: {
                            coordinates: [req.body.location.long, req.body.location.lat]
                        },
                        adress: {
                            rua: req.body.location.street,
                            numero: req.body.location.house_number,
                            estado: req.body.location.state,
                            pais: req.body.location.country,
                            cidade: req.body.location.city,

                        }
                    }

                    ProdutoFisicoModel.create(produtoFisico).then(user => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        }).catch(erro => {
                            res.status(500).json({
                                message: "Erro ao cadastrar: " + erro,
                            })
                        })
                    })
                }

            });



        }



        if (tipo === 'po') {

            const data = req.body;




            Joi.validate(data, ProdutoOnlineJoiSchema, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'erro ao inserir o produto',
                        data: data + err
                    });
                } else {

                    var produtoOnline = {
                        emailUsuario: req.userEmail,
                        nomeProduto: req.body.payload.name,
                        categoria: req.body.payload.category,
                        valorProduto: req.body.payload.value,
                        nomeEstabelecimento: req.body.payload.place,
                        url: req.body.payload.url,

                    }


                    ProdutoOnlineModel.create(produtoOnline).then(post => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        })
                    }).catch(erro => {
                        res.status(500).json({
                            message: "Erro ao cadastrar: " + erro,
                        })
                    })


                }

            });



        }


        if (tipo === 'se') {

            const data = req.body;


            Joi.validate(data, ServicoJoiSchema, (err, value) => {
                if (err) {

                    res.status(422).json({
                        status: 'error',
                        message: 'Invalid request data',
                        data: data + err
                    });
                } else {
                    var servico = {
                        emailUsuario: req.userEmail,
                        nomeServico: req.body.payload.name,
                        categoria: req.body.payload.category,
                        valorServico: req.body.payload.value,
                        nomeEstabelecimento: req.body.payload.place,
                        descricao: req.body.payload.description,
                        loc: {
                            coordinates: [req.body.location.long, req.body.location.lat]
                        },
                        adress: {
                            rua: req.body.location.street,
                            numero: req.body.location.house_number,
                            estado: req.body.location.state,
                            pais: req.body.location.country,
                            cidade: req.body.location.city,

                        }




                    }

                    ServicoModel.create(servico).then(post => {
                        res.status(200).json({
                            message: "Cadastro com sucesso",
                        })
                    }).catch(erro => {
                        res.status(500).json({
                            message: "Erro ao cadastrar: " + erro,
                        })
                    })
                }

            });


        }
    }
}