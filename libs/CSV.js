const _ = require('lodash');
const csv = require('fast-csv');
const Joi = require('joi');
const { Duplex } = require('stream');

class CSV {
	static bufferToStream(buffer) {
		const stream = new Duplex();
		stream.push(buffer);
		stream.push(null);
		return stream;
	}

	static isBuffer(buffer) {
		return buffer instanceof Buffer;
	}

	static parse(stream, { joiSchema, delimiter = ',', transformer = (d) => d }) {
		const options = {
			delimiter,
			headers: true,
		};
		const records = [];
		const errors = [];
		let currentLine = 0;

		if (CSV.isBuffer(stream)) {
			stream = CSV.bufferToStream(stream);
		}

		return new Promise((resolve, reject) => {
			stream
				.pipe(csv(options))
				.on('data', (data) => {
					++currentLine;
					data = _.mapValues(data, (value) => (value === '' ? null : value));
					data = transformer(data);
					Joi.validate(data, joiSchema, (err, value) => {
						if (err) {
							errors.push({
								line:  currentLine,
								error: err,
							});
						}
						records.push(value);
					});
				})
				.on('end', () => {
					if (errors.length) {
						reject(errors);
						return;
					}
					resolve(records);
				});
		});
	}
}

module.exports = CSV;
