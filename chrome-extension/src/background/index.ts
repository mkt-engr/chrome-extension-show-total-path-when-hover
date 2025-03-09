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
