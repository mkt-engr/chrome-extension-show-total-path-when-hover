export const findFileNavigation = () => {
  console.log('findFileNavigation() called');
  const targetElements = document.querySelectorAll<HTMLElement>('span.Truncate');

  if (targetElements.length === 0) {
    alert('File navigation not found');
  }

  console.log('File navigation found');
  targetElements.forEach(targetElement => {
    targetElement.style.backgroundColor = 'red';

    // targetElementの直下のaタグを取得
    const anchorElement = targetElement.querySelector('a');
    const anchorText = anchorElement?.textContent ?? 'No anchor text';

    const match = anchorText.match(/\/src\/.*/);

    const a = match ? match[0] : anchorText;

    // 新しいボタン要素を作成
    const button = document.createElement('button');
    button.textContent = 'コピー';
    button.style.marginLeft = '10px'; // ボタンとtargetElementの間にスペースを追加
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(a);
      alert(`copy ${a}`);
    });

    // ボタンをtargetElementの隣に配置
    targetElement.insertAdjacentElement('afterend', button);
  });
};
