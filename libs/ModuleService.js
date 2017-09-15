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

	update(id, object) {
		return this.model.findOneAndUpdate({
			_id: id,
		}, object, {
			new: true,
		});
	}

	removeById(id) {
		return this.model.findByIdAndRemove({
			_id: id,
		});
	}

	exists(id) {
		return this.model.count({
			_id: id,
		}).then((length) => !!length);
	}
}

module.exports = ModuleService;
