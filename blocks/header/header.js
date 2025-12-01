// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('main-nav');
    const mainMenu = nav.querySelector('.main-menu');
    const menuExpanded = mainMenu.querySelector('[aria-expanded="true"]');
    if (menuExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(mainMenu);
      menuExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, mainMenu);
      document.getElementById('toggle-expand').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const mainMenu = nav.querySelector('.main-menu');
    const menuExpanded = mainMenu.querySelector('[aria-expanded="true"]');
    if (menuExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(mainMenu, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, mainMenu, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className.includes('main-menu__link--with-sub');
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.main-menu'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.main-menu > .main-menu__item').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} mainMenu The main menu within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, mainMenu, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = document.getElementById('toggle-expand');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(mainMenu, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = mainMenu.querySelectorAll('.main-menu__link--with-sub');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Clear the block
  block.textContent = '';

  // Create header structure
  const header = document.createElement('header');
  header.classList.add('flexible-header', 'bg-light');

  const container = document.createElement('div');
  container.classList.add('container');

  const region = document.createElement('div');
  region.classList.add('region', 'region-header-top', 'clearfix');

  // Create Site Branding block
  const brandingBlock = document.createElement('div');
  brandingBlock.id = 'block-sitebranding-2';
  brandingBlock.setAttribute('data-block-plugin-id', 'system_branding_block');
  brandingBlock.classList.add('block');
  brandingBlock.innerHTML = `
    <a href="/" rel="home" class="site-logo">
      <img src="/icons/otsuka-patient-assistance-foundation-logo-v2.svg" alt="Home" fetchpriority="high">
    </a>
  `;
  region.append(brandingBlock);

  // Create Call Us Link block
  const callUsBlock = document.createElement('div');
  callUsBlock.id = 'block-calluslink';
  callUsBlock.setAttribute('data-block-plugin-id', 'block_content:ea999aaa-6c4b-41d7-9595-7b03786bc779');
  callUsBlock.classList.add('block', 'block-content-call-us-link', 'block-content-basic');
  callUsBlock.innerHTML = `
    <div class="text-long">
      <p><a class="call-us" href="tel:18557276274">Call Us</a></p>
    </div>
  `;
  region.append(callUsBlock);

  // Create Navigation block
  const navBlock = document.createElement('nav');
  navBlock.setAttribute('role', 'navigation');
  navBlock.setAttribute('aria-labelledby', 'block-mainmenu-menu');
  navBlock.id = 'block-mainmenu';
  navBlock.setAttribute('data-block-plugin-id', 'system_menu_block:main-menu');
  navBlock.classList.add('navigation');

  navBlock.innerHTML = `
    <h2 class="navigation__title">Main menu</h2>
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
            <a href="/check-eligibility" target="_self" class="main-menu__link" data-drupal-link-system-path="node/41" data-once="focusAdvanced">Check Eligibility</a>
          </li>
          <li class="main-menu__item main-menu__item--with-sub">
            <span target="_self" class="main-menu__link main-menu__link--with-sub" data-once="focusAdvanced submenu-click" tabindex="0">Apply Here</span>
            <span class="expand-sub"></span>
            <ul class="main-menu main-menu--sub main-menu--sub-1">
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <span target="_self" class="go-back-sub-menu-link main-menu__link main-menu__link--sub main-menu__link--sub-1" data-once="focusAdvanced go-back">Go Back</span>
              </li>
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <a href="/apply-for-yourself" target="_self" class="apply-patients main-menu__link main-menu__link--sub main-menu__link--sub-1" data-drupal-link-system-path="node/61" data-once="focusAdvanced">Patients</a>
              </li>
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <a href="/apply-for-your-patients" target="_self" class="apply-hcps main-menu__link main-menu__link--sub main-menu__link--sub-1" data-drupal-link-system-path="node/56" data-once="focusAdvanced">HCPs</a>
              </li>
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1 main-menu__item--with-sub">
                <span target="_self" class="apply-forms main-menu__link main-menu__link--sub main-menu__link--sub-1 main-menu__link--with-sub" data-once="focusAdvanced submenu-click" tabindex="0">Forms</span>
                <span class="expand-sub"></span>
                <ul class="main-menu main-menu--sub main-menu--sub-1 main-menu--sub-2">
                  <li class="main-menu__item main-menu__item--sub main-menu__item--sub-2">
                    <span target="_self" class="go-back-sub-menu-link main-menu__link main-menu__link--sub main-menu__link--sub-2" data-once="focusAdvanced go-back">Go Back</span>
                  </li>
                  <li class="main-menu__item main-menu__item--sub main-menu__item--sub-2">
                    <a href="/patient-forms" target="_self" class="patient-forms main-menu__link main-menu__link--sub main-menu__link--sub-2" data-drupal-link-system-path="node/71" data-once="focusAdvanced">Patient Forms</a>
                  </li>
                  <li class="main-menu__item main-menu__item--sub main-menu__item--sub-2">
                    <a href="/hcps-forms" target="_self" class="hcps-forms main-menu__link main-menu__link--sub main-menu__link--sub-2" data-drupal-link-system-path="node/66" data-once="focusAdvanced">HCP's Forms</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="main-menu__item">
            <a href="/resource-solution-center" target="_self" class="main-menu__link" data-drupal-link-system-path="node/21" data-once="focusAdvanced">OPAF Resource &amp; Solution Center</a>
          </li>
          <li class="main-menu__item">
            <a href="/about-us" target="_self" class="main-menu__link" data-drupal-link-system-path="node/51" data-once="focusAdvanced">About Us</a>
          </li>
          <li class="main-menu__item main-menu__item--with-sub">
            <span target="_self" class="social-links main-menu__link main-menu__link--with-sub" data-once="focusAdvanced submenu-click" tabindex="0">Follow Us</span>
            <span class="expand-sub"></span>
            <ul class="main-menu main-menu--sub main-menu--sub-1">
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <span target="_self" class="go-back-sub-menu-link main-menu__link main-menu__link--sub main-menu__link--sub-1" data-once="focusAdvanced go-back">Go Back</span>
              </li>
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <a href="https://www.facebook.com/otsukapatientassistancefoundation" target="_blank" class="facebook-link main-menu__link main-menu__link--sub main-menu__link--sub-1" data-once="focusAdvanced">Facebook</a>
              </li>
              <li class="main-menu__item main-menu__item--sub main-menu__item--sub-1">
                <a href="https://www.linkedin.com/company/otsuka-pharmaceutical-companies/" target="_blank" class="linkedin-link main-menu__link main-menu__link--sub main-menu__link--sub-1" data-once="focusAdvanced">Linkedin</a>
              </li>
            </ul>
          </li>
          <li class="main-menu__item">
            <a href="/faqs" target="_self" class="main-menu__link" data-drupal-link-system-path="node/36" data-once="focusAdvanced">FAQ</a>
          </li>
          <li class="main-menu__item">
            <a href="tel:18557276274" target="_self" class="call-us-menu-link main-menu__link" data-once="focusAdvanced">Call us</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  region.append(navBlock);
  container.append(region);

  // Create header middle section
  const headerMiddle = document.createElement('div');
  headerMiddle.classList.add('flexible-header__b', 'header-middle');

  header.append(container);
  header.append(headerMiddle);
  block.append(header);

  // Add toggle functionality
  const toggleExpand = document.getElementById('toggle-expand');
  const mainNav = document.getElementById('main-nav');
  const mainMenu = mainNav.querySelector('.main-menu');

  toggleExpand.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu(mainNav, mainMenu);
  });

  // Handle submenu clicks
  const menuItemsWithSub = mainMenu.querySelectorAll('.main-menu__item--with-sub');
  menuItemsWithSub.forEach((item) => {
    const link = item.querySelector(':scope > .main-menu__link--with-sub');
    if (link) {
      link.addEventListener('click', (e) => {
        if (isDesktop.matches) {
          e.preventDefault();
          const expanded = item.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(mainMenu);
          item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        } else {
          // Mobile: toggle submenu
          e.preventDefault();
          const submenu = item.querySelector(':scope > .main-menu--sub');
          if (submenu) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          }
        }
      });
    }
  });

  // Handle "Go Back" clicks
  const goBackLinks = mainMenu.querySelectorAll('.go-back-sub-menu-link');
  goBackLinks.forEach((goBack) => {
    goBack.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = goBack.closest('.main-menu--sub');
      if (submenu) {
        submenu.style.display = 'none';
      }
    });
  });

  // Initialize menu state
  mainNav.setAttribute('aria-expanded', 'false');
  toggleMenu(mainNav, mainMenu, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(mainNav, mainMenu, isDesktop.matches));
}
