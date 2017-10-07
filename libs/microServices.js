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

module.exports = {
	CATEGORY:  url.resolve(CATEGORY.url, CATEGORY.name),
	METAMODEL: url.resolve(METAMODEL.url, METAMODEL.name),
	PRODUCT:   url.resolve(PRODUCT.url, PRODUCT.name),

	STOCK:         url.resolve(STOCK.url, STOCK.name),
	STOCK_ACCOUNT: url.resolve(STOCK_ACCOUNT.url, STOCK_ACCOUNT.name),

	AFFILIATE:    url.resolve(AFFILIATE.url, AFFILIATE.name),
	BRAND:        url.resolve(BRAND.url, BRAND.name),
	ORGANIZATION: url.resolve(ORGANIZATION.url, ORGANIZATION.name),
};
