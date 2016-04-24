
var findsidebartimeout = undefined;


function findsidebar() {
	var sidebarContainer = $('table[role="presentation"] div[role="complementary"] .u5');
	if(sidebarContainer.length) {
		//found sidebar!
		console.log('sidebar div found', sidebarContainer);
		findsidebartimeout = undefined;
		//inject our thing into sidebar
		var injectedElement = $('<div ng-app="monacode" style="margin-top:12px;"><monacode></monacode></div>');
		sidebarContainer.append(injectedElement);
		console.log('injected element into sidebar',injectedElement);
		
		angular.bootstrap(injectedElement, ['monacode']);
	} else {
		//selector returned empty result
		//try again in 500ms
		findsidebartimeout = setTimeout(findsidebar,500);
	}
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		
		
		console.log("Hello from team Monacode. Here we go baby!");
		
		//find the sidebar
		findsidebar();
	}
	}, 10);
});

//once the url changes
window.addEventListener("hashchange", function() {
	//url has changed
	//start looking for sidebar (if timeout is not yet in progress)
	if(!findsidebartimeout) {
		//find the sidebar
		findsidebar();
	}
}, false);


//FONTS
var fontstyle = document.createElement('style');
fontstyle.innerHTML = 
'@font-face {'+
  "font-family: 'Mocaode';"+
  "src: url('"+chrome.extension.getURL('fonts/mocaode.eot')+"') format('embedded-opentype'), url('"+chrome.extension.getURL('fonts/mocaode.woff')+"') format('woff'), url('"+chrome.extension.getURL('fonts/mocaode.ttf')+"') format('truetype');"+
  'font-weight: 400;font-style: normal;}';
document.head.appendChild(fontstyle);
