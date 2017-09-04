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

	getAll(query = {}, limit = 0) {
		return this.model
			.find(query)
			.limit(limit);
	}

	getAllPaginate(query, options) {
		return this.model.paginate(query, options);
	}
}

module.exports = ModuleService;
