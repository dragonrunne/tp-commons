class ModuleService {
	constructor(model) {
		this.model = model;
	}

	_generateSearchQuery(query) {
		if (query.q && this.model.schema._indexes.length === 1 &&
			this.model.schema._indexes[0].length === 2) {
			query.$or = [];
			const indexes = this.model.schema._indexes[0][0];
			Object.keys(indexes).forEach((key) => {
				const o = {};
				o[key] = new RegExp(`^${query.q}`, 'i');
				query.$or.push(o);
			});
		}
		Reflect.deleteProperty(query, 'q');
		return query;
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
		query = this._generateSearchQuery(query);
		return this.model
			.find(query)
			.limit(limit);
	}

	getAllPaginate(query, options) {
		query = this._generateSearchQuery(query);
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
