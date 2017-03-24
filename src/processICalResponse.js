const chalk = require('chalk');
const red = chalk.red;
const cyan = chalk.cyan;
const yellow = chalk.yellow;

/**
 * Use pick out VEVENTs from VCALENDAR string
 */
module.exports = function(response, url) {
	try {
		// trim everything before the first BEGIN:VEVENT
		const firstVeventStart = response.data.indexOf('BEGIN:VEVENT');
		if (-1 === firstVeventStart) {
			console.log(yellow(`No VEVENT components in ${url}`));
			return '';
		}
		const lastVeventEnd = response.data.lastIndexOf('END:VEVENT');

		console.log(cyan(`Found VEVENT components in ${url}`));

		return response.data
			.slice(firstVeventStart, lastVeventEnd)
			.concat("END:VEVENT\n");

	} catch (err) {
		console.log(red(`Failed to parse data from ${url}`));
		return null;
	}
};
