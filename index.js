/**
 * Aggregation service for Hacks/Hackers local group iCal feeds
 * Intended to run as a scheduled event on AWS Lambda
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;

const readGroupFiles = require('./src/readGroupFiles');
const parseGroupUrls = require('./src/parseGroupUrls');
const processOutput = require('./src/processOutput');
const processResponse = require('./src/processResponse');

// Set up stream to write output
const outputStream = fs.createWriteStream('output.ical');

// Locate all the group data files
const groupFilesDir = path.join(__dirname, 'hackshackers-hugo-content/data/groups');
console.log(cyan(`Scanning ${groupFilesDir}`));
const groupFiles = readGroupFiles(groupFilesDir);
console.log(cyan(`Found ${groupFiles.length} files`));

// Parse valid iCal URLs from the available files
const groupUrls = parseGroupUrls(groupFiles);
const requestsToMake = groupUrls.length;

// post-response handler
function _afterResponse() {
	requestsToMake--;
	console.log(yellow(`${requestsToMake} requests remaining...`));
	if (0 >= requestsToMake) {
		console.log(cyan('Completed requests, processing output file'));
		processOutput(outputStream);
	}
};

// Process the URLs
console.log(cyan(`Processing ${requestsToMake} iCal feed URLs...`));
groupUrls.forEach((url) => {
	axios.get(url)
		.then((response) => {
			console.log(yellow(`Processing ${url}`));
			processResponse(response);
			_afterResponse();
		})
		.catch((error) => {
			console.log(red(`Error with ${url}`));
			console.log(error);
			_afterResponse();
		});
});