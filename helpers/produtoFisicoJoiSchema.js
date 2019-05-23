var Joi = require('joi')

module.exports = Joi.object().keys({

    payload: {
        value: Joi.number().required().label("erro valor"),
        name: Joi.string().required().label("erro no nome"),
        category: Joi.string().required().label("erro na categoria"),
        place: Joi.string().required().label("erro no lugar"),
        imagePath: Joi.string().required().label("erro no image.path")

    },
    location: {
        street: Joi.string().required().label("erro na rua"),
        house_number: Joi.number().required().label("erro no numero"),
        city: Joi.string().required().label("erro na cidade"),
        state: Joi.string().required().label("erro no estado"),
        country: Joi.string().required().label("erro no pais"),
        city: Joi.string().required().label("erro no pais"),
        lat: Joi.required().label("erro na latitude"),
        long: Joi.required().label("erro na latitude")

    }
});