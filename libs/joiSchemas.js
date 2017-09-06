const joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
	NUMBER:    joi.number().min(0),
	STRING:    joi.number().min(1),
	OBJECT_ID: joi.extend((j) => ({
		base:     j.string(),
		name:     'objectId',
		language: {
			objectId: 'invalid ObjectId',
		},
		rules: [
			{
				name: 'objectId',
				validate(params, value, state, options) {
					if (!mongoose.Types.ObjectId.isValid(value)) {
						return this.createError('string.objectId', { v: value }, state, options);
					}

					return value;
				},
			},
		],
	})),
};
