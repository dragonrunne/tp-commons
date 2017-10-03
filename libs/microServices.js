const path = require('path');

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
	CATEGORY:  path.join(CATEGORY.url, CATEGORY.name),
	METAMODEL: path.join(METAMODEL.url, METAMODEL.name),
	PRODUCT:   path.join(PRODUCT.url, PRODUCT.name),

	STOCK:         path.join(STOCK.url, STOCK.name),
	STOCK_ACCOUNT: path.join(STOCK_ACCOUNT.url, STOCK_ACCOUNT.name),

	AFFILIATE:    path.join(AFFILIATE.url, AFFILIATE.name),
	BRAND:        path.join(BRAND.url, BRAND.name),
	ORGANIZATION: path.join(ORGANIZATION.url, ORGANIZATION.name),
};
