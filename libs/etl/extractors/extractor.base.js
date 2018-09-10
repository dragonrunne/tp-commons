const _pick = require('lodash.pick');
const joiSchemas = require('../../joiSchemas');

class Extrator {
	static _validate(payload, schema) {
		const payloadToValidate = _pick(payload, Object.keys(schema));
		return joiSchemas.validateAsync(payloadToValidate, schema);
	}
}

module.exports = Extrator;
