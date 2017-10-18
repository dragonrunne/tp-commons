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

		if (headers.authorization) {
			microServiceHeaders.Authorization = headers.authorization;
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

	static getFile(headers, url) {
		return fetch(url, {
			method:  'GET',
			headers: headers || {},
		})
			.then((res) => res.body);
	}

	static post(headers, url, body) {
		return fetch(url, {
			method:  'POST',
			body:    JSON.stringify(body),
			headers: Object.assign(defaultHeader, Fetch.generateHeaders(headers)),
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

	static upload(url, file, params = {}) {
		const formData = new FormData();

		formData.append('file', file.buffer);
		formData.append('encoding', file.encoding);
		formData.append('mimetype', file.mimetype);
		formData.append('originalname', file.originalname);
		formData.append('size', file.size);

		Object.keys(params).forEach((key) => {
			formData.append(key, params[key]);
		});

		return fetch(url, {
			method:  'POST',
			body:    formData,
			headers: multipartHeader,
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
