const cors = require('cors');

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
			/* const valids = whitelist.map((url) => {
				const regex = new RegExp(url);
				return regex.test(origin);
			});
			if (valids.indexOf(true) !== -1) {
				next(null, true);
			} else {
				next(new Error('Authorization denied'));
			} */
			next(null, true);
		},
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
}

module.exports = {
	CORS: (options) => initCors(options),
};
