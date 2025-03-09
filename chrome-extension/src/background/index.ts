import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  chrome.tabs.sendMessage(details.tabId, {
    type: 'URL_CHANGED',
    url: details.url,
    isSamplePage: true,
  });
});
