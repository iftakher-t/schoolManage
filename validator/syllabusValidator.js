
const Joi = require('joi');

const syllabusValidator = Joi.object({
    className: Joi.string().required()
    .alphanum().min(3).max(6),
})

const options = {
    abortEarly:false,
    allowUnknown:true,
    stripUnknown:true,
}

module.exports = {
    syllabusValidator, options
}