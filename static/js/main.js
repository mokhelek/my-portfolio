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

function skillsFunction(id) {
  let more_skill_description = document.getElementById("more" + id)
  let less_skill_description = document.getElementById("less" + id)

  let read_more_btn = document.getElementById("read_more_skill" + id)
  let read_less_btn = document.getElementById("read_less_skill" + id)

  // Check if the "more" content is currently hidden (either style.display is "none" or empty/undefined)
  if (more_skill_description.style.display === "none" || more_skill_description.style.display === "") {
    // Show expanded content
    more_skill_description.style.display = "block";
    less_skill_description.style.display = "none";
    read_more_btn.style.display = "none";
    read_less_btn.style.display = "block";
  } else {
    // Show collapsed content
    more_skill_description.style.display = "none";
    less_skill_description.style.display = "block";
    read_less_btn.style.display = "none";
    read_more_btn.style.display = "block";
  }
}

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

