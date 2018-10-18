const { doUntil } = require('async');

class ETL {
	constructor(config) {
		this.pipeline = [];
		this.config = config;
	}

	pipe(beam) {
		this.pipeline.push(beam);
		return this;
	}

	process(payload) {
		const data = JSON.parse(JSON.stringify(payload));
		let newPayload = null;
		let index = 0;

		return new Promise((resolve, reject) => {
			doUntil(
				async () => {
					newPayload = await this.pipeline[index].run(newPayload || data, this.config);
					index += 1;
				},
				() => index >= this.pipeline.length,
				(err) => {
					if (err) {
						reject(err);
					}
					resolve(newPayload);
				},
			);
		});
	}
}

module.exports = ETL;
