$(document).ready(() => {

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const login = document.getElementById('login');


    addResizeListeners();
    setSidenavListeners();
    setUserDropdownListener();
    setMenuClickListener();
    setSidenavCloseListener();
    
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
      });
      
      signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
      });
      
      login.addEventListener('click', () => {
        window.location.href = 'UI/html/properties.html';
        });
    
  });

  const sidenavEl = $('.sidenav');
const containerEl = $('.container');
const SIDENAV_ACTIVE_CLASS = 'sidenav-active';
const GRID_NO_SCROLL_CLASS = 'grid-noscroll';

function toggleClass(el, className) {
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  }

  function setUserDropdownListener() {
    const userAvatar = $('.header-avatar');
  
    userAvatar.on('click', function(e) {
      const dropdown = $(this).children('.dropdown');
      toggleClass(dropdown, 'dropdown-active');
    });
  }

  // If user opens the menu and then expands the viewport from mobile size without closing the menu,
// make sure scrolling is enabled again and that sidenav active class is removed
function addResizeListeners() {
    $(window).resize(function(e) {
      const width = window.innerWidth; console.log('width: ', width);
  
      if (width > 750) {
        sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
        containerEl.removeClass(GRID_NO_SCROLL_CLASS);
      }
    });
  }
  
  // Menu open sidenav icon, shown only on mobile
  function setMenuClickListener() {
    $('.header-menu').on('click', function(e) { 
      
      toggleClass($('.sidenav'), SIDENAV_ACTIVE_CLASS);
      toggleClass($('.container'), GRID_NO_SCROLL_CLASS);
    });
  }
  
  // Sidenav close icon
  function setSidenavCloseListener() {
    $('.brand-close').on('click', function(e) {
      console.log(SIDENAV_ACTIVE_CLASS);
      toggleClass($('.sidenav'), SIDENAV_ACTIVE_CLASS);
      toggleClass($('.container'), GRID_NO_SCROLL_CLASS);
    });
  }

  // Sidenav list sliding functionality
function setSidenavListeners() {
    const subHeadings = $('.navList-heading'); console.log('subHeadings: ', subHeadings);
    const SUBHEADING_OPEN_CLASS = 'navList-heading-open';
    const SUBLIST_HIDDEN_CLASS = 'subList-hidden';
  
    subHeadings.each((i, subHeadingEl) => {
      $(subHeadingEl).on('click', (e) => {
        const subListEl = $(subHeadingEl).siblings();
  
        // Add/remove selected styles to list category heading
        if (subHeadingEl) {
          toggleClass($(subHeadingEl), SUBHEADING_OPEN_CLASS);
        }
  
        // Reveal/hide the sublist
        if (subListEl && subListEl.length === 1) {
          toggleClass($(subListEl), SUBLIST_HIDDEN_CLASS);
        }
      });
    });
  }
  