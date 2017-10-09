const Mongoose = require('./Mongoose');

class MicroService {
	constructor(options) {
		this.options = options;
	}

	async _init(initMethod = null) {
		if (!initMethod) {
			return Promise.resolve();
		}
		await initMethod();
		logger.info('[init] Initialialization finished');
		return Promise.resolve();
	}

	async _connectMongo(mongoURI = null) {
		if (!mongoURI) {
			return Promise.resolve();
		}

		await Mongoose.connect(mongoURI);
		logger.info('[mongo] Connection to the database OK');
		return Promise.resolve();
	}

	async start(app) {
		await this._connectMongo(this.options.mongoURI);
		await this._init(this.options.initMethod);

		return new Promise((resolve) => {
			app.listen(this.options.port, () => {
				logger.info(`[${this.options.name}] listening on port ${this.options.port}`);
				resolve();
			});
		});
	}
}

module.exports = MicroService;
