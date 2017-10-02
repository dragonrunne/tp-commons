const fs = require('fs-extra');
const path = require('path');

class FsStorage {
	constructor() {
		this.name = 'fs';
	}

	_createFile(dist, scope, filename, data) {
		return fs.outputFile(path.join(dist, scope, filename), data);
	}

	_createUrl(url, scope, filename) {
		return path.join(url, scope, filename);
	}

	async upload(file, filename, { dist, url, scope }) {
		if (!dist) throw (new Error('fs-no-dist-provided'));
		if (!url) throw (new Error('fs-no-url-provided'));
		if (scope && typeof scope !== 'string') throw (new Error('fs-invalid-scope'));

		await this._createFile(dist, scope, filename, file.data);
		return this._createUrl(url, scope, filename);
	}
}

module.exports = FsStorage;
