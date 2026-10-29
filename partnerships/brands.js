(() => {
  const root = document.querySelector('[data-brands-page]');
  if (!root) return;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const projectUrl = (id) => `/#/card/${encodeURIComponent(`${id}-pin-1`)}`;
  const language = () => localStorage.getItem('dolayout-language') === 'pt' ? 'pt' : 'en';
  let onParallaxScroll = null;
  fetch('/partnerships/data.json').then((response) => {
    if (!response.ok) throw new Error('Content unavailable');
    return response.json();
  }).then((data) => render(data.brands)).catch((error) => {
    console.error('Dolayout for Brands failed to render:', error);
    root.innerHTML = '<p class="bf-error">This page could not be loaded. Please try again.</p>';
  });

  function render(page) {
    if (onParallaxScroll) window.removeEventListener('scroll', onParallaxScroll);
    const lang = language();
    const content = { ...page, ...(page[lang] || {}) };
    const byId = new Map((window.dolayoutPortfolioProjects || []).map((project) => [project.id, project]));
    const work = content.work.map((item) => ({ ...item, project: byId.get(item.projectId) })).filter((item) => item.project);
    const supportIds = ['portfolio-efetiva', 'portfolio-lotts-beer', 'portfolio-partilha-urbana-social', 'portfolio-realty-art'];
    const support = content.support.map((item, index) => ({ ...item, case: byId.get(supportIds[index]) })).filter((item) => item.case);
    const coverOverrides = {
      'portfolio-lotts-beer': 'assets/dolayout/portfolio/site/Lotts-Beer-Dolayout-01-00.poster.webp',
      'portfolio-paulies-pizza-packaging': 'assets/dolayout/portfolio/site/Paulies-Pizza-Labels-Dolayout-01-00.poster.webp',
      'portfolio-lotts-social-design': 'assets/dolayout/portfolio/site/Lotts-Social-Design-Dolayout-01.poster.webp'
    };
    const gallerySelection = [
      'portfolio-andalafat', 'portfolio-cello', 'portfolio-hise', 'portfolio-jinn', 'portfolio-pan-eile',
      'portfolio-lotts-hamper-box', 'portfolio-paulies-pizza-packaging', 'portfolio-lightsquad',
      'portfolio-noronha-co', 'portfolio-lotts-social-design', 'portfolio-lotts-coffee-cup'
    ].map((id) => {
      const project = byId.get(id);
      return project && { project, file: coverOverrides[id] || project.image, video: /\.mp4(?:$|[?])/i.test(project.image || '') };
    }).filter(Boolean);
    const galleryFilters = ['All', 'Branding', 'Identity', 'Website Design', 'Packaging', 'Social Media', 'Campaign'];
    const filterLabelsPt = { All: 'Todos', Branding: 'Branding', Identity: 'Identidade', 'Website Design': 'Sites', Packaging: 'Embalagem', 'Social Media': 'Redes sociais', Campaign: 'Campanha' };
    const name = (item) => lang === 'pt' ? item.project.titlePt || item.project.title : item.project.title;
    const assetUrl = (file) => file.startsWith('/') ? file : `/${file}`;
    const theme = localStorage.getItem('dolayout-theme') === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.add('bf-body');
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = content.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = content.description;
    const firstSupport = support[0];
    root.innerHTML = `
      <header class="bf-header" id="top"><a class="bf-brand" href="/" aria-label="Dolayout home"><span class="bf-symbol"><img class="bf-symbol-dark" src="/assets/dolayout/brand/dolayout-symbol-full-br.svg" alt=""><img class="bf-symbol-light" src="/assets/dolayout/brand/dolayout-symbol-full-dark.svg" alt=""></span><span>dolayout</span></a><nav class="bf-nav" id="bf-mobile-menu" aria-label="Page sections">${content.nav.map((label, index) => `<a href="#${['selected-work','expertise','collaboration','about','contact'][index]}">${esc(label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav><div class="bf-actions"><button class="bf-theme" type="button" aria-label="${lang === 'pt' ? 'Alternar tema' : 'Switch theme'}" title="${lang === 'pt' ? 'Alternar tema' : 'Switch theme'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M3 12h2m14 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg></button><button class="bf-language" type="button" aria-label="${lang === 'pt' ? 'Switch to English' : 'Mudar para português'}">${lang === 'pt' ? 'EN' : 'PT'}</button><button class="bf-menu-toggle" type="button" aria-controls="bf-mobile-menu" aria-expanded="false" aria-label="${lang === 'pt' ? 'Abrir menu' : 'Open menu'}"><span></span><span></span></button></div></header>
      <section class="bf-hero"><img class="bf-hero-image" src="/assets/lp/brands-beer-hero.webp" alt="Lotts & Co beer packaging in use" fetchpriority="high"><div class="bf-hero-shade"></div><div class="bf-hero-copy"><p class="bf-eyebrow">DOLAYOUT <span> / </span> FOR BRANDS</p><h1>${esc(content.headline)}</h1><p>${esc(content.intro)}</p><a class="bf-hero-cta" href="#selected-work">${esc(content.cta)} <span aria-hidden="true">↘</span></a></div><span class="bf-hero-caption">01 / LOTTS & CO. — BEER PACKAGING</span><span class="bf-hero-scroll" aria-hidden="true">SCROLL TO EXPLORE <b>↓</b></span></section>
      <section class="bf-intro" aria-label="Introduction"><span class="bf-index">D / 01</span><p>${lang === 'pt' ? 'Uma marca não vive só no lançamento. Ela aparece de novo, todos os dias.' : 'A brand does not live only at launch. It shows up again, every day.'}</p><span class="bf-intro-star" aria-hidden="true">✳</span></section>
      <section class="bf-work" id="selected-work"><div class="bf-hub-heading"><span><b data-gallery-count>${gallerySelection.length}</b> ${lang === 'pt' ? 'trabalhos' : 'works'}</span></div><div class="bf-hub-filters" role="group" aria-label="${lang === 'pt' ? 'Filtrar trabalhos' : 'Filter work'}">${galleryFilters.map((filter, index) => `<button type="button" data-gallery-filter="${esc(filter)}" aria-pressed="${index === 0}">${esc(lang === 'pt' ? filterLabelsPt[filter] : filter)}</button>`).join('')}</div><div class="bf-gallery" data-gallery>${gallerySelection.map((item, index) => { const label = item.project.category; const title = name(item); const src = assetUrl(item.file); const media = item.video ? `<video src="${esc(assetUrl(item.project.image))}" poster="${esc(src)}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>` : `<img src="${esc(src)}" alt="${esc(title)}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async">`; return `<a class="bf-pin" href="${projectUrl(item.project.id)}" data-project-id="${esc(item.project.id)}" data-categories="${esc((item.project.categories || []).join('|'))}" aria-label="${esc(title)}"><span class="bf-pin-visual">${media}<span class="bf-pin-tag">${esc(label)}</span><span class="bf-pin-title">${esc(title)} ↗</span></span></a>`; }).join('')}</div></section>
      <section class="bf-support" id="expertise"><div class="bf-section-head"><span class="bf-index">02 / ${esc(content.nav[1])}</span><div><h2>${esc(content.supportTitle)}</h2><p>${esc(content.supportIntro)}</p></div></div><div class="bf-support-body"><div class="bf-support-list">${support.map((item, index) => `<div class="bf-support-option${index === 0 ? ' is-active' : ''}"><button type="button" class="bf-support-item" data-support-index="${index}" aria-controls="support-copy-${index}" aria-expanded="${index === 0}"><span>${esc(item.number)}</span><strong>${esc(item.title)}</strong><span class="bf-support-arrow" aria-hidden="true">↗</span></button><div class="bf-support-description" id="support-copy-${index}"><div><p>${esc(item.text)}</p></div></div></div>`).join('')}</div><div class="bf-support-stage"><div class="bf-support-track" data-support-track aria-label="${lang === 'pt' ? 'Carrossel de trabalhos' : 'Selected work carousel'}"></div><div class="bf-support-controls" data-support-controls></div></div></div></section>
      <section class="bf-collaboration" id="collaboration"><div class="bf-section-head"><span class="bf-index">03 / ${esc(content.nav[2])}</span><div><h2>${esc(content.workTogetherTitle)}</h2><p>${esc(content.workTogetherIntro)}</p></div></div><div class="bf-ways">${content.ways.map((item, index) => `<article><span>0${index + 1}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
      <section class="bf-studio" id="about"><img class="bf-studio-image" src="/assets/lp/dolayout-glass.png" alt="" loading="lazy"><div class="bf-studio-about"><span class="bf-index">04 / ${esc(content.nav[3])}</span><h2>${esc(content.aboutTitle)}</h2><p>${esc(content.about)}</p></div><div class="bf-studio-contact" id="contact"><div><span class="bf-index">05 / ${esc(content.nav[4])}</span><h2>${esc(content.contactTitle)}</h2><p>${esc(content.contactText)}</p></div><div class="bf-contact-links"><a href="https://wa.me/${esc(content.phone)}?text=${encodeURIComponent(content.whatsappText)}" target="_blank" rel="noopener noreferrer">${esc(content.contactCta)} <span>↗</span></a><a href="mailto:${esc(content.email)}?subject=${encodeURIComponent(lang === 'pt' ? 'Apoio criativo para minha marca' : 'Creative support for my brand')}">${esc(content.email)} <span>↗</span></a></div></div></section><footer class="bf-footer"><a href="/">dolayout</a><span>${lang === 'pt' ? 'Estúdio criativo independente' : 'Independent creative studio'}</span><a href="#top">${lang === 'pt' ? 'Voltar ao topo' : 'Back to top'} ↑</a></footer>`;
    root.insertAdjacentHTML('beforeend', '<dialog class="bf-project-modal" aria-label="Project details"></dialog>');

    const supportTrack = root.querySelector('[data-support-track]');
    const renderSupportCarousel = (item) => {
      const slides = (item.case.feedCarousel || [item.case.image]).slice(0, 7);
      const caseName = lang === 'pt' ? item.case.titlePt || item.case.title : item.case.title;
      supportTrack.innerHTML = slides.map((file, index) => {
        const path = '/' + file;
        const media = new RegExp('[.]mp4(?:$|[?])', 'i').test(file)
          ? '<video src="' + path + '" poster="/' + item.case.image + '" autoplay muted loop playsinline preload="metadata"></video>'
          : '<img src="' + path + '" alt="' + esc(caseName) + ' — ' + String(index + 1).padStart(2, '0') + '" ' + (index ? 'loading="lazy"' : 'fetchpriority="high"') + ' decoding="async">';
        return '<a class="bf-support-slide" href="' + projectUrl(item.case.id) + '" data-project-id="' + esc(item.case.id) + '" aria-label="' + esc(caseName) + ' — ' + (index + 1) + ' of ' + slides.length + '">' + media + '<span>' + esc(caseName) + '</span></a>';
      }).join('');
      root.querySelector('[data-support-controls]').innerHTML = slides.map((_, index) => '<button type="button" aria-label="' + (lang === 'pt' ? 'Ir para imagem ' : 'Go to image ') + (index + 1) + '" aria-pressed="' + (index === 0) + '" data-support-dot="' + index + '"></button>').join('');
      root.querySelectorAll('[data-support-dot]').forEach((dot) => dot.addEventListener('click', () => {
        supportTrack.children[Number(dot.dataset.supportDot)]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        root.querySelectorAll('[data-support-dot]').forEach((other) => other.setAttribute('aria-pressed', String(other === dot)));
      }));
      supportTrack.onscroll = () => {
        const index = Math.round(supportTrack.scrollLeft / supportTrack.clientWidth);
        root.querySelectorAll('[data-support-dot]').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
      };
    };
    renderSupportCarousel(firstSupport);
    root.querySelectorAll('[data-support-index]').forEach((button) => button.addEventListener('click', () => {
      const item = support[Number(button.dataset.supportIndex)];
      root.querySelectorAll('[data-support-index]').forEach((tab) => {
        const active = tab === button;
        tab.setAttribute('aria-expanded', String(active));
        tab.closest('.bf-support-option').classList.toggle('is-active', active);
      });
      supportTrack.scrollLeft = 0;
      renderSupportCarousel(item);
    }));
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
    const galleryCards = [...root.querySelectorAll('.bf-pin')];
    root.querySelectorAll('[data-gallery-filter]').forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.galleryFilter;
      root.querySelectorAll('[data-gallery-filter]').forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
      galleryCards.forEach((card) => { card.hidden = filter !== 'All' && !card.dataset.categories.split('|').includes(filter); });
      root.querySelectorAll('.bf-gallery-column').forEach((column) => { column.hidden = !column.querySelector('.bf-pin:not([hidden])'); });
      root.querySelector('[data-gallery-count]').textContent = galleryCards.filter((card) => !card.hidden).length;
      root.querySelector('#selected-work').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }));
    const projectModal = root.querySelector('.bf-project-modal');
    let modalTrigger = null;
    const openProjectModal = (project) => {
      projectModal.setAttribute('aria-label', lang === 'pt' ? 'Detalhes do projeto' : 'Project details');
      const title = lang === 'pt' ? project.titlePt || project.title : project.title;
      const descriptionText = lang === 'pt' ? project.descriptionPt || project.description : project.description;
      const credit = lang === 'pt' ? project.creditPt || project.credit : project.credit;
      const mediaFiles = [...new Set(project.gallery?.length ? project.gallery : project.images?.length ? project.images : [project.image])].filter(Boolean);
      const images = mediaFiles.map((file, index) => {
        if (/\.mp4(?:$|[?])/i.test(file)) {
          const poster = mediaFiles.slice(index + 1).find((candidate) => !/\.mp4(?:$|[?])/i.test(candidate)) || project.image;
          return `<video src="${esc(assetUrl(file))}"${poster ? ` poster="${esc(assetUrl(poster))}"` : ''} autoplay muted loop playsinline controls preload="metadata"></video>`;
        }
        return `<img src="${esc(assetUrl(file))}" alt="${esc(title)} — ${String(index + 1).padStart(2, '0')}" ${index ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
      }).join('');
      const hashtags = (project.tags || []).slice(0, 8).map((tag) => `<span>#${esc(tag.replace(/^#/, '').replace(/\s+/g, ''))}</span>`).join('');
      projectModal.innerHTML = `<div class="bf-modal-inner"><button class="bf-modal-close" type="button" aria-label="${lang === 'pt' ? 'Fechar projeto' : 'Close project'}">×</button><header class="bf-modal-intro"><span class="bf-modal-category">${esc(lang === 'pt' ? project.categoryPt || project.category : project.category)}</span><h2>${esc(title)}</h2><p>${esc(descriptionText)}</p>${credit ? `<small>${lang === 'pt' ? 'Créditos' : 'Credits'}: ${esc(credit)}</small>` : ''}<div class="bf-modal-tags">${hashtags}</div><a href="${projectUrl(project.id)}" class="bf-modal-full">${lang === 'pt' ? 'Ver página completa' : 'Open full project'} <span aria-hidden="true">↗</span></a></header><div class="bf-modal-gallery">${images}</div></div>`;
      modalTrigger = document.activeElement;
      projectModal.showModal();
      document.body.classList.add('bf-project-modal-open');
      projectModal.querySelector('.bf-modal-close').focus();
    };
    root.onclick = (event) => {
      const link = event.target.closest('a[data-project-id]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const project = byId.get(link.dataset.projectId);
      if (!project) return;
      event.preventDefault();
      openProjectModal(project);
    };
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal || event.target.closest('.bf-modal-close')) projectModal.close();
    });
    projectModal.addEventListener('close', () => {
      document.body.classList.remove('bf-project-modal-open');
      modalTrigger?.focus();
    });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const heroImage = root.querySelector('.bf-hero-image');
      const heroSection = root.querySelector('.bf-hero');
      const studioImage = root.querySelector('.bf-studio-image');
      const studioSection = root.querySelector('.bf-studio');
      let ticking = false;
      const updateParallax = () => {
        const box = heroSection.getBoundingClientRect();
        const travel = Math.max(0, Math.min(heroSection.offsetHeight, -box.top));
        heroImage.style.setProperty('--bf-parallax', `${Math.round(travel * .12)}px`);
        const studioBox = studioSection.getBoundingClientRect();
        const studioTravel = Math.max(-studioSection.offsetHeight, Math.min(studioSection.offsetHeight, -studioBox.top));
        studioImage.style.setProperty('--bf-studio-parallax', `${Math.round(studioTravel * (matchMedia('(max-width: 600px)').matches ? .025 : .07))}px`);
        ticking = false;
      };
      onParallaxScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); } };
      window.addEventListener('scroll', onParallaxScroll, { passive: true });
      updateParallax();
    }
    root.querySelector('.bf-theme').addEventListener('click', () => {
      const next = document.body.classList.contains('light') ? 'dark' : 'light';
      document.body.classList.toggle('light', next === 'light');
      localStorage.setItem('dolayout-theme', next);
    });
    root.querySelector('.bf-language').addEventListener('click', () => {
      localStorage.setItem('dolayout-language', lang === 'pt' ? 'en' : 'pt');
      render(page);
    });
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: .08 });
      root.querySelectorAll('.bf-section-head,.bf-ways article,.bf-studio-about,.bf-studio-contact').forEach((item) => observer.observe(item));
    } else root.querySelectorAll('.bf-section-head,.bf-ways article,.bf-studio-about,.bf-studio-contact').forEach((item) => item.classList.add('is-visible'));
    if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }));
  }
})();
