const url = require('url');

/**
 * TP_PM
 */
const CATEGORY = {
	url:  process.env.TP_PM_URL || 'http://localhost:3002',
	name: 'categories',
};

const METAMODEL = {
	url:  process.env.TP_PM_URL || 'http://localhost:3002',
	name: 'metamodels',
};

const PRODUCT = {
	url:  process.env.TP_PM_URL || 'http://localhost:3002',
	name: 'products',
};

/**
 * TP_SM
 */
const STOCK = {
	url:  process.env.TP_SM_URL || 'http://localhost:3001',
	name: 'stocks',
};

const STOCK_ACCOUNT = {
	url:  process.env.TP_SM_URL || 'http://localhost:3001',
	name: 'stockAccounts',
};

/**
 * TP_UM
 */
const AFFILIATE = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'affiliates',
};

const BRAND = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'brands',
};

const ORGANIZATION = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'organizations',
};

/**
 * TP_IMPEXP
 */
const IMPORT = {
	url:  process.env.TP_IMPEXP || 'http://localhost:3004',
	name: 'import',
};

module.exports = {
	CATEGORY: {
		url:  url.resolve(CATEGORY.url, CATEGORY.name),
		name: CATEGORY.name,
	},
	METAMODEL: {
		url:  url.resolve(METAMODEL.url, METAMODEL.name),
		name: METAMODEL.name,
	},
	PRODUCT: {
		url:  url.resolve(PRODUCT.url, PRODUCT.name),
		name: PRODUCT.name,
	},

	STOCK: {
		url:  url.resolve(STOCK.url, STOCK.name),
		name: STOCK.name,
	},
	STOCK_ACCOUNT: {
		url:  url.resolve(STOCK_ACCOUNT.url, STOCK_ACCOUNT.name),
		name: STOCK_ACCOUNT.name,
	},

	AFFILIATE: {
		url:  url.resolve(AFFILIATE.url, AFFILIATE.name),
		name: AFFILIATE.name,
	},
	BRAND: {
		url:  url.resolve(BRAND.url, BRAND.name),
		name: BRAND.name,
	},
	ORGANIZATION: {
		url:  url.resolve(ORGANIZATION.url, ORGANIZATION.name),
		name: ORGANIZATION.name,
	},

	IMPORT: {
		url:  url.resolve(IMPORT.url, IMPORT.name),
		name: IMPORT.name,
	},
};
