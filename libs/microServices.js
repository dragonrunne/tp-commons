const url = require('url');

/**
 * TP_PM
 */
const CATEGORY = {
	url:  process.env.TP_PM_URL || 'http://localhost:3001',
	name: 'categories',
};

const METAMODEL = {
	url:  process.env.TP_PM_URL || 'http://localhost:3001',
	name: 'metamodels',
};

const PRODUCT = {
	url:  process.env.TP_PM_URL || 'http://localhost:3001',
	name: 'products',
};

const STOCK = {
	url:  process.env.TP_PM_URL || 'http://localhost:3001',
	name: 'stocks',
};

const STOCK_ACCOUNT = {
	url:  process.env.TP_PM_URL || 'http://localhost:3001',
	name: 'stockAccounts',
};

/**
 * TP_BM
 */
const BOOKING = {
	url:  process.env.TP_BM_URL || 'http://localhost:3002',
	name: 'bookings',
};

const EVENT = {
	url:  process.env.TP_BM_URL || 'http://localhost:3002',
	name: 'events',
};

const SLOT = {
	url:  process.env.TP_BM_URL || 'http://localhost:3002',
	name: 'slots',
};

/**
 * TP_UM
 */
const AFFILIATE = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'affiliates',
};

const AUTH_BACK = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'authBack',
};

const AUTH_FRONT = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'authFront',
};

const BRAND = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'brands',
};

const ORGANIZATION = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'organizations',
};

const USER_BACK = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'usersBack',
};

const USER_FRONT = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'usersFront',
};

/**
 * TP_IMPEXP
 */
const IMPORT = {
	url:  process.env.TP_IMPEXP_URL || 'http://localhost:3004',
	name: 'import',
};

const TEMPLATE = {
	url:  process.env.TP_IMPEXP_URL || 'http://localhost:3004',
	name: 'templates',
};

/**
 * TP_CM
 */
const LOCALE = {
	url:  process.env.TP_CM_URL || 'http://localhost:3005',
	name: 'locales',
};

const MAIL = {
	url:  process.env.TP_CM_URL || 'http://localhost:3005',
	name: 'mails',
};

const PDF = {
	url:  process.env.TP_CM_URL || 'http://localhost:3005',
	name: 'pdfs',
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

	BOOKING: {
		url:  url.resolve(BOOKING.url, BOOKING.name),
		name: BOOKING.name,
	},
	EVENT: {
		url:  url.resolve(EVENT.url, EVENT.name),
		name: EVENT.name,
	},
	SLOT: {
		url:  url.resolve(SLOT.url, SLOT.name),
		name: SLOT.name,
	},

	AFFILIATE: {
		url:  url.resolve(AFFILIATE.url, AFFILIATE.name),
		name: AFFILIATE.name,
	},
	AUTH_BACK: {
		url:  url.resolve(AUTH_BACK.url, '/auth/back'),
		name: AUTH_BACK.name,
	},
	AUTH_FRONT: {
		url:  url.resolve(AUTH_FRONT.url, '/auth/front'),
		name: AUTH_FRONT.name,
	},
	BRAND: {
		url:  url.resolve(BRAND.url, BRAND.name),
		name: BRAND.name,
	},
	ORGANIZATION: {
		url:  url.resolve(ORGANIZATION.url, ORGANIZATION.name),
		name: ORGANIZATION.name,
	},
	USER_BACK: {
		url:  url.resolve(USER_BACK.url, '/users/back'),
		name: USER_BACK.name,
	},
	USER_FRONT: {
		url:  url.resolve(USER_FRONT.url, '/users/front'),
		name: USER_FRONT.name,
	},

	IMPORT: {
		url:  url.resolve(IMPORT.url, IMPORT.name),
		name: IMPORT.name,
	},
	TEMPLATE: {
		url:  url.resolve(TEMPLATE.url, TEMPLATE.name),
		name: TEMPLATE.name,
	},

	LOCALE: {
		url:  url.resolve(LOCALE.url, LOCALE.name),
		name: LOCALE.name,
	},
	MAIL: {
		url:  url.resolve(MAIL.url, MAIL.name),
		name: MAIL.name,
	},
	PDF: {
		url:  url.resolve(PDF.url, PDF.name),
		name: PDF.name,
	},
};
