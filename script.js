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
    'projects.html': { en: 'Projects', zh: '项目' },
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

  const contentTranslations = {
    eyebrow: {
      en: 'FYUST Aerial Robotics Lab',
      zh: '福耀科技大学 空中机器人实验室',
    },
    heroTitle: {
      en: 'Designing intelligent machines for real-world impact',
      zh: '设计面向真实场景的智能飞行器',
    },
    heroText: {
      en:
        'FYUST (Fuyao University of Science and Technology) Aerial Robotics Lab is devoted to the intersection of aerial robots and embodied intelligence. Our aim is to design autonomous flying vehicles for inspection and surveillance tasks. We develop sophisticated algorithms and platforms in research areas including advanced flight control, GPS-denied navigation and robot perception.',
      zh:
        '福耀科技大学空中机器人实验室致力于空中机器人与具身智能的交叉研究。我们的目标是设计用于检测与巡检任务的自主飞行器。我们开发先进的算法与平台，研究方向包括高级飞行控制、无GPS导航与机器人感知。',
    },
    btnExplore: { en: 'Explore Projects', zh: '查看项目' },
    btnContact: { en: 'Get in Touch', zh: '联系我们' },
    heroCardTitle: { en: 'Current Focus', zh: '当前研究方向' },
    focus1: { en: 'Advanced flight control', zh: '先进飞行控制' },
    focus2: { en: 'GPS-denied navigation', zh: '无GPS导航' },
    focus3: { en: 'Robot perception', zh: '机器人感知' },
  };

  function updateContentText(lang) {
    const elems = document.querySelectorAll('[data-i18n]');
    elems.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (contentTranslations[key] && contentTranslations[key][lang]) {
        el.textContent = contentTranslations[key][lang];
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
    updateContentText(lang);
    localStorage.setItem('siteLang', lang);
  }

  if (langSwitch) {
    // Prefer a stored preference, otherwise default to English on the index page
    const initial = savedLang || 'en';
    setLang(initial);
    langSwitch.addEventListener('click', () => {
      const next = document.documentElement.lang === 'en' ? 'zh' : 'en';
      setLang(next);
    });
  }
});
