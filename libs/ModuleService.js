class ModuleService {
	constructor(model) {
		this.model = model;
	}

	create(object) {
		return this.model.create(object);
	}

	getById(id) {
		return this.model.findOne({
			_id: id,
		});
	}
}

module.exports = ModuleService;
