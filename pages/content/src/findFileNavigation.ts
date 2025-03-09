const BUTTON_ID_PREFIX = 'chrome-extension-copyButton';

export const findFileNavigation = () => {
  const existingButton = document.getElementById(`${BUTTON_ID_PREFIX}-0`);
  if (existingButton) {
    return;
  }

  const targetElements = document.querySelectorAll<HTMLElement>('span.Truncate');
  targetElements.forEach((targetElement, index) => {
    // targetElementの直下の<clipboard-copy>タグを取得
    const anchorElement = targetElement.querySelector('clipboard-copy');
    const anchorText = anchorElement?.getAttribute('value') ?? 'No anchor text';

    // src以降のテキストを取得
    const match = anchorText.match(/src.*/);
    const textToCopy = match ? match[0] : anchorText;
    console.log({ textToCopy });

    // 新しいボタン要素を作成
    const button = document.createElement('button');
    button.id = `${BUTTON_ID_PREFIX}-${index}`;
    button.textContent = 'コピー';
    button.style.marginLeft = '10px'; // ボタンとtargetElementの間にスペースを追加
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(textToCopy);
      button.textContent = 'コピーしました!';
      setTimeout(() => {
        button.textContent = 'コピー';
      }, 3000);
    });

    // ボタンをtargetElementの隣に配置
    targetElement.insertAdjacentElement('afterend', button);
  });
};
