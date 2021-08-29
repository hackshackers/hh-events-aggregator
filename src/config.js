/**
 * Config vars
 */
module.exports = {
  APIUrl: 'http://hh-sandbox.s3-website-us-west-2.amazonaws.com/groups-json/',
  outputPath: 'hackshackers.ical',
  eventbriteToken: 'B2G4XZJKAF35RM6ZXKSR',
  eventBriteUrl: 'https://www.eventbriteapi.com/',
  eventBriteApiVersion: 'v3',
  calProperties: {
    version: '3.0',
    prodid: 'Hacks/Hackers aggregated global calendar',
    calscale: 'GREGORIAN',
    method: 'PUBLISH',
    tzid: 'UTC',
  },
  aws: {
    buckets: ['hh-sandbox', 'hh-staging', 'hh-production'],
    key: 'lib/hackshackers.ical',
  },
  vcalendar: {
    prepend: "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:Hacks/Hackers aggregated global events calendar\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nTZID:UTC\n",
    append: 'END:VCALENDAR',
  }
};
