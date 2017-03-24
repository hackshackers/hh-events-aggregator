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

const config = require('./src/config');
const parseGroupUrls = require('./src/parseGroupUrls');
const processGroupUrls = require('./src/processGroupUrls');
const setupICal = require('./src/setupICal');

// Set up calendar object to aggregate group feeds
const calendar = setupICal();
console.log(cyan(`Setup base VCALENDAR as:

${calendar.toString()}`));

// Initialize!
console.log(cyan(`Fetching groups data from ${config.APIUrl}`));
axios.get(config.APIUrl)
	.then((response) => {
		console.log(cyan('Fetched groups data, parsing URLs'));
		return parseGroupUrls(response.data);
	})
	.catch((err) => {
		console.log(red('Error fetching groups data'));
		console.log(err);
	})
	.then((groupUrls) => {
		console.log(cyan(`Found ${groupUrls.length} calendar URLs, parsing now...`));
		processGroupUrls(groupUrls, calendar);
	});