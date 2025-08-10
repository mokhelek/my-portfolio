// Enhanced Project Toggle Function
function toggleProjectDetails(id) {
  const previewElement = document.getElementById("desc-preview-" + id);
  const fullElement = document.getElementById("desc-full-" + id);
  const toggleBtn = document.getElementById("expand-" + id);
  const toggleIcon = toggleBtn.querySelector('.brutal-toggle-arrow');
  const toggleText = toggleBtn.querySelector('.brutal-toggle-label');
  
  const isExpanded = toggleBtn.getAttribute('data-expanded') === 'true';
  
  if (isExpanded) {
    // Collapse
    fullElement.style.display = "none";
    previewElement.style.display = "block";
    toggleBtn.setAttribute('data-expanded', 'false');
    toggleText.textContent = "Read More";
    toggleIcon.style.transform = "rotate(0deg)";
  } else {
    // Expand
    previewElement.style.display = "none";
    fullElement.style.display = "block";
    toggleBtn.setAttribute('data-expanded', 'true');
    toggleText.textContent = "Read Less";
    toggleIcon.style.transform = "rotate(180deg)";
  }
}

// Enhanced Project Toggle Function (for new design)
function toggleProject(id) {
  toggleProjectDetails(id);
}

// Legacy function for backward compatibility
function myFunction(id) {
  toggleProject(id);
}

// Skills function removed - no longer needed with new group-based design

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})




// ************************************* Typwriter effect *****************


var dataText = ["fullstack developer", "UI/UX Designer"];

function typeWriter(text, i, fnCallback) {
  if (i < (text.length)) {
    document.getElementById("animation").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback)
    }, 100);
  } else if (typeof fnCallback == 'function') {
    setTimeout(fnCallback, 700);
  }
}

function StartTextAnimation(i) {

  if (dataText[i] == undefined) {
    StartTextAnimation(0);
  }

  if (i < dataText.length ) {

    typeWriter(dataText[i], 0, function () {
      StartTextAnimation(i + 1);
    });
  }
}

StartTextAnimation(0);

// *********************************** Clean Project Section Functionality *********************

// Simple Project Interactions
class SimpleProjectEnhancer {
  constructor() {
    this.projects = document.querySelectorAll('.brutal-project-item');
    this.init();
  }

  init() {
    this.setupEntranceAnimation();
    this.setupScrollEffects();
  }

  setupEntranceAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.projects.forEach(project => {
      project.style.opacity = '0';
      project.style.transform = 'translateY(30px)';
      project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(project);
    });
  }

  setupScrollEffects() {
    // Removed parallax effects to prevent layout issues
    // Projects now have stable positioning
  }
}

// Smooth scrolling enhancement for project links
function enhanceProjectNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

// Initialize enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize simple project enhancements
  new SimpleProjectEnhancer();
  
  // Enhance navigation
  enhanceProjectNavigation();
  
  // Add keyboard navigation for accessibility
  setupKeyboardNavigation();

  // Initialize Brutalist cursor (disabled on touch devices)
  initializeBrutalistCursor();

  // FAB visibility logic: show after slight scroll
  const fabLink = document.querySelector('.fab-home');
  if (fabLink) {
    const threshold = 120;
    const setFabVisibility = () => {
      const show = window.scrollY > threshold;
      fabLink.style.opacity = show ? '1' : '0';
      fabLink.style.pointerEvents = show ? 'auto' : 'none';
      fabLink.style.transition = 'opacity 200ms ease';
    };
    setFabVisibility();
    window.addEventListener('scroll', setFabVisibility, { passive: true });
  }
});

// Keyboard navigation for accessibility
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any expanded project descriptions
      document.querySelectorAll('[data-expanded="true"]').forEach(btn => {
        btn.click();
      });
    }
  });
}

// Brutalist custom cursor
function initializeBrutalistCursor() {
  if (window.__brutalCursorInit) return;
  window.__brutalCursorInit = true;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Do not enable on touch to avoid UX issues

  const cursorEl = document.getElementById('brutalCursor');
  if (!cursorEl) return;

  document.body.classList.add('brutal-cursor-enabled');

  // Build SVG arrow cursor once (smaller, real arrow shape)
  if (!cursorEl.querySelector('svg.cursor-svg')) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'cursor-svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '32');
    svg.setAttribute('viewBox', '0 0 24 32');
    svg.setAttribute('shape-rendering', 'crispEdges');

    // Shadow layer (same path, offset by CSS)
    const shadow = document.createElementNS(svgNS, 'polygon');
    shadow.setAttribute('class', 'cursor-shadow');
    shadow.setAttribute('points', '0,0 0,24 6,18 9,30 14,29 10,18 22,18');

    // Body layer
    const body = document.createElementNS(svgNS, 'polygon');
    body.setAttribute('class', 'cursor-body');
    body.setAttribute('points', '0,0 0,24 6,18 9,30 14,29 10,18 22,18');

    svg.appendChild(shadow);
    svg.appendChild(body);
    cursorEl.appendChild(svg);
  }

  let mouseX = 0;
  let mouseY = 0;
  let rafId = null;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(updatePosition);
  }

  function updatePosition() {
    const step = 4; // stronger pixel snapping for a more pixelated feel
    const qx = Math.round(mouseX / step) * step;
    const qy = Math.round(mouseY / step) * step;
    cursorEl.style.left = `${qx}px`;
    cursorEl.style.top = `${qy}px`;
    rafId = null;
  }

  function onMouseEnter() {
    cursorEl.classList.remove('is-hidden');
  }

  function onMouseLeave() {
    cursorEl.classList.add('is-hidden');
  }

  function onMouseDown() {
    cursorEl.classList.add('is-active');
  }

  function onMouseUp() {
    cursorEl.classList.remove('is-active');
  }

  // Hover states for interactive elements
  const hoverSelectors = [
    'a', 'button', '.brutal-btn', '.brutal-nav-link', '.brutal-raw-block', '.brutal-social-link',
    '.brutal-skill-card', '.brutal-project-item', '.brutal-contact-method', '.brutal-social-item'
  ];
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors.join(','))) {
      cursorEl.classList.add('is-hovering');
    } else {
      cursorEl.classList.remove('is-hovering');
    }
  });

  // Disable custom cursor when hovering inputs and textareas
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('input, textarea, [contenteditable="true"], .cursor-native')) {
      document.body.classList.remove('brutal-cursor-enabled');
      cursorEl.style.display = 'none';
    } else {
      document.body.classList.add('brutal-cursor-enabled');
      cursorEl.style.display = '';
    }
  });

  // Attach mouse listeners
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseenter', onMouseEnter);
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

