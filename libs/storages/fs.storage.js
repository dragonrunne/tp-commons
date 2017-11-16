const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

class FsStorage {
	constructor() {
		this.name = 'fs';
	}

	async _createFile(dist, scope, filename, data) {
		await fs.ensureDir(path.join(dist, scope));
		return fs.outputFile(path.join(dist, scope, filename), data);
	}

	_createUrl(url, scope, filename) {
		return new URL(`${url}/${scope}/${filename}`).href;
	}

	async upload(data, filename, { dist, url, scope }) {
		if (!dist) throw (new Error('fs-no-dist-provided'));
		if (!url) throw (new Error('fs-no-url-provided'));
		if (scope && typeof scope !== 'string') throw (new Error('fs-invalid-scope'));

		await this._createFile(dist, scope, filename, data);
		return this._createUrl(url, scope, filename);
	}
}

module.exports = FsStorage;
