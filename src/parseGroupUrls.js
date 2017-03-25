/**
 * Get array of URLs from local groups API data
 *
 * @param obj responseData JSON data for groups
 * @return array URLs as strings
 */
module.exports = function(responseData) {
  /**
   * Test if URL is on Meetup.com
   *
   * @param string url
   * @return bool
   */
  function _isMeetupUrl(url) {
    return /https?:\/\/(?:www\.)?meetup\.com\//.test(url);
  }

  /**
   * Transform Meetup.com group landing page URL to iCal feed URL
   *
   * @param string url Group page URL
   * @return string iCal feed URL
   */
  function _transformMeetupCalUrl(url) {
    const matches = /https?:\/\/(?:www\.)?meetup\.com\/([\w-_]+)/.exec(url);
    if (matches.length) {
      return `https://www.meetup.com/${matches[1]}/events/ical/`
    }
    return null;
  }

  const urls = [];
  responseData.forEach((group) => {
    // Use iCal URL if specified
    if (group.calendarUrl) {
      urls.push(group.calendarUrl);
    } else if (_isMeetupUrl(group.externalUrl)) {
      // Otherwise attempt to parse from Meetup.com page
      urls.push(_transformMeetupCalUrl(group.externalUrl));
    }
    // Or do nothing, hopefully we will add more services soon
  });
  return urls;
}
