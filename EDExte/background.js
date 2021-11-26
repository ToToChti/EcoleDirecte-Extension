chrome.browserAction.onClicked.addListener((tab) => {

    chrome.tabs.sendMessage(tab.id, {url: tab.url})
console.log(tab.id)

});
