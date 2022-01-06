const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;
const processICalResponse = require('./processICalResponse');
const config = require('./config');
const S3Deploy = require('./S3Deploy');

/**
 * Fetch list of iCal feeds and save events to stream
 *
 * @param array  groupUrls    List of groups' iCal feed urls
*/

module.exports = function(eventString) {
     // let requestsToMake = groupUrls.length;
     let outputBuffer = Buffer.from(config.vcalendar.prepend);
     // post-response handler
  function _afterResponse() {
     outputBuffer = Buffer.concat([outputBuffer, Buffer.from(config.vcalendar.append)]);
     S3Deploy(outputBuffer);
  };
  // Add events to the buffer
   for (const x of eventString) {
     outputBuffer = Buffer.concat([outputBuffer, Buffer.from(x)]);
    }
   eventBuffer = Buffer.from(eventString, 'utf8')
    _afterResponse();
