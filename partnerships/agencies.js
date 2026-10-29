(() => {
  const root = document.querySelector('[data-agencies-page]');
  if (!root) return;

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const asset = (path) => path.startsWith('/') ? path : `/${path}`;
  const projectURL = (id) => `/#/card/${encodeURIComponent(`${id}-pin-1`)}`;
  const language = () => localStorage.getItem('dolayout-language') === 'pt' ? 'pt' : 'en';
  let pageData;
  let parallaxHandler;

  fetch('/partnerships/data.json')
    .then((response) => { if (!response.ok) throw new Error('Page content unavailable'); return response.json(); })
    .then((data) => { pageData = data.agencies; render(); })
    .catch((error) => {
      console.error('Dolayout for Agencies failed to render:', error);
      root.innerHTML = '<p class="bf-error">This page could not be loaded. Please try again.</p>';
    });

  function render() {
    if (parallaxHandler) window.removeEventListener('scroll', parallaxHandler);
    const lang = language();
    const content = { ...pageData, ...(pageData[lang] || {}) };
    const projects = new Map((window.dolayoutPortfolioProjects || []).map((project) => [project.id, project]));
    const work = content.work.map((item) => ({ ...item, project: projects.get(item.projectId) })).filter((item) => item.project);
    const support = content.support.map((item) => ({ ...item, project: projects.get(item.projectId) })).filter((item) => item.project);
    if (!work.length || !support.length) throw new Error('Agency work is missing project data');
    const title = (project) => lang === 'pt' ? project.titlePt || project.title : project.title;
    const theme = localStorage.getItem('dolayout-theme') === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.add('bf-body');
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = content.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = content.description;

    const filters = ['All', 'Branding', 'Identity', 'Art Direction', 'Campaign', 'Website Design'];
    const filterPt = { All: 'Todos', Branding: 'Branding', Identity: 'Identidade', 'Art Direction': 'Direção de arte', Campaign: 'Campanha', 'Website Design': 'Design digital' };
    const imageFor = (item) => asset(item.image || item.project.image);
    const hero = '/assets/dolayout/portfolio/site/Lotts-Beer-Dolayout-01-01.webp';

    root.classList.add('bf-root');
    root.innerHTML = `
      <header class="bf-header" id="top">
        <a class="bf-brand" href="/" aria-label="Dolayout home"><span class="bf-symbol"><img class="bf-symbol-dark" src="/assets/dolayout/brand/dolayout-symbol-full-br.svg" alt=""><img class="bf-symbol-light" src="/assets/dolayout/brand/dolayout-symbol-full-dark.svg" alt=""></span><span>dolayout</span></a>
        <nav class="bf-nav" id="bf-mobile-menu" aria-label="Page sections">${content.nav.map((label, i) => `<a href="#${['selected-work','expertise','collaboration','about','contact'][i]}">${esc(label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav>
        <div class="bf-actions"><button class="bf-theme" type="button" aria-label="${lang === 'pt' ? 'Alternar tema' : 'Switch theme'}" title="${lang === 'pt' ? 'Alternar tema' : 'Switch theme'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M3 12h2m14 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg></button><button class="bf-language" type="button" aria-label="${lang === 'pt' ? 'Switch to English' : 'Mudar para português'}">${lang === 'pt' ? 'EN' : 'PT'}</button><button class="bf-menu-toggle" type="button" aria-controls="bf-mobile-menu" aria-expanded="false" aria-label="${lang === 'pt' ? 'Abrir menu' : 'Open menu'}"><span></span><span></span></button></div>
      </header>
      <section class="bf-hero ag-hero-lime"><img class="bf-hero-image" src="${esc(hero)}" alt="${lang === 'pt' ? 'Identidade visual da cerveja Lotts & Co.' : 'Lotts & Co. beer visual identity'}" fetchpriority="high"><div class="bf-hero-shade"></div><div class="bf-hero-copy"><p class="bf-eyebrow">DOLAYOUT <span> / </span> FOR AGENCIES</p><h1>${esc(content.headline)}</h1><p>${esc(content.intro)}</p><a class="bf-hero-cta" href="#selected-work">${esc(content.cta)} <span aria-hidden="true">↘</span></a></div><span class="bf-hero-caption">01 / LOTTS & CO. — BEER PACKAGING</span><span class="bf-hero-scroll" aria-hidden="true">SCROLL TO EXPLORE <b>↓</b></span></section>
      <section class="bf-intro" aria-label="Introduction"><span class="bf-index">D / 01</span><p>${lang === 'pt' ? 'Boas ideias crescem quando encontram o time certo para ganhar forma.' : 'Good ideas grow when they find the right team to take shape.'}</p><span class="bf-intro-star" aria-hidden="true">✳</span></section>
      <section class="bf-work" id="selected-work"><div class="bf-hub-heading"><h2>${lang === 'pt' ? 'TRABALHOS SELECIONADOS' : 'SELECTED WORK'}</h2><span><b data-gallery-count>${work.length}</b> ${lang === 'pt' ? 'projetos' : 'projects'}</span></div><div class="bf-hub-filters" role="group" aria-label="${lang === 'pt' ? 'Filtrar projetos' : 'Filter projects'}">${filters.map((filter, i) => `<button type="button" data-gallery-filter="${esc(filter)}" aria-pressed="${i === 0}">${esc(lang === 'pt' ? filterPt[filter] : filter)}</button>`).join('')}</div><div class="bf-gallery" data-gallery>${work.map((item, i) => {
        const project = item.project;
        const mediaFile = imageFor(item);
        const isVideo = /\.mp4(?:$|[?])/i.test(mediaFile);
        const media = isVideo ? `<video src="${mediaFile}" poster="${esc(asset(project.image))}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>` : `<img src="${mediaFile}" alt="${esc(title(project))}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">`;
        const categories = (project.categories || []).join('|');
        return `<a class="bf-pin" href="${projectURL(project.id)}" data-project-id="${esc(project.id)}" data-categories="${esc(categories)}" aria-label="${esc(title(project))}"><span class="bf-pin-visual">${media}<span class="bf-pin-tag">${esc(project.category)}</span><span class="bf-pin-title">${esc(title(project))} ↗</span></span></a>`;
      }).join('')}</div></section>
      <section class="bf-support" id="expertise"><div class="bf-section-head"><span class="bf-index">02 / ${esc(content.nav[1])}</span><div><h2>${esc(content.supportTitle)}</h2><p>${esc(content.supportIntro)}</p></div></div><div class="bf-support-body"><div class="bf-support-list">${support.map((item, i) => `<div class="bf-support-option${i === 0 ? ' is-active' : ''}"><button type="button" class="bf-support-item" data-support-index="${i}" aria-controls="support-copy-${i}" aria-expanded="${i === 0}"><span>${esc(item.number)}</span><strong>${esc(item.title)}</strong><span class="bf-support-arrow" aria-hidden="true">↗</span></button><div class="bf-support-description" id="support-copy-${i}"><div><p>${esc(item.text)}</p></div></div></div>`).join('')}</div><div class="bf-support-stage"><div class="bf-support-track" data-support-track aria-label="${lang === 'pt' ? 'Carrossel de projetos' : 'Project carousel'}"></div><div class="bf-support-controls" data-support-controls></div></div></div></section>
      <section class="bf-collaboration" id="collaboration"><div class="bf-section-head"><span class="bf-index">03 / ${esc(content.nav[2])}</span><div><h2>${esc(content.workTogetherTitle)}</h2><p>${esc(content.workTogetherIntro)}</p></div></div><div class="bf-ways">${content.ways.map((item, i) => `<article><span>0${i + 1}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
      <section class="bf-studio" id="about"><img class="bf-studio-image" src="/assets/lp/dolayout-glass.png" alt="" loading="lazy"><div class="bf-studio-about"><span class="bf-index">04 / ${esc(content.nav[3])}</span><h2>${lang === 'pt' ? 'Experiência em contextos diferentes.' : 'Experience across different teams.'}</h2><p>${lang === 'pt' ? 'João é designer e diretor de arte independente. Há quase 10 anos colabora com equipes da LAF em projetos de marca, campanhas e digital, além de desenvolver trabalhos diretamente com seus próprios clientes.' : 'João is an independent designer and art director. For nearly 10 years, he has collaborated with LAF teams across branding, campaigns and digital, while also working directly with his own clients.'}</p></div><div class="bf-studio-contact" id="contact"><div><span class="bf-index">05 / ${esc(content.nav[4])}</span><h2>${esc(content.contactTitle)}</h2><p>${esc(content.contactText)}</p></div><div class="bf-contact-links"><a href="https://wa.me/${esc(content.phone)}?text=${encodeURIComponent(content.whatsappText)}" target="_blank" rel="noopener noreferrer">${esc(content.contactCta)} <span>↗</span></a><a href="mailto:${esc(content.email)}?subject=${encodeURIComponent(lang === 'pt' ? 'Colaboração criativa' : 'Creative collaboration')}">${esc(content.email)} <span>↗</span></a></div></div></section>
      <footer class="bf-footer"><a href="/">dolayout</a><span>${lang === 'pt' ? 'Estúdio criativo independente' : 'Independent creative studio'}</span><a href="#top">${lang === 'pt' ? 'Voltar ao topo' : 'Back to top'} ↑</a></footer>
      <dialog class="bf-project-modal" aria-label="Project details"></dialog>`;

    bindPageControls(lang, work, projects, support);
    renderSupport(support[0], lang);
    observeReveals();
    initParallax();
    if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }));
  }

  function renderSupport(item, lang) {
    const track = root.querySelector('[data-support-track]');
    const project = item.project;
    const slides = project.feedCarousel?.length ? project.feedCarousel : [project.image];
    const projectTitle = lang === 'pt' ? project.titlePt || project.title : project.title;
    track.innerHTML = slides.map((file, i) => {
      const src = asset(file);
      const media = /\.mp4(?:$|[?])/i.test(file)
        ? `<video src="${esc(src)}" poster="${esc(asset(project.image))}" autoplay muted loop playsinline preload="metadata"></video>`
        : `<img src="${esc(src)}" alt="${esc(projectTitle)} — ${String(i + 1).padStart(2, '0')}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
      return `<a class="bf-support-slide" href="${projectURL(project.id)}" data-project-id="${esc(project.id)}" aria-label="${esc(projectTitle)} — ${i + 1} of ${slides.length}">${media}<span>${esc(projectTitle)}${project.source === 'LAF' ? ' · LAF' : ''}</span></a>`;
    }).join('');
    root.querySelector('[data-support-controls]').innerHTML = slides.map((_, i) => `<button type="button" aria-label="${lang === 'pt' ? 'Ir para imagem ' : 'Go to image '}${i + 1}" aria-pressed="${i === 0}" data-support-dot="${i}"></button>`).join('');
    root.querySelectorAll('[data-support-dot]').forEach((dot) => dot.addEventListener('click', () => {
      track.children[Number(dot.dataset.supportDot)]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      root.querySelectorAll('[data-support-dot]').forEach((other) => other.setAttribute('aria-pressed', String(other === dot)));
    }));
    track.onscroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      root.querySelectorAll('[data-support-dot]').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    };
  }

  function bindPageControls(lang, work, projects, support) {
    const menuButton = root.querySelector('.bf-menu-toggle');
    const closeMenu = () => {
      root.classList.remove('bf-menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', lang === 'pt' ? 'Abrir menu' : 'Open menu');
      document.body.classList.remove('bf-menu-locked');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      root.classList.toggle('bf-menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : (lang === 'pt' ? 'Abrir menu' : 'Open menu'));
      document.body.classList.toggle('bf-menu-locked', open);
    });
    root.querySelectorAll('.bf-nav a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

    root.querySelectorAll('[data-gallery-filter]').forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.galleryFilter;
      root.querySelectorAll('[data-gallery-filter]').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      const cards = [...root.querySelectorAll('.bf-pin')];
      cards.forEach((card) => { card.hidden = filter !== 'All' && !card.dataset.categories.split('|').includes(filter); });
      root.querySelector('[data-gallery-count]').textContent = cards.filter((card) => !card.hidden).length;
    }));

    root.querySelectorAll('[data-support-index]').forEach((button) => button.addEventListener('click', () => {
      const item = support[Number(button.dataset.supportIndex)];
      root.querySelectorAll('[data-support-index]').forEach((other) => {
        const active = other === button;
        other.setAttribute('aria-expanded', String(active));
        other.closest('.bf-support-option').classList.toggle('is-active', active);
      });
      const track = root.querySelector('[data-support-track]');
      track.scrollLeft = 0;
      renderSupport(item, lang);
    }));

    const modal = root.querySelector('.bf-project-modal');
    let modalTrigger;
    const openModal = (project) => {
      const projectName = lang === 'pt' ? project.titlePt || project.title : project.title;
      const projectDescription = lang === 'pt' ? project.descriptionPt || project.description : project.description;
      const credit = project.source === 'LAF' ? (lang === 'pt' ? project.creditPt : project.credit) : (lang === 'pt' ? 'Projeto independente · Dolayout' : 'Independent project · Dolayout');
      const files = [...new Set(project.gallery?.length ? project.gallery : project.images?.length ? project.images : project.feedCarousel?.length ? project.feedCarousel : [project.image])].filter(Boolean);
      const images = files.map((file, i) => {
        const src = asset(file);
        if (/\.mp4(?:$|[?])/i.test(file)) {
          const poster = files.slice(i + 1).find((name) => !/\.mp4(?:$|[?])/i.test(name)) || project.image;
          return `<video src="${esc(src)}"${poster ? ` poster="${esc(asset(poster))}"` : ''} autoplay muted loop playsinline controls preload="metadata"></video>`;
        }
        return `<img src="${esc(src)}" alt="${esc(projectName)} — ${String(i + 1).padStart(2, '0')}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
      }).join('');
      const tags = (project.hashtags || project.tags || []).slice(0, 8).map((tag) => `<span>#${esc(tag.replace(/^#/, '').replace(/\s+/g, ''))}</span>`).join('');
      modal.innerHTML = `<div class="bf-modal-inner"><button class="bf-modal-close" type="button" aria-label="${lang === 'pt' ? 'Fechar projeto' : 'Close project'}">×</button><header class="bf-modal-intro"><span class="bf-modal-category">${esc(lang === 'pt' ? project.categoryPt || project.category : project.category)}</span><h2>${esc(projectName)}</h2><p>${esc(projectDescription)}</p><small>${lang === 'pt' ? 'Créditos' : 'Credits'}: ${esc(credit)}</small><div class="bf-modal-tags">${tags}</div><a href="${projectURL(project.id)}" class="bf-modal-full">${lang === 'pt' ? 'Ver projeto completo' : 'Open full project'} <span aria-hidden="true">↗</span></a></header><div class="bf-modal-gallery">${images}</div></div>`;
      modalTrigger = document.activeElement;
      modal.showModal();
      document.body.classList.add('bf-project-modal-open');
      modal.querySelector('.bf-modal-close').focus();
    };
    root.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-project-id]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const project = projects.get(link.dataset.projectId);
      if (!project) return;
      event.preventDefault();
      openModal(project);
    });
    modal.addEventListener('click', (event) => { if (event.target === modal || event.target.closest('.bf-modal-close')) modal.close(); });
    modal.addEventListener('close', () => { document.body.classList.remove('bf-project-modal-open'); modalTrigger?.focus(); });

    root.querySelector('.bf-theme').addEventListener('click', () => {
      const next = document.body.classList.contains('light') ? 'dark' : 'light';
      document.body.classList.toggle('light', next === 'light');
      localStorage.setItem('dolayout-theme', next);
    });
    root.querySelector('.bf-language').addEventListener('click', () => {
      localStorage.setItem('dolayout-language', lang === 'pt' ? 'en' : 'pt');
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function observeReveals() {
    const targets = root.querySelectorAll('.bf-section-head,.bf-ways article,.bf-studio-about,.bf-studio-contact');
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: .08 });
      targets.forEach((item) => observer.observe(item));
    } else targets.forEach((item) => item.classList.add('is-visible'));
  }

  function initParallax() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroImage = root.querySelector('.bf-hero-image');
    const hero = root.querySelector('.bf-hero');
    const studioImage = root.querySelector('.bf-studio-image');
    const studio = root.querySelector('.bf-studio');
    let ticking = false;
    const update = () => {
      const heroTop = hero.getBoundingClientRect().top;
      heroImage.style.setProperty('--bf-parallax', `${Math.round(Math.max(0, Math.min(hero.offsetHeight, -heroTop)) * .12)}px`);
      const studioTop = studio.getBoundingClientRect().top;
      const travel = Math.max(-studio.offsetHeight, Math.min(studio.offsetHeight, -studioTop));
      studioImage.style.setProperty('--bf-studio-parallax', `${Math.round(travel * (matchMedia('(max-width: 600px)').matches ? .025 : .07))}px`);
      ticking = false;
    };
    parallaxHandler = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', parallaxHandler, { passive: true });
    update();
  }
})();
