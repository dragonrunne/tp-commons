const algoliasearch = require('algoliasearch');

let Algolia = null;
if (process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY) {
	Algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
}

class ModuleService {
	constructor(model, algoliaConf) {
		this.model = model;
		if (Algolia && algoliaConf) {
			this.algoliaIndex = Algolia.initIndex(this.model.collection.collectionName);
			this.algoliaIndex.setSettings(algoliaConf);
		}
	}

	_generateSearchQuery(query) {
		if (query.q && this.model.schema._indexes.length === 1 &&
			this.model.schema._indexes[0].length === 2) {
			query.$or = [];
			const indexes = this.model.schema._indexes[0][0];
			Object.keys(indexes).forEach((key) => {
				query.q.split(' ').forEach((q) => {
					const o = {};
					o[key] = new RegExp(`${q}`, 'i');
					query.$or.push(o);
				});
			});
		}
		Reflect.deleteProperty(query, 'q');
		return query;
	}

	create(object) {
		return this.model.create(object)
			.then((obj) => {
				if (!Algolia || !this.algoliaIndex) return obj;
				obj.objectID = obj._id;
				return this.algoliaIndex.partialUpdateObject(obj)
					.then(() => this.model.findOneAndUpdate({
						_id:                obj._id,
						indexed_by_algolia: true,
					}, object, {
						new: true,
					}))
					.then(() => obj);
			});
	}

	getOne(query) {
		return this.model.findOne(query);
	}

	getById(id) {
		return this.getOne({
			_id: id,
		});
	}

	getAll(query = {}, limit = 0, options = {}) {
		query = this._generateSearchQuery(query);
		return this.model
			.find(query, null, options)
			.limit(limit);
	}

	getAllPaginate(query, options) {
		if (options.hasOwnProperty('limit') && options.limit === 0) {
			options.limit = 10000;
		}
		query = this._generateSearchQuery(query);
		return this.model.paginate(query, options);
	}

	update(id, object, options = {}) {
		return this.model.findOneAndUpdate({
			_id: id,
		}, object, Object.assign({
			new: true,
		}, options)).then((obj) => {
			if (!Algolia || !this.algoliaIndex) return obj;
			obj.objectID = obj._id;
			return this.algoliaIndex.partialUpdateObject(obj)
				.then(() => obj);
		});
	}

	removeById(id) {
		return this.model.findByIdAndRemove({
			_id: id,
		}).then((obj) => {
			if (!Algolia || !this.algoliaIndex) return obj;
			return this.algoliaIndex.deleteObject(id)
				.then(() => obj);
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
