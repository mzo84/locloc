chrome.browserAction.onClicked.addListener(enable);

const enable = tab => {
    chrome.tabs.executeScript(tab.id, {
      file: "app.js"
    });
    chrome.browserAction.setIcon({ path: "icons/128.png" });
    chrome.browserAction.enable(tab.id);
    appInUse[tab.id] = true;
  };