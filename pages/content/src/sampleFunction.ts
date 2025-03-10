import { findFileNavigation } from './findFileNavigation';

export function sampleFunction() {
  // URLの変更をchrome.webNavigation.onHistoryStateUpdatedで検知
  chrome.runtime.onMessage.addListener(message => {
    if (message.type === 'URL_CHANGED') {
      findFileNavigation();
    }
  });
}
