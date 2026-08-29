import { CoursePageContent } from "../types/cms"

const contactLink = "/capacitaciones#contacto"

export const coursesData: CoursePageContent[] = [
  {
    id: "course-academia-comercial",
    slug: "academia-desarrollo-comercial",
    title: "Academia de Desarrollo Comercial",
    blocks: [
      {
        type: "hero",
        title:
          "¿Sabés qué tienen en común un vendedor, un emprendedor y alguien que está buscando trabajo?",
        paragraphs: [
          "Los tres necesitan saber vender. Y no necesariamente un producto.",
          "El vendedor vende una solución. El emprendedor vende una idea. El profesional vende su experiencia. Y quien busca trabajo necesita comunicar por qué deberían elegirlo.",
        ],
        highlight:
          "Porque muchas oportunidades no se pierden por falta de experiencia, sino porque a veces no sabemos comunicar lo que podemos aportar.",
        imageUrl: "/ethos/formacion-4.jpg",
      },
      {
        type: "twoColumn",
        background: "low",
        left: {
          eyebrow: "El mito",
          title: "No necesitás “tener cara de vendedor”.",
          body: "Vender no significa presionar ni manipular. Vender es entender necesidades, comunicar valor, generar confianza y ayudar a tomar decisiones. Esas habilidades sirven mucho más allá de un trabajo en ventas.",
        },
        right: {
          eyebrow: "La realidad",
          title: "Las habilidades comerciales no se quedan en el área de ventas.",
          body: "Te sirven para una entrevista, negociar un sueldo, presentar una propuesta, conseguir un cliente, defender una idea, emprender o liderar. Aprender a vender también es aprender a generar oportunidades.",
        },
      },
      {
        type: "splitMedia",
        title: "Pensá en tu próxima oportunidad.",
        body: "Dos personas tienen una experiencia similar y cumplen los requisitos. Pero una sabe explicar lo que puede aportar, genera confianza y comunica su valor con seguridad. ¿A cuál elegirías? Eso también es vender — y se puede entrenar.",
        imageUrl: "/ethos/formacion-4.jpg",
        imagePosition: "left",
      },
      {
        type: "iconGrid",
        title: "No es un talento con el que se nace. Es una habilidad que se entrena.",
        background: "container",
        items: [
          {
            iconName: "Briefcase",
            title: "Buscás trabajo",
            description: "Y querés llegar mejor preparado a entrevistas y procesos de selección.",
            tone: "secondary",
          },
          {
            iconName: "RefreshCw",
            title: "Querés cambiar de rubro",
            description: "Y buscás sumar nuevas competencias a tu perfil.",
            tone: "secondary",
          },
          {
            iconName: "TrendingUp",
            title: "Ya trabajás en ventas",
            description: "Y querés profesionalizar tus habilidades.",
            tone: "primary",
          },
          {
            iconName: "Rocket",
            title: "Tenés un emprendimiento",
            description: "Y querés comunicar mejor tu propuesta y generar más oportunidades.",
            tone: "primary",
          },
        ],
      },
      {
        type: "darkBand",
        title: "Y hoy hay una herramienta que cambió las reglas del juego: la inteligencia artificial.",
        body: "Hoy podés usarla para preparar una entrevista, practicar una conversación comercial, simular un cliente, analizar objeciones o mejorar tu comunicación. La pregunta ya no es si vas a utilizar IA… es si vas a aprender a utilizarla antes o después que los demás.",
        imageUrl: "/ethos/bg-network.png",
      },
      {
        type: "richText",
        title: "Saber qué hacer no significa necesariamente saber hacerlo.",
        body: "No es un curso para mirar y tomar apuntes. Es un entrenamiento: vas a practicar, simular situaciones, resolver casos, recibir feedback y volver a intentarlo hasta convertir conceptos en habilidades.",
        background: "surface",
      },
      {
        type: "tags",
        title: "Y tu perfil profesional también se entrena.",
        body: "Conseguir oportunidades no depende solamente de lo que sabés hacer. También importa cómo lo comunicás. Por eso vas a trabajar:",
        tags: ["CV", "LinkedIn", "Entrevistas", "Posicionamiento profesional"],
        asideTitle: "Mentoría dedicada",
        asideBody:
          "Incluye mentoría individual online con profesional de RR.HH. para potenciar tu perfil específico.",
      },
      {
        type: "instructors",
        title: "Una formación con dos miradas complementarias.",
        people: [
          {
            name: "Mauricio Ramos",
            role: "Desarrollo Comercial",
            bio: "Formador especializado en desarrollo comercial, con experiencia en ventas y capacitación de equipos. Ha capacitado a más de 2.000 personas con un enfoque práctico orientado a resultados.",
            imageUrl: "/ethos/mauricio.jpg",
          },
          {
            name: "Betsabé Sánchez",
            role: "Empleabilidad y perfil profesional",
            bio: "Profesional de RR.HH. con experiencia en reclutamiento y selección de alto volumen. Aporta una mirada estratégica sobre lo que las empresas buscan y cómo comunicar el valor profesional.",
            imageUrl: "/ethos/founder-betsabe.png",
          },
        ],
      },
      {
        type: "scheduleCta",
        title: "Cuatro encuentros. Una habilidad que puede llevarte mucho más lejos.",
        body: "No podemos prometerte un trabajo. Pero sí podemos ayudarte a estar mejor preparado para cuando aparezca una oportunidad.",
        metaTitle: "Academia de Desarrollo Comercial",
        metaBody: "Entrenamiento práctico en habilidades comerciales, empleabilidad e IA.",
        chips: ["Presencial / Online", "Certificado", "Mentoría", "Red de oportunidades"],
        buttons: [
          { text: "Quiero inscribirme", link: contactLink, variant: "primary" },
          { text: "Quiero más información", link: contactLink, variant: "outline" },
        ],
      },
    ],
  },
  {
    id: "course-cm-nivel-1",
    slug: "community-manager-nivel-1",
    title: "Community Manager Operativo · Nivel I",
    blocks: [
      {
        type: "hero",
        title: "Convertite en el Community Manager que las empresas necesitan en 2026.",
        paragraphs: [
          "Aprendé a gestionar redes sociales de manera profesional, integrando estrategia, creatividad e Inteligencia Artificial para multiplicar tus resultados.",
        ],
        imageUrl: "/ethos/formacion-1.jpg",
        buttons: [
          { text: "Quiero convertirme en CM", link: contactLink, variant: "primary" },
        ],
      },
      {
        type: "richText",
        eyebrow: "El contexto",
        title: "Una nueva profesión digital está creciendo.",
        body: "Cada vez más negocios necesitan mejorar su presencia online. Ya no buscan solamente personas que publiquen contenido o respondan mensajes: necesitan profesionales capaces de comprender una marca, conocer a su audiencia, desarrollar estrategias, crear contenido, analizar resultados y usar nuevas herramientas con criterio.",
        background: "low",
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "Evolución",
          title: "El rol del Community Manager evolucionó.",
          body: "Hoy las empresas buscan profesionales que piensen, resuelvan problemas y generen resultados. La IA transforma la creación de contenidos, pero por sí sola no reemplaza el criterio profesional.",
        },
        right: {
          eyebrow: "La ventaja",
          title: "La verdadera ventaja está en saber combinar.",
          body: "Estrategia + creatividad + herramientas + IA. Las empresas no necesitan solo operadores de herramientas: necesitan profesionales que las usen para pensar y generar impacto.",
        },
      },
      {
        type: "iconGrid",
        title: "Los 5 pasos para convertirte en Community Manager profesional",
        description:
          "Una metodología estructurada para llevarte de cero a estratega digital. Durante 5 semanas vas a recorrer el camino real del trabajo: desde entender la profesión hasta crear contenido, medir resultados, usar IA y ofrecer servicios.",
        background: "container",
        items: [
          {
            iconName: "Lightbulb",
            title: "Pensá como un CM",
            description:
              "Conocé el rol en empresas y como freelancer, analizá identidad de marca y audiencias.",
          },
          {
            iconName: "PenLine",
            title: "Creá contenido estratégico",
            description:
              "Ideas, copys, diseños sin ser diseñador, reels, historias, carruseles y planificación.",
          },
          {
            iconName: "BarChart3",
            title: "Medí y demostrá valor",
            description:
              "Métricas, reportes profesionales, gestión de comentarios y situaciones difíciles.",
          },
          {
            iconName: "Sparkles",
            title: "Potenciá con IA",
            description:
              "Acelerá procesos, generá mejores ideas y optimizá tu trabajo diario con herramientas clave.",
          },
          {
            iconName: "Briefcase",
            title: "Convertí en oportunidad",
            description:
              "Servicios, presupuestos, portfolio y primeros pasos para conseguir clientes.",
          },
          {
            iconName: "Bot",
            title: "QuantumTraffic",
            description:
              "Acceso a una herramienta propia de IA para búsqueda de contenido y diseño de publicaciones.",
            tone: "primary",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No creamos cursos. Formamos profesionales.",
        body: "En Anthrovia HR creemos que aprender una nueva habilidad tiene valor cuando puede convertirse en una oportunidad real. Combinamos conocimiento actualizado, herramientas prácticas y mirada profesional para que puedas aplicar, mostrar y usar lo aprendido en el mercado laboral.",
      },
      {
        type: "iconGrid",
        title: "Todo lo que necesitás para comenzar",
        background: "low",
        items: [
          {
            iconName: "FolderKanban",
            title: "Kit profesional",
            description: "Plantillas para organizar trabajo, planificar contenido y presentar servicios.",
          },
          {
            iconName: "MessageSquare",
            title: "Biblioteca de prompts",
            description: "Prompts para estrategias, ideas, copys y contenidos con IA.",
          },
          {
            iconName: "Users",
            title: "Guía de primeros clientes",
            description: "Recursos para contactar negocios y generar oportunidades.",
          },
          {
            iconName: "Zap",
            title: "QuantumTraffic Premium",
            description: "Membresía por dos meses a la plataforma para generar contenido de tu nicho.",
            tone: "primary",
          },
        ],
      },
      {
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Necesito experiencia previa?",
            answer:
              "No. El programa está diseñado para llevarte desde cero hasta un nivel profesional, paso a paso.",
          },
          {
            question: "¿Necesito ser diseñador?",
            answer:
              "No. Vas a aprender herramientas y metodologías para crear contenido profesional sin necesidad de ser diseñador.",
          },
          {
            question: "¿Necesito saber de IA?",
            answer:
              "No. Vas a aprender desde las bases cómo utilizarla aplicada al trabajo del Community Manager.",
          },
          {
            question: "¿Hay certificado?",
            answer:
              "Sí, al finalizar y aprobar el proyecto final recibirás un certificado de finalización.",
          },
        ],
      },
      {
        type: "scheduleCta",
        title: "Tu próxima oportunidad profesional puede empezar con una nueva habilidad.",
        body: "El mercado digital sigue creciendo. Las marcas necesitan profesionales preparados. No necesitás saberlo todo para comenzar: necesitás una formación que te guíe.",
        metaTitle: "Community Manager Operativo · Nivel I",
        metaBody: "5 semanas · Estrategia, contenido, métricas e IA.",
        chips: ["Online", "Proyecto final", "Bonos incluidos"],
        buttons: [
          { text: "Quiero inscribirme ahora", link: contactLink, variant: "primary" },
          { text: "Agendar llamada", link: contactLink, variant: "outline" },
        ],
      },
    ],
  },
  {
    id: "course-cm-pro",
    slug: "community-manager-pro",
    title: "Community Manager PRO",
    blocks: [
      {
        type: "hero",
        title: "Dejá de ser quien publica. Convertite en quien diseña la estrategia.",
        paragraphs: [
          "Formación avanzada en Community Management, Inteligencia Artificial y Marketing Digital. Elevá tu perfil profesional al siguiente nivel.",
        ],
        imageUrl: "/ethos/formacion-2.jpg",
        buttons: [
          { text: "Quiero conocer el programa", link: contactLink, variant: "primary" },
        ],
      },
      {
        type: "richText",
        title: "El CM que solo “publica” tiene un problema.",
        body: "Hoy, competir con herramientas que generan decenas de posteos en segundos es una batalla perdida si tu único valor es subir contenido. El mercado ya no busca operadores técnicos: busca profesionales capaces de pensar estratégicamente — negocio, datos y tecnología como amplificador del criterio.",
        background: "low",
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "Evolución",
          title: "¿Qué pasa cuando dejás de ser “el que maneja las redes”?",
          body: "Evolucionás de tomador de pedidos a consultor estratégico de negocios. Negocio + estrategia + contenido + IA + marketing + análisis + posicionamiento.",
        },
        right: {
          eyebrow: "IA con criterio",
          title: "IA: no para hacer más posts. Para hacer más negocio.",
          body: "Integrá la Inteligencia Artificial como asistente estratégico. La clave no es la herramienta, sino la decisión humana que la dirige.",
        },
      },
      {
        type: "iconGrid",
        title: "8 módulos. Una visión mucho más amplia del profesional digital.",
        description: "8 módulos · 2 horas cada uno · 100% online. Requisito: formación inicial de Community Manager o experiencia equivalente.",
        background: "container",
        items: [
          {
            iconName: "Target",
            title: "Estrategia de negocio",
            description: "Entendé modelos, objetivos y cómo las redes impactan en resultados reales.",
          },
          {
            iconName: "Sparkles",
            title: "IA estratégica",
            description: "Sistemas, flujos y automatizaciones para operar con más calidad y menos caos.",
          },
          {
            iconName: "LineChart",
            title: "Análisis y marketing",
            description: "Interpretá datos, posicioná marcas y medí el impacto de cada acción.",
          },
          {
            iconName: "Building2",
            title: "Agencia unipersonal",
            description: "Operá como un negocio escalable: sistemas, procesos y mayor calidad de vida.",
            tone: "primary",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No se trata de aprender más herramientas.",
        body: "Se trata de convertirte en un profesional más valioso. El CM básico aprende el oficio. El CM PRO aprende a convertir ese oficio en una profesión y, si quiere, en un negocio.",
      },
      {
        type: "scheduleCta",
        title: "Community Manager PRO",
        body: "El siguiente nivel empieza cuando dejás de pensar como operador y empezás a pensar como estratega.",
        metaTitle: "Programa avanzado",
        metaBody: "Si todavía no tenés formación inicial, te sugerimos comenzar por Community Manager Operativo · Nivel I.",
        chips: ["100% online", "8 módulos", "Nivel avanzado"],
        buttons: [
          { text: "Quiero ser Community Manager PRO", link: contactLink, variant: "primary" },
          {
            text: "Ver formación inicial",
            link: "/capacitaciones/community-manager-nivel-1",
            variant: "outline",
          },
        ],
      },
    ],
  },
  {
    id: "course-hablar-publico",
    slug: "hablar-en-publico",
    title: "Hablar en Público",
    blocks: [
      {
        type: "hero",
        title: "No se trata solamente de perder el miedo. Se trata de aprender a comunicar, conectar y conducir.",
        paragraphs: [
          "Cuando todas las miradas se dirigen a vos, ese instante define mucho más que transmitir información: tu conocimiento se vuelve visible, tu liderazgo se pone a prueba y la conexión con los demás puede cambiar el rumbo de una decisión.",
        ],
        imageUrl: "/ethos/formacion-3.jpg",
        buttons: [
          { text: "Quiero conocer la formación", link: contactLink, variant: "primary" },
        ],
      },
      {
        type: "iconGrid",
        title: "Una habilidad. Muchos escenarios.",
        description: "La comunicación estratégica no se limita a un escenario con micrófono.",
        background: "low",
        items: [
          {
            iconName: "Presentation",
            title: "Presentaciones",
            description: "Resultados y reportes clave frente a audiencias exigentes.",
          },
          {
            iconName: "Users",
            title: "Reuniones de equipo",
            description: "Alinear visiones y sostener conversaciones difíciles.",
          },
          {
            iconName: "Shield",
            title: "Defensa de proyectos",
            description: "Ante clientes, directorios o stakeholders.",
          },
          {
            iconName: "Mic",
            title: "Charlas y eventos",
            description: "Conferencias, paneles y espacios formales.",
          },
        ],
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "Hablar",
          title: "Es emitir palabras.",
          body: "Muchas personas hablan; pocas logran que esas palabras tengan un destino claro y un impacto medible.",
        },
        right: {
          eyebrow: "Conducir",
          title: "Es el nivel más alto.",
          body: "Hacer fácil lo complejo, guiar la comprensión del otro, gestionar la energía del grupo e involucrarlos para que el mensaje se apropie, no solo se escuche.",
        },
      },
      {
        type: "iconGrid",
        title: "¿Qué vas a desarrollar?",
        description: "Un recorrido integral por las dimensiones clave de la comunicación estratégica.",
        background: "container",
        items: [
          {
            iconName: "Brain",
            title: "Presencia y seguridad",
            description: "Preparación mental, gestión de ansiedad y proyección desde el primer segundo.",
          },
          {
            iconName: "BookOpen",
            title: "Narrativa",
            description: "De un montón de datos a una historia que captura atención.",
          },
          {
            iconName: "AudioLines",
            title: "Voz",
            description: "Volumen, tono, pausas y matices como instrumento.",
          },
          {
            iconName: "PersonStanding",
            title: "Cuerpo",
            description: "Gestos, postura, movimiento y contacto visual estratégico.",
          },
          {
            iconName: "MessageCircle",
            title: "Interacción",
            description: "Preguntas, participación e interrupciones difíciles.",
          },
          {
            iconName: "Layout",
            title: "Soportes",
            description: "Diapositivas como apoyo, no como muletilla.",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No se aprende a hablar en público solamente escuchando hablar.",
        body: "Esta formación es un laboratorio: un espacio seguro para experimentar, equivocarse y ajustar. No buscamos que hables “perfecto” — la perfección suele ser aburrida. Buscamos que encuentres tu propio estilo auténtico, persuasivo y claro.",
      },
      {
        type: "richText",
        title: "También puede desarrollarse dentro de una organización",
        body: "Diseñamos programas In Company a medida para equipos directivos, fuerzas de venta o áreas de capacitación interna. Adaptamos los escenarios de práctica a las situaciones reales de tu empresa.",
        background: "surface",
      },
      {
        type: "scheduleCta",
        title: "¿Qué querés hacer con esta habilidad?",
        body: "El próximo momento en el que tengas que tomar la palabra está más cerca de lo que pensás. Preparate para que valga la pena.",
        metaTitle: "Hablar en Público",
        metaBody: "Práctica intensiva, feedback y desarrollo de estilo propio.",
        chips: ["Grupos reducidos", "In Company", "Coaching 1:1"],
        buttons: [
          { text: "Quiero más información", link: contactLink, variant: "primary" },
        ],
      },
    ],
  },
]
