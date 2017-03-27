/**
 * Config vars
 */
module.exports = {
  APIUrl: 'http://hh-sandbox.s3-website-us-west-2.amazonaws.com/groups-json/',
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
};
