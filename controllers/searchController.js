const ProdutoModel = require('../models/produto')

module.exports = {


    GetAll(req, res) {
        const page = parseFloat(req.query.page)
        ProdutoModel.paginate({}, {
                page: page,
                limit: 10
            })
            .then(response => {
                res.send(response)
            })
            .catch();

    },


    GetPlace(req, res) {
        const log = parseFloat(req.body.log)
        const lat = parseFloat(req.body.lat)
        const distancemts = parseInt(req.body.distance)
        const produto = req.body.name;
        console.log(produto)

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
            })
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