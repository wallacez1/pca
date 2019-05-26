const ProdutoModel = require('../models/produto')

module.exports = {
    GetAll(req, res) {

        var arr = [];
        ProdutoModel.find({}, function (err, docs) {
            return res.json(docs);
        });
    },


    GetPlace(req, res) {
        const log = parseFloat(req.body.log)
        const lat = parseFloat(req.body.lat)
        const distancemts = Number(req.body.distance)


        console.log("long", log, "latitude", lat, "distancia",
            distancemts)
        ProdutoModel.find({
                'loc': {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
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
    }
}