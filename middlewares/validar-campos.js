const joi = require('joi');

const validarCampos = (req, res, next) => {
    const errors = joi.valid(req);

    if(!errors.empty()){
        return res.status(400).json(errors);

    };
    next();
}
module.exports = {validarCampos};