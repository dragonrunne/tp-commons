class Storage {
	use(Provider, options) {
		this.provider = new Provider();
		this.options = options;
	}

	upload(file, name) {
		return this.provider.upload(file, this.options.dist, name);
	}
}

module.exports = new Storage();
