const mongoose = require('mongoose');
const qualificacaoModel = require('../models/qualificacao');
const produtoModel = require('../models/produto');

const API_ACAO_LIKE = 1;
const API_ACAO_DESLIKE = 0;
const API_ACAO_NENHUMA = -1;

const API_RETORNO_ACAO_SUCESSO = "sucesso";
const API_RETORNO_ACAO_ALTERADA = "alterada";
const API_RETORNO_ACAO_NEGADO = "negado";



const ACOES_QUALIFICACAO = [
    API_ACAO_NENHUMA,
    API_ACAO_DESLIKE,
    API_ACAO_LIKE,
];

module.exports = {


    update(req, res) {

        let {produto} = req;
        
        qualificacaoModel.aggregate([
            {$match: {_id: produto.qualificacoes}},
            {$unwind: "$acoes"},
            {$group: {_id: "$acoes.acao", count: {$sum: 1}}}
        ], (err, array) => {
            let retorno = {likes:0, deslikes:0};
            for (index in array) {

                let {_id, count} = array[index];
                //LIKES
                if (_id == API_ACAO_LIKE) {
                    retorno.likes = count;
                //DESLIKES
                } else if (_id == API_ACAO_DESLIKE) {
                    retorno.deslikes = count;
                }
            }
            res.status(200).json(retorno);
        });
    },

    info(req, res) {

        let {produto, user} = req;
        
        //Caso um produtoId não possua nenhuma qualificacao,
        //entao nao vai existir um documento para o mesmo
        //Entao, vamos adiantar a resposta que nao possui
        //nenhuma acao de qualquer usuario
        if (!produto.qualificacoes) {
            res.status(200).json({resultado: API_ACAO_NENHUMA});
            return;
        }

        qualificacaoModel.aggregate([
            {$match: {_id: produto.qualificacoes}},
            {$unwind: '$acoes'},
            {$project: {user_id: '$acoes.user', user_acao: '$acoes.acao'}},
            {$match: {"$acoes.user": user._id}},
            {$group: {_id: "$user_acao"}}
        ], (err, array) => {

            const {_id} = array.length > 0 ? array[0] : {}; 
            const resposta = {resultado: API_ACAO_NENHUMA};

            //Verifica se o que vem do banco,
            //coincide com qualificações configuradas

            if (ACOES_QUALIFICACAO.includes(_id)) {
                resposta.resultado = _id;
            }

            res.status(200).json(resposta);
        });
    },

    action(req, res) {

        let {produto, user} = req;
        let novaAcao = req.body.acao;

        if (!novaAcao) {
            res.status(400).json({message: "Ação não informada"});
            return;
        }

        novaAcao = parseInt(novaAcao);

        if (!ACOES_QUALIFICACAO.includes(novaAcao)) {
            res.status(400).json({message: "Ação inválida"});
            return;
        }
            
        let id = produto.qualificacoes;

        //Caso um produto nao esteja apontando para
        //um documento de qualificacao, vamos gerar
        //um ID e atribuir a esse produto
        if (!id) {
            id = mongoose.Types.ObjectId();
        }

        qualificacaoModel.findByIdAndUpdate(id, {}, {upsert: true, new: true}, (err, qualificacao) => {
            
            qualificacao = qualificacao.toObject();

            let acao = qualificacao.acoes.find((usuarioAcao) => usuarioAcao.user == user);
            let retorno = API_RETORNO_ACAO_SUCESSO;

            //SE POSSUI UM ELEMENTO, SIGNIFICA QUE HOUVE PREVIAMENTE UMA
            //ACAO DE LIKE/DESLIKE
            if (acao) {
                //SE HOUVE UMA ACAO RECENTE, VAMOS IDENTIFICAR
                //SE ELA É A MESMA QUE A NOVA ACAO
                //OU DIFERENTE, PRA RETORNAR COMO "ALTERADA" OU "NEGADA"
                retorno = acao.acao != novaAcao ? API_RETORNO_ACAO_ALTERADA : API_RETORNO_ACAO_NEGADO;
            
            }

            //VAMOS PERMITIR SOMENTE QUANDO FOR SUCESSO OU ALTERADO
            if (retorno != API_RETORNO_ACAO_NEGADO) {
                qualificacaoModel.aggregate([
                    {$match: {_id: id}},
                    {$unwind: '$acoes'},
                    {$project: {user_id: '$acoes.user', user_acao: '$acoes.acao'}},
                    {$match: {"$acoes.user": user._id}},
                    {$group: {_id: "$user_acao"}}
                ], (err, array) => {
                });
            }

            res.status(200).json({retorno: retorno});
        });        
    }
};