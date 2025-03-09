import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

// chrome.webNavigation.onCommitted.addListener(details => {
//   console.log('chrome.webNavigation.onCommitted.addListener', details);
// });

// chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
//   console.log('chrome.webNavigation.onHistoryStateUpdated.addListener', details);
// });

chrome.webNavigation.onDOMContentLoaded.addListener(details => {
  console.log('onDOMContentLoadedだよ', details.url);
});

chrome.webNavigation.onCompleted.addListener(details => {
  console.log('onCompletedだよ', details.url);
});

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  console.log('onHistoryStateUpdatedだよ', details.url);

  // URLに/sampleが含まれているかチェック

  chrome.tabs.sendMessage(details.tabId, {
    type: 'URL_CHANGED',
    url: details.url,
    isSamplePage: true,
  });
});
