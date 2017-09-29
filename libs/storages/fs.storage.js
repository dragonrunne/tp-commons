const fs = require('fs');
const { promisify } = require('util');

const accessAsync = promisify(fs.access);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

class FsStorage {
	upload(file, dist, name) {
		if (!dist) throw (new Error('no-dist-provided'));

		return accessAsync(dist, fs.constants.W_OK)
			.then(() =>
				writeFileAsync(`${dist}/${file.originalname}`, file.data)
					.then(() => ({
						provider: 'fs',
						url:      `http://localhost:3001/uploads/${name}`,
						name,
					})),
			).catch(() => {
				mkdirAsync(dist).then(() => writeFileAsync(`${dist}/${name}`, file.data)
					.then(() => ({
						provider: 'fs',
						url:      `http://localhost:3001/uploads/${name}`,
						name,
					})));
			});
	}
}

module.exports = FsStorage;
