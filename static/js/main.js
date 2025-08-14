// main.js
/* ===== Brutalism: Enhanced Interactions ===== */

// Grid overlay: always on, no toggles

// Command palette (/)
const cmdk = document.getElementById('cmdk');
const cmdkInput = document.getElementById('cmdkInput');
const cmdkList = document.getElementById('cmdkList');

window.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    cmdk?.classList.add('show');
    cmdkInput?.focus();
  } else if (e.key === 'Escape') {
    cmdk?.classList.remove('show');
  }
});

cmdk?.addEventListener('click', (e) => {
  if (e.target === cmdk) cmdk.classList.remove('show');
});

cmdkList?.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  
  if (li.dataset.href) {
    location.hash = li.dataset.href;
  }
  cmdk.classList.remove('show');
});

// Project expand/collapse
document.querySelectorAll('.desc .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const full = document.getElementById(`desc-full-${id}`);
    const prev = document.getElementById(`desc-preview-${id}`);
    const expanded = full.hasAttribute('hidden') ? false : true;
    
    if (expanded) {
      full.setAttribute('hidden', '');
      prev.removeAttribute('hidden');
      btn.textContent = 'Read More';
    } else {
      full.removeAttribute('hidden');
      prev.setAttribute('hidden', '');
      btn.textContent = 'Show Less';
    }
  });
});

// Copy email
document.querySelectorAll('.copy').forEach(chip => {
  chip.addEventListener('click', () => {
    const text = chip.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      const span = chip.querySelector('.copy-text');
      const orig = span.getAttribute('data-default') || span.textContent;
      span.textContent = 'COPIED!';
      setTimeout(() => { span.textContent = orig; }, 1200);
    });
  });
});

// Pixel cursor
(function() {
  const c = document.getElementById('pixelCursor');
  if (!c) return;
  
  // Respect coarse pointers (touch devices)
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    c.style.display = 'none';
    document.documentElement.classList.remove('has-custom-cursor');
    return;
  }

  let x = 0, y = 0;
  let mouseX = 0, mouseY = 0;
  let isHovering = false;

  // Show custom cursor and hide native
  c.style.display = 'block';
  document.documentElement.classList.add('has-custom-cursor');

  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Track hover state
  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => { isHovering = true; });
    el.addEventListener('mouseleave', () => { isHovering = false; });
  });

  // Small offsets so the arrow tip matches the pointer
  const OFFSET_X = 2; // aligns with SVG path starting near (2,2)
  const OFFSET_Y = 2;

  // Animation loop
  function animate() {
    const targetX = mouseX - OFFSET_X;
    const targetY = mouseY - OFFSET_Y;
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;

    c.style.transform = `translate(${x}px, ${y}px)`;
    c.style.opacity = isHovering ? '0.9' : '1';

    requestAnimationFrame(animate);
  }

  animate();
})();

// Magnetic buttons
document.querySelectorAll('.magnet').forEach(el => {
  const strength = 20;
  
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
    const dy = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
    
    el.style.transform = `translate(${dx*strength}px, ${dy*strength}px)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    }
  });
});

// Randomize brutal elements position slightly on load
document.querySelectorAll('.brutal-element').forEach(el => {
  const randomX = Math.floor(Math.random() * 40) - 20;
  const randomY = Math.floor(Math.random() * 40) - 20;
  el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.floor(Math.random() * 20) - 10}deg)`;
});