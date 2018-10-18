const Extractor = require('./extractor.base');
const joiSchemas = require('../../joiSchemas');
const Fetch = require('../../Fetch');
const microServices = require('../../microServices');

const schema = {
	_id:          joiSchemas.OBJECT_ID.required(),
	affiliate_id: joiSchemas.OBJECT_ID.required(),
	user_id:      joiSchemas.OBJECT_ID.required(),
	stock_id:     joiSchemas.OBJECT_ID.optional(),
	event_id:     joiSchemas.OBJECT_ID.optional().allow(null),
	dealer_id:    joiSchemas.OBJECT_ID.optional().allow(null), // To do check if event_id is present
	slot_id:      joiSchemas.OBJECT_ID.optional().allow(null),
	status:       joiSchemas.STRING.optional().allow(null),
};

class BookingWebhookExtractor extends Extractor {
	static _fetchUser(checkedPayload) {
		return Fetch.get({}, `${microServices.USER_FRONT.url}/${checkedPayload.user_id}`);
	}

	static _fetchEvent(checkedPayload) {
		return checkedPayload.event_id
			? Fetch.get({}, `${microServices.EVENT.url}/${checkedPayload.event_id}`)
			: Promise.resolve(null);
	}

	static _fetchDealer(checkedPayload) {
		return checkedPayload.dealer_id
			? Fetch.get({}, `${microServices.DEALER.url}/${checkedPayload.dealer_id}`)
			: Promise.resolve(null);
	}

	static _fetchStock(checkedPayload) {
		return checkedPayload.stock_id
			? Fetch.get({}, `${microServices.STOCK.url}/${checkedPayload.stock_id}`)
				.then((stock) => Fetch.get({}, `${microServices.PRODUCT.url}/${stock.product_id}`)
					.then((product) => {
						stock.product = product;
						return stock;
					}),)
			: Promise.resolve(null);
	}

	static _fetchSlot(checkedPayload) {
		return checkedPayload.slot_id
			? Fetch.get({}, `${microServices.SLOT.url}/${checkedPayload.slot_id}`)
			: Promise.resolve(null);
	}

	static async run(payload) {
		const checkedPayload = await BookingWebhookExtractor._validate(payload, schema);
		const extractedPayload = {
			_id:    checkedPayload._id,
			user:   null,
			event:  null,
			dealer: null,
			stock:  null,
			slot:   null,
			status: checkedPayload.status,
		};
		const promises = [];

		promises.push(BookingWebhookExtractor._fetchUser(checkedPayload).then((user) => {
			extractedPayload.user = user;
		}));
		promises.push(BookingWebhookExtractor._fetchEvent(checkedPayload).then((event) => {
			extractedPayload.event = event;
		}));
		promises.push(BookingWebhookExtractor._fetchDealer(checkedPayload).then((dealer) => {
			extractedPayload.dealer = dealer;
		}));
		promises.push(BookingWebhookExtractor._fetchStock(checkedPayload).then((stock) => {
			extractedPayload.stock = stock;
		}));
		promises.push(BookingWebhookExtractor._fetchSlot(checkedPayload).then((slot) => {
			extractedPayload.slot = slot;
		}));

		return Promise.all(promises).then(() => extractedPayload);
	}
}

module.exports = BookingWebhookExtractor;
