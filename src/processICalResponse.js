const ICAL = require('ical.js');
const chalk = require('chalk');
const red = chalk.red;

/**
 * Use ical.js to parse ICS data into array of jCal events
 */
module.exports = function(response, url) {
	try {
		// Parse ICAL data
		var jCalData = ICAL.parse(response.data);
		var comp = new ICAL.Component(jCalData[1]);

		// Fetch the VEVENT parts
		return comp.getAllSubcomponents('vevent');
	} catch (err) {
		console.log(red(`Failed to parse ICS data from ${url}`));
		return null;
	}
};
