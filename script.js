/* ============================================================
   LOADER
============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

/* ============================================================
   SCROLL PROGRESS
============================================================ */
window.addEventListener('scroll', () => {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  el.style.width = scrolled + '%';
});

/* ============================================================
   NAVBAR SCROLL EFFECT + ACTIVE LINK
============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  // Back to top
  const btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

/* ============================================================
   BACK TO TOP
============================================================ */
const bttBtn = document.getElementById('btt');
if (bttBtn) {
  bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   TYPING EFFECT
============================================================ */
const roles = [
  'Aspiring Data Analyst',
  'AI Enthusiast',
  'Machine Learning Explorer',
  'Software Engineering Student',
  'Cloud Learner'
];
let ri = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing-el');

function typeLoop() {
  if (!typingEl) return;
  const current = roles[ri];
  typingEl.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);

  if (!deleting && ci === current.length + 1) {
    deleting = true;
    setTimeout(typeLoop, 1600);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    setTimeout(typeLoop, 400);
    return;
  }
  setTimeout(typeLoop, deleting ? 48 : 88);
}
typeLoop();

/* ============================================================
   PARTICLES CANVAS
============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.1
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${p.a})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });

    // Draw faint connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,106,247,${0.08 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade')
  .forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL TABS
============================================================ */
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skill-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = document.getElementById('tab-' + btn.dataset.tab);
    if (pane) pane.classList.add('active');
  });
});

/* ============================================================
   GALLERY LIGHTBOX
============================================================ */
const lightbox = document.getElementById('lightbox');
const lbLabel = document.getElementById('lb-label');
const lbClose = document.getElementById('lb-close');

document.querySelectorAll('.gallery-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    if (lightbox && lbLabel) {
      lbLabel.textContent = tile.dataset.label || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (lbClose) {
  lbClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });
}
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   CONTACT FORM (currently disabled / not in use)
============================================================ */
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//   contactForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('cName');
//     const email = document.getElementById('cEmail');
//     const subject = document.getElementById('cSubject');
//     const message = document.getElementById('cMessage');
//     const success = document.getElementById('form-success');
//     const error = document.getElementById('form-error');
//     const btn = document.getElementById('submit-btn');

//     [name, email, subject, message].forEach(f => f.classList.remove('is-invalid'));
//     success.classList.add('d-none');
//     error.classList.add('d-none');

//     let valid = true;
//     if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
//     if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) { email.classList.add('is-invalid'); valid = false; }
//     if (!subject.value.trim()) { subject.classList.add('is-invalid'); valid = false; }
//     if (!message.value.trim()) { message.classList.add('is-invalid'); valid = false; }

//     if (!valid) { error.classList.remove('d-none'); return; }

//     btn.disabled = true;
//     btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
//     setTimeout(() => {
//       btn.disabled = false;
//       btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
//       contactForm.reset();
//       success.classList.remove('d-none');
//       setTimeout(() => success.classList.add('d-none'), 5000);
//     }, 1400);
//   });
// }