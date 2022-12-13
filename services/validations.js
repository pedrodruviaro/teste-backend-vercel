const Joi = require("joi");

function validateRegister(data) {
    const schema = Joi.object({
        username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(72).required(),
        email: Joi.string().min(6).max(100).required().email(),
    });

    return schema.validate(data);
}

function validateLogin(data) {
    const schema = Joi.object({
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(72).required(),
    });

    return schema.validate(data);
}

module.exports = {
    validateRegister,
    validateLogin,
};
