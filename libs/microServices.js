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

const FEEDBACK = {
	url:  process.env.TP_BM_URL || 'http://localhost:3002',
	name: 'feedbacks',
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

const AUTH_GATEWAY = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'authGateway',
};

const AUTH_CRON = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'authCron',
};

const AUTH_IMPEXP = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'authImpExp',
};

const BRAND = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'brands',
};

const DEALER = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'dealers',
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

const HOOK = {
	url:  process.env.TP_UM_URL || 'http://localhost:3003',
	name: 'hooks',
};

/**
 * TP_IMPEXP
 */
const IMPORT = {
	url:  process.env.TP_IMPEXP_URL || 'http://localhost:3004',
	name: 'import',
};

const EXPORT = {
	url:  process.env.TP_IMPEXP_URL || 'http://localhost:3004',
	name: 'export',
};

const EXPORTS = {
	url:  process.env.TP_IMPEXP_URL || 'http://localhost:3004',
	name: 'exports',
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

const ARTICLE = {
	url:  process.env.TP_CM_URL || 'http://localhost:3005',
	name: 'articles',
};

const RESOURCE = {
	url:  process.env.TP_CM_URL || 'http://localhost:3005',
	name: 'resources',
};

/**
 * TP_CRON
 */
const JOB = {
	url:  process.env.TP_CRON_URL || 'http://localhost:3006',
	name: 'jobs',
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
	FEEDBACK: {
		url:  url.resolve(FEEDBACK.url, FEEDBACK.name),
		name: FEEDBACK.name,
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
	AUTH_GATEWAY: {
		url:  url.resolve(AUTH_GATEWAY.url, '/auth/gateway'),
		name: AUTH_GATEWAY.name,
	},
	AUTH_CRON: {
		url:  url.resolve(AUTH_CRON.url, '/auth/cron'),
		name: AUTH_CRON.name,
	},
	AUTH_IMPEXP: {
		url:  url.resolve(AUTH_IMPEXP.url, '/auth/impexp'),
		name: AUTH_IMPEXP.name,
	},
	BRAND: {
		url:  url.resolve(BRAND.url, BRAND.name),
		name: BRAND.name,
	},
	DEALER: {
		url:  url.resolve(DEALER.url, DEALER.name),
		name: DEALER.name,
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
	HOOK: {
		url:  url.resolve(USER_FRONT.url, '/hooks'),
		name: HOOK.name,
	},

	IMPORT: {
		url:  url.resolve(IMPORT.url, IMPORT.name),
		name: IMPORT.name,
	},
	EXPORT: {
		url:  url.resolve(EXPORT.url, EXPORT.name),
		name: EXPORT.name,
	},
	EXPORTS: {
		url:  url.resolve(EXPORTS.url, EXPORTS.name),
		name: EXPORTS.name,
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
	ARTICLE: {
		url:  url.resolve(ARTICLE.url, ARTICLE.name),
		name: ARTICLE.name,
	},
	RESOURCE: {
		url:  url.resolve(RESOURCE.url, RESOURCE.name),
		name: RESOURCE.name,
	},

	JOB: {
		url:  url.resolve(JOB.url, JOB.name),
		name: JOB.name,
	},
};
