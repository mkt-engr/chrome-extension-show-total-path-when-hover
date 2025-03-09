let isCalled = false;

export function sampleFunction() {
  console.log('content script - sampleFunction()が呼ばれた');

  // URLの変更をchrome.webNavigation.onHistoryStateUpdatedで検知
  if (!isCalled) {
    chrome.runtime.onMessage.addListener(message => {
      console.log('chrome.runtime.onMessage.addListener', message);

      if (message.type === 'URL_CHANGED') {
        console.log('URLが変更されました！', message.url);
        // findFileNavigation();
        isCalled = true;
      }
    });
  }

  const observer = new MutationObserver(function () {
    console.log('MutationObserverが呼ばれた');
    const elm = document.getElementById('piyo');
    if (elm) {
      // 対象の要素が読み込まれたので、ここで好きなことを行う
      // これ以上監視を続けない場合は、observer.disconnect()する
    }
  });

  const observerTarget = document.querySelector('body')!;
  observer.observe(observerTarget, { childList: true, subtree: true });
}
