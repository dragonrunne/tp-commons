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
		let promise = null;

		this.pipeline.forEach((pipe) => {
			if (pipe.extract) {
				promise = pipe.extract(data, this.config);
				// promise.then((dataForExtraction) => pipe.extract(dataForExtraction));
			}
			if (pipe.transform) {
				promise.then((dataToTransform) => pipe.transform(dataToTransform, this.config));
			}
		});
		return promise;
	}
}

module.exports = ETL;
