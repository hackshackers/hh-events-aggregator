/**
 * Aggregation service for Hacks/Hackers local group events. 
 * Downloads information from indicated Facebook and EventBrite groups
 * Run as a scheduled event on AWS Lambda. To run from the command line:
 * $ node -e "require('./index').init()"
 */
const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;

const config = require('./src/config');
const processGroupUrls = require('./src/processGroupUrls');
const eventbriteDownload =  require('./src/eventbrite.js');

exports.init = async () => {
  // Fetch Eventbrite information.
    const results =  await eventbriteDownload();
  // Process EventBrite Information
    processGroupUrls(results);
}


