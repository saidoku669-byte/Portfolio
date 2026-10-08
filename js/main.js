// Portfolio — vanilla JS: theme, menu, filter, modal, reveal, form, misc

const projects = [
  { id: 1, title: 'Neon Bank App', category: 'ui', year: '2025', blurb: 'Mobile banking UI + design system.', detail: 'Role: UI design. Process: audit → wireframes → system → prototype. Outcome: +18% activation in test.' },
  { id: 2, title: 'Fern Coffee Brand', category: 'brand', year: '2025', blurb: 'Logo, packaging, guidelines.', detail: 'Role: identity. Deliverables: logo suite, packaging, social kit.' },
  { id: 3, title: 'Botanical Spots', category: 'illustration', year: '2024', blurb: 'Editorial illustration set.', detail: '12 spot illustrations for articles and social.' },
  { id: 4, title: 'Orbit Launch Loop', category: 'motion', year: '2024', blurb: 'Launch animation + social cuts.', detail: '6s loop, 3 social cutdowns, Lottie export.' },
  { id: 5, title: 'Clinic Landing', category: 'ui', year: '2024', blurb: 'Landing page + CMS components.', detail: '12 sections, accessible AA, 98 Lighthouse.' },
  { id: 6, title: 'Mono Type Poster', category: 'brand', year: '2023', blurb: 'Poster + type exploration.', detail: 'Print series + digital wallpapers.' },
];

const grid = document.getElementById('projectGrid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function render(filter = 'all') {
  grid.innerHTML = '';
  projects
    .filter((p) => filter === 'all' || p.category === filter)
    .forEach((p) => {
      const el = document.createElement('article');
      el.className = 'project-card border rounded-2xl overflow-hidden reveal visible';
      el.innerHTML = `
        <div class="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center text-sm">${p.title} cover</div>
        <div class="p-4">
          <p class="text-xs uppercase tracking-widest text-neutral-500">${p.category} · ${p.year}</p>
          <h3 class="font-bold mt-1">${p.title}</h3>
          <p class="text-sm text-neutral-500 mt-1">${p.blurb}</p>
          <button class="mt-3 text-sm underline" data-open="${p.id}">View case study</button>
        </div>`;
      grid.appendChild(el);
    });
}
render();

document.querySelectorAll('.filter-btn').forEach((b) =>
  b.addEventListener('click', () => render(b.dataset.filter))
);

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-open]');
  if (!btn) return;
  const p = projects.find((x) => x.id === Number(btn.dataset.open));
  modalTitle.textContent = p.title;
  modalBody.innerHTML = `<p><strong>${p.category} · ${p.year}</strong></p><p class="mt-2">${p.detail}</p><p class="mt-2 text-neutral-500">Replace with 3–6 images, process steps and links.</p>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Theme
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
function setTheme(dark) {
  root.classList.toggle('dark', dark);
  toggle.textContent = dark ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
}
setTheme((() => { try { return localStorage.getItem('theme') !== 'light'; } catch { return true; } })());
toggle.addEventListener('click', () => setTheme(!root.classList.contains('dark')));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!open));
});
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// Reveal on scroll
const io = new IntersectionObserver((entries) =>
  entries.forEach((en) => en.isIntersecting && en.target.classList.add('visible')),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Form (front-end only — point action to Formspree/Netlify to go live)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const msg = document.getElementById('formMsg');
  if (fd.get('company')) return; // honeypot
  if (!fd.get('name') || !String(fd.get('email')).includes('@') || !fd.get('message')) {
    msg.textContent = 'Please fill name, valid email and message.';
    return;
  }
  msg.textContent = 'Thanks! Hook this form to Formspree/Netlify to receive messages. (Demo success state.)';
  e.target.reset();
});

// Smooth scroll for hero CTA + scroll cue (respects reduced motion)
document.querySelectorAll('[data-scrollto]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('data-scrollto'));
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  })
);

// Misc
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
