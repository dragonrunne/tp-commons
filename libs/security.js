const cors = require('cors');

const whitelist = [
	'http://127.0.0.1',
	'http://localhost',
].concat(process.env.WHITELIST_URLS ? process.env.WHITELIST_URLS.split(',') : []);

const corsOptions = {
	origin(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Authorization denied'));
		}
	},
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = {
	CORS: cors(corsOptions),
};
