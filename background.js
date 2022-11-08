chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateTab(tab)
})

chrome.tabs.onCreated.addListener(function(tab) {
  updateTabsInCurrentWindow()
})

chrome.tabs.onDetached.addListener(function(tab) {
  updateTabsInCurrentWindow()
})

chrome.tabs.onRemoved.addListener(function(tab) {
  updateTabsInCurrentWindow()
})

chrome.tabs.onMoved.addListener(function(tab) {
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
  var title = tab.title
  const splitTitle = title.split(' ')

  if (indices[tab.index] == splitTitle[0]) { return }

  if (splitTitle.length >= 2 && indices.includes(splitTitle[0])) {
    title = splitTitle.slice(1).join(' ')
  }

  if (0 <= tab.index && tab.index <= 7) {
    title = `${indices[tab.index]} ${title}`
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [title],
    func: (title) => { document.title = title }
  })
}
