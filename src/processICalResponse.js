module.exports = function(url, response) {
	return `${url}: ${response.length} chars${"\n"}`;
};