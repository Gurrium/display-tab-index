chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateTab(tab)
})

chrome.tabs.onCreated.addListener(function(tab) {
  updateTabsInCurrentWindow()
})

chrome.tabs.onDetached.addListener(function(tab) {
  updateTabsInCurrentWindow()
})

function updateTabsInCurrentWindow() {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    tabs.forEach(tab => updateTab(tab))
  })
}

const indices = [
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
]

function updateTab(tab) {

  const splitTitle = tab.title.split(' ')[0]
  console.log(splitTitle)
  if (splitTitle.length >= 2 && indices.includes(splitTitle[0])) {
    console.log('here')
    tab.title = tab.title.split(' ')[1]
  }

  if (0 <= tab.index && tab.index <= 7) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [indices[tab.index], tab.title],
      func: (index, title) => { document.title = `${index} ${title}` }
    })
  }
}
