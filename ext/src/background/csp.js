var hosts = '';

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    var isCSPHeader = /content-security-policy/i.test(details.responseHeaders[i].name);
    if (isCSPHeader) {
      var csp = details.responseHeaders[i].value;
      csp = csp.replace('script-src', "script-src 'unsafe-inline' " + hosts);
      csp = csp.replace('style-src', 'style-src ' + hosts);
      csp = csp.replace('font-src', 'font-src ' + hosts);
      csp = csp.replace('connect-src', 'connect-src ' + hosts);
      details.responseHeaders[i].value = csp;
    }
  }

  return {
    responseHeaders: details.responseHeaders
  };
}, {
    urls:  ["<all_urls>"],
    types: ["main_frame", "sub_frame", "xmlhttprequest"]
  }, ['blocking', 'responseHeaders']);