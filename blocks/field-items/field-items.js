export default function decorate(block) {
  block.textContent = '';
  const fieldItem = document.createElement('div');
  while (block.firstElementChild) fieldItem.append(block.firstElementChild);

  block.append(fieldItem);
}
