const mongoose = require('mongoose');
const produtoModel = require('../models/produto');
const qualificacaoSchema = require('../models/qualificacao');
const userModel = require('../models/user');
const mongoose = require('mongoose');
const qualificacaoModel = mongoose.model('qualificacoes', qualificacaoSchema);

const ACAO_LIKE = 1;
const ACAO_DESLIKE = 0;
const ACAO_NENHUMA = -1;

module.exports = {


    update(req, res) {
        if (!req.query.produto) {
            res.status(400).json({message: "Id do produto não informado"});
            return;
        }

        produtoModel.findById(req.query.produto, (err, produto) => {
            if (err) {                
                res.status(500).json({message: "Produto não encontrado: " + err});
                return;
            }
            qualificacaoModel.aggregate([
                {$match: {_id: produto.toObject().qualificacoes}},
                {$unwind: "$acoes"},
                {$group: {_id: "$acoes.acao", count: {$sum: 1}}}
            ], (err, array) => {
                let retorno = {likes:0, deslikes:0};
                for (index in array) {

                    let element = array[index];
                    //LIKES
                    if (element._id == 1) {
                        retorno.likes = element.count;
                    //DESLIKES
                    } else if (element._id == 0) {
                        retorno.deslikes = element.count;
                    }
                }
                res.status(200).json(retorno);
            });
        });
    },
    info(req, res) {
        if (!req.query.produto) {
            res.status(400).json({message: "Id do produto não informado"});
            return;
        }

        produtoModel.findById(req.query.produto, (err, produto) => {
            if (err) {                
                res.status(500).json({message: "Produto não encontrado: " + err});
                return;
            }
            produto = produto.toObject();

            //Caso um produto não possua nenhuma qualificacao,
            //entao nao vai existir um documento para o mesmo
            //Entao, vamos adiantar a resposta que nao possui
            //nenhuma acao de qualquer usuario
            if (!produto.qualificacoes) {
                res.status(200).json({resultado: ACAO_NENHUMA});
                return;
            }

            userModel.findOne({email: req.userEmail}, (err, user) => {
                if (err) {
                    res.status(500).json({message: "Usuário não encontrado: " + err});
                    return;
                }

                qualificacaoModel.aggregate([
                    {$match: {_id: produto.qualificacoes}},
                    {$unwind: "$acoes"},
                    {$match: {_id: user._id}},
                    {$group: {_id: "$acoes.acao", count: {$sum: 1}}}
                ], (err, array) => {
                    let retorno = {likes:0, deslikes:0};
                    for (index in array) {
    
                        let element = array[index];
                        //LIKES
                        if (element._id == 1) {
                            retorno.likes = element.count;
                        //DESLIKES
                        } else if (element._id == 0) {
                            retorno.deslikes = element.count;
                        }
                    }
                    res.status(200).json(retorno);
                });
                qualificacaoModel.findById(produto.qualificacoes, (err, qualificacao) => {
                    if (err) {
                        res.status(500).json({message: "Qualificação não encontrada: " + err});
                        return;
                    }


                });

            });

            // console.log ("Produto: " + produto);
            // console.log ("Produto: " + produto._id);
            // console.log ("Produto: " + produto.qualificacoes);
            // console.log ("Produto: " + produto.isOnline);
            qualificacaoModel.aggregate([
                {$match: {_id: produto.toObject().qualificacoes}},
                { $unwind : "$acoes" },
                {$group: {_id: "$acoes.acao", count: {$sum: 1}}}
            ], (err, array) => {
                let retorno = {likes:0, deslikes:0};
                for (index in array) {

                    let element = array[index];
                    //LIKES
                    if (element._id == ACAO_LIKE) {
                        retorno.likes = element.count;
                    //DESLIKES
                    } else if (element._id == ACAO_DESLIKE) {
                        retorno.deslikes = element.count;
                    }
                }
                res.status(200).json(retorno);
            });
        });

    },
    action(req, res) {
        if (!req.query.produto) {
            res.status(400).json({message: "Id do produto não informado"});
            return;
        }

        if (!req.body.acao) {
            res.status(400).json({message: "Ação não informada"});
            return;
        }
        // qualificacaoModel.create({acoes:[]}).then(qual => {
        //              console.log("CRIADOOOO");
        //          });
        console.log("Procurando produto por id: " + req.query.produto);
        produtoModel.findById(req.query.produto, (err, data) => {
            console.log("Achou: " + data);
            if (err) {
                throw err;
            }
            
            let id = data.qualificacoes ? data.qualificacoes : mongoose.Types.ObjectId();
            console.log(id);
            console.log(data.qualificacoes);
            qualificacaoModel.findByIdAndUpdate(id, {$set: {acoes:[]}}, {upsert: true, new: true}, (err, ddd, res) => {
                console.log("ERRR!!!!! " + err);
                console.log("INSERIU!!!!! " + ddd + res);
            });
            // if (!data.qualificacao) {

            //     qualificacaoModel.create({acoes:[]}).then(qual => {
            //         data.qualificacao = qual;
            //     });
            // } else {
            //     qualificacaoModel.findById(data.qualificacao);
            // }
        });
        
    }
};