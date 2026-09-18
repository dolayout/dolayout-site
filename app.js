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

// The generated project boards duplicate real pins and can combine unrelated assets.
// Keep the feed grounded in individually curated project images instead.
const externalPortfolioCards = [];
const externalPortfolioPins = buildPortfolioPins(window.dolayoutPortfolioProjects || []);

const editorialArticles = [
  {
    id: "article-make-something-today",
    title: "Make Something Today",
    titlePt: "Faça Alguma Coisa Hoje",
    category: "Inspiração",
    type: "article",
    description: "Creativity is less about waiting for the perfect idea and more about creating enough movement for an idea to appear.",
    descriptionPt: "Criatividade tem menos a ver com esperar a ideia perfeita e mais com criar movimento suficiente para uma ideia aparecer.",
    tags: ["creativity", "process", "personal growth", "inspiration"],
    credit: "Dolayout Editorial",
    height: 520,
    tone: "mono",
    palette: ["#111111", "#3a3a37"],
    image: "assets/dolayout/editorial/make-something-today.svg",
    showFeedTitle: true,
    article: {
      en: [
        "The blank page is rarely solved by thinking harder. Most of the time, it is solved by touching the work: moving a shape, writing a rough sentence, testing a color, opening the file before the mood arrives.",
        "Making something today does not mean making something final. It means creating evidence. A sketch tells you what the idea is not. A bad layout shows where the rhythm breaks. A first draft gives the brain something concrete to negotiate with.",
        "This is why creative work needs a practice, not only a deadline. When you build the habit of small execution, you stop treating inspiration like a rare weather event. You create your own conditions.",
        "The goal is not speed for speed's sake. It is contact. The more often you meet the work, the less dramatic it becomes. The project stops being a monster and starts being a conversation.",
        "Make something today. Then make it clearer tomorrow."
      ],
      pt: [
        "A página em branco raramente se resolve pensando mais forte. Na maioria das vezes, ela se resolve encostando no trabalho: mexendo numa forma, escrevendo uma frase torta, testando uma cor, abrindo o arquivo antes da vontade aparecer.",
        "Fazer alguma coisa hoje não significa fazer algo final. Significa criar evidência. Um rascunho mostra o que a ideia não é. Um layout ruim aponta onde o ritmo quebra. Uma primeira versão dá ao cérebro algo concreto para discutir.",
        "Por isso trabalho criativo precisa de prática, não só de prazo. Quando você cria o hábito da pequena execução, para de tratar inspiração como um fenômeno raro. Você monta as próprias condições.",
        "O objetivo não é correr por correr. É contato. Quanto mais você encontra o trabalho, menos dramático ele fica. O projeto deixa de ser um monstro e vira uma conversa.",
        "Faça alguma coisa hoje. Amanhã você deixa mais claro."
      ]
    }
  },
  {
    id: "article-brand-before-feed",
    title: "A Good Brand Arrives Before the Feed",
    titlePt: "Uma Boa Marca Chega Antes do Feed",
    category: "Inspiração",
    type: "article",
    description: "A resolved brand makes every post, website, deck and campaign less random and more recognizable.",
    descriptionPt: "Uma marca bem resolvida faz cada post, site, apresentação e campanha parecer menos aleatória e mais reconhecível.",
    tags: ["branding", "identity", "strategy", "creative business"],
    credit: "Dolayout Editorial",
    height: 610,
    tone: "cool",
    palette: ["#151515", "#7bdff2"],
    image: "assets/dolayout/editorial/brand-before-feed.svg",
    showFeedTitle: true,
    article: {
      en: [
        "A brand is not the logo sitting politely in the corner. It is the feeling that starts to repeat before anyone reads the caption. It is the way the page behaves, the weight of the type, the rhythm of the images, the kind of sentence the brand would or would not say.",
        "When the brand is not resolved, every new piece becomes a new decision from zero. The feed changes personality every week. The website says one thing, the proposal says another, and the client has to work too hard to understand who is speaking.",
        "A strong identity does not make communication rigid. It makes it easier. It gives the team a set of choices that already make sense: colors with a job, typography with attitude, compositions with a recognizable logic.",
        "This is where branding becomes practical. A good brand saves time, reduces doubt and creates memory. It lets the business show up in different formats without losing its face.",
        "Before posting more, solve the voice. Before designing more, solve the system. The feed should be a consequence of the brand, not the place where the brand is invented every morning."
      ],
      pt: [
        "Marca não é o logo comportado no canto. É a sensação que começa a se repetir antes de alguém ler a legenda. É o jeito da página se comportar, o peso da tipografia, o ritmo das imagens, o tipo de frase que aquela marca diria ou não diria.",
        "Quando a marca não está resolvida, cada peça nova vira uma decisão do zero. O feed muda de personalidade toda semana. O site fala uma coisa, a proposta fala outra, e o cliente precisa fazer esforço demais para entender quem está falando.",
        "Uma identidade forte não deixa a comunicação engessada. Ela facilita. Dá ao time um conjunto de escolhas que já fazem sentido: cores com função, tipografia com atitude, composições com uma lógica reconhecível.",
        "É aqui que branding vira prática. Uma boa marca economiza tempo, reduz dúvida e cria memória. Ela permite que o negócio apareça em formatos diferentes sem perder o rosto.",
        "Antes de postar mais, resolva a voz. Antes de desenhar mais, resolva o sistema. O feed deveria ser consequência da marca, não o lugar onde a marca é inventada toda manhã."
      ]
    }
  },
  {
    id: "article-creative-routine",
    title: "Creative Routine Is Not the Enemy",
    titlePt: "Rotina Criativa Não É Inimiga",
    category: "Inspiração",
    type: "article",
    description: "Routine gives creativity a place to land without turning the work into a formula.",
    descriptionPt: "Rotina dá um lugar para a criatividade pousar sem transformar o trabalho em fórmula.",
    tags: ["routine", "creativity", "discipline", "process"],
    credit: "Dolayout Editorial",
    height: 470,
    tone: "warm",
    palette: ["#202020", "#ff6f3c"],
    image: "assets/dolayout/editorial/creative-routine.svg",
    showFeedTitle: true,
    article: {
      en: [
        "There is a romantic idea that creativity needs chaos. Sometimes chaos gives energy, sure. But if chaos is the only method, the work becomes expensive: emotionally, mentally and professionally.",
        "Routine does not kill surprise. It protects the space where surprise can happen. When the basics are organized, the mind can spend less energy finding the file, remembering the next step or negotiating with anxiety.",
        "A useful creative routine is simple: collect references, define the problem, make rough options, choose a direction, refine, test in context. It is not glamorous. It works because it reduces fog.",
        "The trick is leaving room inside the structure. A routine should guide the work, not suffocate it. You need enough repetition to build quality and enough curiosity to avoid becoming a machine.",
        "Creativity likes freedom, but it also likes a desk, a time, a method and a reason to begin."
      ],
      pt: [
        "Existe uma ideia romântica de que criatividade precisa de caos. Às vezes o caos dá energia, claro. Mas quando o caos é o único método, o trabalho fica caro: emocionalmente, mentalmente e profissionalmente.",
        "Rotina não mata surpresa. Ela protege o espaço onde a surpresa pode acontecer. Quando o básico está organizado, a cabeça gasta menos energia achando arquivo, lembrando o próximo passo ou negociando com a ansiedade.",
        "Uma rotina criativa útil é simples: juntar referências, entender o problema, abrir caminhos, escolher uma direção, refinar, testar no contexto. Não é glamouroso. Funciona porque reduz neblina.",
        "O truque é deixar espaço dentro da estrutura. A rotina deve guiar o trabalho, não sufocar. Você precisa de repetição suficiente para ganhar qualidade e curiosidade suficiente para não virar máquina.",
        "Criatividade gosta de liberdade, mas também gosta de mesa, horário, método e motivo para começar."
      ]
    }
  },
  {
    id: "article-personal-growth",
    title: "Growth Without Becoming Noise",
    titlePt: "Crescer Sem Virar Ruído",
    category: "Inspiração",
    type: "article",
    description: "Personal growth is not only doing more. It is choosing better what deserves your attention.",
    descriptionPt: "Crescimento pessoal não é só fazer mais. É escolher melhor o que merece sua atenção.",
    tags: ["growth", "focus", "career", "self development"],
    credit: "Dolayout Editorial",
    height: 540,
    tone: "neon",
    palette: ["#111827", "#f2b5d4"],
    image: "assets/dolayout/editorial/personal-growth.svg",
    showFeedTitle: true,
    article: {
      en: [
        "A lot of growth looks loud from the outside: more projects, more posts, more meetings, more promises. But real growth often starts quieter. It starts when you understand what you are no longer willing to repeat.",
        "To grow personally, you need to notice your patterns. Where do you overcomplicate? Where do you avoid decisions? Where do you accept urgency as if it were strategy?",
        "Professional growth follows the same logic. Better work is rarely just a matter of talent. It comes from better questions, better boundaries, better taste and a clearer relationship with time.",
        "The goal is not to become optimized. The goal is to become more honest with your energy. Some things deserve depth. Some things deserve a quick no. Some things need a better system, not a stronger personality.",
        "Growth that matters does not turn you into more noise. It makes your signal cleaner."
      ],
      pt: [
        "Muito crescimento parece barulhento por fora: mais projetos, mais posts, mais reuniões, mais promessas. Mas crescimento real muitas vezes começa mais baixo. Começa quando você entende o que não quer mais repetir.",
        "Para crescer pessoalmente, você precisa perceber seus padrões. Onde você complica demais? Onde foge de decisões? Onde aceita urgência como se fosse estratégia?",
        "O crescimento profissional segue a mesma lógica. Trabalho melhor raramente é só talento. Vem de perguntas melhores, limites melhores, gosto mais apurado e uma relação mais clara com o tempo.",
        "O objetivo não é virar uma pessoa otimizada. É ser mais honesto com a própria energia. Algumas coisas merecem profundidade. Algumas merecem um não rápido. Algumas precisam de sistema, não de personalidade mais forte.",
        "Crescimento que importa não te transforma em mais ruído. Ele deixa seu sinal mais limpo."
      ]
    }
  },
  {
    id: "article-professional-presence",
    title: "Professional Presence Is Built in Details",
    titlePt: "Presença Profissional Mora nos Detalhes",
    category: "Inspiração",
    type: "article",
    description: "The way you present your work teaches people how to value it.",
    descriptionPt: "O jeito como você apresenta seu trabalho ensina as pessoas a valorizarem ele.",
    tags: ["career", "presentation", "portfolio", "professional growth"],
    credit: "Dolayout Editorial",
    height: 500,
    tone: "acid",
    palette: ["#141414", "#d7ff3f"],
    image: "assets/dolayout/editorial/professional-presence.svg",
    showFeedTitle: true,
    article: {
      en: [
        "People do not experience your work only through the final file. They experience it through the email, the deck, the meeting, the link, the caption, the way the project is named and the way the idea is explained.",
        "Professional presence is not about pretending to be bigger than you are. It is about removing friction. Clear links, organized files, short explanations and strong visuals create trust before the first call is over.",
        "For creative work, presentation is part of the work. A good project shown badly loses force. A simple project shown with clarity can become memorable.",
        "This does not mean making everything fancy. It means being intentional. What needs to be seen first? What needs context? What can disappear? What would help the client decide faster?",
        "The detail is not decoration. The detail is where confidence becomes visible."
      ],
      pt: [
        "As pessoas não entram em contato com seu trabalho só pelo arquivo final. Elas sentem seu trabalho pelo e-mail, pela apresentação, pela reunião, pelo link, pela legenda, pelo nome do projeto e pelo jeito como a ideia é explicada.",
        "Presença profissional não é fingir ser maior do que você é. É remover atrito. Links claros, arquivos organizados, explicações curtas e visuais fortes criam confiança antes da primeira reunião acabar.",
        "No trabalho criativo, apresentação faz parte do trabalho. Um bom projeto apresentado mal perde força. Um projeto simples apresentado com clareza pode virar memorável.",
        "Isso não significa deixar tudo chique. Significa ter intenção. O que precisa ser visto primeiro? O que precisa de contexto? O que pode sumir? O que ajudaria o cliente a decidir mais rápido?",
        "O detalhe não é decoração. O detalhe é onde a confiança fica visível."
      ]
    }
  },
  {
    id: "article-visual-consistency",
    title: "Consistency Is Not Repetition",
    titlePt: "Consistência Não É Repetição",
    category: "Inspiração",
    type: "article",
    description: "A consistent visual system can change, breathe and still be recognized.",
    descriptionPt: "Um sistema visual consistente pode mudar, respirar e continuar reconhecível.",
    tags: ["design system", "brand", "identity", "visual language"],
    credit: "Dolayout Editorial",
    height: 590,
    tone: "cool",
    palette: ["#171717", "#6ad5df"],
    image: "assets/dolayout/editorial/visual-consistency.svg",
    showFeedTitle: true,
    article: {
      en: [
        "Many brands confuse consistency with copying the same layout forever. The result is not identity. It is fatigue. Everything looks correct, but nothing feels alive enough to hold attention.",
        "True consistency lives deeper than the template. It lives in proportion, rhythm, contrast, language, point of view and the way decisions repeat with intelligence.",
        "A good system gives variation a home. You can change format, color weight, image style or composition because the underlying logic is clear. The audience feels continuity even when the piece is new.",
        "This is especially important for social media. If every post is identical, people stop looking. If every post is unrelated, people stop remembering. The sweet spot is recognition with movement.",
        "Consistency is not repetition. It is a memory system."
      ],
      pt: [
        "Muita marca confunde consistência com copiar o mesmo layout para sempre. O resultado não é identidade. É cansaço. Tudo parece correto, mas nada tem vida suficiente para segurar atenção.",
        "Consistência de verdade mora mais fundo que o template. Mora na proporção, no ritmo, no contraste, na linguagem, no ponto de vista e no jeito como as decisões se repetem com inteligência.",
        "Um bom sistema dá casa para a variação. Você pode mudar formato, peso de cor, estilo de imagem ou composição porque a lógica por trás está clara. O público sente continuidade mesmo quando a peça é nova.",
        "Isso é especialmente importante em social media. Se todo post é igual, as pessoas param de olhar. Se todo post é desconectado, elas param de lembrar. O ponto bom é reconhecimento com movimento.",
        "Consistência não é repetição. É um sistema de memória."
      ]
    }
  },
  {
    id: "article-ideas-grow",
    title: "Ideas Grow When You Share Them",
    titlePt: "Ideias Crescem Quando São Compartilhadas",
    category: "Inspiração",
    type: "article",
    description: "An idea kept too protected can stay elegant, but small. Sharing creates friction, and friction creates shape.",
    descriptionPt: "Uma ideia protegida demais pode continuar elegante, mas pequena. Compartilhar cria atrito, e atrito cria forma.",
    tags: ["ideas", "collaboration", "creative process", "feedback"],
    credit: "Dolayout Editorial",
    height: 620,
    tone: "cool",
    palette: ["#10252c", "#7bdff2"],
    image: "assets/dolayout/editorial/ideas-grow.svg",
    showFeedTitle: true,
    article: {
      en: [
        "There is a moment when an idea needs to leave your head before it is ready. Not because it is finished, but because it needs air. It needs to be seen from another angle.",
        "Sharing an idea is risky because people can misunderstand it. But that risk is useful. If the idea cannot survive a question, maybe the structure is not clear yet. If the idea becomes stronger after a question, you just found a better path.",
        "Feedback is not a vote. It is material. You do not have to obey every opinion, but you should listen for patterns: what is confusing, what is memorable, what creates energy, what sounds empty.",
        "The best creative conversations do not flatten the idea. They sharpen it. They help the work become more itself.",
        "Keep the fragile part protected, but do not hide the whole thing forever. Ideas grow when they meet the world."
      ],
      pt: [
        "Existe um momento em que a ideia precisa sair da sua cabeça antes de estar pronta. Não porque acabou, mas porque precisa de ar. Precisa ser vista por outro ângulo.",
        "Compartilhar uma ideia dá medo porque as pessoas podem entender errado. Mas esse risco é útil. Se a ideia não sobrevive a uma pergunta, talvez a estrutura ainda não esteja clara. Se ela fica melhor depois da pergunta, você achou um caminho mais forte.",
        "Feedback não é votação. É material. Você não precisa obedecer toda opinião, mas deve escutar padrões: o que confunde, o que fica na memória, o que gera energia, o que soa vazio.",
        "As melhores conversas criativas não achatam a ideia. Elas afinam. Ajudam o trabalho a ficar mais ele mesmo.",
        "Proteja a parte frágil, mas não esconda tudo para sempre. Ideias crescem quando encontram o mundo."
      ]
    }
  },
  {
    id: "article-attention-economy",
    title: "Attention Is a Design Problem",
    titlePt: "Atenção É um Problema de Design",
    category: "Inspiração",
    type: "article",
    description: "If people are scrolling fast, clarity is not optional. It is the first layer of respect.",
    descriptionPt: "Se as pessoas estão rolando rápido, clareza não é opcional. É a primeira camada de respeito.",
    tags: ["attention", "communication", "social media", "design"],
    credit: "Dolayout Editorial",
    height: 560,
    tone: "warm",
    palette: ["#1b1715", "#ff6f3c"],
    image: "assets/dolayout/editorial/attention-economy.svg",
    showFeedTitle: true,
    article: {
      en: [
        "Attention is not something the audience owes the brand. It is something the brand earns by being clear, relevant and visually precise.",
        "A lot of communication fails because it asks too much too soon. Too many messages, too many effects, too many calls to action, too little hierarchy. The piece becomes loud, but not readable.",
        "Good design creates an order of entry. First, something catches the eye. Then the message becomes clear. Then the detail rewards the person who stays longer.",
        "This matters because attention is also trust. When a brand communicates with clarity, it signals that it understands the viewer's time. It does not force the audience to decode what should have been designed.",
        "In a fast feed, beauty helps. But hierarchy decides."
      ],
      pt: [
        "Atenção não é algo que o público deve para a marca. É algo que a marca conquista sendo clara, relevante e visualmente precisa.",
        "Muita comunicação falha porque pede demais cedo demais. Mensagens demais, efeitos demais, chamadas demais, hierarquia de menos. A peça fica barulhenta, mas não legível.",
        "Bom design cria uma ordem de entrada. Primeiro algo prende o olhar. Depois a mensagem fica clara. Depois o detalhe recompensa quem ficou mais tempo.",
        "Isso importa porque atenção também é confiança. Quando a marca se comunica com clareza, ela mostra que entende o tempo de quem está vendo. Não obriga o público a decifrar o que deveria ter sido desenhado.",
        "Num feed rápido, beleza ajuda. Mas hierarquia decide."
      ]
    }
  },
  {
    id: "article-portfolio-as-platform",
    title: "Your Portfolio Is a Platform",
    titlePt: "Seu Portfólio É uma Plataforma",
    category: "Inspiração",
    type: "article",
    description: "A portfolio should not only archive work. It should create a way for people to understand your taste.",
    descriptionPt: "Um portfólio não deveria só arquivar trabalhos. Deveria criar um jeito das pessoas entenderem seu olhar.",
    tags: ["portfolio", "curation", "creative career", "presentation"],
    credit: "Dolayout Editorial",
    height: 640,
    tone: "neon",
    palette: ["#0e0d12", "#f2b5d4"],
    image: "assets/dolayout/editorial/portfolio-as-platform.svg",
    showFeedTitle: true,
    article: {
      en: [
        "A portfolio is not a folder with nicer spacing. It is a point of view. It tells people what you notice, what you value, how you organize complexity and what kind of problems you are good at solving.",
        "That means curation matters as much as quantity. Ten strong pieces can say more than fifty average ones. A project shown in context can say more than a logo isolated on a white background.",
        "The best portfolios create rhythm. Big image, small note, case, detail, pause, next piece. They let the visitor feel the work before asking them to read too much.",
        "A portfolio also changes the conversation with clients. Instead of only proving that you can execute, it shows how you think. It attracts better questions.",
        "Do not treat your portfolio like storage. Treat it like a living editorial system for your own practice."
      ],
      pt: [
        "Portfólio não é uma pasta com espaçamento melhor. É ponto de vista. Ele mostra o que você percebe, o que valoriza, como organiza complexidade e que tipo de problema sabe resolver.",
        "Por isso curadoria importa tanto quanto quantidade. Dez peças fortes podem dizer mais que cinquenta médias. Um projeto mostrado em contexto pode dizer mais que um logo isolado no fundo branco.",
        "Os melhores portfólios criam ritmo. Imagem grande, nota pequena, case, detalhe, pausa, próxima peça. Deixam a pessoa sentir o trabalho antes de pedir leitura demais.",
        "Um portfólio também muda a conversa com clientes. Em vez de provar só que você executa, ele mostra como você pensa. Atrai perguntas melhores.",
        "Não trate seu portfólio como armazenamento. Trate como um sistema editorial vivo da sua própria prática."
      ]
    }
  },
  {
    id: "article-do-layout-today",
    title: "Do It Today. Do Layout.",
    titlePt: "Faça Hoje. Faça Dolayout.",
    category: "Inspiração",
    type: "article",
    description: "Execution is not the opposite of strategy. It is where strategy stops being abstract.",
    descriptionPt: "Execução não é o oposto de estratégia. É onde a estratégia deixa de ser abstrata.",
    tags: ["execution", "strategy", "design", "creative practice"],
    credit: "Dolayout Editorial",
    height: 500,
    tone: "acid",
    palette: ["#11110f", "#d7ff3f"],
    image: "assets/dolayout/editorial/do-layout-today.svg",
    showFeedTitle: true,
    article: {
      en: [
        "There is a point where talking about the idea stops helping the idea. The next level of thinking happens through layout: scale, order, contrast, image, pause, sequence.",
        "Execution is not a lesser stage. It is where the concept gets tested. A strategy that cannot become a clear page, a strong post or a useful website is probably still too vague.",
        "To do layout is to make decisions visible. What comes first? What can be smaller? What needs tension? What should disappear? The page forces honesty.",
        "This is why making matters. Not because thinking is useless, but because thinking needs a body. A layout gives the idea weight, distance, rhythm and consequence.",
        "Do it today. Not perfectly. Not forever. Just enough for the idea to become real enough to improve."
      ],
      pt: [
        "Existe um ponto em que falar sobre a ideia para de ajudar a ideia. O próximo nível de pensamento acontece no layout: escala, ordem, contraste, imagem, pausa, sequência.",
        "Execução não é uma etapa menor. É onde o conceito é testado. Uma estratégia que não vira página clara, post forte ou site útil provavelmente ainda está vaga demais.",
        "Fazer layout é tornar decisões visíveis. O que vem primeiro? O que pode ser menor? O que precisa de tensão? O que deve sumir? A página força honestidade.",
        "É por isso que fazer importa. Não porque pensar é inútil, mas porque pensamento precisa de corpo. Um layout dá peso, distância, ritmo e consequência para a ideia.",
        "Faça hoje. Não perfeito. Não definitivo. Só o suficiente para a ideia ficar real o bastante para melhorar."
      ]
    }
  }
];

const cards = uniqueCardsByImage([
  ...externalPortfolioPins,
  ...externalPortfolioCards,
  ...editorialArticles,
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
].filter((card) => ![
  "make-something-today",
  "ideas-grow",
  "perfect-not-needed",
  "do-it-today",
  "brand-board-arca",
  "client-atelier-casa",
  "partner-print-lab",
  "portfolio-web-grid",
  "branding-festival",
  "faca-hoje",
  "art-design-shapes"
].includes(card.id)));

function uniqueCardsByImage(items) {
  const seenImages = new Set();

  return items.filter((card) => {
    if (!card.image) return true;
    if (seenImages.has(card.image)) return false;
    seenImages.add(card.image);
    return true;
  });
}

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
    credits: "Credits",
    copiedPrompt: "Card link",
    profileLabel: "Dolayout / João",
    profileTitle: "Before Dolayout was a studio, it was the name people called me at college.",
    profileText: "I'm João Felipe Nogueira Buselli, a Brazilian designer and art director. Back in college, I became João do layout: the one who was always arranging, testing and turning rough ideas into something visible. The nickname stayed and became Dolayout, my independent studio and an open visual platform for brands, websites, campaigns and whatever else asks for a point of view.",
    profileNote: "I believe everyone can make a layout. Not because design is easy, but because creating begins when an idea leaves your head and gains form. Mine starts with curiosity, gets sharper through direction and only stops when it can live in the real world.",
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
    credits: "Créditos",
    copiedPrompt: "Link do card",
    profileLabel: "Dolayout / João",
    profileTitle: "Antes de ser um estúdio, Dolayout era o jeito como me chamavam na faculdade.",
    profileText: "Sou João Felipe Nogueira Buselli, designer e diretor de arte. Na faculdade, virei o João do layout: o cara que estava sempre organizando, testando e transformando ideia solta em alguma coisa visível. O apelido ficou e virou Dolayout, meu estúdio independente e uma plataforma aberta para marcas, sites, campanhas e tudo o que pede um ponto de vista.",
    profileNote: "Acredito que todo mundo pode fazer layout. Não porque design seja fácil, mas porque criar começa quando uma ideia sai da cabeça e ganha forma. O meu processo começa na curiosidade, fica mais afiado com direção e só para quando consegue existir no mundo real.",
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

function cardTitle(card) {
  return state.language === "pt" && card.titlePt ? card.titlePt : card.title;
}

function cardDescription(card) {
  return state.language === "pt" && card.descriptionPt ? card.descriptionPt : card.description;
}

function cardStatement(card) {
  return state.language === "pt" && card.statementPt ? card.statementPt : card.statement;
}

function articleBody(card) {
  return card.article?.[state.language] || card.article?.en || [];
}

function applyLanguage() {
  document.documentElement.lang = state.language === "pt" ? "pt-BR" : "en";
  searchInput.placeholder = t("search");
  if (feedMetaLabel) feedMetaLabel.textContent = t("visualHub");
  if (languageToggle) {
    languageToggle.textContent = state.language === "en" ? "PT" : "EN";
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

    return images.map((image, index) => {
      const hasInternalPage = index === 0
        && (project.gallery || []).length > 1
        && (project.categories || []).some((category) => ["Branding", "Identity", "Website Design"].includes(category));

      return {
        id: `${project.id}-pin-${index + 1}`,
        title: project.title,
        titlePt: project.titlePt,
        category: project.categories?.[index % project.categories.length] || project.category,
        categories: project.categories || [project.category],
        type: hasInternalPage ? "case completo" : "visual",
        description: project.description,
        descriptionPt: project.descriptionPt,
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
        externalLinks: project.externalLinks || [],
        images: hasInternalPage ? project.gallery : undefined,
        gallery: hasInternalPage ? project.gallery : undefined,
        parentId: project.id,
        openMode: hasInternalPage ? "detail" : "lightbox"
      };
    });
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
      scrollToPageTop();
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
  return /article|matéria|case completo|branding|identity|website|website design|complete case/.test(haystack);
}

function cardTemplate(card) {
  if (card.layout) return artDirectedCardTemplate(card);

  const cardLabel = `<span class="label">${card.category}</span>`;
  const media = card.image ? `<img class="card-media" src="${card.image}" alt="${cardTitle(card)}" loading="lazy">` : "";
  const mediaClass = card.image ? "media-visual" : "";
  const showText = !card.image || card.category === "Nota do Dia" || card.type === "article" || card.showFeedTitle;

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
        <div class="statement">${cardStatement(card)}</div>
        <div class="card-bottom ${showText ? "" : "is-quiet"}">
          <div>
            ${showText ? `<h2 class="card-title">${cardTitle(card)}</h2><p class="card-subtitle">${card.type} / ${card.tags.slice(0, 2).join(", ")}</p>` : ""}
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
      <img src="${image}" alt="${cardTitle(card)} ${index + 1}" loading="lazy">
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
  scrollToPageTop();
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

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
          <img class="brand-symbol symbol-dark" src="assets/dolayout/brand/dolayout-symbol-full-br.svg" alt="">
          <img class="brand-symbol symbol-light" src="assets/dolayout/brand/dolayout-symbol-full-dark.svg" alt="">
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
  if (card.article) {
    renderArticleDetail(card);
    return;
  }

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
          <span class="label">${categoryLabel(card.category)}</span>
          ${card.source ? `<span class="credit-tag">${card.source === "LAF" ? "LAF" : "DO"}</span>` : ""}
          <h1>${cardTitle(card)}</h1>
          <p>${cardDescription(card)}</p>
          <span class="credit">${t("credits")}: ${card.credit}</span>
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

function renderArticleDetail(card) {
  homeView.classList.remove("is-visible");
  detailView.classList.add("is-visible");

  const related = cards
    .filter((item) => item.id !== card.id && item.category === "Inspiração")
    .slice(0, 6);
  const paragraphs = articleBody(card);

  detailView.innerHTML = `
    <article class="article-shell">
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

      <header class="article-header">
        <span class="label">${categoryLabel(card.category)}</span>
        <h1>${cardTitle(card)}</h1>
        <p>${cardDescription(card)}</p>
      </header>

      <figure class="article-hero">
        <img src="${card.image}" alt="${cardTitle(card)}">
      </figure>

      <div class="article-body">
        ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>

      <h2 class="related-title">${t("related")}</h2>
      <div class="masonry related-masonry">
        ${related.map(cardTemplate).join("")}
      </div>
    </article>
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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function heroVisual(card) {
  if (card.gallery?.length) {
    return `
      <div class="project-gallery" data-gallery>
        <div class="gallery-main">
          <img class="detail-image" src="${card.gallery[0]}" alt="${cardTitle(card)}" data-gallery-main>
        </div>
        ${card.gallery.length > 1 ? `<div class="gallery-strip">${card.gallery.map((image, index) => `
          <button class="gallery-thumb ${index === 0 ? "is-active" : ""}" type="button" data-gallery-image="${image}" aria-label="Ver imagem ${index + 1}">
            <img src="${image}" alt="${cardTitle(card)} ${index + 1}">
          </button>
        `).join("")}</div>` : ""}
      </div>
    `;
  }

  if (card.image) {
    return `
      <div class="hero-media">
        <img class="detail-image" src="${card.image}" alt="${cardTitle(card)}">
      </div>
    `;
  }

  return `
    <div class="visual ${card.category === "Nota do Dia" ? "visual-note" : ""}" style="--c1:${card.palette[0]}; --c2:${card.palette[1]}; --statement-color:${card.statementColor};">
      <div class="card-top">
        <span class="label">${card.type}</span>
      </div>
      <div class="statement">${cardStatement(card)}</div>
      <div class="card-bottom">
        <div>
          <h2 class="card-title">${cardTitle(card)}</h2>
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
