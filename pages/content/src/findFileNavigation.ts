export const findFileNavigation = () => {
  console.log('findFileNavigation() called');
  const targetElement = document.querySelector<HTMLElement>('nav[aria-label="File Tree Navigation"]');

  if (targetElement) {
    console.log('File navigation found');
    targetElement.style.backgroundColor = 'red';
  } else {
    alert('File navigation not found');
  }
};
