const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const red = chalk.red;
const green = chalk.green;
const yellow = chalk.yellow;
const processICalResponse = require('./processICalResponse');
const config = require('./config');
const fs = require('fs');

/**
 * Fetch list of iCal feeds and save events to stream
 *
 * @param array          groupUrls    List of groups' iCal feed urls
 * @param WritableStream outputStream Where we write the output
 */
module.exports = function(groupUrls, outputStream) {
  let requestsToMake = groupUrls.length;

  // post-response handler
  function _afterResponse() {
    requestsToMake--;
    console.log(yellow(`${requestsToMake} requests remaining...`));
    if (0 >= requestsToMake) {
      console.log(cyan('Completed requests, writing output file'));
      outputStream.write('END:VCALENDAR', 'utf8', (err) => {
        if (err) throw err;
        outputStream.end();
      })
    }
  };

  // Process the URLs
  groupUrls.forEach((url) => {
    axios.get(url)
      .then((response) => {
        console.log(yellow(`Processing ${url}`));
        processICalResponse(response.data, url)
          .then((vevents) =>
            outputStream.write(vevents || '', 'utf8', _afterResponse))
          .catch(() => console.log(red(`Failed to parse data from ${url}`)));
      })
      .catch((err) => {
        console.log(red(`${err.response.status} error for ${url}`));
        _afterResponse();
      });
  });
}
