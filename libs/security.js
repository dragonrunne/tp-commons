const cors = require('cors');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const Raven = require('raven');
const { SevenBoom } = require('graphql-apollo-errors');

function createJwt(secret, data) {
	return new Promise((resolve, reject) => {
		jwt.sign(data, secret, {
			expiresIn: '30 days',
		}, (error, token) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(token);
		});
	});
}

function initBodyguard(config) {
	return expressJWT({
		secret:              config.secret,
		credentialsRequired: false,
		getToken:            function fromHeaderOrQuerystring(req) {
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				return req.headers.authorization.split(' ')[1];
			} else if (req.query && req.query.token) {
				return req.query.token;
			}
			return config.acceptGuest ? null : new Error();
		},
	});
}

function initCors(options) {
	const whitelist = [
		'http:\/\/127.0.0.1:8080',
		'http:\/\/localhost:8080',
		'http:\/\/localhost:8081',
	].concat(options.whitelist_urls ? options.whitelist_urls.split(',') : []);

	if (options.secret) {
		whitelist.push(options.secret);
	}

	return cors({
		origin(origin, next) {
			const valids = whitelist.map((url) => {
				const regex = new RegExp(url);
				return regex.test(origin);
			});
			if (valids.indexOf(true) !== -1) {
				next(null, true);
			} else {
				Raven.captureException(
					new Error('authorization-denied-cors'),
					{
						extra: { origin },
					},
				);
				next(SevenBoom.unauthorized('', {}, 'authorization-denied'));
			}
		},
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
}

module.exports = {
	cors:      (options) => initCors(options),
	bodyguard: (config) => initBodyguard(config),
	jwt:       {
		create: (secret, data) => createJwt(secret, data),
	},
};
