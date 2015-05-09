chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Returned from content script that should contain current_icon_path
  if (request.message == "clicked_browser_action") {
    // Truly change the extension's icon
    chrome.browserAction.setIcon({ path: { "38": request.current_icon_path }, tabId: sender.tab.id });
  }
});
