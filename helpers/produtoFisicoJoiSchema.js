var Joi = require('joi')

module.exports = Joi.object().keys({

    payload: {
        value: Joi.number().required().label("error valor"),
        name: Joi.string().required().label("error no nome"),
        category: Joi.string().required().label("error na categoria"),
        place: Joi.string().required().label("error no lugar"),
        imagePath: Joi.string().required().label("error no image.path")

    },
    location: {
        street: Joi.string().required().label("error na rua"),
        house_number: Joi.number().required().label("error no numero"),
        city: Joi.string().required().label("error na cidade"),
        state: Joi.string().required().label("error no estado"),
        country: Joi.string().required().label("error no pais"),
        lat: Joi.required().label("error na latitude"),
        long: Joi.required().label("error na latitude")

    }
});