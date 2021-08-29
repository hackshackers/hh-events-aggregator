const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');

const cyan = chalk.cyan;
const red = chalk.red;

/**
 * Downloads all of the information from the Eventbrite groups ndicated
 * in the evetbrite.json file of the AWS Bucket indicated in the config file.
 * Input: Bucket name, access parameters for bucket. 
 * Output: List of upcoming eventbrite events in indicated format.
 */

module.exports = function(eventId_array) {
  let downloadedEventBlobs= [];

  /**
   * Download all of the event information for each eventbrite
   * organization_id included in the json list.
   */
  const _downloadEventBriteInfo= async(eventId_array) => {
    eventId_array.forEach((x) => {
        console.log(`here with ${x}`)
     axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/${x}/events/`, { 
        headers: {
          'Authorization': `Bearer ${config.eventbriteToken}`
     }}
     ).then((response) => {
       console.log(`here, resopnse is: ${response}`);
       downloadedEventBlobs.push(response); 
     }).catch((err) => {
       console.log(red(`Error encountered with group_id: ${x}, ${err}`))
      }).then((stuff) => {
         console.log('blobs at end')
          for (var event of downloadedEventBlobs) {
            console.log(event['data']['events']);
            } 
      })
    }) 

     }  

 /**
 *  Download the list of event IDs from the json file stored in
 * the hacks-hackers S3 bucket.
 **/ 
         axios.get(`${config.APIUrl}eventbrite.json`)
          .then((response) => 
                _downloadEventBriteInfo(response.data["eventbrite_events"]))
         }

