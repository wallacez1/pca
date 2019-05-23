var Joi = require('joi')

module.exports = Joi.object().keys({

    payload: {
        value: Joi.number().required().label("erro valor"),
        name: Joi.string().required().label("erro no nome"),
        category: Joi.string().required().label("erro na categoria"),
        place: Joi.string().required().label("erro na estabelecimento"),
        url: Joi.string().required().label("erro no url")
    }

});