const csv = require('fast-csv');

class CSV {
	static parse(stream, delimiter = ';') {
		const options = {
			delimiter,
			headers: true,
		};
		const records = [];

		return new Promise((resolve) => {
			stream
				.pipe(csv(options))
				.on('data', (data) => {
					records.push(data);
				})
				.on('end', () => {
					resolve(records);
				});
		});
	}
}

module.exports = CSV;
