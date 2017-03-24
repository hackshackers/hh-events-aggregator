module.exports = function(groupUrls, outputStream) {
	// post-response handler
	function _afterResponse() {
		requestsToMake--;
		console.log(yellow(`${requestsToMake} requests remaining...`));
		if (0 >= requestsToMake) {
			console.log(cyan('Completed requests, processing output file'));
			processOutput(outputStream);
		}
	};

	// Process the URLs
	groupUrls.forEach((url) => {
		axios.get(url)
			.then((response) => {
				console.log(yellow(`Processing ${url}`));
				//processResponse(response);
				_afterResponse();
			})
			.catch((error) => {
				console.log(red(`Error with ${url}`));
				console.log(error);
				_afterResponse();
			});
	});
}
