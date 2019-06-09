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
            {$match: {_id: produto.qualificacao}},
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
        if (!produto.qualificacao) {
            res.status(200).json({resultado: API_ACAO_NENHUMA});
            return;
        }

        qualificacaoModel.aggregate([
            {$match: {_id: produto.qualificacao}},
            {$unwind: '$acoes'},
            {$match: {"acoes.user":user._id}},
            {$limit: 1},
            {$group: {_id: "$acoes.acao"}}
        ], (err, array) => {

            console.log(array);

            const {_id} = array && array.length > 0 ? array[0] : {}; 
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
        
        //Caso o produto nao tenho um id de um documento
        //vamos gerar um novo id para ser gerado ao consultar
        let id = produto.qualificacao || mongoose.Types.ObjectId();

        qualificacaoModel.findByIdAndUpdate(id, {}, {upsert: true, new: true}, (err, qualificacao) => {

            if (err) {
                return res.status(500).json({message:"Erro interno ao consultar qualificações: " + err});
            }
            
            qualificacao = qualificacao.toObject();

            let acao = qualificacao.acoes.find((usuarioAcao) => usuarioAcao.user.equals(user._id));

            let retorno = API_RETORNO_ACAO_SUCESSO;
            
            //SE POSSUI UM ELEMENTO, SIGNIFICA QUE HOUVE PREVIAMENTE UMA
            //ACAO DE LIKE/DESLIKE OU SE CASO A ACAO FOR REMOVER
            if (acao || novaAcao == API_ACAO_NENHUMA) {
                //SE HOUVE UMA ACAO RECENTE, VAMOS IDENTIFICAR
                //SE ELA É A MESMA QUE A NOVA ACAO
                //OU DIFERENTE, PRA RETORNAR COMO "ALTERADA" OU "NEGADA"
                retorno = acao && acao.acao != novaAcao ? API_RETORNO_ACAO_ALTERADA : API_RETORNO_ACAO_NEGADO;
            
            } 

            //VAMOS PERMITIR SOMENTE QUANDO FOR SUCESSO OU ALTERADO
            //OU SEJA, BARRAR ACOES REPETIDAS
            if (retorno != API_RETORNO_ACAO_NEGADO) {

                //Aqui vamos configurar diferentes filtros e acoes
                //Para caso for inserir, alterar ou remover acao do usuario

                let filtro, insertOrUpdate;

                //Caso nao tenha nenhuma acao definida
                //Entao o usuario nao ta na lista de acoes
                if (!acao) {
                    filtro = {_id: id};
                    insertOrUpdate = {$push: {
                        acoes: {
                            user: user._id,
                            acao: novaAcao,
                            dataAcao: Date.now()
                        }
                    }};
                //Caso a acao seja API_ACAO_NENHUMA,
                //entao vamos remover a acao
                } else if (novaAcao == API_ACAO_NENHUMA) {
                    filtro = {_id: id, "acoes.user": user._id};
                    insertOrUpdate = {$pull: {
                        acoes: {
                            user: user._id,
                        }
                    }};

                } else {
                    //Caso contrario, vai ser o update mesmo
                    //apenas para mudar a acao
                    filtro = {_id: id, "acoes.user": user._id};
                    insertOrUpdate = {$set: {
                        "acoes.$.acao": novaAcao,
                        "acoes.$.dataAcao": Date.now()
                    }};
                }

                qualificacaoModel.findOneAndUpdate(filtro, insertOrUpdate, (err, data) => {});
            }
            
            //Caso seja a primeira qualificacao de um produto
            //Vamos salvar a referencia do documento no produto
            if (!produto.qualificacao) {
                produtoModel.findByIdAndUpdate(produto._id, {qualificacao: qualificacao._id}, (err, data) => {});
            } 

            res.status(200).json({retorno: retorno});
        });        
    }
};