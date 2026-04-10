const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const themeToggle = document.getElementById('themeToggle');

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || storedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', storedTheme);
}

const setThemeButtonState = () => {
  if (!themeToggle) {
    return;
  }

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = themeToggle.querySelector('i');
  const label = themeToggle.querySelector('span');

  themeToggle.setAttribute('aria-pressed', String(isDark));
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  if (label) {
    label.textContent = isDark ? 'Light' : 'Dark';
  }
};

setThemeButtonState();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setThemeButtonState();
  });
}

if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (mainMenu && mainMenu.classList.contains('open')) {
      mainMenu.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0.05,
  }
);

sections.forEach((section) => activeObserver.observe(section));

const contactForm = document.getElementById('contactForm');
const status = document.getElementById('status');

if (contactForm && status) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Thanks for reaching out. I will get back to you soon.';
    contactForm.reset();
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
