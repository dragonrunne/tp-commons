const { doUntil, waterfall } = require('async');

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

		return new Promise((resolve, reject) => {
			waterfall(
				this.pipeline.map((pipelineFunc) => (currentPayload, next) => pipelineFunc.run((next ? currentPayload : data), this.config)
					.then((newPayload) => (next ? next(null, newPayload) : currentPayload(null, newPayload)))
					.catch((err) => next(err))),
				(err, processedPayload) => {
					if (err) {
						reject(err);
					}
					resolve(processedPayload);
				},
			);
		});
	}
}

module.exports = ETL;
