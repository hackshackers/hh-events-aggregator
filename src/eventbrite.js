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

function _separate_events_from_master_array(master_event_array) {
// Given a master event array (ie. the array of responses from EventBrite's 
// website, this function will strip out unnecessary information and
// save the events into a singular array. 
// This is a necessary filtering process to be able to present the
// events on the homepage. 

var event_output_array = [];
var event_output_array_collapsed = [];

master_event_array.forEach(x => event_output_array.push(x["data"]["events"]))

//Collapse the array of arrays, so as to not have a series of arrays
event_output_array.forEach(x => event_output_array_collapsed.push(...x))

return event_output_array_collapsed

}

module.exports = function() {
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

async function _downloadEventBriteInfo(orgIdarray) {
var promises = [];

function download_event_data(event_id) {
return axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/${event_id}/events/` , {
       headers: {
         'Authorization': `Bearer ${config.eventbriteToken}`
        }
}    )
}

// Generate an array of functions, in accordance with the IDs returned
//  in the array
orgIdarray.forEach(x => promises.push({func: download_event_data, arg: x}));

// For each organization ID, request the list of events from EventBrite
const events_array = Promise.all(promises.map((prom) => prom.func(prom.arg))).then(function (results) {

// With the response blobs from EventBrite, strip out the individual event
// information
var event_array = _separate_events_from_master_array(results)
return event_array

}).then((events_array => {
// For each event, create a valid event string
event_string_array = [];

events_array.forEach(x => event_string_array.push(_createValidVeventString(x)))
return event_string_array
}))

return events_array
}


 /**
 *  Download the list of organization IDs from the json file stored in
 * the hacks-hackers S3 bucket.
 **/ 
   const response = axios.get(`${config.APIUrl}eventbrite.json`);
   console.log("this that" , response)

const event_array = response.then(result => {
      return  _downloadEventBriteInfo(result.data["eventbrite_org_ids"])
})


return event_array
}
