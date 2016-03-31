'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update({
    url: "http://kindle.amazon.com/your_highlights"
  });
});
