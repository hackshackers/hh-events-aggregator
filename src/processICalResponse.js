const chalk = require('chalk');
const red = chalk.red;
const cyan = chalk.cyan;
const yellow = chalk.yellow;

/**
 * Take return VEVENT portion of VCALENDAR
 *
 * @param string vcalendar Raw VCALENDAR data
 * @param string url       URL fetched
 * @return string VEVENTs portion of input
 */
module.exports = function(vcalendar, url) {
  return new Promise((resolve, reject) =>{
    if (!vcalendar || 'string' !== typeof vcalendar) {
      reject();
      return;
    }

    const firstVeventStart = vcalendar.indexOf('BEGIN:VEVENT');
    if (-1 === firstVeventStart) {
      console.log(yellow(`No VEVENT components in ${url}`));
      resolve('');
      return;
    }
    const lastVeventEnd = vcalendar.lastIndexOf('END:VEVENT');

    console.log(cyan(`Found VEVENT components in ${url}`));

    resolve(vcalendar
      .slice(firstVeventStart, lastVeventEnd)
      .concat("END:VEVENT\n"));
  });
};
