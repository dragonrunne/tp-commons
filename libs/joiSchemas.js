const joi = require('joi');

module.exports = {
	NUMBER: joi.number().min(0),
};
