const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const FormData = require('form-data');

const defaultHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': undefined };

if (!global.logger) {
	global.logger = {
		error(data) {
			console.error(data); // eslint-disable-line no-console
		},
	};
}

/**
 * A wrapper around node-fetch to handle JSON and errors.
 */
class Fetch {
	static generateHeaders(headers) {
		const microServiceHeaders = {};

		if (headers.authorization || headers.Authorization) {
			microServiceHeaders.Authorization = headers.authorization || headers.Authorization;
		}

		if (headers['accept-language']) {
			microServiceHeaders['accept-language'] = headers['accept-language'];
		}

		if (headers.bucket) {
			microServiceHeaders.bucket = headers.bucket;
		}

		if (headers.secret) {
			microServiceHeaders.origin = headers.secret;
		}

		return microServiceHeaders;
	}

	static get(headers, url, params = null) {
		const ObjectURL = new URL(url);

		if (params) {
			const ObjectParams = new URLSearchParams(params);
			ObjectURL.search = ObjectParams.toString();
		}

		return fetch(ObjectURL.href, {
			method:  'GET',
			headers: Fetch.generateHeaders(headers),
			timeout: 0,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.isBoom) {
					logger.error(json.output);
					return Promise.reject(json);
				}
				return json;
			});
	}

	static getFile(headers, url, method = 'GET', body = null) {
		return fetch(url, {
			method,
			body:    body ? JSON.stringify(body) : undefined,
			headers: headers || defaultHeader,
			timeout: 0,
		})
			.then(async (res) => {
				if (res.status >= 400) {
					const json = await res.json();
					logger.error(json.output);
					return Promise.reject(json);
				}
				return res.body;
			});
	}

	static post(headers, url, body) {
		return fetch(url, {
			method:  'POST',
			body:    JSON.stringify(body),
			headers: Object.assign(defaultHeader, Fetch.generateHeaders(headers)),
			timeout: 0,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.isBoom) {
					logger.error(json.output);
					return Promise.reject(json);
				}
				return json;
			});
	}

	static put(headers, url, body) {
		return fetch(url, {
			method:  'PUT',
			body:    JSON.stringify(body),
			headers: Object.assign(defaultHeader, Fetch.generateHeaders(headers)),
			timeout: 0,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.isBoom) {
					logger.error(json.output);
					return Promise.reject(json);
				}
				return json;
			});
	}

	static delete(headers, url) {
		return fetch(url, {
			method:  'DELETE',
			headers: Fetch.generateHeaders(headers),
			timeout: 0,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.isBoom) {
					logger.error(json.output);
					return Promise.reject(json);
				}
				return json;
			});
	}

	static async upload(headers, url, file, params = {}) {
		const formData = new FormData();

		function streamToBuffer(stream) {
			return new Promise((resolve, reject) => {
				const buffers = [];
				stream.on('error', reject);
				stream.on('data', (data) => buffers.push(data));
				stream.on('end', () => resolve(Buffer.concat(buffers)));
			});
		}

		formData.append('file', file.buffer || await streamToBuffer(file.stream));
		formData.append('encoding', file.encoding);
		formData.append('mimetype', file.mimetype);
		formData.append('originalname', file.originalname || file.filename);

		Object.keys(params).forEach((key) => {
			if (typeof params[key] === 'object') {
				formData.append(key, JSON.stringify(params[key]));
			} else {
				formData.append(key, params[key]);
			}
		});

		const newHeaders = {};
		if (headers.secret) {
			newHeaders.origin = headers.secret;
		}

		return fetch(url, {
			method:  'POST',
			body:    formData,
			headers: newHeaders,
			timeout: 0,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.isBoom) {
					logger.error(json.output);
					return Promise.reject(json);
				}
				return json;
			});
	}
}

module.exports = Fetch;
