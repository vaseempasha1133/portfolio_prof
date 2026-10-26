
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// Publication search and year filter
const searchInput = document.querySelector('#publicationSearch');
const yearFilter = document.querySelector('#publicationYear');
const publicationItems = [
  ...document.querySelectorAll('.publication-item')
];
const emptyState = document.querySelector('#emptyState');

function filterPublications() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  const year = yearFilter?.value || 'all';
  let visible = 0;

  publicationItems.forEach((item) => {
    const matchesText = item.textContent.toLowerCase().includes(query);
    const matchesYear = year === 'all' || item.dataset.year === year;
    const show = matchesText && matchesYear;

    item.hidden = !show;
    if (show) visible++;
  });

  if (emptyState) emptyState.hidden = visible !== 0;
}

searchInput?.addEventListener('input', filterPublications);
yearFilter?.addEventListener('change', filterPublications);

// Current year
const currentYear = document.querySelector('#currentYear');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Contact form (existing email-draft behavior)
const contactForm = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto =
    `mailto:imamvali_shaik@srmap.edu.in?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  if (formNote) {
    formNote.textContent =
      'Opening your email application. The message has not been saved to the database.';
  }

  window.location.href = mailto;
});

// Animate career highlight counters
const liveCounters = document.querySelectorAll('.live-count');

function animateCounter(counter) {
  if (counter.dataset.counted === 'true') return;

  counter.dataset.counted = 'true';

  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || '';
  const duration = 1300;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    counter.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  liveCounters.forEach((counter) => counterObserver.observe(counter));
} else {
  liveCounters.forEach(animateCounter);
}

// Load research areas from Supabase
async function loadResearchAreas() {
  if (typeof supabaseClient === 'undefined') {
    console.error('Supabase client is not available.');
    return;
  }

  const { data, error } = await supabaseClient
    .from('research_areas')
    .select('*');

  if (error) {
    console.error('Failed to load research areas:', error.message);
    return;
  }

  // Find the research section in the existing HTML.
  let container = document.querySelector(
    '#researchAreas, #research-areas, .research-grid'
  );

  if (!container) {
    const headings = [
      ...document.querySelectorAll('h1, h2, h3, h4')
    ];

    const heading = headings.find((item) =>
      item.textContent.trim().toLowerCase().includes('research areas')
    );

    const section = heading?.closest('section');

    if (section) {
      container = document.createElement('div');
      container.id = 'researchAreas';
      container.className = 'research-grid';
      heading.insertAdjacentElement('afterend', container);
    }
  }

  if (!container) {
    console.error(
      'Research areas container not found. Please check index.html.'
    );
    return;
  }

  container.replaceChildren();

  if (!data || data.length === 0) {
    container.textContent = 'Research areas will be added soon.';
    return;
  }

  data.forEach((area) => {
    const card = document.createElement('article');
    card.className = 'research-card';

    const title = document.createElement('h3');
    title.textContent = area.title || 'Research Area';

    const description = document.createElement('p');
    description.textContent = area.description || '';

    card.append(title, description);
    container.appendChild(card);
  });

  console.log(`Loaded ${data.length} research areas.`);
}

//loadResearchAreas();
