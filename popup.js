const DIGISAC_URL = 'https://tek.digisac.app/';

function openOrFocusDigisac() {
  if (!chrome.tabs || !chrome.tabs.query) return;
  chrome.tabs.query({ url: DIGISAC_URL + '*' }, function(tabs) {
    if (tabs && tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: DIGISAC_URL });
    }
  });
}

function toggleFlappyOnActiveDigisac() {
  if (!chrome.tabs || !chrome.tabs.query || !chrome.tabs.sendMessage) return;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs && tabs[0];
    if (!tab) return;
    if (!tab.url || tab.url.indexOf(DIGISAC_URL) !== 0) {
      chrome.tabs.create({ url: DIGISAC_URL });
      return;
    }
    chrome.tabs.sendMessage(tab.id, { type: 'FLAPPY_TOGGLE' });
  });
}

document.getElementById('open-digisac').addEventListener('click', openOrFocusDigisac);
document.getElementById('toggle-flappy').addEventListener('click', toggleFlappyOnActiveDigisac);


