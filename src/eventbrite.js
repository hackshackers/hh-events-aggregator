const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');
const cyan = chalk.cyan;
const red = chalk.red;


function test_print(here_input){
console.log("hello, we are printing ", here_input)
}

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

function testa() {
return axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/572302778549/events/` , {
       headers: {
         'Authorization': `Bearer ${config.eventbriteToken}`
        }
}    )};

function testb() {
return axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/125768645695/events/` , {
       headers: {
         'Authorization': `Bearer ${config.eventbriteToken}`
        }
} )};

const promised_land = Promise.all([testa(), testb()]).then(function (results) {
const acct =  results[0];
const perm =  results[1];
//console.log("perm", perm)

return results

}).then((returnedData => {
//test_print(returnedData)
//return returnedData
return "jigsaw"
}))

//    for (const x of orgIdarray) {
//      axios.get(`${config.eventBriteUrl}${config.eventBriteApiVersion}/organizations/${x}/events/`, { 
//        headers: {
//          'Authorization': `Bearer ${config.eventbriteToken}`
//         }}
//     ).then(response => test_print(response["status"])
//)
//}
return promised_land
}


//
//
//
//.then(function(response)  {
//       downloadedEventBlobs.push(response)
//       return response
//}).then(function(result) {
//
//// response => return downloadedEventBlobs.push(response) )
////     .then(function(result)  {
//          for (var event_blob of downloadedEventBlobs) {
//            for (var event of event_blob['data']['events']) {
//                // DTSTAMP, DTSTART, DTEND, SUMMARY.
//                 calendarStringOfEvents += _createValidVeventString(event)  
//               }
//            } 
//       //  console.log("end: ", calendarStringOfEvents) 
//	console.log("Terminó loop")
//	return calendarStringOfEvents
//      }).catch(err => {
//       console.log(red(`Error encountered with group_id: ${x}, ${err}`))
//      })
//        }
//
//     })
//   // }).then(calendarStringOfEvents => {
//  // return calendarStringOfEvents
////})
//}
 /**
 *  Download the list of organization IDs from the json file stored in
 * the hacks-hackers S3 bucket.
 **/ 
   const response = axios.get(`${config.APIUrl}eventbrite.json`);
   console.log("this that" , response)

//console.log(result.data["eventbrite_org_ids"])
// add trying
// _downloadEventBriteInfo(["572302778549", "125768645695"])

const event_array = response.then(result => {
         const results = _downloadEventBriteInfo(result.data["eventbrite_org_ids"])
     return results
}).then(result1 => {
   console.log("next in line result", result1)
   return result1
})

//console.log("EAR", event_array)

//.then(result => {
//console.log("result is: ", result)
//})



   // console.log("response is: ", response.data["eventbrite_org_ids"])
//     orgIdarray= response.data["eventbrite_org_ids"]
  //  const events = new Promise(_downloadEventBriteInfo)

//   results =  _downloadEventBriteInfo(response.data["eventbrite_org_ids"])






     // return Promise.all([_downloadEventBriteInfo(response.data["eventbrite_org_ids"])]).then((results) => {
    //console.log("results: ----- ", results)
//})
 
  // return await  _downloadEventBriteInfo(response.data["eventbrite_org_ids"])
   // const final_results = await _downloadEventBriteInfo(response.data["eventbrite_org_ids"]);
   // console.log("Final niick results: ", final_results)
return event_array
// return "hi"
}
