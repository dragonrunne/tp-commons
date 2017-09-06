const joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
	NUMBER:    joi.number().min(0),
	STRING:    joi.string().min(1),
	ARRAY:     joi.array(),
	OBJECT:    joi.object(),
	BOOLEAN:   joi.boolean(),
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
						return this.createError('objectId.objectId', { v: value }, state, options);
					}

					return value;
				},
			},
		],
	})).objectId().objectId(),
};
