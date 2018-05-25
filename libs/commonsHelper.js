const _ = require('lodash');

function findFirstLabelFilled(labels) {
	const lb = _.pickBy(labels, (label) => label && label.length);
	return lb[Object.keys(lb)[0]];
}

class CommonsHelper {
	static processLabels(labels) {
		const languages = [
			'en',
			'fr',
			'it',
			'de',
			'es',
			'nl',
			'sv',
			'pt',
		];
		languages.forEach((lang) => {
			if (!labels[lang] || !labels[lang].length) {
				labels[lang] = labels.en && labels.en.length ?
					labels.en : findFirstLabelFilled(labels);
			}
		});
	}
}

module.exports = CommonsHelper;
