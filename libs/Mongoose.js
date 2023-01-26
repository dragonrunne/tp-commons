const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const providerEnum = ['fs', 'cloudinary'];

class Mongoose {
	static connect(mongoUri) {
		mongoose.Promise = global.Promise;

		return mongoose.connect(mongoUri);
	}

	static get Types() {
		return mongoose.Schema.Types;
	}

	static get PICTURE() {
		return {
			type: {
				url: {
					type: String,
				},
				provider: {
					type: String,
					emum: providerEnum,
				},
			},
			required: false,
			default:  null,
		};
	}

	static get USERS_CUSTOM_FIELDS() {
		return {
			type: [{
				key:          String,
				type:         { type: String },
				labels:       Mongoose.Types.Mixed,
				required:     Boolean,
				needs_info:   Boolean,
				informations: Mongoose.Types.Mixed,
			}],
			required: false,
			default:  [],
		};
	}

	static get ADDRESS() {
		return {
			type: {
				formatted_address: String,
				geolocation:       {
					coordinates: [Number],
					type:        { type: String },
				},
				address: {
					street:  String,
					zipcode: String,
					city:    String,
					country: String,
				},
			},
			required: false,
		};
	}

	static createModel(modelName, schemaConfig, options = {}) {
		const schema = mongoose.Schema(schemaConfig, Object.assign(options.automatics || {}, { strict: 'false' }));

		if (options.withPaginate) {
			schema.plugin(mongoosePaginate);
		}

		if (options.middlewares) {
			if (options.middlewares.pre) {
				Object.keys(options.middlewares.pre).forEach((trigger) => {
					schema.pre(trigger, options.middlewares.pre[trigger]);
				});
			}

			if (options.middlewares.post) {
				Object.keys(options.middlewares.post).forEach((trigger) => {
					schema.post(trigger, options.middlewares.post[trigger]);
				});
			}
		}

		if (options.index) {
			schema.index(options.index);
		}

		return mongoose.model(modelName, schema);
	}
}

module.exports = Mongoose;
