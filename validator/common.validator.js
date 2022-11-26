const Joi = require("joi");
const regex = require("../config/regexp.enum");

module.exports = {
    idValidator: Joi.string().regex(regex.MONGO_ID)
};
