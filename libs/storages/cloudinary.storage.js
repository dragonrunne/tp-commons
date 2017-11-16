const Cloudinary = require('cloudinary');

class CloudinaryStorage {
	constructor() {
		this.name = 'cloudinary';
	}

	upload(file) {
		return new Promise((resolve, reject) => {
			try {
				Cloudinary.uploader.upload_stream((result) => {
					resolve(result.url);
				}).end(file.data);
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = CloudinaryStorage;
