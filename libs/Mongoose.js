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

	static createModel(modelName, schemaConfig, automatics = {},
		withPaginate = false, middlewares = {}) {
		const schema = mongoose.Schema(schemaConfig, automatics);

		if (withPaginate) {
			schema.plugin(mongoosePaginate);
		}

		if (middlewares) {
			if (middlewares.pre) {
				Object.keys(middlewares.pre).forEach((trigger) => {
					schema.pre(trigger, middlewares.pre[trigger]);
				});
			}

			if (middlewares.post) {
				Object.keys(middlewares.post).forEach((trigger) => {
					schema.post(trigger, middlewares.post[trigger]);
				});
			}
		}

		return mongoose.model(modelName, schema);
	}
}

module.exports = Mongoose;
