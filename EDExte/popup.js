document.addEventListener('DOMContentLoaded', () => {
  /*document.querySelector('button').addEventListener('click', onclick, false)
  function onclick() {
    chrome.tabs.query({currentWindow: true, active: true},
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount)
    })
  }

  function setCount(res) {
    const div = document.createElement('div')
    div.textContent = `${res.count} sorion's`
    document.body.appendChild(div)
  }*/

  const bg = chrome.extension.getBackgroundPage()

  Object.keys(bg.sorions).forEach(url => {
    const div = document.createElement('div')
    div.textContent = `${url} : ${bg.sorions[url]}`
    document.body.appendChild(div)
  })
}, false)