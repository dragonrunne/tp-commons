const { pick } = require('lodash');
const algoliasearch = require('algoliasearch');

let Algolia = null;
if (process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY) {
	Algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
}

class ModuleService {
	constructor(model, algoliaConf) {
		this.model = model;
		if (Algolia && algoliaConf) {
			this.algoliaConf = algoliaConf;
			this.algoliaIndex = Algolia.initIndex(this.model.collection.collectionName);
			this.algoliaIndex.setSettings({
				searchableAttributes:  this.algoliaConf.searchableAttributes,
				attributesForFaceting: this.algoliaConf.attributesForFaceting,
			});
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
					try {
						o[key] = new RegExp(`${q}`, 'i');
						query.$or.push(o);
					} catch (e) {
						// continue
					}
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
				const algoliaRestrictedObject =
					pick(obj, this.algoliaConf.indexableAttributes || Object.keys(obj));
				algoliaRestrictedObject.objectID = obj._id;
				return this.algoliaIndex.partialUpdateObject(algoliaRestrictedObject)
					.then(() => {
						if (!obj.indexed_by_algolia) {
							return this.model.findOneAndUpdate({
								_id:                obj._id,
								indexed_by_algolia: true,
							}, object, {
								new: true,
							});
						}
						return obj;
					})
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
			const algoliaRestrictedObject =
					pick(obj, this.algoliaConf.indexableAttributes || Object.keys(obj));
			algoliaRestrictedObject.objectID = obj._id;
			return this.algoliaIndex.partialUpdateObject(algoliaRestrictedObject)
				.then(() => {
					if (!obj.indexed_by_algolia) {
						return this.model.findOneAndUpdate({
							_id:                obj._id,
							indexed_by_algolia: true,
						}, object, {
							new: true,
						});
					}
					return obj;
				})
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
