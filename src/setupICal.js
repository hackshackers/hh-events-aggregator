const ICAL = require('ical.js');
const properties = require('./config').calProperties;

module.exports = function() {
	const cal = new ICAL.Component(['vcalendar', [], []]);
	Object.keys(properties).forEach((key) => {
		cal.updatePropertyWithValue(key, properties[key]);
	});
	return cal;
}