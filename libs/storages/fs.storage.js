const fs = require('fs');
const { promisify } = require('util');

class FsStorage {
	upload(file, dist) {
		if (!dist) throw (new Error('no-dist-provided'));
		const accessAsync = promisify(fs.access);
		const writeFile = promisify(fs.writeFile);
		const mkdirAsync = promisify(fs.mkdir);
		accessAsync(dist, fs.constants.W_OK)
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
	}
}

module.exports = FsStorage;
