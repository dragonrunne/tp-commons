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

	static createModel(modelName, schemaConfig, withPaginate = false) {
		const schema = mongoose.Schema(schemaConfig);

		if (withPaginate) {
			schema.plugin(mongoosePaginate);
		}

		return mongoose.model(modelName, schema);
	}
}

module.exports = Mongoose;
