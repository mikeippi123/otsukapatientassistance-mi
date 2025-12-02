/**
 * Reads the configuration from a block
 * @param {Element} block The block element
 */
function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children && row.children.length === 2) {
      const cols = [...row.children];
      const name = cols[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const value = cols[1].textContent.trim();
      if (name && value) {
        config[name] = value;
      }
    }
  });
  return config;
}

export default function decorate(block) {
  // Read block configuration from the first rows (property rows)
  const config = readBlockConfig(block);
  
  // Apply class name if provided
  if (config.name || config['class-name']) {
    const className = config.name || config['class-name'];
    block.classList.add(className);
  }
  
  // Apply style/position as a class if provided
  if (config.style || config['container-position']) {
    const style = config.style || config['container-position'];
    block.classList.add(style);
  }
  
  // Remove the configuration rows (first 2 rows with 2 columns)
  const configRows = [];
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children && row.children.length === 2) {
      const firstCol = row.children[0].textContent.trim().toLowerCase();
      if (firstCol.includes('name') || firstCol.includes('style') || firstCol.includes('position')) {
        configRows.push(row);
      }
    }
  });
  configRows.forEach((row) => row.remove());
}
