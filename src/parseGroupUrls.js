module.exports = function(responseData) {
	function _isMeetupUrl(url) {
		return /https?:\/\/(?:www\.)?meetup\.com\//.test(url);
	}

	function _transformMeetupCalUrl(url) {
		const matches = /https?:\/\/(?:www\.)?meetup\.com\/([\w-_]+)/.exec(url);
		if (matches.length) {
			return `https://www.meetup.com/${matches[1]}/events/ical/`
		}
		return null;
	}

	const urls = [];
	responseData.forEach((group) => {
		if (group.calendarUrl) {
			urls.push(group.calendarUrl);
		} else if (_isMeetupUrl(group.externalUrl)) {
			urls.push(_transformMeetupCalUrl(group.externalUrl));
		}
	});
	return urls;
}
