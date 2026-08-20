document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // Language switcher: toggle document language and persist choice
  const langSwitch = document.getElementById('lang-switch');
  const savedLang = localStorage.getItem('siteLang');

  const navTranslations = {
    'index.html': { en: 'Home', zh: '主页' },
    'projects.html': { en: 'Projects', zh: '研究项目' },
    'publications.html': { en: 'Publications', zh: '论文' },
    'contact.html': { en: 'Contact', zh: '联系' },
  };

  function updateNavText(lang) {
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (navTranslations[href]) {
        link.textContent = navTranslations[href][lang] || link.textContent;
      }
    });
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    if (langSwitch) {
      if (lang === 'zh') {
        langSwitch.classList.add('is-zh');
        langSwitch.setAttribute('aria-pressed', 'true');
      } else {
        langSwitch.classList.remove('is-zh');
        langSwitch.setAttribute('aria-pressed', 'false');
      }
    }
    updateNavText(lang);
    localStorage.setItem('siteLang', lang);
  }

  if (langSwitch) {
    const initial = savedLang || document.documentElement.lang || 'en';
    setLang(initial);
    langSwitch.addEventListener('click', () => {
      const next = document.documentElement.lang === 'en' ? 'zh' : 'en';
      setLang(next);
    });
  }
});
