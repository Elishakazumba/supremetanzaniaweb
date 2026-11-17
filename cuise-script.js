// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = document.getElementById('sn-header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const navbar = document.getElementById('sn-header');

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .trust-card, .safari-card, .day-card, .why-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== GALLERY LAZY LOAD (placeholder) =====
// Images are already loaded via CSS background-image
// This ensures smooth appearance

// ===== WHATSAPP BUTTON PRE-FILL =====
// Already set in href attribute

// ===== FORM SUBMISSION: opens WhatsApp with the enquiry pre-filled =====
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const f = this.elements;
  const pick = (el) => (el && el.selectedIndex > 0 ? el.value : '');
  const lines = [
    'Hello Supreme Tanzania Safaris, I would like to request a quote.',
    'Name: ' + f[0].value,
    'Email: ' + f[1].value,
    'WhatsApp: ' + f[2].value,
    f[3].value && 'Country: ' + f[3].value,
    f[4].value && 'Travellers: ' + f[4].value,
    f[5].value && 'Travel date: ' + f[5].value,
    pick(f[6]) && 'Interested in: ' + pick(f[6]),
    pick(f[7]) && 'Budget: ' + pick(f[7]),
    f[8].value && 'Message: ' + f[8].value
  ].filter(Boolean);
  window.open('https://wa.me/255784749895?text=' + encodeURIComponent(lines.join('\n')), '_blank');
  this.reset();
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.btn-plan)');

window.addEventListener('scroll', () => {
  let current = '';
  const navHeight = navbar.offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.style.color = '#3a3a3a';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#c89d6b';
    }
  });
});
