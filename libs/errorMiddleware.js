const { SevenBoom } = require('graphql-apollo-errors');

module.exports = (logger) => (err, req, res, next) => { // eslint-disable-line no-unused-vars
	if (err.isJoi) {
		err = SevenBoom.badRequest(err.message, err.details, err.name);
	} else if (err.name === 'ValidationError') {
		err = SevenBoom.badImplementation(err.message, err.errors, err.name);
	} else if (!err.isBoom) {
		logger.error(err.stack);
		err = SevenBoom.badImplementation(err.message, err.stack, err.name);
	} else {
		logger.error(err.output.payload);
	}
	res.status(err.output.statusCode).json(err);
};
