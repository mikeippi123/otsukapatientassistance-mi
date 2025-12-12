/**
 * Decorates otsuka-button blocks
 * The block parameter is the .otsuka-button div wrapper
 * Handles custom button behaviors like arrow icons
 */
export default function decorate(block) {
  // block is the .otsuka-button div
  // Get all buttons within this block
  const buttons = block.querySelectorAll('a.button, button');
  
  buttons.forEach((button) => {
    // Add otsuka-button-container class to the button's parent div
    const buttonContainer = button.parentElement;
    if (buttonContainer && buttonContainer.tagName === 'DIV') {
      buttonContainer.classList.add('otsuka-button-container');
    }
    
    // Check if showArrow is enabled via data attribute or class
    const showArrow = button.dataset.showArrow === 'true' || 
                     button.classList.contains('show-arrow') ||
                     block.dataset.showArrow === 'true';
    
    if (showArrow) {
      button.classList.add('show-arrow');
    }
    
    // You can add more custom button logic here
    // For example, tracking, animations, etc.
    console.log('Otsuka button decorated:', button);
  });
}
