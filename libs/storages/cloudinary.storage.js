const Cloudinary = require('cloudinary');

class CloudinaryStorage {
	upload(file) {
		return new Promise((resolve, reject) => {
			try {
				Cloudinary.upload_stream((result) => resolve({
					provider: 'cloudinary',
					url:      result.url,
					name:     file.originalname,
				})).end(file.buffer);
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = CloudinaryStorage;
