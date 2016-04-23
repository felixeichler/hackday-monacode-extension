chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		
		
		var sidebarContainer = $('table[role="presentation"] div[role="complementary"] .u5');
		console.log('sidebar complementary div found', sidebarContainer);
		
		var injectedElement = $('<div style="background:blue;color:white;padding:20px;font-size:20px;">hello world.</div>');
		sidebarContainer.append(injectedElement);
		console.log('injected element into sidebar',injectedElement);
		
	}
	}, 10);
});

