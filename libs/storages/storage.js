class Storage {
	use(Provider, options) {
		this.provider = new Provider();
		this.options = options || {};
	}

	async upload(file, name, scope = '') {
		if (scope) {
			this.options.scope = scope;
		}
		const url = await this.provider.upload(file, name, this.options);
		return {
			provider: this.provider.name,
			url,
			name,
		};
	}
}

module.exports = new Storage();
