const MAX_SAFE_INTEGER_32BITS = (2 ** 20) - 1;

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

	getOne(query) {
		return this.model.findOne(query);
	}

	getById(id) {
		return this.getOne({
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
		if (options.hasOwnProperty('limit') && options.limit === 0) {
			options.limit = 10000;
		}
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

	remove(query) {
		return this.model.remove(query);
	}

	exists(id) {
		return this.model.count({
			_id: id,
		}).then((length) => !!length);
	}

	count(query) {
		return this.model.count(query);
	}
}

module.exports = ModuleService;
