const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

class Mongoose {
	static connect(mongoUri) {
		mongoose.Promise = global.Promise;

		return mongoose.connect(mongoUri, {
			useMongoClient: true,
		});
	}

	static get Types() {
		return mongoose.Schema.Types;
	}

	static createModel(modelName, schemaConfig, withPaginate = false, middlewares = {}) {
		const schema = mongoose.Schema(schemaConfig);

		if (withPaginate) {
			schema.plugin(mongoosePaginate);
		}

		Object.keys(middlewares).forEach((action) => {
			Object.keys(middlewares[action]).forEach((trigger) => {
				schema[action](trigger, middlewares[action][trigger]);
			});
		});

		return mongoose.model(modelName, schema);
	}
}

module.exports = Mongoose;
