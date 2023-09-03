document.getElementById('insertButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(activeTab.id, {action: "insertText"});
      });
    });
  });
  