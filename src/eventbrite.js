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

  function _stripSymbolsFromString(input_string) {
         return input_string.replace(/[^a-zA-Z0-9 ]/g, "")
       };

  function  _createValidVeventString(event) {
     // Convert each event from EventBrite into an Ical Event string
     // This string will be later appended to the master calendar we create.

    return `BEGIN:VEVENT\nDTSTART:${_stripSymbolsFromString(event['start']['utc'])}\nDTEND:${_stripSymbolsFromString(event['end']['utc'])}\nDTSTAMP:${_stripSymbolsFromString(event['created'])}\nLAST-MODIFIED:${_stripSymbolsFromString(event['changed'])}\nSUMMARY:${event['description']['text']}\nEND:VEVENT`
      };



module.exports = async function(orgIdarray) {
  let downloadedEventBlobs= [];
  let calendarStringOfEvents= "";

 /*
 * Convert the Event informaton downloaded into blob for storage on website
 * and subsequent access by clients.
 * Here, we will need to store the following information: 
 * we need to find out what formats are necessary (?)
 * DTSTAMP, DTSTART, DTEND, SUMMARY. 
  /**
   * Download all of the event information for each eventbrite
   * organization_id included in the json list.
   */
  const _downloadEventBriteInfo= async(orgIdarray) => {
    orgIdarray.forEach((x) => {
     axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/${x}/events/`, { 
        headers: {
          'Authorization': `Bearer ${config.eventbriteToken}`
         }}
     ).then(response => downloadedEventBlobs.push(response))
     .then(stuff => {
          for (var event_blob of downloadedEventBlobs) {
            for (var event of event_blob['data']['events']) {
                // DTSTAMP, DTSTART, DTEND, SUMMARY.
                 calendarStringOfEvents += _createValidVeventString(event)  
               }
            } 
        console.log("end: ", calendarStringOfEvents) 
           calendarStringOfEvents 

      }).catch(err => {
       console.log(red(`Error encountered with group_id: ${x}, ${err}`))
      })
    }) 
     }  

 /**
 *  Download the list of organization IDs from the json file stored in
 * the hacks-hackers S3 bucket.
 **/ 
         axios.get(`${config.APIUrl}eventbrite.json`)
          .then((response) =>  
          _downloadEventBriteInfo(response.data["eventbrite_org_ids"]))
           .then(eventstring => {
              console.log("in main, reponse is: ", eventstring)
           })
           }

