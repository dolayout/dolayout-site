(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const categoryNav = document.querySelector('.menu-categories');
  const menuGroups = [...document.querySelectorAll('.menu-group')];
  if (categoryNav) {
    categoryNav.setAttribute('role', 'tablist');
    categoryNav.setAttribute('aria-label', 'Browse menu categories');
    [...categoryNav.querySelectorAll('a')].forEach((link, index) => {
      const id = link.hash.slice(1);
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = link.textContent.replace(' ↘', '');
      button.id = 'tab-' + id; button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', id); button.setAttribute('aria-selected', String(index === 0));
      button.tabIndex = index === 0 ? 0 : -1;
      link.replaceWith(button);
      const panel = document.getElementById(id);
      panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', button.id);
      panel.hidden = index !== 0;
      button.addEventListener('click', () => selectCategory(button));
    });
    function selectCategory(button) {
      categoryNav.querySelectorAll('button').forEach(tab => {
        const selected = tab === button;
        tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = !selected; panel.classList.toggle('is-entering', selected);
      });
      button.scrollIntoView({block:'nearest', inline:'nearest', behavior: reducedMotion ? 'auto' : 'smooth'});
    }
    categoryNav.addEventListener('keydown', event => {
      const tabs = [...categoryNav.querySelectorAll('button')];
      const index = tabs.indexOf(document.activeElement);
      if (index < 0 || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus(); selectCategory(tabs[next]);
    });
    const hashTab = document.querySelector('#tab-' + location.hash.slice(1));
    if (hashTab) selectCategory(hashTab);
  }
  if ('IntersectionObserver' in window && !reducedMotion) {
    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('in-view');revealObserver.unobserve(entry.target);}
    }), {threshold:.08});
    document.querySelectorAll('.intro>div,.menu-heading,.gallery-head,.story-copy,.yard-banner img,.visit>h2,.visit>p').forEach(element => {
      element.setAttribute('data-reveal',''); revealObserver.observe(element);
    });
  }
  const galleryTrack = document.querySelector('.track');
  const gallerySlides = [...document.querySelectorAll('.slide')];
  if (galleryTrack && gallerySlides.length) {
    const progress = document.createElement('div'); progress.className = 'gallery-progress'; progress.setAttribute('aria-hidden','true');
    progress.innerHTML = '<span></span>'; document.querySelector('.controls .counter').after(progress);
    function updateGallery() {
      const selected = Math.max(0, Math.min(gallerySlides.length - 1, Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth)));
      gallerySlides.forEach((slide,index) => slide.classList.toggle('is-active', index === selected));
      progress.firstElementChild.style.transform = 'scaleX(' + ((selected + 1) / gallerySlides.length) + ')';
    }
    galleryTrack.addEventListener('scroll',updateGallery,{passive:true}); window.addEventListener('resize',updateGallery); updateGallery();
  }
  const dockLinks = [...document.querySelectorAll('.dock a[href^="#"]')];
  let queued = false;
  function updateNavigation() {
    queued = false;
    const marker = window.innerHeight * .4;
    let current = '';
    dockLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section && section.getBoundingClientRect().top <= marker) current = link.hash;
    });
    dockLinks.forEach(link => {if(link.hash===current)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
  }
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateNavigation);}},{passive:true}); updateNavigation();
})();
