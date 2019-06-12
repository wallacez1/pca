const ProdutoModel = require('../models/produto')
const limit = 10;

module.exports = {

    GetAll(req, res) {
        const page = parseInt(req.query.page)
        var query = {}
        var type = req.query.type


        if (type !== 'all') {
            query["tipoProduto"] = type
        }





        ProdutoModel.find(query, function (err, docs) {
            return res.json(docs);
        }).sort({
            date: -1
        }).skip((page * limit) - limit).limit(limit);

    },


    GetPlace(req, res) {
        const log = parseFloat(req.body.log)
        const lat = parseFloat(req.body.lat)
        const distancemts = parseInt(req.body.distance)
        const produto = req.body.name;
        const page = parseInt(req.query.page)


        ProdutoModel.find({
                "nomeProduto": {
                    '$regex': produto,
                    '$options': 'i'
                },
                'loc': {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [log, lat]
                        },
                        $minDistance: 0,
                        $maxDistance: distancemts
                    }
                }

            },
            (err, data) => {
                if (err) throw err;
                return res.send(data);
            }).sort({
            date: -1
        }).skip((page * limit) - limit).limit(limit);
    },

    AutoComplete(req, res) {

        var keyWord = req.query.keyWord
        console.log(keyWord)

        ProdutoModel.find({
                nomeProduto: {
                    $regex: new RegExp(`^${keyWord}`, 'gi')
                }
            }, {
                _id: 0,
                _v: 0
            },
            (err, data) => {
                if (err) throw err;
                return res.send(data);
            }).limit(10);
    }
}