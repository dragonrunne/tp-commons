const mongoose = require('mongoose');

module.exports = function (mongoUri) {
	mongoose.Promise = global.Promise;

	return mongoose.connect(mongoUri, {
		useMongoClient: true,
	});
};
