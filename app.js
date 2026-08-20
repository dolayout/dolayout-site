const categories = [
  "Todos",
  "Inspiração",
  "Portfólio",
  "Branding",
  "Identity",
  "Key Visual",
  "Campaign",
  "Clientes",
  "Parceiros",
  "My Works",
  "Social Media",
  "Website",
  "Posters",
  "Editorial",
  "Motion",
  "Art Direction",
  "Creative Studio",
  "Art/Design"
];

const externalPortfolioCards = (window.dolayoutPortfolioCards || []).filter((card) => card.image && !card.hidden);
const externalPortfolioPins = buildPortfolioPins(window.dolayoutPortfolioProjects || []);

const cards = [
  ...externalPortfolioPins,
  ...externalPortfolioCards,
  {
    id: "partilha-urbana-case",
    title: "Partilha Urbana",
    category: "Portfólio",
    type: "case completo",
    description: "Conceito, logotipo, website, identidade visual e comunicação social para uma plataforma de remodelação e valorização imobiliária.",
    tags: ["partilha urbana", "branding", "website", "social media", "cliente", "case completo", "remodelação"],
    downloadable: false,
    credit: "Direção criativa e comunicação por Dolayout",
    height: 520,
    tone: "partilha",
    palette: ["#07003f", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/brand-badges.jpg",
    images: [
      "assets/dolayout/cases/partilha-urbana/cards/brand-badges.jpg",
      "assets/dolayout/cases/partilha-urbana/cards/website-hero.jpg",
      "assets/dolayout/cases/partilha-urbana/cards/social-funded.jpg"
    ],
    layout: "case-board",
    kicker: "Case completo",
    metric: "Brand / Web / Social",
    objectPosition: "center",
    statement: "Partilha Urbana",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-website",
    title: "Website e plataforma",
    category: "Website",
    type: "website",
    description: "Interface pública da marca com linguagem clara para comunicar investimento, remodelação e acompanhamento de projetos.",
    tags: ["partilha urbana", "website", "ui", "cliente", "plataforma"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 360,
    tone: "partilha",
    palette: ["#f4f4f2", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/website-hero.jpg",
    layout: "browser-board",
    kicker: "Website",
    metric: "partilhaurbana.pt",
    objectPosition: "center",
    statement: "Website e plataforma",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-brand-folder",
    title: "Brand folder",
    category: "Branding",
    type: "branding",
    description: "Sistema impresso com folder, carta e grafismos modulares da identidade Partilha Urbana.",
    tags: ["partilha urbana", "branding", "papelaria", "identidade visual", "mockup"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 390,
    tone: "partilha",
    palette: ["#07003f", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/brand-folder.jpg",
    images: [
      "assets/dolayout/cases/partilha-urbana/cards/brand-folder.jpg",
      "assets/dolayout/cases/partilha-urbana/cards/stationery-system.jpg"
    ],
    layout: "stack-board",
    kicker: "Identidade",
    metric: "Folder / Carta",
    objectPosition: "center",
    statement: "Brand folder",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-stationery",
    title: "Stationery system",
    category: "Branding",
    type: "branding",
    description: "Papelaria institucional com envelopes, letterhead e sistema gráfico em verde e azul profundo.",
    tags: ["partilha urbana", "branding", "papelaria", "identidade visual"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 390,
    tone: "partilha",
    palette: ["#07003f", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/stationery-system.jpg",
    images: [
      "assets/dolayout/cases/partilha-urbana/cards/stationery-system.jpg",
      "assets/dolayout/cases/partilha-urbana/cards/business-card.jpg"
    ],
    layout: "stack-board",
    kicker: "Sistema visual",
    metric: "Papelaria",
    objectPosition: "center",
    statement: "Stationery system",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-business-card",
    title: "Business card kit",
    category: "Branding",
    type: "branding",
    description: "Aplicação de identidade em cartão, assinatura, contato e material comercial.",
    tags: ["partilha urbana", "branding", "cartão", "identidade visual", "cliente"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 390,
    tone: "partilha",
    palette: ["#00d94f", "#07003f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/business-card.jpg",
    images: [
      "assets/dolayout/cases/partilha-urbana/cards/business-card.jpg",
      "assets/dolayout/cases/partilha-urbana/cards/brand-badges.jpg"
    ],
    layout: "stack-board",
    kicker: "Comercial",
    metric: "Cartões / Assinatura",
    objectPosition: "center",
    statement: "Business card kit",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-uniforms",
    title: "Uniformes de marca",
    category: "Branding",
    type: "branding",
    description: "Aplicação da identidade Partilha Urbana em polos e peças de atendimento/equipe.",
    tags: ["partilha urbana", "branding", "uniforme", "aplicação de marca"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 340,
    tone: "partilha",
    palette: ["#00d94f", "#07003f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/uniforms.jpg",
    layout: "product-board",
    kicker: "Aplicação",
    metric: "Equipe",
    objectPosition: "center",
    statement: "Uniformes",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-social-results",
    title: "Resultados compartilhados",
    category: "Social Media",
    type: "social media",
    description: "Peça vertical para comunicar rentabilidade, segurança e lucro partilhado em linguagem direta.",
    tags: ["partilha urbana", "social media", "campanha", "investimento", "performance"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 560,
    tone: "partilha",
    palette: ["#00d94f", "#07003f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/social-results.jpg",
    layout: "metric-board",
    kicker: "Social media",
    metric: "1.2M EUR",
    objectPosition: "center",
    statement: "Resultados compartilhados",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-casa-das-flores",
    title: "Projeto Casa das Flores",
    category: "Social Media",
    type: "social media",
    description: "Card de lançamento de projeto com valor, rentabilidade prevista, prazo e chamada para investimento.",
    tags: ["partilha urbana", "social media", "projeto", "imobiliário", "porto"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 610,
    tone: "partilha",
    palette: ["#eeeeee", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/project-casa-das-flores.jpg",
    layout: "metric-board",
    kicker: "Projeto",
    metric: "20%",
    objectPosition: "center",
    statement: "Projeto Casa das Flores",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-sell-reform",
    title: "Seu imóvel está difícil de vender?",
    category: "Social Media",
    type: "social media",
    description: "Peça de campanha conectando dificuldade de venda, reforma e valorização do imóvel.",
    tags: ["partilha urbana", "social media", "campanha", "remodelação", "venda"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 570,
    tone: "partilha",
    palette: ["#07003f", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/social-sell-reform.jpg",
    layout: "poster-board",
    kicker: "Campanha",
    metric: "Reforma + venda",
    displayTitle: "Reforma vende",
    objectPosition: "center",
    statement: "Campanha social",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-invest-reform",
    title: "Reformar sem custos antecipados",
    category: "Social Media",
    type: "social media",
    description: "Post vertical explicando a proposta de investimento compartilhado na valorização do imóvel.",
    tags: ["partilha urbana", "social media", "campanha", "investimento", "reforma"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 570,
    tone: "partilha",
    palette: ["#f4f4f2", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/social-invest-reform.jpg",
    layout: "poster-board",
    kicker: "Campanha",
    metric: "Sem custos",
    displayTitle: "Sem custos antecipados",
    objectPosition: "center",
    statement: "Sem custos antecipados",
    statementColor: "#ffffff"
  },
  {
    id: "partilha-urbana-funded",
    title: "Projeto financiado",
    category: "Social Media",
    type: "social media",
    description: "Comunicação de progresso financeiro com métrica protagonista e prova de tração.",
    tags: ["partilha urbana", "social media", "projeto", "financiamento", "investimento"],
    downloadable: false,
    credit: "Dolayout / Partilha Urbana",
    height: 600,
    tone: "partilha",
    palette: ["#eeeeee", "#00d94f"],
    image: "assets/dolayout/cases/partilha-urbana/cards/social-funded.jpg",
    layout: "metric-board",
    kicker: "Tração",
    metric: "85%",
    objectPosition: "center",
    statement: "85% financiado",
    statementColor: "#ffffff"
  },
  {
    id: "make-something-today",
    title: "Make something today.",
    category: "Inspiração",
    type: "imagem",
    description: "Um lembrete visual para abrir o dia criando antes de lapidar.",
    tags: ["nota", "processo", "criatividade"],
    downloadable: false,
    credit: "Dolayout Studio",
    height: 420,
    tone: "mono",
    palette: ["#111111", "#3a3a37"],
    statement: "Make something today.",
    statementColor: "#f4f1ea"
  },
  {
    id: "do-it-today",
    title: "Do it today. Do Layout.",
    category: "Nota do Dia",
    type: "imagem",
    description: "Peça editorial curta para redes e chamadas internas de campanha.",
    tags: ["frase", "editorial", "campanha"],
    downloadable: false,
    credit: "Dolayout Notes",
    height: 560,
    tone: "acid",
    palette: ["#d7ff3f", "#ff6f3c"],
    statement: "Do it today. Do Layout.",
    statementColor: "#11110f"
  },
  {
    id: "brand-board-arca",
    title: "Arca Dining Club",
    category: "Portfólio",
    type: "portfólio",
    description: "Sistema visual para restaurante autoral, com ritmo editorial e calor de marca.",
    tags: ["branding", "gastronomia", "identidade"],
    downloadable: false,
    credit: "Projeto fictício Dolayout",
    height: 500,
    tone: "warm",
    palette: ["#2c1610", "#e06339"],
    statement: "ARCA / Dining Club",
    statementColor: "#fff2df"
  },
  {
    id: "client-atelier-casa",
    title: "Atelier Casa",
    category: "Clientes",
    type: "cliente",
    description: "Direção visual para um cliente de arquitetura residencial.",
    tags: ["cliente", "arquitetura", "portfolio"],
    downloadable: false,
    credit: "Dolayout Client Board",
    height: 460,
    tone: "light",
    palette: ["#e8e3d5", "#91a38d"],
    statement: "ATELIER CASA",
    statementColor: "#171711"
  },
  {
    id: "ideas-grow",
    title: "Ideas grow when you share them.",
    category: "Inspiração",
    type: "imagem",
    description: "Cartaz visual sobre processo, troca e construção coletiva.",
    tags: ["ideias", "criatividade", "nota"],
    downloadable: false,
    credit: "Dolayout Studio",
    height: 620,
    tone: "cool",
    palette: ["#182a33", "#7bdff2"],
    statement: "Ideas grow when you share them.",
    statementColor: "#eefcff"
  },
  {
    id: "partner-print-lab",
    title: "Print Lab Partner",
    category: "Parceiros",
    type: "parceiro",
    description: "Cartão de parceiro para fornecedores de impressão e acabamento.",
    tags: ["parceiro", "print", "acabamento"],
    downloadable: false,
    credit: "Dolayout Network",
    height: 310,
    tone: "graphite",
    palette: ["#1d1f1f", "#5b5e54"],
    statement: "Print Lab / Partner",
    statementColor: "#f4f1ea"
  },
  {
    id: "portfolio-web-grid",
    title: "Editorial Web Grid",
    category: "My Works",
    type: "portfólio",
    description: "Exploração de interface para sites visuais com navegação editorial.",
    tags: ["web", "ui", "portfolio"],
    downloadable: false,
    credit: "Dolayout Interface Study",
    height: 540,
    tone: "neon",
    palette: ["#121212", "#f2b5d4"],
    statement: "WEB GRID / 24",
    statementColor: "#ffffff"
  },
  {
    id: "perfect-not-needed",
    title: "It doesn’t have to be perfect.",
    category: "Nota do Dia",
    type: "imagem",
    description: "Peça para destravar execução: publicar, testar, ajustar.",
    tags: ["nota", "processo", "frase"],
    downloadable: false,
    credit: "Dolayout Notes",
    height: 390,
    tone: "paper",
    palette: ["#f1eee6", "#ff6f3c"],
    statement: "It doesn't have to be perfect.",
    statementColor: "#11110f"
  },
  {
    id: "branding-festival",
    title: "Festival Identity",
    category: "Branding",
    type: "imagem",
    description: "Estudo de marca para evento cultural, com contraste alto e ritmo modular.",
    tags: ["branding", "campanha", "art/design"],
    downloadable: false,
    credit: "Dolayout Brand Study",
    height: 580,
    tone: "acid",
    palette: ["#d7ff3f", "#151515"],
    statement: "FESTIVAL / SISTEMA",
    statementColor: "#f4f1ea"
  },
  {
    id: "faca-hoje",
    title: "Faça hoje. Faça Dolayout.",
    category: "Social Media",
    type: "imagem",
    description: "Post de assinatura para redes sociais e chamadas de projeto.",
    tags: ["social media", "frase", "dolayout"],
    downloadable: false,
    credit: "Dolayout Social",
    height: 520,
    tone: "warm",
    palette: ["#ff6f3c", "#2c1610"],
    statement: "Faça hoje. Faça Dolayout.",
    statementColor: "#fff4e6"
  },
  {
    id: "art-design-shapes",
    title: "Shape Study",
    category: "Art/Design",
    type: "video",
    description: "Estudo visual para motion cards, capas e frames de apresentação.",
    tags: ["art/design", "motion", "visual"],
    downloadable: false,
    credit: "Dolayout Experiments",
    height: 370,
    tone: "neon",
    palette: ["#0e0d12", "#7bdff2"],
    statement: "Shape / Motion",
    statementColor: "#f2b5d4"
  }
];

const state = {
  category: "Todos",
  query: "",
  language: localStorage.getItem("dolayout-language") || "en",
  liked: new Set(),
  saved: new Set()
};

const feed = document.querySelector("#feed");
const categoryRail = document.querySelector("#categoryRail");
const searchInput = document.querySelector("#searchInput");
const homeView = document.querySelector("#homeView");
const detailView = document.querySelector("#detailView");
const lightbox = document.querySelector("#lightbox");
const resultCount = document.querySelector("#resultCount");
const themeButtons = document.querySelectorAll(".theme-toggle");
const languageToggle = document.querySelector("[data-language-toggle]");
const feedMetaLabel = document.querySelector(".feed-meta p");

const contact = {
  name: "João Dolayout",
  email: "joaodolayout@gmail.com",
  phone: "11941992365",
  phoneDisplay: "(11) 94199-2365",
  whatsapp: "https://wa.me/5511941992365"
};

const servicesByLang = {
  en: [
    "Branding",
    "Visual identity",
    "Key visual",
    "Website design",
    "Social media",
    "Campaign",
    "Editorial",
    "Art direction",
    "Portfolio / deck",
    "Creative studio"
  ],
  pt: [
    "Branding",
    "Identidade visual",
    "Key visual",
    "Website design",
    "Social media",
    "Campanha",
    "Editorial",
    "Direção de arte",
    "Portfólio / apresentação",
    "Creative studio"
  ]
};

const services = [
  "Branding",
  "Identidade visual",
  "Key visual",
  "Website design",
  "Social media",
  "Campanha",
  "Editorial",
  "Direção de arte",
  "Portfólio / apresentação",
  "Creative studio"
];

const categoryLabels = {
  en: {
    "Todos": "All",
    "Inspiração": "Inspiration",
    "Portfólio": "Portfolio",
    "Clientes": "Clients",
    "Parceiros": "Partners"
  },
  pt: {
    "Campaign": "Campanha",
    "Website": "Sites",
    "My Works": "Meus trabalhos",
    "Social Media": "Social media",
    "Art Direction": "Direção de arte",
    "Creative Studio": "Estúdio criativo"
  }
};

const copy = {
  en: {
    search: "Search ideas, works and cases",
    visualHub: "Visual hub",
    cards: "cards",
    empty: "No cards found. Try another search or category.",
    back: "Back",
    related: "Related",
    like: "Like",
    share: "Share",
    save: "Save",
    copiedPrompt: "Card link",
    profileLabel: "Dolayout / João",
    profileTitle: "I build visual systems for brands that need more than a pretty logo.",
    profileText: "I'm João Dolayout, a designer and art director from Brazil. I started Dolayout as a place to make things with more rhythm, more context and less corporate fog. Branding, websites, social media, decks, campaigns: for me, it all belongs to the same visual conversation.",
    profileNote: "I like work that has an idea behind it and enough clarity to survive outside the presentation. Less noise, more intention. Less template, more point of view.",
    startProject: "Start a project",
    contactLabel: "Contact",
    contactTitle: "Send me the idea, the mess, the brand, the almost-brief.",
    contactText: "The more context, the better. This form turns your first message into a clean email brief.",
    whatsapp: "WhatsApp",
    name: "Name",
    email: "Email",
    phone: "WhatsApp",
    company: "Brand / company",
    interest: "Main interest",
    choose: "Choose an area",
    timeline: "Ideal timing",
    timelineOptions: ["No rush, let's build it properly", "This month", "30 to 60 days", "Urgent"],
    budget: "Estimated investment",
    budgetOptions: ["Not defined yet", "Up to R$ 3k", "R$ 3k to R$ 8k", "R$ 8k to R$ 15k", "Above R$ 15k"],
    need: "What do you need?",
    message: "Tell me a bit about the project",
    messagePlaceholder: "Context, goal, references, links, timing, main doubt...",
    submit: "Send brief",
    status: "Opening your email with the brief ready.",
    mailSubject: "Dolayout brief"
  },
  pt: {
    search: "Buscar ideias, trabalhos e cases",
    visualHub: "Visual hub",
    cards: "cards",
    empty: "Nenhum card encontrado. Tente outra busca ou categoria.",
    back: "Voltar",
    related: "Relacionados",
    like: "Curtir",
    share: "Compartilhar",
    save: "Salvar",
    copiedPrompt: "Link do card",
    profileLabel: "Dolayout / João",
    profileTitle: "Eu crio sistemas visuais para marcas que precisam de mais do que um logo bonito.",
    profileText: "Sou João Dolayout, designer e diretor de arte. A Dolayout nasceu como um lugar para fazer as coisas com mais ritmo, mais contexto e menos neblina corporativa. Branding, sites, social, apresentações, campanhas: para mim, tudo faz parte da mesma conversa visual.",
    profileNote: "Gosto de trabalho que tem ideia por trás e clareza suficiente para existir fora da apresentação. Menos ruído, mais intenção. Menos template, mais ponto de vista.",
    startProject: "Começar um projeto",
    contactLabel: "Contato",
    contactTitle: "Me manda a ideia, a bagunça, a marca, o quase-briefing.",
    contactText: "Quanto mais contexto, melhor. O formulário organiza sua primeira mensagem em um briefing por e-mail.",
    whatsapp: "WhatsApp",
    name: "Nome",
    email: "E-mail",
    phone: "WhatsApp",
    company: "Marca / empresa",
    interest: "Interesse principal",
    choose: "Escolha uma área",
    timeline: "Prazo ideal",
    timelineOptions: ["Sem pressa, quero construir com calma", "Este mês", "30 a 60 dias", "Tenho urgência"],
    budget: "Investimento estimado",
    budgetOptions: ["Ainda não defini", "Até R$ 3 mil", "R$ 3 mil a R$ 8 mil", "R$ 8 mil a R$ 15 mil", "Acima de R$ 15 mil"],
    need: "O que você precisa?",
    message: "Conte um pouco do projeto",
    messagePlaceholder: "Contexto, objetivo, referências, links, prazo, dúvida principal...",
    submit: "Enviar briefing",
    status: "Abrindo seu e-mail com o briefing pronto.",
    mailSubject: "Briefing Dolayout"
  }
};

function init() {
  const storedTheme = localStorage.getItem("dolayout-theme");
  if (storedTheme === "light") document.body.classList.add("light");
  applyLanguage();
  renderCategories();
  renderFeed();
  bindEvents();
  route();
}

function t(key) {
  return copy[state.language][key] || copy.en[key] || key;
}

function serviceList() {
  return servicesByLang[state.language] || servicesByLang.en;
}

function categoryLabel(category) {
  return categoryLabels[state.language]?.[category] || category;
}

function applyLanguage() {
  document.documentElement.lang = state.language === "pt" ? "pt-BR" : "en";
  searchInput.placeholder = t("search");
  if (feedMetaLabel) feedMetaLabel.textContent = t("visualHub");
  if (languageToggle) {
    languageToggle.textContent = state.language === "en" ? "PT-BR" : "EN";
    languageToggle.setAttribute("aria-label", state.language === "en" ? "Mudar para portugues" : "Change to English");
  }
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderFeed();
  });

  document.querySelectorAll("[data-focus-search]").forEach((button) => {
    button.addEventListener("click", () => searchInput.focus());
  });

  document.querySelectorAll(".add-button, [aria-label='Adicionar']").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = "/contato";
      setTimeout(() => document.querySelector("#projectMessage")?.focus(), 120);
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem("dolayout-theme", document.body.classList.contains("light") ? "light" : "dark");
    });
  });

  languageToggle?.addEventListener("click", () => {
    state.language = state.language === "en" ? "pt" : "en";
    localStorage.setItem("dolayout-language", state.language);
    applyLanguage();
    renderCategories();
    renderFeed();
    route();
  });

  window.addEventListener("hashchange", route);
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function buildPortfolioPins(projects) {
  return projects.flatMap((project) => {
    if (project.hidden) return [];

    const sourceImages = project.feedImages?.length ? project.feedImages : (project.gallery || []).slice(1);
    const images = uniquePortfolioImages(sourceImages)
      .filter(isFeedReadyPortfolioImage)
      .slice(0, project.feedLimit || 3);

    return images.map((image, index) => ({
      id: `${project.id}-pin-${index + 1}`,
      title: project.title,
      category: project.categories?.[index % project.categories.length] || project.category,
      categories: project.categories || [project.category],
      type: "visual",
      description: project.description,
      tags: [...new Set([...(project.tags || []), "visual", "pin"])],
      downloadable: false,
      credit: project.credit,
      height: [320, 440, 520, 360, 610, 470][index % 6],
      tone: project.tone,
      palette: project.palette,
      image,
      objectPosition: "center",
      statement: project.title,
      statementColor: "#ffffff",
      source: project.source,
      parentId: project.id,
      openMode: "lightbox"
    }));
  });
}

function uniquePortfolioImages(images) {
  const seen = new Set();
  return (images || []).filter((image) => {
    const key = image.split("/").pop().toLowerCase().replace(/^\d+-/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isFeedReadyPortfolioImage(image) {
  return ![
    /logo(?!tipo)/i,
    /fav|avatar|icon|pattern/i,
    /completo-|font-|vertical-|grifo-/i,
    /00-pdf-cover/i,
    /design-sem-nome-2-1|attractive-young|173980|dji0271|img9464/i,
    /security-guard|policewoman|portrait-male/i
  ].some((pattern) => pattern.test(image));
}

function renderCategories() {
  categoryRail.innerHTML = categories.map((category) => `
    <button class="category-button ${category === state.category ? "is-active" : ""}" type="button" data-category="${category}">
      ${categoryLabel(category)}
    </button>
  `).join("");

  categoryRail.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderFeed();
    });
  });
}

function filteredCards(excludeId) {
  return cards.filter((card) => {
    const categoryMatch = state.category === "Todos"
      || card.category === state.category
      || (card.categories && card.categories.includes(state.category))
      || (state.category === "Portfólio" && card.type === "portfólio")
      || (state.category === "Branding" && card.tags.includes("branding"))
      || (state.category === "Website" && card.tags.includes("website"))
      || (state.category === "Art/Design" && card.tags.includes("art/design"));

    const haystack = [card.title, card.category, card.type, card.description, ...card.tags].join(" ").toLowerCase();
    const queryMatch = !state.query || haystack.includes(state.query);
    return categoryMatch && queryMatch && card.id !== excludeId;
  });
}

function renderFeed(items = filteredCards()) {
  resultCount.textContent = `${items.length} ${t("cards")}`;

  if (!items.length) {
    feed.innerHTML = `<div class="empty-state">${t("empty")}</div>`;
    return;
  }

  feed.innerHTML = items.map(cardTemplate).join("");
  feed.querySelectorAll(".pin-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".more-button")) return;
      const item = cards.find((entry) => entry.id === card.dataset.id);
      if (!item) return;
      if (shouldOpenDetail(item)) {
        window.location.hash = `/card/${item.id}`;
      } else {
        openLightbox(item);
      }
    });
  });
}

function shouldOpenDetail(card) {
  if (card.openMode === "lightbox") return false;
  const haystack = [card.type, card.category, ...(card.categories || []), ...(card.tags || [])].join(" ").toLowerCase();
  return /case completo|branding|identity|website|website design|complete case/.test(haystack);
}

function cardTemplate(card) {
  if (card.layout) return artDirectedCardTemplate(card);

  const cardLabel = `<span class="label">${card.category}</span>`;
  const media = card.image ? `<img class="card-media" src="${card.image}" alt="${card.title}" loading="lazy">` : "";
  const mediaClass = card.image ? "media-visual" : "";
  const showText = !card.image || card.category === "Nota do Dia";

  return `
    <button class="pin-card" type="button" data-id="${card.id}" data-tone="${card.tone}" style="--card-height:${card.height}px; --c1:${card.palette[0]}; --c2:${card.palette[1]}; --statement-color:${card.statementColor}; --object-position:${card.objectPosition || "center"};">
      <div class="visual ${mediaClass} ${card.category === "Nota do Dia" ? "visual-note" : ""}">
        ${media}
        <div class="card-top">
          ${cardLabel}
          <span class="more-button" aria-label="Mais opcoes">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
          </span>
        </div>
        <div class="statement">${card.statement}</div>
        <div class="card-bottom ${showText ? "" : "is-quiet"}">
          <div>
            ${showText ? `<h2 class="card-title">${card.title}</h2><p class="card-subtitle">${card.type} / ${card.tags.slice(0, 2).join(", ")}</p>` : ""}
          </div>
        </div>
      </div>
    </button>
  `;
}

function artDirectedCardTemplate(card) {
  if (!card.image && !card.layout) {
    return cardTemplate({ ...card, layout: undefined });
  }

  const images = card.images?.length ? card.images : [card.image];
  const frames = images.slice(0, 3).map((image, index) => `
    <span class="mock-frame frame-${index + 1}">
      <img src="${image}" alt="${card.title} ${index + 1}" loading="lazy">
    </span>
  `).join("");

  return `
    <button class="pin-card art-pin" type="button" data-id="${card.id}" data-layout="${card.layout}" data-tone="${card.tone}" style="--card-height:${card.height}px; --c1:${card.palette[0]}; --c2:${card.palette[1]}; --statement-color:${card.statementColor};">
      <div class="visual mockup-visual">
        <div class="mock-bg-word">${card.category}</div>
        <div class="card-top">
          <span class="label">${card.kicker || card.category}</span>
          <span class="more-button" aria-label="Mais opcoes">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>
          </span>
        </div>
        <div class="mock-stage">
          ${frames}
        </div>
        <div class="mock-caption ${card.showFeedTitle ? "" : "is-quiet"}">
          <span>${card.kicker || card.category}</span>
          ${card.showFeedTitle ? `<strong>${card.displayTitle || card.title}</strong>` : ""}
        </div>
      </div>
    </button>
  `;
}

function route() {
  const hash = window.location.hash || "#/";

  if (hash === "#/perfil") {
    renderProfile();
    setActiveNav("profile");
    return;
  }

  if (hash === "#/contato") {
    renderContact();
    setActiveNav("contact");
    return;
  }

  const match = window.location.hash.match(/^#\/card\/(.+)/);
  if (!match) {
    homeView.classList.add("is-visible");
    detailView.classList.remove("is-visible");
    detailView.innerHTML = "";
    setActiveNav("home");
    return;
  }

  const card = cards.find((item) => item.id === match[1]);
  if (!card) {
    window.location.hash = "/";
    return;
  }

  if (!shouldOpenDetail(card)) {
    window.location.hash = "/";
    openLightbox(card);
    return;
  }

  renderDetail(card);
  setActiveNav("");
}

function setActiveNav(routeName) {
  document.querySelectorAll(".nav-icon").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.route === routeName || (routeName === "home" && item.getAttribute("href") === "#/"));
  });
}

function renderProfile() {
  homeView.classList.remove("is-visible");
  detailView.classList.add("is-visible");
  detailView.innerHTML = `
    <div class="profile-page">
      <section class="bio-hero">
        <div class="bio-mark">
          <img class="brand-symbol symbol-dark" src="assets/dolayout/brand/simbolo-branco.svg" alt="">
          <img class="brand-symbol symbol-light" src="assets/dolayout/brand/simbolo-escuro.svg" alt="">
        </div>
        <div class="bio-copy">
          <span class="label">${t("profileLabel")}</span>
          <h1>${t("profileTitle")}</h1>
          <p>${t("profileText")}</p>
          <div class="bio-actions">
            <a href="#/contato">${t("startProject")}</a>
            <a href="mailto:${contact.email}">${contact.email}</a>
            <a href="${contact.whatsapp}" target="_blank" rel="noreferrer">${contact.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section class="service-cloud" aria-label="${state.language === "pt" ? "Serviços" : "Services"}">
        ${serviceList().map((service) => `<span>${service}</span>`).join("")}
      </section>

      <section class="profile-note">
        <p>${t("profileNote")}</p>
      </section>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderContact() {
  homeView.classList.remove("is-visible");
  detailView.classList.add("is-visible");
  detailView.innerHTML = `
    <div class="contact-page">
      <section class="contact-intro">
        <span class="label">${t("contactLabel")}</span>
        <h1>${t("contactTitle")}</h1>
        <p>${t("contactText")}</p>
        <div class="contact-links">
          <a href="${contact.whatsapp}" target="_blank" rel="noreferrer">${t("whatsapp")} ${contact.phoneDisplay}</a>
          <a href="tel:+5511941992365">${contact.phoneDisplay}</a>
          <a href="mailto:${contact.email}">${contact.email}</a>
        </div>
      </section>

      <form class="contact-form" id="contactForm">
        <div class="form-grid">
          <label>${t("name")}
            <input name="name" autocomplete="name" required>
          </label>
          <label>${t("email")}
            <input name="email" type="email" autocomplete="email" required>
          </label>
          <label>${t("phone")}
            <input name="phone" type="tel" autocomplete="tel">
          </label>
          <label>${t("company")}
            <input name="company" autocomplete="organization">
          </label>
          <label>${t("interest")}
            <select name="interest" required>
              <option value="">${t("choose")}</option>
              ${serviceList().map((service) => `<option>${service}</option>`).join("")}
            </select>
          </label>
          <label>${t("timeline")}
            <select name="timeline">
              ${t("timelineOptions").map((option) => `<option>${option}</option>`).join("")}
            </select>
          </label>
          <label>${t("budget")}
            <select name="budget">
              ${t("budgetOptions").map((option) => `<option>${option}</option>`).join("")}
            </select>
          </label>
          <fieldset class="service-options">
            <legend>${t("need")}</legend>
            ${serviceList().map((service) => `
              <label>
                <input type="checkbox" name="services" value="${service}">
                <span>${service}</span>
              </label>
            `).join("")}
          </fieldset>
          <label class="full-field">${t("message")}
            <textarea id="projectMessage" name="message" rows="7" placeholder="${t("messagePlaceholder")}" required></textarea>
          </label>
        </div>
        <button class="submit-brief" type="submit">${t("submit")}</button>
        <p class="form-status" id="formStatus" role="status"></p>
      </form>
    </div>
  `;
  detailView.querySelector("#contactForm").addEventListener("submit", submitContactForm);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDetail(card) {
  homeView.classList.remove("is-visible");
  detailView.classList.add("is-visible");

  const related = cards
    .filter((item) => item.id !== card.id && (item.category === card.category || item.tags.some((tag) => card.tags.includes(tag))))
    .slice(0, 6);

  detailView.innerHTML = `
    <div class="detail-shell">
      <div class="detail-actions-top">
        <button class="back-button" type="button" data-back>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          ${t("back")}
        </button>
        <div class="detail-action-row">
          ${actionButton("like", t("like"), "M20.8 4.6a5.4 5.4 0 0 0-7.7 0L12 5.7l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.7Z", state.liked.has(card.id))}
          ${actionButton("share", t("share"), "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14", false)}
          ${actionButton("save", t("save"), "M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z", state.saved.has(card.id))}
        </div>
      </div>

      <div class="detail-main">
        <div class="hero-visual">
          ${heroVisual(card)}
        </div>
        <aside class="detail-copy">
          <span class="label">${card.category}</span>
          ${card.source ? `<span class="credit-tag">${card.source === "LAF" ? "LAF" : "DO"}</span>` : ""}
          <h1>${card.title}</h1>
          <p>${card.description}</p>
          <span class="credit">Créditos: ${card.credit}</span>
          ${card.externalLinks?.length ? `<div class="external-links">${card.externalLinks.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}</div>` : ""}
        </aside>
      </div>

      <h2 class="related-title">${t("related")}</h2>
      <div class="masonry related-masonry">
        ${related.map(cardTemplate).join("")}
      </div>
    </div>
  `;

  detailView.querySelector("[data-back]").addEventListener("click", () => {
    if (history.length > 1) {
      history.back();
      return;
    }
    window.location.hash = "/";
  });
  detailView.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, card, button));
  });
  detailView.querySelectorAll(".pin-card").forEach((item) => {
    item.addEventListener("click", () => {
      window.location.hash = `/card/${item.dataset.id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  detailView.querySelectorAll("[data-gallery-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const main = detailView.querySelector("[data-gallery-main]");
      if (!main) return;
      main.src = button.dataset.galleryImage;
      detailView.querySelectorAll("[data-gallery-image]").forEach((thumb) => thumb.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function heroVisual(card) {
  if (card.gallery?.length) {
    return `
      <div class="project-gallery" data-gallery>
        <div class="gallery-main">
          <img class="detail-image" src="${card.gallery[0]}" alt="${card.title}" data-gallery-main>
        </div>
        ${card.gallery.length > 1 ? `<div class="gallery-strip">${card.gallery.map((image, index) => `
          <button class="gallery-thumb ${index === 0 ? "is-active" : ""}" type="button" data-gallery-image="${image}" aria-label="Ver imagem ${index + 1}">
            <img src="${image}" alt="${card.title} ${index + 1}">
          </button>
        `).join("")}</div>` : ""}
      </div>
    `;
  }

  if (card.image) {
    return `
      <div class="hero-media">
        <img class="detail-image" src="${card.image}" alt="${card.title}">
      </div>
    `;
  }

  return `
    <div class="visual ${card.category === "Nota do Dia" ? "visual-note" : ""}" style="--c1:${card.palette[0]}; --c2:${card.palette[1]}; --statement-color:${card.statementColor};">
      <div class="card-top">
        <span class="label">${card.type}</span>
      </div>
      <div class="statement">${card.statement}</div>
      <div class="card-bottom">
        <div>
          <h2 class="card-title">${card.title}</h2>
          <p class="card-subtitle">${card.tags.join(" / ")}</p>
        </div>
      </div>
    </div>
  `;
}

function actionButton(action, label, path, active, disabled = false) {
  return `
    <button class="action-button ${active ? "is-on" : ""}" type="button" data-action="${action}" aria-label="${label}" title="${label}" ${disabled ? "disabled" : ""}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>
    </button>
  `;
}

function handleAction(action, card, button) {
  if (action === "like") toggleSet(state.liked, card.id, button);
  if (action === "save") toggleSet(state.saved, card.id, button);
  if (action === "share") shareCard(card);
}

function openLightbox(card) {
  if (!card.image) return;
  const image = lightbox.querySelector(".lightbox-image");
  const meta = lightbox.querySelector(".lightbox-meta");
  image.src = card.image;
  image.alt = card.title;
  meta.textContent = `${card.category}${card.source === "LAF" ? " / LAF" : ""}`;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-lightbox");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-lightbox");
}

function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const selectedServices = data.getAll("services");
  const lines = [
    `${t("name")}: ${data.get("name") || ""}`,
    `${t("email")}: ${data.get("email") || ""}`,
    `${t("phone")}: ${data.get("phone") || ""}`,
    `${t("company")}: ${data.get("company") || ""}`,
    `${t("interest")}: ${data.get("interest") || ""}`,
    `${state.language === "pt" ? "Serviços" : "Services"}: ${selectedServices.length ? selectedServices.join(", ") : state.language === "pt" ? "Não informado" : "Not informed"}`,
    `${t("timeline")}: ${data.get("timeline") || ""}`,
    `${t("budget")}: ${data.get("budget") || ""}`,
    "",
    `${state.language === "pt" ? "Projeto" : "Project"}:`,
    data.get("message") || ""
  ];
  const subject = encodeURIComponent(`${t("mailSubject")} - ${data.get("name") || (state.language === "pt" ? "Novo projeto" : "New project")}`);
  const body = encodeURIComponent(lines.join("\n"));
  const status = form.querySelector("#formStatus");
  status.textContent = t("status");
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

function toggleSet(set, id, button) {
  if (set.has(id)) {
    set.delete(id);
    button.classList.remove("is-on");
  } else {
    set.add(id);
    button.classList.add("is-on");
  }
}

async function shareCard(card) {
  const url = `${location.origin}${location.pathname}#/card/${card.id}`;
  if (navigator.share) {
    await navigator.share({ title: card.title, text: card.description, url });
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    window.prompt(t("copiedPrompt"), url);
  }
}

init();
