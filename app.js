const categories = [
  "Todos",
  "Inspiração",
  "Portfólio",
  "Branding",
  "Identity",
  "Key Visual",
  "Social Media",
  "Website Design",
  "Campaign",
  "Packaging",
  "Menu Design",
  "Editorial",
  "Art Direction",
  "Creative Studio"
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
  },
  {
    id: "article-claude-monet-rouen-series",
    title: "The Same Stone, Another Light",
    titlePt: "A Mesma Pedra, Outra Luz",
    category: "Inspiração",
    type: "article",
    description: "Claude Monet painted Rouen Cathedral more than thirty times. The subject was a Gothic façade; the real experiment was seeing how light changed it.",
    descriptionPt: "Claude Monet pintou a Catedral de Rouen mais de trinta vezes. O tema era uma fachada gótica; o experimento era observar como a luz a transformava.",
    tags: ["Claude Monet", "art history", "impressionism", "light", "visual culture"],
    credit: "Dolayout Editorial",
    imageCredit: "Original AI-generated editorial interpretation. Not a Monet painting or a reconstruction of a specific artwork.",
    imageCreditPt: "Interpretação editorial original gerada por IA. Não é uma pintura de Monet nem a reconstrução de uma obra específica.",
    imageAlt: "Original AI-generated editorial painting of an imagined Gothic cathedral shifting from warm evening light to blue-violet dusk",
    height: 560,
    tone: "cool",
    palette: ["#20212a", "#b5a4d6"],
    image: "assets/dolayout/editorial/monet-rouen-light-original-ai.webp",
    imageHero: true,
    showFeedTitle: true,
    article: {
      en: [
        "Claude Monet painted Rouen Cathedral more than thirty times. The subject was a Gothic façade; the real experiment was seeing how light changed it.",
        "In 1892 and 1893, Monet rented rooms across from the cathedral’s western façade. He kept several canvases in progress and moved between them as the light shifted. Sun, shadow and weather gave the stone a different color and mood. The building became a constant against which change could be seen.",
        "The series was not simply a record of fleeting moments. Monet later reworked the canvases in his studio at Giverny, completing them through 1894. The paintings combine observation with memory, revision and deliberate choices about color.",
        "In 1895, Monet exhibited twenty of the cathedral paintings together at Galerie Durand-Ruel in Paris. Seen as a group, they ask viewers to compare more than buildings. The façade recedes; color, atmosphere and the act of looking come forward.",
        "That is what makes the series feel modern. One subject can hold attention without repeating itself. A shift in light changes the image, and a shift in attention changes what the image means. The next time a familiar place looks different, the reason may be more than the place itself."
      ],
      pt: [
        "Claude Monet pintou a Catedral de Rouen mais de trinta vezes. O tema era uma fachada gótica; o experimento era observar como a luz a transformava.",
        "Em 1892 e 1893, Monet alugou quartos diante da fachada oeste da catedral. Mantinha várias telas em andamento e alternava entre elas conforme a luz mudava. Sol, sombra e clima davam outra cor e outra atmosfera à pedra. O edifício se tornou uma constante para tornar a mudança visível.",
        "A série não era apenas um registro de instantes fugazes. Depois, Monet retrabalhou as telas em seu ateliê em Giverny e as finalizou até 1894. As pinturas combinam observação, memória, revisão e escolhas deliberadas de cor.",
        "Em 1895, Monet expôs vinte pinturas da catedral juntas na Galerie Durand-Ruel, em Paris. Vistas em conjunto, elas convidam o público a comparar mais do que edifícios. A fachada recua; cor, atmosfera e o próprio ato de olhar ganham espaço.",
        "É isso que faz a série parecer moderna. Um mesmo tema pode prender o olhar sem se repetir. Uma mudança de luz transforma a imagem; uma mudança de atenção transforma o que ela significa. Na próxima vez que um lugar conhecido parecer diferente, talvez não seja só o lugar que mudou."
      ]
    },
    sources: [
      { label: "National Gallery of Art — Rouen Cathedral, West Façade, Sunlight", url: "https://www.nga.gov/artworks/46654-rouen-cathedral-west-facade-sunlight" },
      { label: "National Gallery of Art — Rouen Cathedral, West Façade", url: "https://www.nga.gov/artworks/46524-rouen-cathedral-west-facade" },
      { label: "The Metropolitan Museum of Art — Claude Monet (1840–1926)", url: "https://www.metmuseum.org/it/essays/claude-monet-1840-1926" }
    ]
  },
  {
    id: "article-os-mutantes-studio-tropicalia",
    title: "When the Studio Became Part of the Band",
    titlePt: "Quando o Estúdio Virou Parte da Banda",
    category: "Inspiração",
    type: "article",
    description: "Os Mutantes brought musical contrasts and studio experiments into the Tropicália conversation.",
    descriptionPt: "Os Mutantes levaram contrastes musicais e experimentação de estúdio para a conversa tropicalista.",
    tags: ["Os Mutantes", "Tropicália", "Brazilian music", "studio culture", "music history"],
    credit: "Dolayout Editorial",
    imageCredit: "Original AI-generated editorial collage. It does not depict Os Mutantes or reproduce an album cover.",
    imageCreditPt: "Colagem editorial original gerada por IA. Não retrata Os Mutantes nem reproduz capa de disco.",
    imageAlt: "Original editorial collage with microphone, guitar, analogue tape and tropical shapes, created for a story about Os Mutantes",
    imageAltPt: "Colagem editorial original com microfone, guitarra, fita analógica e formas tropicais, criada para uma pauta sobre Os Mutantes",
    height: 580,
    tone: "warm",
    palette: ["#12221b", "#e74b34"],
    image: "assets/dolayout/editorial/os-mutantes-tropicalia-original-ai.webp",
    imageHero: true,
    showFeedTitle: true,
    article: {
      en: [
        "Os Mutantes emerged in São Paulo in the mid-1960s. Their television debut came in 1966, and by 1967 they were performing with Gilberto Gil at the Festival of Brazilian Popular Music. That performance placed their sound inside the emerging Tropicalist conversation.",
        "Tropicália worked through contrast: Brazilian musical traditions met electric guitar, pop, avant-garde arrangements and mass culture. It was less a tidy genre than a way to make different references sit in the same room. The <a href=\"https://dicionariompb.com.br/termo/tropicalismo/\" target=\"_blank\" rel=\"noopener noreferrer\">Brazilian Popular Music Dictionary</a> records Os Mutantes among the movement’s participants and describes its mix of musical forms and electric instrumentation.",
        "The band carried that curiosity into the recording studio. <a href=\"https://www.luakabop.com/artists/os-mutantes\" target=\"_blank\" rel=\"noopener noreferrer\">Luaka Bop’s account of the 1968 debut</a> describes Rita Lee bringing a Flit insect-spray can into a session and using it in place of a hi-hat on “Le Premier Bonheur du Jour.” The detail is small, but it reveals a larger attitude: a sound did not need to arrive from a conventional instrument to belong in the arrangement.",
        "That approach makes the studio more than a place to capture a finished performance. It becomes a workshop where listening, testing and surprise are part of composition. The experiment is not a trick added after the song; it changes what the song can be.",
        "Image note: the accompanying visual is an original AI-generated collage about studio experimentation. It does not depict Os Mutantes or reproduce an album cover."
      ],
      pt: [
        "Os Mutantes surgiram em São Paulo em meados dos anos 1960. A estreia na televisão aconteceu em 1966 e, em 1967, o grupo acompanhou Gilberto Gil no Festival de Música Popular Brasileira. A apresentação colocou o som da banda dentro da conversa tropicalista que começava a ganhar forma.",
        "A Tropicália trabalhava com contrastes: tradições musicais brasileiras encontravam guitarra elétrica, pop, arranjos de vanguarda e cultura de massa. Era menos um gênero fechado e mais um jeito de colocar referências diferentes na mesma sala. O <a href=\"https://dicionariompb.com.br/termo/tropicalismo/\" target=\"_blank\" rel=\"noopener noreferrer\">Dicionário Cravo Albin</a> registra Os Mutantes entre os participantes do movimento e descreve sua mistura de formas musicais e instrumentação elétrica.",
        "A banda levou essa curiosidade ao estúdio. Segundo o relato da <a href=\"https://www.luakabop.com/artists/os-mutantes\" target=\"_blank\" rel=\"noopener noreferrer\">Luaka Bop sobre o álbum de estreia de 1968</a>, Rita Lee chegou a uma sessão com uma lata de inseticida Flit e a usou no lugar do hi-hat em “Le Premier Bonheur du Jour”. O detalhe é pequeno, mas revela uma atitude maior: um som não precisava vir de um instrumento convencional para fazer parte do arranjo.",
        "Assim, o estúdio deixa de ser apenas o lugar onde uma interpretação pronta é registrada. Vira oficina: escuta, teste e surpresa também compõem. O experimento não é um truque acrescentado depois; ele muda o que a canção pode ser.",
        "Nota da imagem: a colagem que acompanha a pauta é original, gerada por IA, e fala sobre experimentação em estúdio. Não retrata Os Mutantes nem reproduz capa de disco."
      ]
    },
    sources: [
      { label: "Dicionário Cravo Albin — Tropicalismo", url: "https://dicionariompb.com.br/termo/tropicalismo/" },
      { label: "Luaka Bop — Os Mutantes", url: "https://www.luakabop.com/artists/os-mutantes" },
      { label: "Memórias da Ditadura — Os Mutantes", url: "https://memoriasdaditadura.org.br/cultura/os-mutantes/" }
    ]
  },
  {
    id: "article-bauhaus-dessau-building",
    title: "A Building That Asks You to Move",
    titlePt: "Um Edifício que Pede Movimento",
    category: "Inspiração",
    type: "article",
    description: "The Bauhaus Dessau building reveals its design through movement, light and the work inside.",
    descriptionPt: "O edifício da Bauhaus Dessau revela seu projeto pelo movimento, pela luz e pelo trabalho em seu interior.",
    tags: ["Bauhaus Dessau", "architecture", "Walter Gropius", "design history", "glass facade"],
    credit: "Dolayout Editorial",
    imageCredit: "Original AI-generated architectural interpretation, not a reconstruction or photograph of the historic Bauhaus building.",
    imageCreditPt: "Interpretação arquitetônica original gerada por IA; não é reconstrução nem fotografia do edifício histórico da Bauhaus.",
    imageAlt: "Original interpretation of a modern design school, with geometric volumes, a bridge and a glass facade",
    imageAltPt: "Interpretação original de uma escola de design moderna, com volumes geométricos, ponte e fachada de vidro",
    height: 580,
    tone: "cool",
    palette: ["#20252a", "#205bb9"],
    image: "assets/dolayout/editorial/bauhaus-dessau-original-ai.webp",
    imageHero: true,
    showFeedTitle: true,
    article: {
      en: [
        "When the Bauhaus moved from Weimar to Dessau, the school had the chance to build a new home. The <a href=\"https://bauhaus-dessau.de/en/venues/bauhaus-building/\" target=\"_blank\" rel=\"noopener noreferrer\">Bauhaus Dessau Foundation</a> describes the result as a set of distinct parts, each with a different function and scale: workshop wing, vocational school, administration, studios, auditorium and canteen.",
        "The two-storey bridge served as the administration headquarters and connected the glazed workshop wing to the vocational school. A five-storey studio building held 28 compact living units for students and young masters. There is no single central view of the whole structure; its arrangement becomes clear by walking around it.",
        "The workshop façade made the school’s activity part of the architecture. Steel and glass allowed views into the workshops and made the building’s structure visible from outside. The interiors extended the same idea: the school’s own workshops designed furniture, lamps and even door handles.",
        "Colour was not an afterthought. Hinnerk Scheper’s mural-painting workshop developed a scheme that helps orient visitors, emphasizes parts of the structure and sometimes works against it. The building is not just a white geometric object; it is a system of movement, work and visual cues.",
        "Opened on 4 December 1926, the building is still best understood as an experience in sequence. To read it, move through it.",
        "Image note: the accompanying artwork is an original AI-generated interpretation of a modern design school. It is not a reconstruction of the Bauhaus Dessau building."
      ],
      pt: [
        "Quando a Bauhaus se mudou de Weimar para Dessau, a escola teve a oportunidade de construir uma nova sede. A <a href=\"https://bauhaus-dessau.de/en/venues/bauhaus-building/\" target=\"_blank\" rel=\"noopener noreferrer\">Fundação Bauhaus Dessau</a> descreve o resultado como um conjunto de partes distintas, cada uma com função e escala próprias: ala de oficinas, escola profissional, administração, estúdios, auditório e refeitório.",
        "A ponte de dois andares servia de sede administrativa e conectava a ala envidraçada das oficinas à escola profissional. Um edifício de estúdios com cinco pavimentos abrigava 28 moradias compactas para estudantes e jovens mestres. Não existe um único ponto de vista central para entender a construção inteira; seu arranjo se revela ao caminhar ao redor dela.",
        "A fachada das oficinas transformava a atividade da escola em parte da arquitetura. Aço e vidro permitiam ver as oficinas e deixavam a estrutura aparente do lado de fora. Os interiores ampliavam a mesma ideia: as próprias oficinas da escola criaram móveis, luminárias e até maçanetas.",
        "A cor também tinha função. O ateliê de pintura mural de Hinnerk Scheper desenvolveu um sistema que orienta, destaca partes da estrutura e, em alguns momentos, a atravessa. O edifício não é apenas um objeto geométrico branco; é um sistema de movimento, trabalho e sinais visuais.",
        "Inaugurado em 4 de dezembro de 1926, o edifício ainda se entende melhor como uma experiência em sequência. Para lê-lo, é preciso percorrê-lo.",
        "Nota da imagem: a arte que acompanha a pauta é uma interpretação original gerada por IA de uma escola de design moderna. Não reconstrói o edifício da Bauhaus Dessau."
      ]
    },
    sources: [
      { label: "Bauhaus Dessau Foundation — Bauhaus Building", url: "https://bauhaus-dessau.de/en/venues/bauhaus-building/" },
      { label: "Bauhaus Dessau Foundation — Chronology", url: "https://bauhaus-dessau.de/en/institution/chronology/" }
    ]
  },
  {
    id: "article-helvetica-name-history",
    title: "The Typeface That Began with Another Name",
    titlePt: "A Fonte que Começou com Outro Nome",
    category: "Inspiração",
    type: "article",
    description: "Before Helvetica, there was Neue Haas Grotesk. Its history shows how type choices shape tone.",
    descriptionPt: "Antes da Helvetica, havia a Neue Haas Grotesk. Sua história mostra como escolhas tipográficas constroem um tom.",
    tags: ["Helvetica", "typography", "Max Miedinger", "Eduard Hoffmann", "type history"],
    credit: "Dolayout Editorial",
    imageCredit: "Original AI-generated abstract study of typographic forms. It does not reproduce Helvetica letterforms or a specimen sheet.",
    imageCreditPt: "Estudo abstrato original, gerado por IA, de formas tipográficas. Não reproduz letras da Helvetica nem uma prancha de espécimes.",
    imageAlt: "Abstract study of black typographic forms on ivory paper, with a grid and small colour markers",
    imageAltPt: "Estudo abstrato de formas tipográficas pretas sobre papel marfim, com grade e pequenos marcadores coloridos",
    height: 580,
    tone: "mono",
    palette: ["#20201e", "#bc3428"],
    image: "assets/dolayout/editorial/helvetica-abstract-type-original-ai.webp",
    imageHero: true,
    showFeedTitle: true,
    article: {
      en: [
        "Helvetica began as Neue Haas Grotesk. The first sketches were developed from 1956 by Swiss type designer Max Miedinger in collaboration with Eduard Hoffmann of the Haas type foundry. Haas released the typeface in 1957; it was renamed Helvetica in 1961, according to <a href=\"https://www.htwk-leipzig.de/hochschule/aktuelles/newsdetail/artikel/font-stories-helvetica-neue\" target=\"_blank\" rel=\"noopener noreferrer\">HTWK Leipzig’s font history</a>.",
        "The new name connected the typeface to Switzerland, but its growing success came from use. The font became widely adopted in advertising in the 1960s and 70s. Its familiar forms appeared clear and dependable across many settings, which helped it travel from print into daily visual culture. <a href=\"https://www.monotype.com/resources/articles/complicated-legacy-helvetica\" target=\"_blank\" rel=\"noopener noreferrer\">Monotype’s history of Helvetica</a> describes how that popularity became part of its cultural legacy.",
        "That familiarity can make a typeface feel neutral, as if it were simply carrying the message. But typography always shapes tone. A bold headline feels different from a quiet caption; tight spacing feels different from an open one. Size, weight, language and context all change how the same family behaves.",
        "Helvetica is useful when its straightforward rhythm supports the content. It is less useful when familiarity becomes a substitute for a decision. Choosing it well means choosing what should recede — and what should stand out.",
        "For a licensed Helvetica family, see <a href=\"https://www.monotype.com/fonts/helvetica-now\" target=\"_blank\" rel=\"noopener noreferrer\">Monotype’s Helvetica Now</a> or <a href=\"https://fonts.adobe.com/search?query=helvetica\" target=\"_blank\" rel=\"noopener noreferrer\">Adobe Fonts’ Helvetica listing</a>. Licensing and availability depend on the version and intended use. For a free, open-source alternative, <a href=\"https://github.com/rsms/inter\" target=\"_blank\" rel=\"noopener noreferrer\">Inter</a> is available under the SIL Open Font License.",
        "Image note: the accompanying image is an original abstract study of typographic forms. It does not reproduce Helvetica letterforms or a specimen sheet."
      ],
      pt: [
        "A Helvetica começou como Neue Haas Grotesk. Os primeiros desenhos foram desenvolvidos a partir de 1956 pelo designer suíço Max Miedinger, em colaboração com Eduard Hoffmann, da fundição Haas. A Haas lançou a fonte em 1957; o nome mudou para Helvetica em 1961, segundo a <a href=\"https://www.htwk-leipzig.de/hochschule/aktuelles/newsdetail/artikel/font-stories-helvetica-neue\" target=\"_blank\" rel=\"noopener noreferrer\">história tipográfica da HTWK Leipzig</a>.",
        "O novo nome aproximava a fonte da Suíça, mas sua popularidade cresceu pelo uso. Ela se espalhou pela publicidade nos anos 1960 e 1970. Suas formas familiares pareciam claras e confiáveis em diferentes situações, levando a fonte do impresso para a cultura visual cotidiana. A <a href=\"https://www.monotype.com/resources/articles/complicated-legacy-helvetica\" target=\"_blank\" rel=\"noopener noreferrer\">história da Helvetica pela Monotype</a> conta como essa popularidade passou a fazer parte de seu legado cultural.",
        "Essa familiaridade pode fazer a tipografia parecer neutra, como se apenas carregasse a mensagem. Mas a tipografia sempre constrói um tom. Um título em negrito soa diferente de uma legenda discreta; um espaçamento fechado soa diferente de um aberto. Tamanho, peso, idioma e contexto mudam o comportamento da mesma família.",
        "A Helvetica funciona quando seu ritmo direto ajuda o conteúdo. Funciona menos quando a familiaridade substitui uma decisão. Escolhê-la bem é decidir o que deve recuar — e o que deve ganhar destaque.",
        "Para obter uma versão licenciada da Helvetica, veja <a href=\"https://www.monotype.com/fonts/helvetica-now\" target=\"_blank\" rel=\"noopener noreferrer\">Helvetica Now na Monotype</a> ou a <a href=\"https://fonts.adobe.com/search?query=helvetica\" target=\"_blank\" rel=\"noopener noreferrer\">listagem da Helvetica na Adobe Fonts</a>. Licença e disponibilidade variam conforme a versão e o uso. Como alternativa livre e de código aberto, <a href=\"https://github.com/rsms/inter\" target=\"_blank\" rel=\"noopener noreferrer\">Inter</a> está disponível sob a SIL Open Font License.",
        "Nota da imagem: o visual que acompanha a pauta é um estudo abstrato original de formas tipográficas. Não reproduz letras da Helvetica nem uma folha de espécimes."
      ]
    },
    sources: [
      { label: "HTWK Leipzig — Font Stories: Helvetica Neue", url: "https://www.htwk-leipzig.de/hochschule/aktuelles/newsdetail/artikel/font-stories-helvetica-neue" },
      { label: "Monotype — The Complicated Legacy of Helvetica", url: "https://www.monotype.com/resources/articles/complicated-legacy-helvetica" },
      { label: "Monotype — Helvetica Now licensing", url: "https://www.monotype.com/fonts/helvetica-now" },
      { label: "Inter — SIL Open Font License", url: "https://github.com/rsms/inter" }
    ]
  }
];

// Editorial standard: every article uses its cover image plus at least one contextual inline image.
const articleImageContent = {
  "article-make-something-today": {
    src: "assets/dolayout/editorial/make-something-in-progress.webp",
    alt: "A hand starts a geometric pencil sketch on a blank sheet beside red and yellow paper shapes",
    altPt: "Uma mão começa um desenho geométrico a lápis em uma folha em branco, ao lado de formas de papel vermelha e amarela",
    caption: "An idea takes shape through the first small act of making. Original AI-generated editorial image.",
    captionPt: "Uma ideia começa a ganhar forma no primeiro gesto de criação. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-brand-before-feed": {
    src: "assets/dolayout/editorial/brand-system-across-touchpoints.webp",
    alt: "A coordinated identity system expressed across packaging, cards and abstract social tiles",
    altPt: "Um sistema de identidade visual aplicado de forma coerente em embalagens, cartões e peças sociais abstratas",
    caption: "One identity carries its visual logic across different formats. Original AI-generated editorial image.",
    captionPt: "Uma identidade mantém sua lógica visual em diferentes formatos. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-creative-routine": {
    src: "assets/dolayout/editorial/creative-routine-sequence.webp",
    alt: "Three design thumbnails arranged in sequence on a sunlit wooden desk with an analog timer",
    altPt: "Três estudos de composição em sequência sobre uma mesa de madeira iluminada, com um temporizador analógico",
    caption: "A simple sequence gives creative work room to move. Original AI-generated editorial image.",
    captionPt: "Uma sequência simples cria espaço para o trabalho criativo avançar. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-personal-growth": {
    src: "assets/dolayout/editorial/growth-attention-seedling.webp",
    alt: "Seedlings at different stages grow beside a mature plant in a quiet greenhouse",
    altPt: "Mudas em diferentes estágios crescem ao lado de uma planta adulta em uma estufa tranquila",
    caption: "Growth happens through attention, selection and care. Original AI-generated editorial image.",
    captionPt: "Crescer também envolve atenção, escolha e cuidado. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-professional-presence": {
    src: "assets/dolayout/editorial/professional-presence-presentation.webp",
    alt: "A designer carefully aligns a printed portfolio and material samples before a presentation",
    altPt: "Uma pessoa designer organiza com cuidado um portfólio impresso e amostras de materiais antes de uma apresentação",
    caption: "Careful presentation makes the value of the work easier to see. Original AI-generated editorial image.",
    captionPt: "Uma boa apresentação facilita perceber o valor do trabalho. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-visual-consistency": {
    src: "assets/dolayout/editorial/visual-consistency-system.webp",
    alt: "Packaging, a poster and printed cards repeat the same abstract blue, cream and vermilion motif",
    altPt: "Embalagem, cartaz e cartões impressos repetem o mesmo motivo abstrato em azul, creme e vermelho",
    caption: "Consistency connects varied pieces through a shared visual system. Original AI-generated editorial image.",
    captionPt: "A consistência conecta peças diferentes por meio de um sistema visual comum. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-ideas-grow": {
    src: "assets/dolayout/editorial/ideas-iteration-forms.webp",
    alt: "Layered tracing sheets show a rough geometric idea developing into several refined compositions",
    altPt: "Folhas translúcidas sobrepostas mostram uma ideia geométrica evoluindo para composições mais resolvidas",
    caption: "Iteration turns an initial thought into new possibilities. Original AI-generated editorial image.",
    captionPt: "A iteração transforma uma ideia inicial em novas possibilidades. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-attention-economy": {
    src: "assets/dolayout/editorial/attention-economy-focus.webp",
    alt: "An open sketchbook and one red card stay in sharp focus while colorful visual distractions blur around them",
    altPt: "Um caderno aberto e um cartão vermelho permanecem em foco enquanto distrações coloridas se desfocam ao redor",
    caption: "Choosing one signal can bring clarity to a crowded visual field. Original AI-generated editorial image.",
    captionPt: "Escolher um sinal pode trazer clareza a um campo visual carregado. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-portfolio-as-platform": {
    src: "assets/dolayout/editorial/portfolio-as-platform-gallery.webp",
    alt: "A gallery corridor connects packaging, poster, architectural model and abstract digital artwork",
    altPt: "Um corredor de galeria conecta embalagens, cartaz, maquete arquitetônica e arte digital abstrata",
    caption: "A portfolio can guide people through a connected body of work. Original AI-generated editorial image.",
    captionPt: "Um portfólio pode conduzir o público por um conjunto conectado de trabalhos. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-do-layout-today": {
    src: "assets/dolayout/editorial/layout-in-action.webp",
    alt: "Hands rearrange printed image blocks and colored paper on a layout grid",
    altPt: "Mãos reorganizam blocos de imagem impressos e papéis coloridos sobre uma grade de layout",
    caption: "A layout becomes clearer when ideas meet the page. Original AI-generated editorial image.",
    captionPt: "O layout ganha clareza quando as ideias encontram a página. Imagem editorial original gerada por IA.",
    afterParagraph: 2
  },
  "article-claude-monet-rouen-series": {
    src: "assets/dolayout/editorial/monet-rouen-changing-light.webp",
    alt: "A row of imagined Rouen Cathedral studies shifts from warm morning colors to blue-violet dusk",
    altPt: "Uma sequência imaginada de estudos da Catedral de Rouen passa de tons quentes da manhã ao azul-violeta do entardecer",
    caption: "An original AI-generated interpretation of changing light, not a Monet painting or a reconstruction of a specific work.",
    captionPt: "Interpretação original gerada por IA sobre a mudança da luz; não é uma pintura de Monet nem a reconstrução de uma obra específica.",
    afterParagraph: 2
  },
  "article-os-mutantes-studio-tropicalia": {
    src: "assets/dolayout/editorial/mutantes-studio-experiment.webp",
    alt: "An imagined late-1960s recording studio with electric guitar, tape reels, tambourine and an unlabeled metal can",
    altPt: "Estúdio de gravação imaginado no fim dos anos 1960, com guitarra elétrica, fitas, pandeiro e uma lata metálica sem rótulo",
    caption: "An original AI-generated scene about studio experimentation; it does not depict Os Mutantes or an actual recording session.",
    captionPt: "Cena original gerada por IA sobre experimentação em estúdio; não retrata Os Mutantes nem uma gravação real.",
    afterParagraph: 2
  },
  "article-bauhaus-dessau-building": {
    src: "assets/dolayout/editorial/bauhaus-moving-through-space.webp",
    alt: "An imagined modernist design school interior with a glass facade, bridge corridor and staircase",
    altPt: "Interior imaginado de uma escola de design modernista, com fachada de vidro, passarela e escadaria",
    caption: "An original AI-generated architectural interpretation, not a photograph or exact reconstruction of Bauhaus Dessau.",
    captionPt: "Interpretação arquitetônica original gerada por IA; não é fotografia nem reconstrução exata da Bauhaus Dessau.",
    afterParagraph: 2
  },
  "article-helvetica-name-history": {
    src: "assets/dolayout/editorial/helvetica-type-study.webp",
    alt: "Black abstract sans-serif paper forms, spacing strips and a ruler on an ivory typesetter's desk",
    altPt: "Formas tipográficas abstratas em papel preto, tiras de espaçamento e uma régua sobre uma mesa marfim",
    caption: "An original AI-generated study of typographic rhythm; it does not reproduce Helvetica glyphs or a specimen sheet.",
    captionPt: "Estudo original gerado por IA sobre ritmo tipográfico; não reproduz letras da Helvetica nem uma prancha de espécimes.",
    afterParagraph: 2
  }
};

for (const article of editorialArticles) {
  if (articleImageContent[article.id]) article.articleImages = [articleImageContent[article.id]];
}

let cards = uniqueCardsByImage([
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
].filter((card) => card.article || card.parentId));

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

const mobileFeedOrder = (() => {
  const order = shuffled(cards);
  const featureIndex = order.findIndex((card) => card.feedCarousel);
  if (featureIndex > 0) order.unshift(order.splice(featureIndex, 1)[0]);
  return order.map((card) => card.id);
})();
let desktopFeaturedId = null;

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
    "Content systems"
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
    "Sistemas de conteúdo"
  ]
};

const categoryLabels = {
  en: {
    "Todos": "All",
    "Inspiração": "Inspiration",
    "Portfólio": "Portfolio",
    "Branding": "Branding",
    "Identity": "Identity",
    "Key Visual": "Key Visual",
    "Social Media": "Social Media",
    "Website Design": "Website Design",
    "Campaign": "Campaign",
    "Packaging": "Packaging",
    "Menu Design": "Menu Design",
    "Editorial": "Editorial",
    "Art Direction": "Art Direction",
    "Creative Studio": "Creative Studio"
  },
  pt: {
    "Identity": "Identidade",
    "Campaign": "Campanha",
    "Website Design": "Sites",
    "Social Media": "Redes sociais",
    "Art Direction": "Direção de arte",
    "Creative Studio": "Estúdio criativo",
    "Menu Design": "Cardápios",
    "Packaging": "Embalagem"
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
    comments: "Comments",
    commentName: "Your name",
    commentText: "Add to the conversation",
    commentSubmit: "Send for review",
    commentPending: "Thanks. Your comment is waiting for approval.",
    commentEmpty: "No published comments yet.",
    like: "Like",
    share: "Share",
    save: "Save",
    credits: "Credits",
    copiedPrompt: "Card link",
    profileLabel: "Independent creative studio",
    profileTitle: "Brands, digital experiences and direction for ideas with something to say.",
    profileText: "Dolayout is an independent creative studio led by designer and art director João Buselli. The work brings brand strategy, visual identity, digital design and art direction together to build clear, distinctive systems — made to work across real touchpoints, not just look good in a presentation.",
    profileNote: "Good design gives ideas a clear form and brands a consistent way to show up. The goal is work with purpose, character and enough flexibility to live beyond a single screen.",
    startProject: "Start a project",
    contactLabel: "Contact",
    contactTitle: "Let's give the next idea a clear direction.",
    contactText: "Share the context, goals, timing and the kind of support you need. It doesn't have to be a perfect brief.",
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
    message: "Tell us a bit about the project",
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
    comments: "Comentários",
    commentName: "Seu nome",
    commentText: "Deixe seu comentário",
    commentSubmit: "Enviar para moderação",
    commentPending: "Obrigado. Seu comentário está aguardando aprovação.",
    commentEmpty: "Ainda não há comentários publicados.",
    like: "Curtir",
    share: "Compartilhar",
    save: "Salvar",
    credits: "Créditos",
    copiedPrompt: "Link do card",
    profileLabel: "Estúdio criativo independente",
    profileTitle: "Marcas, experiências digitais e direção para ideias que têm algo a dizer.",
    profileText: "A Dolayout é um estúdio criativo independente liderado pelo designer e diretor de arte João Buselli. O trabalho aproxima estratégia de marca, identidade visual, design digital e direção de arte para criar sistemas claros e com personalidade — pensados para funcionar nos pontos de contato reais, não só numa apresentação.",
    profileNote: "Um bom design dá forma às ideias e consistência à maneira como as marcas aparecem no mundo. O objetivo é criar com intenção, personalidade e flexibilidade para ir além de uma única tela.",
    startProject: "Começar um projeto",
    contactLabel: "Contato",
    contactTitle: "Vamos dar uma direção clara à próxima ideia.",
    contactText: "Conte o contexto, os objetivos, o prazo e o tipo de apoio que procura. Não precisa chegar com tudo resolvido.",
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
    message: "Conte um pouco sobre o projeto",
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
  document.fonts.ready.then(() => fitEditorialTitles(document));
}

async function loadRemoteContent() {
  try {
    const response = await fetch("/api/content", { headers: { Accept: "application/json" } });
    if (!response.ok) {
      window.dolayoutRemoteLoaded = true;
      route();
      return;
    }
    const content = await response.json();
    if (!Array.isArray(content)) throw new Error("Invalid content response.");
    window.dolayoutRemoteLoaded = true;
    const customCategories = content.flatMap((item) => item.categories || [item.category]).filter(Boolean);
    customCategories.forEach((category) => { if (!categories.includes(category)) categories.push(category); });
    renderCategories();
    if (!content.length) { route(); return; }
    cards = uniqueCardsByImage([...content.map(prepareRemoteCard), ...cards]);
    renderFeed();
    route();
  } catch {
    window.dolayoutRemoteLoaded = true;
    route();
  }
}

function prepareRemoteCard(card) {
  const text = (value) => escapeHtml(value || "");
  return {
    ...card,
    _remote: true,
    title: text(card.title),
    titlePt: text(card.titlePt),
    category: text(card.category),
    categories: (card.categories || []).map(text),
    type: text(card.type),
    description: text(card.description),
    descriptionPt: text(card.descriptionPt),
    tags: (card.tags || []).map(text),
    hashtags: (card.hashtags || []).map(text),
    statement: text(card.statement),
    statementPt: text(card.statementPt),
    image: safeAssetUrl(card.image),
    gallery: (card.gallery || []).map(safeAssetUrl).filter(Boolean),
    images: (card.images || []).map(safeAssetUrl).filter(Boolean),
    article: card.article ? { en: (card.article.en || []).map(text), pt: (card.article.pt || []).map(text) } : undefined,
    externalLinks: (card.externalLinks || []).map((link) => ({ label: text(link.label), url: safeExternalLink(link.url) })).filter((link) => link.label && link.url),
    palette: (card.palette || []).every((color) => /^#[\da-f]{3,8}$/i.test(color)) ? card.palette : ["#111111", "#4b4b4b"],
    height: Math.max(280, Math.min(1000, Number(card.height) || 520)),
    objectPosition: "center"
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
}

function safeAssetUrl(value) {
  const asset = String(value || "");
  if (/^(assets\/|\/assets\/|\/api\/media\?key=portfolio%2F|\/api\/media\?key=portfolio\/)/i.test(asset)) return escapeHtml(asset);
  try {
    const url = new URL(asset);
    return url.protocol === "https:" ? escapeHtml(url.href) : "";
  } catch { return ""; }
}

function safeExternalLink(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? escapeHtml(url.href) : "";
  } catch { return ""; }
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

function cardImageAlt(card) {
  return state.language === "pt" && card.imageAltPt ? card.imageAltPt : card.imageAlt || cardTitle(card);
}

function cardStatement(card) {
  return state.language === "pt" && card.statementPt ? card.statementPt : card.statement;
}

function articleBody(card) {
  return card.article?.[state.language] || card.article?.en || [];
}

function normalizedArticleCopy(value) {
  const text = String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
  return text.replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

function articleImageMarkup(image) {
  const alt = state.language === "pt" ? image.altPt || image.alt : image.alt;
  const caption = state.language === "pt" ? image.captionPt || image.caption : image.caption;
  return `<figure class="article-inline-figure"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(alt || "")}" loading="lazy" decoding="async"><figcaption>${escapeHtml(caption || "")}</figcaption></figure>`;
}

function articleBodyMarkup(card, paragraphs) {
  const description = normalizedArticleCopy(cardDescription(card));
  const firstParagraph = normalizedArticleCopy(paragraphs[0]);
  const omitDuplicateLead = Boolean(description && firstParagraph && description === firstParagraph);
  const imagesAfter = new Map((card.articleImages || []).map((image) => [image.afterParagraph, image]));

  return paragraphs.map((paragraph, index) => {
    const paragraphMarkup = omitDuplicateLead && index === 0 ? "" : `<p>${paragraph}</p>`;
    const image = imagesAfter.get(index + 1);
    return `${paragraphMarkup}${image ? articleImageMarkup(image) : ""}`;
  }).join("");
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
  const mobileLayoutQuery = window.matchMedia("(max-width: 760px)");
  mobileLayoutQuery.addEventListener("change", () => renderFeed());

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderFeed();
  });

  document.querySelectorAll("[data-focus-search]").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        document.body.classList.add("search-open");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      searchInput.focus();
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
  window.addEventListener("resize", () => fitEditorialTitles(document));
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      document.body.classList.remove("search-open");
      searchInput.blur();
    }
  });
}

function buildPortfolioPins(projects) {
  return projects.flatMap((project) => {
    if (project.hidden) return [];

    if (project.feedCarousel?.length) {
      const categories = project.categories || [project.category];
      return [{
        id: `${project.id}-pin-1`,
        title: project.title,
        titlePt: project.titlePt,
        category: categories[0] || project.category,
        categories,
        type: "case completo",
        description: project.description,
        descriptionPt: project.descriptionPt,
        tags: [...new Set([...(project.tags || []), "visual", "pin"])],
        hashtags: project.hashtags || [],
        downloadable: false,
        credit: project.credit,
        creditPt: project.creditPt,
        height: 500,
        tone: project.tone,
        palette: project.palette,
        image: project.feedCarousel[0],
        images: project.feedCarousel,
        gallery: project.gallery || [],
        feedCarousel: true,
        statement: project.title,
        statementColor: "#ffffff",
        source: project.source,
        externalLinks: project.externalLinks || [],
        parentId: project.id,
        openMode: "detail"
      }];
    }

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
    <button class="category-button ${category === state.category ? "is-active" : ""}" type="button" data-category="${escapeHtml(category)}">
      ${escapeHtml(categoryLabel(category))}
    </button>
  `).join("");

  categoryRail.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      if (!homeView.classList.contains("is-visible")) window.location.hash = "/";
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
      || (state.category === "Portfólio" && Boolean(card.parentId))
      || (state.category === "Branding" && card.tags.includes("branding"))
      || (state.category === "Website Design" && card.tags.includes("website"));

    const haystack = [card.title, card.category, card.type, card.description, ...(card.categories || []), ...(card.tags || []), ...(card.hashtags || [])].join(" ").toLowerCase();
    const queryMatch = !state.query || haystack.includes(state.query);
    return categoryMatch && queryMatch && card.id !== excludeId;
  });
}

function renderFeed(items = filteredCards()) {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  if (isMobile) {
    const order = new Map(mobileFeedOrder.map((id, index) => [id, index]));
    items = [...items].sort((a, b) => order.get(a.id) - order.get(b.id));
  } else {
    const eligibleFeatures = items.filter((card) => card.feedCarousel);
    if (!eligibleFeatures.some((card) => card.id === desktopFeaturedId)) {
      desktopFeaturedId = shuffled(eligibleFeatures)[0]?.id || null;
    }
    const featureIndex = items.findIndex((card) => card.id === desktopFeaturedId);
    if (featureIndex > 0) items = [items[featureIndex], ...items.slice(0, featureIndex), ...items.slice(featureIndex + 1)];
  }

  resultCount.textContent = `${items.length} ${t("cards")}`;

  if (!items.length) {
    feed.innerHTML = `<div class="empty-state">${t("empty")}</div>`;
    return;
  }

  feed.innerHTML = items.map(cardTemplate).join("");
  if (!isMobile && desktopFeaturedId) {
    [...feed.querySelectorAll(".portfolio-feed-card")]
      .find((card) => card.dataset.id === desktopFeaturedId)
      ?.classList.add("desktop-featured-card");
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    feed.animate([{ opacity: 0.72 }, { opacity: 1 }], {
      duration: 360,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    });
  }
  if (window.matchMedia("(max-width: 760px)").matches && items.length > 2 && items.length % 2 === 0) {
    feed.lastElementChild.classList.add("mobile-final-feature");
  }
  feed.querySelectorAll(".pin-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".portfolio-feed-control")) return;
      if (card.dataset.swiped === "true") {
        delete card.dataset.swiped;
        event.preventDefault();
        return;
      }
      if (event.target.closest(".more-button")) return;
      const item = cards.find((entry) => entry.id === card.dataset.id);
      if (!item) return;
      document.body.classList.remove("search-open");
      searchInput.blur();
      if (shouldOpenDetail(item)) {
        window.location.hash = `/card/${item.id}`;
      } else {
        openLightbox(item);
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card || !["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      card.click();
    });

    if (card.dataset.feedCarousel === "true") bindFeedCarousel(card);
  });
  fitEditorialTitles(feed);
}

function carouselTrackMarkup(slides, activeIndex, panelClass, renderMedia) {
  return [-1, 0, 1].map((offset) => {
    const slide = slides[(activeIndex + offset + slides.length) % slides.length];
    return `<span class="swipe-panel ${panelClass}">${renderMedia(slide, offset === 0)}</span>`;
  }).join("");
}

function createSwipeCarousel(stage, slides, panelClass, renderMedia, onChange, onSwipe) {
  const track = stage.querySelector(".swipe-track");
  let activeIndex = 0;
  let start = null;
  let dragging = false;
  let animating = false;

  const paint = () => {
    track.querySelectorAll("video[data-feed-autoplay]").forEach((video) => feedVideoObserver?.unobserve(video));
    track.innerHTML = carouselTrackMarkup(slides, activeIndex, panelClass, renderMedia);
    track.querySelectorAll("video[data-feed-autoplay]").forEach(observeFeedVideo);
    track.style.transition = "none";
    track.style.transform = "translate3d(-33.333333%, 0, 0)";
    onChange?.(activeIndex);
  };

  const settle = (direction) => {
    if (animating) return;
    if (!direction || slides.length < 2) {
      track.style.transition = "transform 280ms ease";
      track.style.transform = "translate3d(-33.333333%, 0, 0)";
      return;
    }

    animating = true;
    let finished = false;
    const finish = (event) => {
      if (event && event.target !== track) return;
      if (finished) return;
      finished = true;
      track.removeEventListener("transitionend", finish);
      activeIndex = (activeIndex + direction + slides.length) % slides.length;
      animating = false;
      paint();
    };
    track.addEventListener("transitionend", finish);
    requestAnimationFrame(() => {
      track.style.transition = "transform 320ms cubic-bezier(.22,.68,0,1)";
      track.style.transform = direction > 0 ? "translate3d(-66.666667%, 0, 0)" : "translate3d(0, 0, 0)";
    });
    window.setTimeout(finish, 380);
  };

  stage.addEventListener("pointerdown", (event) => {
    if (animating || event.button !== 0 || event.target.closest("[data-carousel-step]")) return;
    start = { x: event.clientX, y: event.clientY };
    dragging = false;
    stage.setPointerCapture?.(event.pointerId);
  });
  stage.addEventListener("pointermove", (event) => {
    if (!start || animating || slides.length < 2) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!dragging && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      start = null;
      return;
    }
    if (Math.abs(dx) < 5) return;
    dragging = true;
    const offset = Math.max(-stage.clientWidth, Math.min(stage.clientWidth, dx));
    track.style.transition = "none";
    track.style.transform = `translate3d(calc(-33.333333% + ${offset}px), 0, 0)`;
  });
  stage.addEventListener("pointerup", (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    start = null;
    if (dragging && Math.abs(dx) >= Math.min(64, stage.clientWidth * 0.18)) {
      onSwipe?.();
      settle(dx < 0 ? 1 : -1);
    } else {
      settle(0);
    }
    dragging = false;
  });
  stage.addEventListener("pointercancel", () => {
    start = null;
    dragging = false;
    settle(0);
  });

  paint();
  return {
    go: settle,
    select(index) {
      if (index === activeIndex) return;
      if (index === (activeIndex + 1) % slides.length) settle(1);
      else if (index === (activeIndex - 1 + slides.length) % slides.length) settle(-1);
      else if (!animating) {
        activeIndex = index;
        paint();
      }
    }
  };
}

function bindFeedCarousel(card) {
  const slides = JSON.parse(card.dataset.slides);
  const stage = card.querySelector(".portfolio-feed-stage");
  const dots = card.querySelectorAll(".portfolio-feed-dot");
  const title = cardTitle(cards.find((item) => item.id === card.dataset.id));
  const controller = createSwipeCarousel(
    stage,
    slides,
    "portfolio-feed-media",
    (asset, active) => feedCarouselMedia(asset, title, active),
    (index) => {
      card.querySelector(".portfolio-feed-current").textContent = String(index + 1).padStart(2, "0");
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
    },
    () => {
      card.dataset.swiped = "true";
      window.setTimeout(() => { delete card.dataset.swiped; }, 700);
    }
  );
  card.querySelectorAll("[data-carousel-step]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.stopPropagation();
      controller.go(Number(control.dataset.carouselStep));
    });
  });
}

function shouldOpenDetail(card) {
  if (card.openMode === "lightbox") return false;
  const haystack = [card.type, card.category, ...(card.categories || []), ...(card.tags || [])].join(" ").toLowerCase();
  return /article|matéria|case completo|branding|identity|website|website design|complete case/.test(haystack);
}

function cardTemplate(card) {
  if (card.article) return editorialCardTemplate(card);
  if (card.feedCarousel) return feedCarouselCardTemplate(card);
  if (card.layout) return artDirectedCardTemplate(card);

  const cardLabel = card.type === "article" ? "" : `<span class="label">${categoryLabel(card.category)}</span>`;
  const media = card.image ? `<img class="card-media" src="${card.image}" alt="${cardTitle(card)}" loading="lazy">` : "";
  const mediaClass = card.image ? "media-visual" : "";
  const showText = !card.image || card.category === "Nota do Dia" || (card.type !== "article" && card.showFeedTitle);

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

function editorialCardTemplate(card) {
  if ((card._remote || card.imageHero) && card.image) {
    const editorialIndex = Math.abs([...card.id].reduce((total, char) => total + char.charCodeAt(0), 0)) % 10;
    return `
      <button class="pin-card editorial-photo-card editorial-style-${editorialIndex}" type="button" data-id="${escapeHtml(card.id)}">
        <img src="${card.image}" alt="${escapeHtml(cardImageAlt(card))}" loading="lazy" decoding="async">
        <span class="editorial-photo-shade"></span>
        <span class="editorial-photo-label">${categoryLabel(card.category)}</span>
        <strong>${cardTitle(card)}</strong>
      </button>
    `;
  }
  const index = Math.max(0, editorialArticles.findIndex((article) => article.id === card.id));
  return `
    <button class="pin-card editorial-pin editorial-style-${index}" type="button" data-id="${card.id}">
      ${editorialArtworkTemplate(card, index, "strong")}
    </button>
  `;
}

function editorialArtworkTemplate(card, index, headingTag) {
  const title = cardTitle(card);
  const longWord = title.split(/\s+/).some((word) => word.length > 11);
  return `
    <span class="editorial-surface">
      <span class="editorial-eyebrow">Dolayout / ${categoryLabel(card.category)}</span>
      <${headingTag} class="editorial-title ${longWord ? "is-long" : ""}">${title}</${headingTag}>
      <span class="editorial-index">D / ${String(index + 1).padStart(2, "0")}</span>
    </span>
  `;
}

function fitEditorialTitles(root) {
  requestAnimationFrame(() => {
    root.querySelectorAll(".editorial-title").forEach((title) => {
      title.style.fontSize = "";
      let size = parseFloat(getComputedStyle(title).fontSize);
      const footer = title.nextElementSibling;
      while (size > 12 && (
        title.scrollWidth > title.clientWidth + 1
        || title.getBoundingClientRect().bottom > footer.getBoundingClientRect().top - 3
      )) {
        size -= 1;
        title.style.fontSize = `${size}px`;
      }
    });
  });
}

function feedCarouselMedia(src, alt, active = true) {
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(src)) {
    return `<video class="portfolio-feed-video" src="${src}" poster="${videoPosterUrl(src)}" ${active ? 'data-feed-autoplay="true"' : ""} muted playsinline loop preload="metadata" aria-label="${alt}"></video>`;
  }
  return `<img class="portfolio-feed-image" src="${src}" alt="${alt}" loading="lazy" draggable="false">`;
}

function feedCarouselCardTemplate(card) {
  const slides = card.images || [card.image];
  return `
    <div class="pin-card portfolio-feed-card" role="button" tabindex="0" data-id="${card.id}" data-tone="${card.tone}" data-feed-carousel="true" data-slides='${JSON.stringify(slides)}' style="--c1:${card.palette[0]}; --c2:${card.palette[1]};">
      <div class="portfolio-feed-stage">
        <div class="swipe-track portfolio-feed-track">${carouselTrackMarkup(slides, 0, "portfolio-feed-media", (asset, active) => feedCarouselMedia(asset, cardTitle(card), active))}</div>
        <span class="portfolio-feed-count"><b class="portfolio-feed-current">01</b> <i>/ ${String(slides.length).padStart(2, "0")}</i></span>
        <span class="portfolio-feed-dots" aria-hidden="true">${slides.map((_, index) => `<i class="portfolio-feed-dot ${index === 0 ? "is-active" : ""}"></i>`).join("")}</span>
        <button class="portfolio-feed-control is-previous" type="button" data-carousel-step="-1" aria-label="Previous slide"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
        <button class="portfolio-feed-control is-next" type="button" data-carousel-step="1" aria-label="Next slide"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
      <span class="label">${categoryLabel(card.category)}</span>
    </div>
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
      <span class="label art-pin-label">${card.kicker || card.category}</span>
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
    if (!window.dolayoutRemoteLoaded) return;
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
  const projectHashtags = [...new Set([...(card.source === "LAF" ? ["LAF"] : []), ...(card.hashtags || [])])].slice(0, 8);

  detailView.innerHTML = `
    <div class="detail-shell">
      <div class="project-detail-layout">
        <header class="project-intro">
          <span class="label">${categoryLabel(card.category)}</span>
          <h1>${cardTitle(card)}</h1>
          <p>${cardDescription(card)}</p>
          ${projectHashtags.length ? `<div class="project-hashtags" aria-label="${state.language === "pt" ? "Tags do projeto" : "Project tags"}">${projectHashtags.map((tag) => `<span>#${tag.replace(/^#/, "")}</span>`).join("")}</div>` : ""}
          ${card.externalLinks?.length ? `<div class="external-links">${card.externalLinks.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}</div>` : ""}
        </header>
        <div class="project-carousel" data-project-carousel aria-label="${state.language === "pt" ? "Galeria do projeto" : "Project gallery"}">
          ${projectCarouselMarkup(card)}
        </div>
      </div>
      <div class="project-image-stack">${projectMediaStack(card)}</div>

      ${commentsSectionMarkup(card)}

      <h2 class="related-title">${t("related")}</h2>
      <div class="masonry related-masonry">
        ${related.map(cardTemplate).join("")}
      </div>
      <div class="detail-actions-bottom">
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
  bindProjectCarousel(detailView.querySelector("[data-project-carousel]"));
  bindDetailComments(card);
  detailView.querySelectorAll(".pin-card").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.closest(".portfolio-feed-control")) return;
      if (item.dataset.swiped === "true") {
        delete item.dataset.swiped;
        return;
      }
      window.location.hash = `/card/${item.dataset.id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    if (item.dataset.feedCarousel === "true") bindFeedCarousel(item);
  });
  observeProjectFrames();
  fitEditorialTitles(detailView);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderArticleDetail(card) {
  homeView.classList.remove("is-visible");
  detailView.classList.add("is-visible");

  const related = cards
    .filter((item) => item.id !== card.id && item.category === "Inspiração")
    .slice(0, 6);
  const paragraphs = articleBody(card);
  const editorialIndex = Math.max(0, editorialArticles.findIndex((article) => article.id === card.id));

  detailView.innerHTML = `
    <article class="article-shell">
      <figure class="article-hero ${(card._remote || card.imageHero) && card.image ? "article-image-hero" : `editorial-pin editorial-style-${editorialIndex}`} ">
        ${(card._remote || card.imageHero) && card.image
          ? `<img src="${card.image}" alt="${escapeHtml(cardImageAlt(card))}" loading="eager" decoding="async">${card.imageCredit ? `<figcaption>${state.language === "pt" ? card.imageCreditPt || card.imageCredit : card.imageCredit}</figcaption>` : ""}`
          : editorialArtworkTemplate(card, editorialIndex, "h1")}
      </figure>

      <header class="article-header ${card.imageHero ? "has-image-title" : ""}">${card.imageHero ? `<span class="article-category">${categoryLabel(card.category)}</span><h1>${cardTitle(card)}</h1>` : ""}<p>${cardDescription(card)}</p></header>

      <div class="article-body">
        ${articleBodyMarkup(card, paragraphs)}
        ${card.sources?.length ? `<aside class="article-sources"><h2>${state.language === "pt" ? "Fontes" : "Sources"}</h2><ul>${card.sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join("")}</ul></aside>` : ""}
      </div>

      ${commentsSectionMarkup(card)}

      <h2 class="related-title">${t("related")}</h2>
      <div class="masonry related-masonry">
        ${related.map(cardTemplate).join("")}
      </div>
      <div class="detail-actions-bottom">
        <button class="back-button" type="button" data-back><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>${t("back")}</button>
        <div class="detail-action-row">
          ${actionButton("like", t("like"), "M20.8 4.6a5.4 5.4 0 0 0-7.7 0L12 5.7l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.7Z", state.liked.has(card.id))}
          ${actionButton("share", t("share"), "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14", false)}
          ${actionButton("save", t("save"), "M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10v16Z", state.saved.has(card.id))}
        </div>
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
  bindDetailComments(card);
  detailView.querySelectorAll(".pin-card").forEach((item) => {
    item.addEventListener("click", () => {
      window.location.hash = `/card/${item.dataset.id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  fitEditorialTitles(detailView);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function commentsSectionMarkup(card) {
  return `
    <section class="comments-panel" data-comments-panel data-item-id="${escapeHtml(card.id)}" aria-labelledby="commentsTitle">
      <div class="comments-heading"><div><span class="comments-kicker">${state.language === "pt" ? "CONVERSA" : "THE CONVERSATION"}</span><h2 id="commentsTitle">${t("comments")}</h2></div><span class="comments-count" data-comments-count></span></div>
      <div class="comments-list" data-comments-list><p class="comments-empty">${state.language === "pt" ? "Carregando comentários…" : "Loading comments…"}</p></div>
      <form class="comment-form" data-comment-form>
        <label>${t("commentName")}<input name="author" maxlength="80" autocomplete="name" required></label>
        <label>${t("commentText")}<textarea name="body" rows="3" maxlength="1500" required></textarea></label>
        <label class="comment-honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <div class="comment-submit-row"><button class="comment-submit" type="submit">${t("commentSubmit")}</button><p class="comment-status" data-comment-status role="status"></p></div>
      </form>
    </section>
  `;
}

async function bindDetailComments(card) {
  const panel = detailView.querySelector("[data-comments-panel]");
  if (!panel) return;
  const list = panel.querySelector("[data-comments-list]");
  const count = panel.querySelector("[data-comments-count]");
  const form = panel.querySelector("[data-comment-form]");
  const status = panel.querySelector("[data-comment-status]");
  const renderComments = (comments) => {
    count.textContent = comments.length ? String(comments.length).padStart(2, "0") : "";
    list.replaceChildren();
    if (!comments.length) {
      const empty = document.createElement("p");
      empty.className = "comments-empty";
      empty.textContent = t("commentEmpty");
      list.append(empty);
      return;
    }
    comments.forEach((comment) => {
      const item = document.createElement("article");
      item.className = "comment-item";
      const head = document.createElement("div");
      head.className = "comment-item-head";
      const author = document.createElement("strong");
      author.textContent = comment.author;
      const date = document.createElement("time");
      date.dateTime = comment.createdAt;
      date.textContent = new Intl.DateTimeFormat(state.language === "pt" ? "pt-BR" : "en", { dateStyle: "medium" }).format(new Date(comment.createdAt));
      const body = document.createElement("p");
      body.textContent = comment.body;
      head.append(author, date);
      item.append(head, body);
      list.append(item);
    });
  };

  try {
    const response = await fetch(`/api/comments?itemId=${encodeURIComponent(card.id)}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Comments are temporarily unavailable.");
    renderComments(await response.json());
  } catch {
    list.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "comments-empty";
    empty.textContent = state.language === "pt" ? "Comentários estarão disponíveis em breve." : "Comments will be available soon.";
    list.append(empty);
    form.hidden = true;
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    const data = new FormData(form);
    submit.disabled = true;
    status.textContent = state.language === "pt" ? "Enviando…" : "Sending…";
    status.classList.remove("is-error");
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ itemId: card.id, author: data.get("author"), body: data.get("body"), website: data.get("website") })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your comment.");
      form.reset();
      status.textContent = result.message || t("commentPending");
    } catch (error) {
      status.textContent = error.message;
      status.classList.add("is-error");
    } finally { submit.disabled = false; }
  }, { once: true });
}

function projectMediaStack(card) {
  const assets = card.gallery?.length ? card.gallery : card.image ? [card.image] : [];
  const autoplay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "" : "autoplay";
  return assets.map((asset, index) => `
    <figure class="project-frame">
      ${isVideoAsset(asset)
        ? `<video src="${asset}" poster="${videoPosterUrl(asset)}" ${autoplay} muted playsinline loop controls preload="metadata" aria-label="${cardTitle(card)} ${index + 1}"></video>`
        : `<img src="${asset}" alt="${cardTitle(card)} ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">`}
    </figure>
  `).join("");
}

function projectCarouselMarkup(card) {
  const assets = card.gallery?.length ? card.gallery : card.image ? [card.image] : [];
  if (!assets.length) return "";
  return `
    <div class="project-carousel-stage" data-carousel-stage>
      <div class="project-carousel-track" data-carousel-track>
        ${assets.map((asset, index) => `
          <figure class="project-carousel-slide${index === 0 ? " is-active" : ""}" data-carousel-slide aria-hidden="${index !== 0}">
            ${isVideoAsset(asset)
              ? `<video src="${asset}" poster="${videoPosterUrl(asset)}" muted playsinline loop controls preload="metadata" aria-label="${cardTitle(card)} ${index + 1}"></video>`
              : `<img src="${asset}" alt="${cardTitle(card)} ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">`}
          </figure>
        `).join("")}
      </div>
      ${assets.length > 1 ? `
        <button class="project-carousel-arrow is-previous" type="button" data-carousel-prev aria-label="${state.language === "pt" ? "Imagem anterior" : "Previous image"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
        <button class="project-carousel-arrow is-next" type="button" data-carousel-next aria-label="${state.language === "pt" ? "Próxima imagem" : "Next image"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
      ` : ""}
    </div>
    ${assets.length > 1 ? `
      <div class="project-carousel-footer">
        <div class="project-carousel-thumbnails" aria-label="${state.language === "pt" ? "Miniaturas da galeria" : "Gallery thumbnails"}">
          ${assets.map((asset, index) => `
            <button class="project-carousel-thumb${index === 0 ? " is-active" : ""}" type="button" data-carousel-thumb="${index}" aria-label="${state.language === "pt" ? `Mostrar imagem ${index + 1}` : `Show image ${index + 1}`}" aria-current="${index === 0 ? "true" : "false"}">
              ${isVideoAsset(asset) ? `<span class="project-carousel-video-thumb" aria-hidden="true">▶</span>` : `<img src="${asset}" alt="" loading="${index < 4 ? "eager" : "lazy"}" decoding="async">`}
            </button>
          `).join("")}
        </div>
        <span class="project-carousel-count" data-carousel-count>01 <i>/ ${String(assets.length).padStart(2, "0")}</i></span>
      </div>
    ` : ""}
  `;
}

function bindProjectCarousel(carousel) {
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
  if (slides.length < 2) return;
  const thumbnails = [...carousel.querySelectorAll("[data-carousel-thumb]")];
  const count = carousel.querySelector("[data-carousel-count]");
  let active = 0;
  let startX = null;
  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.setAttribute("aria-hidden", String(i !== active));
      const video = slide.querySelector("video");
      if (video) {
        if (i === active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
        else video.pause();
      }
    });
    thumbnails.forEach((thumbnail, i) => {
      thumbnail.classList.toggle("is-active", i === active);
      thumbnail.setAttribute("aria-current", String(i === active));
    });
    const thumbnailStrip = carousel.querySelector(".project-carousel-thumbnails");
    if (thumbnailStrip && thumbnails[active]) {
      const stripBounds = thumbnailStrip.getBoundingClientRect();
      const thumbBounds = thumbnails[active].getBoundingClientRect();
      const scrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      if (thumbBounds.left < stripBounds.left) thumbnailStrip.scrollBy({ left: thumbBounds.left - stripBounds.left, behavior: scrollBehavior });
      else if (thumbBounds.right > stripBounds.right) thumbnailStrip.scrollBy({ left: thumbBounds.right - stripBounds.right, behavior: scrollBehavior });
    }
    if (count) count.innerHTML = `${String(active + 1).padStart(2, "0")} <i>/ ${String(slides.length).padStart(2, "0")}</i>`;
  };
  carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(active - 1));
  carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(active + 1));
  thumbnails.forEach((thumbnail) => thumbnail.addEventListener("click", () => show(Number(thumbnail.dataset.carouselThumb))));
  const stage = carousel.querySelector("[data-carousel-stage]");
  stage?.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  stage?.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1));
    startX = null;
  });
  stage?.addEventListener("pointercancel", () => { startX = null; });
  show(0);
}

let projectFrameObserver;
let projectVideoObserver;
let feedVideoObserver;

function observeFeedVideo(video) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.IntersectionObserver) {
    video.play().catch(() => {});
    return;
  }
  feedVideoObserver ||= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.isConnected) entry.target.play().catch(() => {});
      else entry.target.pause();
    });
  }, { threshold: 0.35 });
  feedVideoObserver.observe(video);
}

function observeProjectFrames() {
  projectFrameObserver?.disconnect();
  projectVideoObserver?.disconnect();
  const frames = [...detailView.querySelectorAll(".project-frame")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = [...detailView.querySelectorAll(".project-frame video")];
  if (reducedMotion) videos.forEach((video) => video.pause());
  if (videos.length && window.IntersectionObserver && !reducedMotion) {
    projectVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    }, { threshold: 0.25 });
    videos.forEach((video) => projectVideoObserver.observe(video));
  }
  if (!frames.length || !window.IntersectionObserver || reducedMotion) return;
  detailView.querySelector(".detail-shell").classList.add("has-frame-reveal");
  projectFrameObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -32px 0px", threshold: 0.04 });
  frames.forEach((frame) => projectFrameObserver.observe(frame));
}

function isVideoAsset(asset) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(asset || "");
}

function videoPosterUrl(asset) {
  return String(asset || "").replace(/\.(mp4|webm|ogg)(\?|$)/i, ".poster.webp$2");
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
  meta.textContent = `${card.category}${card.source === "LAF" ? " / #LAF" : ""}`;
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
loadRemoteContent();
