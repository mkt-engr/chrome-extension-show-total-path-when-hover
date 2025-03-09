import { findFileNavigation } from './findFileNavigation';

let isCalled = false;

export function sampleFunction() {
  console.log('content script - sampleFunction()が呼ばれた', { isCalled });

  // URLの変更をchrome.webNavigation.onHistoryStateUpdatedで検知

  chrome.runtime.onMessage.addListener(message => {
    console.log('chrome.runtime.onMessage.addListener', message.url);
    console.log({ isCalled });
    if (message.type === 'URL_CHANGED') {
      console.log('URLが変更されました！', message.url);
      findFileNavigation();
      isCalled = true;
    }
  });

  const observer = new MutationObserver(function () {
    const elm = document.getElementById('piyo');
    if (elm) {
      // 対象の要素が読み込まれたので、ここで好きなことを行う
      // これ以上監視を続けない場合は、observer.disconnect()する
    }
  });

  const observerTarget = document.querySelector('body')!;
  observer.observe(observerTarget, { childList: true, subtree: true });
}
