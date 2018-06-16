const Mongoose = require('./Mongoose');
const { Server } = require('http');
const SocketIO = require('socket.io');

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

		if (this.options.socket) {
			this.http = Server(app);
			this.io = SocketIO(this.http);
			return new Promise((resolve) => {
				this.http.listen(this.options.port, () => {
					logger.info(`[${this.options.name}] listening on port ${this.options.port}`);
					resolve(this.io);
				});
			});
		}

		return new Promise((resolve) => {
			app.listen(this.options.port, () => {
				logger.info(`[${this.options.name}] listening on port ${this.options.port}`);
				resolve();
			});
		});
	}
}

module.exports = MicroService;
