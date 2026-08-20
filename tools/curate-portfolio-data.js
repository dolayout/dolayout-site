const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "portfolio-data.js");
const source = fs.readFileSync(dataPath, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: dataPath });

const projects = sandbox.window.dolayoutPortfolioProjects || [];
const cards = sandbox.window.dolayoutPortfolioCards || [];

const removeProjects = new Set([
  "portfolio-jinn",
  "portfolio-kharis",
  "portfolio-light-squad",
  "portfolio-meritoh",
  "portfolio-propostas"
]);

const rules = {
  "portfolio-brunetto-co": {
    layout: "stack-board",
    gallery: ["01-mockup-copiar.jpg", "02-timbrado-mockup.jpg"],
    feed: ["01-mockup-copiar.jpg"],
    feedLimit: 1
  },
  "portfolio-noronha-co": {
    layout: "stack-board",
    gallery: ["05-01.png"],
    feed: ["05-01.png"],
    feedLimit: 1
  },
  "portfolio-realty-art": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-torna-te-um-realtyano-963x1024.webp",
      "02-vivfig-c21-63-768x512.webp",
      "06-vender-menu.png"
    ],
    feed: ["website-main-mockup.png", "website-screens-mockup.png"],
    feedLimit: 2
  },
  "portfolio-morada-ideal": {
    gallery: [
      "01-01-home-moradaideal.jpg",
      "04-03-interna-moradaideal.jpg",
      "05-05-lgpd-moradaideal.jpg",
      "06-04-quem-somos-moradaideal.jpg",
      "07-06-img-contato-moradaideal.png"
    ],
    feed: ["01-01-home-moradaideal.jpg", "04-03-interna-moradaideal.jpg"],
    feedLimit: 2
  },
  "portfolio-amado-clinic": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-09-story.png",
      "02-11-story.png",
      "03-15-story.png",
      "06-16-story.png"
    ],
    feed: ["website-main-mockup.png", "01-09-story.png", "03-15-story.png"],
    feedLimit: 3
  },
  "portfolio-andalafat": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-02-2.png",
      "02-02-3.png",
      "03-04-03.png",
      "04-03-4.png",
      "05-06.png",
      "07-02-5.png"
    ],
    feed: ["website-main-mockup.png", "01-02-2.png", "04-03-4.png"],
    feedLimit: 3
  },
  "portfolio-deublog": {
    gallery: ["01-assinatura.png", "02-camiseta.png", "03-app.png", "04-website.jpg"],
    feed: ["01-assinatura.png", "03-app.png", "04-website.jpg"],
    feedLimit: 3
  },
  "portfolio-efetiva": {
    gallery: [
      "01-mockup-camisetas.jpg",
      "02-prancheta-6-copia-3.jpg",
      "03-prancheta-6-copia-4.jpg",
      "06-prancheta-6-copia.jpg"
    ],
    feed: ["02-prancheta-6-copia-3.jpg", "03-prancheta-6-copia-4.jpg"],
    feedLimit: 2
  },
  "portfolio-hise": {
    layout: "stack-board",
    gallery: ["05-hise-night.png", "06-hise-day.png", "07-hise-card-verso.png"],
    feed: ["07-hise-card-verso.png"],
    feedLimit: 1
  },
  "portfolio-lotts-co": {
    gallery: [
      "01-poster-a4-coffe-filter-01.png",
      "02-hot-sauce-season-story-01.png",
      "03-post-a4-coffe-filter-01.png",
      "04-04-post-inside-lotts.png",
      "05-story-gingerbread-latte-01.png",
      "06-08-post-gmd-lotts.png",
      "07-05-post-platters-lotts.png"
    ],
    feed: ["01-poster-a4-coffe-filter-01.png", "04-04-post-inside-lotts.png", "06-08-post-gmd-lotts.png"],
    feedLimit: 3
  },
  "portfolio-luara": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-1.png",
      "02-2.png",
      "03-design-sem-nome-1.png",
      "07-banner-site-luara.webp"
    ],
    feed: ["website-main-mockup.png", "03-design-sem-nome-1.png", "07-banner-site-luara.webp"],
    feedLimit: 3
  },
  "portfolio-millenium": {
    gallery: [
      "01-01.png",
      "02-home-millennium-light.jpg",
      "03-home-millennium-dark.jpg",
      "05-website-mockup.jpg"
    ],
    feed: ["01-01.png", "05-website-mockup.jpg"],
    feedLimit: 2
  },
  "portfolio-pan-eile": {
    gallery: ["01-fachada-pan-eile-02.jpg"],
    feed: ["01-fachada-pan-eile-02.jpg"],
    feedLimit: 1
  },
  "portfolio-partilha-urbana": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-08.png",
      "02-02.png",
      "03-11.png",
      "04-07.png",
      "05-01.png",
      "07-09.png"
    ],
    feed: ["website-main-mockup.png", "01-08.png", "07-09.png"],
    feedLimit: 3
  },
  "portfolio-paulie-s-pizza": {
    layout: "stack-board",
    gallery: ["01-ativo-38.png", "03-01.png", "04-04.png"],
    feed: ["01-ativo-38.png"],
    feedLimit: 1
  },
  "portfolio-seiji-engenharia": {
    gallery: [
      "website-main-mockup.png",
      "website-screens-mockup.png",
      "01-mockup-internas-01-1.png",
      "02-mockup-capa.png",
      "04-mockup-outdoor.png"
    ],
    feed: ["website-main-mockup.png", "02-mockup-capa.png"],
    feedLimit: 2
  },
  "portfolio-taboo-burger": {
    gallery: [
      "01-menu-taboo-burguer-2025-1.jpg",
      "02-flyer-taboo-burguer-a5-back.jpg",
      "03-flyer-taboo-burguer-a5-front.jpg"
    ],
    feed: ["01-menu-taboo-burguer-2025-1.jpg", "03-flyer-taboo-burguer-a5-front.jpg"],
    feedLimit: 2
  }
};

function byFile(project, filenames) {
  return filenames
    .map((filename) => (project.gallery || []).find((image) => image.endsWith(`/${filename}`)))
    .filter(Boolean);
}

function applyRule(item) {
  if (removeProjects.has(item.id)) return null;

  const rule = rules[item.id];
  if (!rule) return item;

  const gallery = byFile(item, rule.gallery);
  if (!gallery.length) return null;

  const feedImages = byFile({ gallery }, rule.feed || rule.gallery);
  const images = gallery.slice(0, 3);
  return {
    ...item,
    hidden: false,
    gallery,
    feedImages,
    feedLimit: rule.feedLimit || feedImages.length || 1,
    images,
    image: images[0],
    layout: rule.layout || item.layout,
    showFeedTitle: false
  };
}

const curatedProjects = projects.map(applyRule).filter(Boolean);
const projectIds = new Set(curatedProjects.map((project) => project.id));
const curatedCards = cards
  .map(applyRule)
  .filter((card) => card && projectIds.has(card.id));

const next = `window.dolayoutPortfolioProjects = ${JSON.stringify(curatedProjects, null, 2)};\n\nwindow.dolayoutPortfolioCards = ${JSON.stringify(curatedCards, null, 2)};\n`;
fs.writeFileSync(dataPath, next);

console.log(`Curated projects: ${projects.length} -> ${curatedProjects.length}`);
console.log(`Curated cards: ${cards.length} -> ${curatedCards.length}`);
