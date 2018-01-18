const { promisify } = require('util');
const joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
	joi,
	validateAsync: promisify(joi.validate),
	NUMBER:        joi.number().min(0),
	STRING:        joi.string().allow(''),
	ARRAY:         joi.array(),
	OBJECT:        joi.object(),
	BOOLEAN:       joi.boolean(),
	DATE:          joi.date(),
	LANGUAGE:      joi.string().min(2).regex(/^[a-z]{2}$/),
	PICTURE:       joi.any(),
	EMAIL:         joi.string().email(),
	OBJECT_ID:     joi.extend((j) => ({
		base:     j.any(),
		name:     'objectId',
		language: {
			objectId: 'invalid ObjectId',
		},
		rules: [
			{
				name: 'objectId',
				validate(params, value, state, options) {
					if (value === null || value === 'null') {
						return null;
					}
					if (!mongoose.Types.ObjectId.isValid(value)) {
						return this.createError('objectId.objectId', { v: value }, state, options);
					}

					return value;
				},
			},
		],
	})).objectId().objectId(),
	LABELS: joi.array().items(joi.object().keys({
		key:      joi.string().required(),
		type:     joi.string().required(),
		required: joi.boolean().required(),
		labels:   joi.object().pattern(
			/^[a-z]{2}$/, joi.string().optional(),
		).optional().invalid([null]),
		needs_info:   joi.boolean().required(),
		informations: joi.object().pattern(
			/^[a-z]{2}$/, joi.string().optional(),
		).optional().invalid([null]),
	})),
};
