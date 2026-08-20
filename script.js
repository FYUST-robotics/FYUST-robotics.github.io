document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  // Highlight the active nav link based on the current page filename.
  // This works for both root pages and pages under zh/ (hrefs may include ../ or zh/ prefixes).
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const hrefFile = href.split('/').pop();
    if (hrefFile && currentPath === hrefFile) {
      link.classList.add('active');
    }
  });

  const langSwitch = document.getElementById('lang-switch');
  if (!langSwitch) return;

  // Each page's language switch carries the counterpart URLs:
  // - data-en-href: relative link to the English version of THIS page
  // - data-zh-href: relative link to the Chinese version of THIS page
  // index.html has neither (it translates its content in place), so enHref === zhHref
  // is treated as "no separate counterpart" and the page toggles in place.
  const enHref = langSwitch.getAttribute('data-en-href');
  const zhHref = langSwitch.getAttribute('data-zh-href');
  const hasCounterpart = !!(enHref && zhHref && enHref !== zhHref);

  const navTranslations = {
    'index.html': { en: 'Home', zh: '主页' },
    'projects.html': { en: 'Projects', zh: '项目' },
    'publications.html': { en: 'Publications', zh: '论文' },
    'contact.html': { en: 'Contact', zh: '联系' },
  };

  function setKnobState(lang) {
    if (lang === 'zh') {
      langSwitch.classList.add('is-zh');
      langSwitch.setAttribute('aria-pressed', 'true');
    } else {
      langSwitch.classList.remove('is-zh');
      langSwitch.setAttribute('aria-pressed', 'false');
    }
  }

  // Update nav link text for the selected language (used on index.html).
  function updateNavText(lang) {
    links.forEach((link) => {
      const key = link.getAttribute('data-en') || link.getAttribute('href') || '';
      // Normalize keys like "zh/projects.html" or "../projects.html" to "projects.html".
      const norm = key.replace(/^(\.\.\/)+/, '').replace(/^(zh\/)?/, '');
      if (navTranslations[norm]) {
        link.textContent = navTranslations[norm][lang] || link.textContent;
      }
    });
  }

  // Swap link hrefs between the English and Chinese versions (used on index.html).
  function updateNavLinks(lang) {
    document.querySelectorAll('[data-en][data-zh]').forEach((el) => {
      const target = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      el.setAttribute('href', target);
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
    setKnobState(lang);
    updateNavText(lang);
    updateNavLinks(lang);
    updateContentText(lang);
    localStorage.setItem('siteLang', lang);
  }

  if (hasCounterpart) {
    // Static per-language pages (projects, publications, contact, project detail, ...).
    // Keep the stored preference in sync with the current page and navigate on toggle.
    const pageLang = document.documentElement.lang === 'zh' ? 'zh' : 'en';
    localStorage.setItem('siteLang', pageLang);
    setKnobState(pageLang);
    langSwitch.addEventListener('click', () => {
      const current = document.documentElement.lang === 'zh' ? 'zh' : 'en';
      const next = current === 'en' ? 'zh' : 'en';
      const target = next === 'zh' ? zhHref : enHref;
      localStorage.setItem('siteLang', next);
      window.location.href = target;
    });
  } else {
    // index.html: translate content in place and point links at the zh/ pages.
    const savedLang = localStorage.getItem('siteLang');
    setLang(savedLang || 'en');
    langSwitch.addEventListener('click', () => {
      const next = document.documentElement.lang === 'en' ? 'zh' : 'en';
      setLang(next);
    });
  }
});
