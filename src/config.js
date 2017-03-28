/**
 * Config vars
 */
module.exports = {
  APIUrl: 'http://hh-production.s3-website-us-west-2.amazonaws.com/groups-json/',
  outputPath: 'hackshackers.ical',
  calProperties: {
    version: '2.0',
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
