const moment = require('moment');
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
			startTime: moment(payload.event.date.start).toISOString(),
			endTime:   moment(payload.event.date.end).toISOString(),
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
		const userCustomFieldRestricted = ['gender', 'street', 'zipcode', 'city', 'language', 'country', 'birth'];

		const genderField = payload.user.custom_fields.find((customField) => customField.key === 'gender');
		const streetField = payload.user.custom_fields.find((customField) => customField.key === 'street');
		const zipCodeField = payload.user.custom_fields.find((customField) => customField.key === 'zipcode');
		const cityField = payload.user.custom_fields.find((customField) => customField.key === 'city');
		const countryField = payload.user.custom_fields.find((customField) => customField.key === 'country');
		const languageField = payload.user.custom_fields.find((customField) => customField.key === 'language');
		const birthField = payload.user.custom_fields.find((customField) => customField.key === 'birth');

		const tester = {
			gender:    genderField ? genderField.value : null,
			firstName: payload.user.firstname,
			lastName:  payload.user.lastname,
			email:     payload.user.email,
			address:   {
				street:  streetField ? streetField.value : null,
				zipcode: zipCodeField ? zipCodeField.value : null,
				city:    cityField ? cityField.value : null,
				country: countryField ? countryField.value : null,
			},
			phone:    payload.user.phone,
			id:       payload.user._id,
			language: languageField ? languageField.value : null,
			birth:    birthField ? moment(birthField.value).toISOString() : null,
		};

		payload.user.custom_fields.forEach((customField) => {
			if (userCustomFieldRestricted.indexOf(customField.key) === -1) {
				tester[customField.key] = customField.value;
			}
		});

		return tester;
	}

	static run(payload) {
		const booking = {};

		booking.startTime = payload.slot ? moment(payload.slot.dates.start).toISOString() : null;
		booking.endTime = payload.slot ? moment(payload.slot.dates.end).toISOString() : null;
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
