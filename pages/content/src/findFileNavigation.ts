const BUTTON_ID_PREFIX = 'chrome-extension-copyButton';

export const findFileNavigation = () => {
  const existingButton = document.getElementById(`${BUTTON_ID_PREFIX}-0`);
  if (existingButton) {
    return;
  }

  const a = document.querySelectorAll('clipboard-copy');
  console.log(a);
  const targetElements = document.querySelectorAll<HTMLElement>('span.Truncate');
  targetElements.forEach((targetElement, index) => {
    // targetElementの直下のaタグを取得
    const anchorElement = targetElement.querySelector('a');
    // const anchorElement = targetElement.querySelector('clipboard-copy');
    // console.log(anchorElement?.value);
    const anchorText = anchorElement?.textContent ?? 'No anchor text';
    // const anchorText = anchorElement?.value ?? 'No anchor text';

    // src以降のテキストを取得
    const match = anchorText.match(/src\/.*/);
    const textToCopy = match ? match[0] : anchorText;

    // 新しいボタン要素を作成
    const button = document.createElement('button');
    button.id = `${BUTTON_ID_PREFIX}-${index}`;
    button.textContent = 'コピー';
    button.style.marginLeft = '10px'; // ボタンとtargetElementの間にスペースを追加
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(textToCopy);
      alert(`copy ${textToCopy}`);
    });

    // ボタンをtargetElementの隣に配置
    targetElement.insertAdjacentElement('afterend', button);
  });
};
