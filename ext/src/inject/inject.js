chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------


		function findsidebar() {
			var sidebarContainer = $('table[role="presentation"] div[role="complementary"] .u5');
			if(sidebarContainer.length) {
				//found sidebar!
				console.log('sidebar div found', sidebarContainer);
				//inject our thing into sidebar
				var injectedElement = $('<div ng-app="monacode"><monacode></monacode></div>');
				sidebarContainer.append(injectedElement);
				console.log('injected element into sidebar',injectedElement);

				angular.bootstrap(injectedElement, ['monacode']);
			} else {
				//selector returned empty result
				//try again in 500ms
				setTimeout(findsidebar,500);
			}
		}
		findsidebar();
	}
	}, 10);
});
