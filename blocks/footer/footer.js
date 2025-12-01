/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Clear the block and add footer classes
  block.textContent = '';
  block.classList.add('opaf-footer');
  block.setAttribute('role', 'contentinfo');

  // Create the main structure
  const container = document.createElement('div');
  container.classList.add('container');

  const top = document.createElement('div');
  top.classList.add('top');

  const bottom = document.createElement('div');
  bottom.classList.add('bottom');

  // Create LOGO section
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoDiv.innerHTML = `
    <div class="region region-footer-second-middle-first clearfix">
      <div id="block-footer-logo" class="block block-content-logo block-content-paragraphs">
        <div class="field field--name-field-paragraph field--type-entity-reference-revisions field--label-hidden field__items">
          <div class="field__item">
            <div class="otsk-ds-image">
              <div class="field field--name-field-otsk-ds-image field--type-entity-reference field--label-hidden field__item">
                <article class="media media--type-image media--view-mode-default">
                  <div class="field field--name-image field--type-image field--label-hidden field__item">
                    <img loading="lazy" src="/icons/otsuka-white-logo.svg" alt="Otsuka Logo">
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  top.append(logoDiv);

  // Create MENU section
  const menuDiv = document.createElement('div');
  menuDiv.classList.add('menu');
  menuDiv.innerHTML = `
    <div class="region region-footer-second-middle-last clearfix">
      <nav role="navigation" aria-labelledby="block-footerlinks-menu" id="block-footerlinks" class="navigation">
        <h2 class="navigation__title">Footer Links</h2>
        <div>
          <a href="#" id="toggle-expand" class="toggle-expand" data-once="toggle-expand">
            <span class="toggle-expand__open">
              <span class="toggle-expand__text"></span>
            </span>
            <span class="toggle-expand__close">
              <span class="toggle-expand__text"></span>
            </span>
          </a>
          <div id="main-nav" class="main-nav">
            <ul class="main-menu">
              <li class="main-menu__item">
                <a href="https://www.otsuka-us.com/terms-and-conditions?_ga=2.12743091.529530520.1572814857-303531643.1572352699" target="_blank" class="main-menu__link" data-once="focusAdvanced">Terms of Use</a>
              </li>
              <li class="main-menu__item">
                <a href="https://www.otsuka-us.com/oapi-privacy-policy?_ga=2.39549351.529530520.1572814857-303531643.1572352699" target="_blank" class="main-menu__link" data-once="focusAdvanced">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `;
  top.append(menuDiv);

  // Create TEXT section
  const textDiv = document.createElement('div');
  textDiv.classList.add('text');
  textDiv.innerHTML = `
    <div class="region region-footer-third-middle clearfix">
      <div id="block-footercopy" class="block block-content-footer-copy block-content-basic">
        <div class="text-long">
          <p class="copyright-notice">Unless otherwise specified, all product and service names appearing on this Internet site are trademarks owned by or licensed to Otsuka Patient Assistance Foundation, Inc. <span class="desktop-break">No use of any trademark,</span> trade name, or trade dress in this site may be made without the prior written authorization of Otsuka Patient Assistance Foundation, Inc. except to identify the product or services of the company</p>
          <p class="copyright-notice">This site is intended for use by residents of the <span class="text-nowrap">United States</span>.</p>
        </div>
      </div>
    </div>
  `;
  top.append(textDiv);

  // Create COPYRIGHT section
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('copyright');
  copyrightDiv.innerHTML = `
    <div class="region region-footer-fourth-middle-first clearfix">
      <div id="block-otsukacopyright" data-block-plugin-id="otsuka_copyright" class="block">
        ©2025 Otsuka Patient Assistance Foundation, Inc. All rights reserved.
      </div>
    </div>
  `;
  bottom.append(copyrightDiv);

  // Create PRC section
  const prcDiv = document.createElement('div');
  prcDiv.classList.add('prc');
  prcDiv.innerHTML = `
    <div class="region region-footer-fourth-middle-last clearfix">
      <div id="block-prcdate" data-block-plugin-id="prc_code_date" class="block">
        July 2025
      </div>
      <div id="block-prccode" data-block-plugin-id="prc_code" class="block">
        PAUS25EXC0007
      </div>
    </div>
  `;
  bottom.append(prcDiv);

  // Assemble the structure
  container.append(top);
  container.append(textDiv);
  container.append(bottom);
  block.append(container);
}
