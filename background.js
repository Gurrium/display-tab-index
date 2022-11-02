chrome.tabs.onUpdated.addListener(function(tabId, chagneInfo, tab) {
  updateTab(tab)
})

chrome.tabs.onCreated.addListener(function(tab) {
  updateTabs()
})

chrome.tabs.onDetached.addListener(function(tab) {
  updateTabs()
})

function updateTabsInCurrentWindow() {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    tabs.forEach(tab => updateTab(tab))
  })
}

function updateTab(tab) {
  const tab1BasedIndex = tab.index + 1
  const regexp = new RegExp(`^\\[${tab1BasedIndex}\\] `) 

  if (0 < tab1BasedIndex && tab1BasedIndex < 9 && !regexp.test(tab.title)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [tab1BasedIndex, tab.title],
      func: (index, title) => { document.title = `[${index}] ${title}` }
    })
  }
}
