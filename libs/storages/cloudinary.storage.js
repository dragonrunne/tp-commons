const Cloudinary = require('cloudinary');

class CloudinaryStorage {
	upload(file, name) {
		return new Promise((resolve, reject) => {
			try {
				Cloudinary.upload_stream((result) => resolve({
					provider: 'cloudinary',
					url:      result.url,
					name,
				})).end(file.data);
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = CloudinaryStorage;
