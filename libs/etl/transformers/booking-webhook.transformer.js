const Transformer = require('./transformer.base');

class BookingWebhookTransformer extends Transformer {
	static _formatDealer(payload) {
		if (!payload.dealer) {
			return null;
		}
		return {
			name:      payload.dealer.name,
			shortname: payload.dealer.dealer_ref,
			location:  {
				address:     payload.dealer.location.address,
				coordinates: payload.dealer.location.geolocation,
			},
			id: payload.dealer._id,
		};
	}

	static _formatEvent(payload) {
		if (!payload.event) {
			return null;
		}
		return {
			name:      payload.event.title,
			address:   payload.event.location.address,
			startTime: payload.event.date.start,
			endTime:   payload.event.date.end,
			id:        payload.event._id,
		};
	}

	static _formatStock(payload) {
		return {
			productName:  payload.stock.product.display_name,
			sku:          payload.stock.product.sku,
			serialNumber: payload.stock.serial,
			variants:     payload.stock.variants.map(({ key, value }) => ({ key, value })),
			id:           payload.stock._id,
		};
	}

	static _formatTester(payload) {
		const userCustomFieldRestricted = ['gender', 'street', 'zipcode', 'city', 'country', 'birth', 'marketingconsent'];

		const tester = {
			gender:    payload.user.custom_fields.find((customField) => customField.key === 'gender'),
			firstName: payload.user.firstname,
			lastName:  payload.user.lastname,
			email:     payload.user.email,
			address:   {
				street:  payload.user.custom_fields.find((customField) => customField.key === 'street'),
				zipcode: payload.user.custom_fields.find((customField) => customField.key === 'zipcode'),
				city:    payload.user.custom_fields.find((customField) => customField.key === 'city'),
				country: payload.user.custom_fields.find((customField) => customField.key === 'country'),
			},
			language:         payload.user.language.key,
			birth:            payload.user.custom_fields.find((customField) => customField.key === 'birth'),
			phone:            payload.user.phone,
			marketingconsent: !!payload.user.custom_fields.find((customField) => customField.key === 'marketingconsent'),
			id:               payload.user._id,
		};

		payload.user.custom_fields.forEach((customField) => {
			if (userCustomFieldRestricted.indexOf(customField.key) === -1) {
				tester[customField.key] = customField.value;
			}
		});

		return tester;
	}

	static transform(payload) {
		const booking = {};

		booking.startTime = payload.slot ? payload.slot.dates.start : null;
		booking.endTime = payload.slot ? payload.slot.dates.end : null;
		booking.id = payload.slot ? payload._id : null;
		booking.tester = BookingWebhookTransformer._formatTester(payload);
		booking.stock = BookingWebhookTransformer._formatStock(payload);
		booking.event = BookingWebhookTransformer._formatEvent(payload);
		// On appelle Dealer, un Store dans ce transform
		booking.store = BookingWebhookTransformer._formatDealer(payload);

		return Promise.resolve(booking);
	}
}

module.exports = BookingWebhookTransformer;
