chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  const tab1BasedIndex = tab.index + 1
  const regexp = new RegExp(`^\\[${tab1BasedIndex}\\] `) 

  if (0 < tab1BasedIndex && tab1BasedIndex < 9 && !regexp.test(tab.title)) {
    chrome.scripting.executeScript({
      injection: {
        target: { tabId: tab.id },
        args: [tab1BasedIndex, tab.title],
        func: (index, title) => { alert("hoge"); document.title = `[${index}] ${title}` }
      }
    })
  }
})
