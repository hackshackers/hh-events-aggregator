const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;
const processICalResponse = require('./processICalResponse');
const config = require('./config');
const fs = require('fs');

module.exports = function(groupUrls, calendar) {
	let requestsToMake = groupUrls.length;

	// post-response handler
	function _afterResponse() {
		requestsToMake--;
		console.log(yellow(`${requestsToMake} requests remaining...`));
		if (0 >= requestsToMake) {
			console.log(cyan('Completed requests, writing output file'));
			fs.writeFile(config.outputPath, calendar.toString(), (err) => {
				if (err) throw err;
				console.log(green(`Wrote calendar to ${config.outputPath}`));
			});
		}
	};

	// Process the URLs
	groupUrls.forEach((url) => {
		axios.get(url)
			.catch((err) => {
				console.log(red(`${err.response.status} error for ${url}`));
				_afterResponse();
			})
			.then((response) => {
				console.log(yellow(`Processing ${url}`));
				const groupVevents = processICalResponse(response, url);
				if (groupVevents) {
					console.log(yellow(`Adding ${groupVevents.length} vevents`));
					groupVevents.forEach((vevent) => calendar.addSubcomponent(vevent));
				}
				_afterResponse();
			});
	});
}
