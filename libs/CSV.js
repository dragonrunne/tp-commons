const _ = require('lodash');
const csv = require('fast-csv');
const Joi = require('joi');
const { Duplex } = require('stream');
const fs = require('fs');

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
				.on('error', (error) => {
					reject(error);
				})
				.on('data', (data) => {
					++currentLine;
					data = _.mapValues(data, (value) => (value === '' ? null : value));
					data = transformer(data);
					Joi.validate(data, joiSchema, { convert: true }, (err, value) => {
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

	static save(path, data) {
		return new Promise((resolve) => {
			csv
				.writeToPath(path, data, {
					headers: true,
				})
				.on('error', (err) => {
					throw new Error(err);
				})
				.on('finish', () => {
					resolve();
				});
		});
	}

	static saveStream(name, data, { append = false, headers = true }, transform = (d) => d) {
		return new Promise((resolve) => {
			const fsOptions = {
				encoding: 'utf8',
				flags:    'w',
			};
			const fsStream = fs.createWriteStream(name, fsOptions);

			if (append) {
				fsOptions.flags = 'a';
				fsStream.write('\r\n');
			}

			csv
				.writeToStream(fsStream, data, {
					headers,
					transform,
				})
				.on('error', (err) => {
					throw new Error(err);
				})
				.on('finish', () => {
					resolve();
				});
		});
	}
}

module.exports = CSV;
