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
// const parseGroupUrls = require('./src/parseGroupUrls');
const processGroupUrls = require('./src/processGroupUrls');
const eventbriteDownload =  require('./src/eventbrite.js');


async function printers(input){
await console.log("printers ", input)
}

exports.init = async () => {
    // Fetch Eventbrite information.
     //  const results =  eventbriteDownload();
         const results =  await eventbriteDownload();
          console.log("final results: ", results)
          printers(results)

//.then(response => console.log("--!!!!!---", response))
     //  console.log("results main: ", results)
       //.then(eventstring => console.log("In the main, response is: ", eventstring)
//   .then(x => console.log(x));
}



//       axios.get(`${config.APIUrl}eventbrite.json`)
//          .then((response) => {
//                 //console.log(response.data["eventbrite_events"])
//                eventbriteDownload(response.data["eventbrite_events"])
//                   })



//  // Start fetching the event informacion. 
//  console.log(cyan(`Fetching groups data from ${config.APIUrl}`));
//  axios.get(config.APIUrl)
//    .then((response) => {
//      console.log(cyan('Fetched groups data, parsing URLs'));
//      return parseGroupUrls(response.data);
//    })
//    .catch((err) => {
//      console.log(red('Error fetching or parsing groups data'));
//      console.log(err);
//    })
//    .then((groupUrls) => {
//      console.log(cyan(`Found ${groupUrls.length} calendar URLs, parsing now...`));
//      processGroupUrls(groupUrls);
//}
