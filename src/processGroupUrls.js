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
module.exports = function(groupUrls) {
  let requestsToMake = groupUrls.length;
  let outputBuffer = Buffer.from(config.vcalendar.prepend);

  // post-response handler
  function _afterResponse() {
    requestsToMake--;
    console.log(yellow(`${requestsToMake} requests remaining...`));
    if (0 >= requestsToMake) {
      console.log(cyan('Completed requests, writing output'));
      outputBuffer = Buffer.concat([outputBuffer, Buffer.from(config.vcalendar.append)]);
      S3Deploy(outputBuffer);
    }
  };

  // Process the URLs
  groupUrls.forEach((url) => {
    axios.get(url)
      .then((response) => {
        console.log(yellow(`Processing ${url}`));
        processICalResponse(response.data, url)
          .then((vevents) => {
            outputBuffer = Buffer.concat([outputBuffer, Buffer.from(vevents)]);
            _afterResponse();
          })
          .catch(() => console.log(red(`Failed to parse data from ${url}`)));
      })
      .catch((err) => {
        console.log(red(`${err.response.status} error for ${url}`));
        _afterResponse();
      });
  });
}
