class Storage {
	use(Provider, options) {
		this.provider = new Provider();
		this.options = options;
	}

	upload(file) {
		this.provider.upload(file, this.options.dist);
	}
}

module.exports = new Storage();
