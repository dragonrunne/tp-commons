const { SevenBoom } = require('graphql-apollo-errors');

module.exports = (logger) => (err, req, res, next) => { // eslint-disable-line no-unused-vars
	err.eventId = res.sentry;
	if (err.isJoi) {
		err = SevenBoom.badRequest(err.message, err.details, err.name);
	} else if (err.name === 'ValidationError') {
		err = SevenBoom.badImplementation(err.message, err.errors, err.name);
	} else if (err.code === 'invalid_token') {
		err = SevenBoom.unauthorized(err.message, err.inner, err.code);
		err.code = 'jwt-expired';
	} else if (err.name === 'UnauthorizedError') {
		err = SevenBoom.unauthorized(err.message, err.inner, err.name);
	} else if (!err.isBoom) {
		logger.error(err.stack);
		err = SevenBoom.badImplementation(err.message, err.stack, err.name);
	} else {
		logger.error(err.output.payload);
	}
	err = Object.assign(err, { eventId: res.sentry });
	res.status(err.output.statusCode).json(err);
};
