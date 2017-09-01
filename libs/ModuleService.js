class ModuleService {
	constructor(model) {
		this.model = model;
	}

	getById(id) {
		return this.model.findOne({
			_id: id,
		});
	}
}

module.exports = ModuleService;
