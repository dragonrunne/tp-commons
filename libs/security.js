const cors = require('cors');

const whitelist = [
	'http:\/\/127.0.0.1:8080',
	'http:\/\/localhost:8080',
	'http:\/\/localhost:8081',
].concat(process.env.WHITELIST_URLS ? process.env.WHITELIST_URLS.split(',') : []);

if (process.env.SUPER_SECRET_PASSPHRASE) {
	whitelist.push(process.env.SUPER_SECRET_PASSPHRASE);
}

const corsOptions = {
	origin(origin, next) {
		const valids = whitelist.map((url) => {
			const regex = new RegExp(url);
			return regex.test(origin);
		});
		if (valids.indexOf(true) !== -1) {
			next(null, true);
		} else {
			next(new Error('Authorization denied'));
		}
	},
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	preflightContinue:    false, // Does not let the OPTIONS requests continue to the next handlers
};

module.exports = {
	CORS: cors(corsOptions),
};
