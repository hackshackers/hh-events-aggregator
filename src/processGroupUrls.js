const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;
const processICalResponse = require('./processICalResponse');

module.exports = function(groupUrls, outputStream) {
	let requestsToMake = groupUrls.length;

	// post-response handler
	function _afterResponse() {
		requestsToMake--;
		console.log(yellow(`${requestsToMake} requests remaining...`));
		if (0 >= requestsToMake) {
			console.log(cyan('Completed requests, writing output file'));
			outputStream.end();
		}
	};

	// Process the URLs
	groupUrls.forEach((url) => {
		axios.get(url)
			.then((response) => {
				console.log(yellow(`Processing ${url}`));
				const toStream = processICalResponse(url, response);
				outputStream.write(toStream, 'utf8', _afterResponse);
			})
			.catch((err) => {
				console.log(red(`Error with ${url}`));
				console.log(err);
				_afterResponse();
			});
	});
}
