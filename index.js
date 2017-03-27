/**
 * Aggregation service for Hacks/Hackers local group iCal feeds
 * Run as a scheduled event on AWS Lambda. To run from the command line:
 * $ node -e "require('./index').init()"
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
const S3Deploy = require('./src/S3Deploy');

exports.init = () => {

  // Set up stream to write output
  const outputStream = fs.createWriteStream(config.outputPath);

  // Upload to S3 when complete
  outputStream.on('finish', () => {
    console.log(green(`Finished writing to ${config.outputPath}`));
    S3Deploy();
  });

  outputStream.write(config.vcalendar.prepend, 'utf8', () => {
    // Start fetching
    console.log(cyan(`Fetching groups data from ${config.APIUrl}`));
    axios.get(config.APIUrl)
      .then((response) => {
        console.log(cyan('Fetched groups data, parsing URLs'));
        return parseGroupUrls(response.data);
      })
      .catch((err) => {
        console.log(red('Error fetching or parsing groups data'));
        console.log(err);
      })
      .then((groupUrls) => {
        console.log(cyan(`Found ${groupUrls.length} calendar URLs, parsing now...`));
        processGroupUrls(groupUrls, outputStream);
      });
  });
}
