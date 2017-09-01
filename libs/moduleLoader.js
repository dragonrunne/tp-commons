const fs = require('fs');
const path = require('path');

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const getDirectories = (source) =>
	fs.readdirSync(source).map((name) => path.join(source, name)).filter(isDirectory);

module.exports = (dirname, express, app) => {
	const source = `${dirname}/modules`;
	const modules = getDirectories(source);

	modules.forEach((module) => {
		const moduleName = path.basename(module);
		const ModuleClass = require(`${dirname}/modules/${moduleName}/${moduleName}.module.js`); // eslint-disable-line global-require
		return new ModuleClass(express, app);
	});
};
