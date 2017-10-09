const Mongoose = require('./Mongoose');

class MicroService {
	constructor(options) {
		this.options = options;
	}

	_init(initMethod = null) {
		if (!initMethod) {
			return Promise.resolve();
		}
		return initMethod();
	}

	_connectMongo(mongoURI) {
		return Mongoose.connect(mongoURI);
	}

	async start(app) {
		await this._connectMongo(this.options.mongoURI);
		logger.info('[mongo] Connection to the database OK');
		await this._init(this.options.initMethod);
		logger.info('[init] Initialialization finished');

		return new Promise((resolve) => {
			app.listen(this.options.port, () => {
				logger.info(`[${this.options.name}] listening on port ${this.options.port}`);
				resolve();
			});
		});
	}
}

module.exports = MicroService;
