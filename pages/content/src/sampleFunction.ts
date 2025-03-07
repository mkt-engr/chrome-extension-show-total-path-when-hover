import { findFileNavigation } from '@src/findFileNavigation';
export function sampleFunction() {
  console.log('content script - sampleFunction() called from another module');

  // 現在のURLを保持
  let currentURL = window.location.href;

  // MutationObserverの設定と開始
  const startObserver = () => {
    const observer = new MutationObserver(mutations => {
      console.log('MutationObserver');
      // URLの変更をチェック
      if (currentURL !== window.location.href) {
        console.log('URLが変更されました！');
        currentURL = window.location.href;
      }

      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          findFileNavigation();
          break;
        }
      }
    });

    // GitHub のメインコンテンツが含まれる要素を監視
    const observerTarget = document.querySelector('body');
    if (observerTarget) {
      observer.observe(observerTarget, {
        childList: true,
        subtree: true,
      });
    }
  };

  // 初期実行とObserverの開始
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    startObserver(); // startObserverを実行
  });
  // startObserver();
}
