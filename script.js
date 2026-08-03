document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
});
