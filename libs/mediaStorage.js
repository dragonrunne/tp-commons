const { promisify } = require('util');

class MediaStorage {
	use(provider, dist) {
		if (typeof provider.upload_stream === 'function') {
			this.upload = (file) => new Promise((resolve, reject) => {
				try {
					provider.upload_stream((result) => resolve({
						provider: 'fs',
						url:      result.url,
						name:     file.originalname,
					})).end(file.buffer);
				} catch (e) {
					reject(e);
				}
			});
		} else if (typeof provider.writeFile === 'function') {
			if (!dist) throw (new Error('no-dist-provided'));
			const accessAsync = promisify(provider.access);
			const writeFile = promisify(provider.writeFile);
			const mkdirAsync = promisify(provider.mkdir);
			this.upload = (file) =>
				accessAsync(dist, provider.constants.W_OK)
					.then(() =>
						writeFile(`${dist}/${file.originalname}`, file.buffer)
							.then(() => ({
								provider: 'fs',
								url:      `http://localhost:3001/uploads/${file.originalname}`,
								name:     file.originalname,
							})),
					).catch(() => {
						mkdirAsync(dist).then(() => writeFile(`${dist}/${file.originalname}`, file.buffer)
							.then(() => ({
								provider: 'fs',
								url:      `http://localhost:3001/uploads/${file.originalname}`,
								name:     file.originalname,
							})));
					});
		} else {
			throw (new Error('provider-not-yet-supported'));
		}
	}
}

module.exports = new MediaStorage();
