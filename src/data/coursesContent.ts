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
          "Porque muchas oportunidades no se pierden por falta de experiencia, sino porque a veces no sabemos comunicar lo que podemos aportar. Y ahí está el problema.",
        imageUrl: "/ethos/courses/academia-desarrollo-comercial/hero.jpg",
      },
      {
        type: "twoColumn",
        background: "low",
        left: {
          eyebrow: "El mito",
          title: "No necesitás \"tener cara de vendedor\".",
          body: "Vender no significa presionar. No significa manipular. No significa hablar sin parar. Vender es entender necesidades, comunicar valor, generar confianza y ayudar a tomar decisiones. Y esas habilidades pueden servirte mucho más allá de un trabajo en ventas.",
        },
        right: {
          eyebrow: "La realidad",
          title: "Porque las habilidades comerciales no se quedan en el área de ventas.",
          body: "Te sirven para una entrevista. Para negociar un sueldo. Para presentar una propuesta. Para conseguir un cliente. Para defender una idea. Para emprender. Para liderar. En otras palabras: aprender a vender también es aprender a generar oportunidades.",
        },
      },
      {
        type: "splitMedia",
        title: "Pensá en tu próxima oportunidad.",
        body: "Dos personas tienen una experiencia similar. Las dos cumplen con los requisitos. Pero una sabe explicar lo que puede aportar, genera confianza y comunica su valor con seguridad. ¿A cuál elegirías? Eso también es vender. Y es exactamente el tipo de habilidad que podés entrenar.",
        imageUrl: "/ethos/courses/academia-desarrollo-comercial/hero.jpg",
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
        title: "Y hoy hay una herramienta que cambió las reglas del juego. La inteligencia artificial.",
        body: "Hoy podés utilizarla para preparar una entrevista, practicar una conversación comercial, simular un cliente, analizar objeciones o mejorar tu comunicación. La pregunta ya no es si vas a utilizar IA… es si vas a aprender a utilizarla antes o después que los demás.",
        imageUrl: "/ethos/bg-network.png",
      },
      {
        type: "richText",
        title: "Saber qué hacer no significa necesariamente saber hacerlo.",
        body: "No es un curso para mirar y tomar apuntes. Es un entrenamiento. Vas a practicar. Simular situaciones. Resolver casos. Recibir feedback. Y volver a intentarlo. Hasta convertir conceptos en habilidades.",
        background: "surface",
      },
      {
        type: "splitMedia",
        title: "Academia de Desarrollo Comercial",
        body: "Una formación práctica para desarrollar habilidades comerciales, fortalecer tu perfil profesional y aprender a utilizar Inteligencia Artificial como herramienta de trabajo.",
        imageUrl: "/ethos/courses/academia-desarrollo-comercial/hero.jpg",
        imagePosition: "right",
      },
      {
        type: "tags",
        title: "Y tu perfil profesional también se entrena.",
        body: "Porque conseguir oportunidades no depende solamente de lo que sabés hacer. También importa cómo lo comunicás. Por eso vas a trabajar:",
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
            bio: "Formador especializado en desarrollo comercial, con experiencia en ventas y capacitación de equipos comerciales. A lo largo de su trayectoria ha capacitado a más de 2.000 personas, combinando experiencia directa en el ámbito comercial con un enfoque práctico orientado a resultados.",
            imageUrl: "/ethos/courses/academia-desarrollo-comercial/mauricio.jpg",
          },
          {
            name: "Betsabé Sánchez",
            role: "Empleabilidad y perfil profesional",
            bio: "Profesional de RR.HH. con experiencia en reclutamiento y selección, liderando procesos de alto volumen para distintas posiciones. Su experiencia aporta una mirada estratégica sobre lo que las empresas buscan y la importancia de saber comunicar la propia experiencia y el valor profesional.",
            imageUrl: "/ethos/courses/academia-desarrollo-comercial/betsabe.png",
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
          "Aunque hoy no tengas experiencia, no sepas diseñar o nunca hayas trabajado profesionalmente con redes.",
        ],
        imageUrl: "/ethos/courses/community-manager-nivel-1/hero.jpg",
        buttons: [{ text: "Quiero convertirme en CM", link: contactLink, variant: "primary" }],
      },
      {
        type: "richText",
        eyebrow: "El contexto",
        title: "Una nueva profesión digital está creciendo.",
        body: "Cada vez más negocios necesitan mejorar su presencia online. Pero ya no buscan solamente personas que publiquen contenido o respondan mensajes. El rol del Community Manager evolucionó. Hoy las empresas necesitan profesionales capaces de comprender una marca, conocer a su audiencia, desarrollar estrategias, crear contenido, analizar resultados y utilizar nuevas herramientas para trabajar de manera más efectiva.",
        background: "low",
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "IA + criterio",
          title: "La IA está transformando la forma de crear contenidos, estrategias y procesos.",
          body: "Pero la tecnología, por sí sola, no reemplaza el criterio profesional. La verdadera ventaja está en saber combinar estrategia, creatividad, herramientas e Inteligencia Artificial.",
        },
        right: {
          eyebrow: "Lo que buscan",
          title: "Profesionales que sepan pensar, resolver y generar resultados.",
          body: "Porque las empresas no necesitan solamente personas que sepan usar herramientas. Necesitan profesionales que sepan utilizarlas para pensar, resolver problemas y generar resultados.",
        },
      },
      {
        type: "iconGrid",
        title: "Quizás llegaste hasta acá porque estás buscando una nueva oportunidad…",
        description:
          "Una formación diseñada para quienes quieren aprender una profesión actual y desarrollar las habilidades necesarias para trabajar con redes sociales de manera profesional. Durante 5 semanas vas a recorrer el camino que sigue un Community Manager.",
        background: "container",
        items: [
          {
            iconName: "RefreshCw",
            title: "Cambiar de rumbo",
            description: "Querés cambiar de rumbo profesional o reinventarte.",
          },
          {
            iconName: "Briefcase",
            title: "Aplicar laboralmente",
            description: "Buscás una habilidad que puedas aplicar en el mercado laboral.",
          },
          {
            iconName: "Users",
            title: "Clientes o independencia",
            description: "Querés trabajar con clientes o de forma independiente.",
          },
          {
            iconName: "Sparkles",
            title: "Actualizarte con IA",
            description: "Querés aprender una habilidad con demanda frente al avance de la IA.",
            tone: "primary",
          },
        ],
      },
      {
        type: "iconGrid",
        title: "Los 5 pasos para convertirte en un Community Manager profesional",
        description:
          "Una metodología estructurada para llevarte de cero a estratega digital. No se trata solamente de aprender redes sociales: se trata de aprender a trabajar como Community Manager.",
        background: "surface",
        items: [
          {
            iconName: "Lightbulb",
            title: "Pensá como un CM profesional",
            description:
              "Antes de crear contenido, necesitás entender la profesión. Vas a conocer cómo funciona el rol en empresas y como freelancer, analizar identidad de marca, comprender audiencias y crear una base sólida para gestionar clientes.",
          },
          {
            iconName: "PenLine",
            title: "Creá contenido estratégico",
            description:
              "Crear contenido no es publicar por publicar. Vas a aprender a desarrollar ideas, escribir textos atractivos, crear diseños profesionales sin ser diseñador y planificar contenido para distintas plataformas (reels, historias, carruseles y tendencias).",
          },
          {
            iconName: "BarChart3",
            title: "Medí resultados y demostrá tu valor",
            description:
              "Los likes no siempre significan resultados. Vas a aprender a analizar métricas, entender qué funciona, crear reportes profesionales, comunicar resultados a clientes y gestionar comentarios, mensajes y situaciones difíciles.",
          },
          {
            iconName: "Sparkles",
            title: "Potenciá tu trabajo con IA",
            description:
              "Vas a aprender a utilizar IA para acelerar procesos, generar mejores ideas y optimizar tu trabajo diario: estrategias, contenidos, tendencias, organización de información y mejora de diseños.",
            tone: "primary",
          },
          {
            iconName: "Briefcase",
            title: "Transformá el conocimiento en oportunidad",
            description:
              "Vas a conocer cómo crear tus servicios, definir propuestas con presupuestos, armar tu portfolio y dar los primeros pasos para buscar clientes como Community Manager freelance.",
          },
          {
            iconName: "Bot",
            title: "Factor diferencial: QuantumTraffic",
            description:
              "Acceso a QuantumTraffic, una herramienta de IA propia para facilitar la búsqueda de contenido (sin que suene a IA) y el diseño de publicaciones y carruseles.",
            tone: "primary",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No creamos cursos. Formamos profesionales.",
        body: "En Anthrovia HR creemos que aprender una nueva habilidad tiene valor cuando puede convertirse en una oportunidad real. Por eso esta formación combina conocimiento actualizado + herramientas prácticas + mirada profesional. Nuestro objetivo no es que termines con información acumulada: queremos que desarrolles una capacidad que puedas aplicar, mostrar y utilizar en el mercado laboral.",
        imageUrl: "/ethos/courses/community-manager-nivel-1/ai.jpg",
      },
      {
        type: "pricing",
        title: "Todo lo que necesitás para comenzar tu camino como Community Manager.",
        body: "Bonos incluidos en tu inscripción para organizar el trabajo, crear con IA y conseguir tus primeros clientes.",
        priceLabel: "Único pago",
        priceAmount: "$ar 28.500",
        strikethrough: "Valor total de bonos: us$ 167",
        badge: "50% OFF",
        items: [
          {
            title: "Kit profesional del Community Manager",
            description:
              "Recursos y plantillas para organizar tu trabajo, planificar contenido y presentar tus servicios.",
            valueLabel: "Valor: us$ 47",
          },
          {
            title: "Biblioteca de prompts para Community Managers",
            description:
              "Prompts preparados para ayudarte a crear estrategias, ideas, copys y contenidos utilizando Inteligencia Artificial.",
            valueLabel: "Valor: us$ 37",
          },
          {
            title: "Guía para conseguir tus primeros clientes",
            description:
              "Recursos para comenzar a presentar tus servicios, contactar negocios y generar nuevas oportunidades.",
            valueLabel: "Valor: us$ 25",
          },
          {
            title: "Acceso a QuantumTraffic",
            description:
              "Membresía PREMIUM por dos meses a QuantumTraffic: generá contenido para tu nicho y creá publicaciones y carruseles para tus clientes.",
            valueLabel: "Valor: us$ 58 (membresía mensual de us$ 29)",
          },
        ],
        buttons: [{ text: "Quiero inscribirme ahora", link: contactLink, variant: "secondary" }],
      },
      {
        type: "richText",
        title: "Todos los bonos por un total de us$ 167, incluidos en tu único pago de $ar 28.500",
        body: "No pagás los bonos por separado: están incluidos en la inscripción de la formación.",
        background: "surface",
      },
      {
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Necesito conocimientos previos?",
            answer:
              "No. El programa está diseñado para llevarte desde cero hasta un nivel profesional, paso a paso.",
          },
          {
            question: "¿Necesito saber diseño?",
            answer:
              "No. Vas a aprender herramientas y metodologías para crear contenido profesional sin necesidad de ser diseñador.",
          },
          {
            question: "¿Necesito conocimientos de Inteligencia Artificial?",
            answer:
              "No. Vas a aprender desde las bases cómo utilizarla aplicada al trabajo del Community Manager.",
          },
          {
            question: "¿Tiene certificado?",
            answer:
              "Sí, al finalizar y aprobar el proyecto final recibirás un certificado de finalización.",
          },
          {
            question: "¿Voy a poder trabajar al finalizar?",
            answer:
              "La formación está orientada a desarrollar habilidades aplicables al mercado y prepararte para comenzar a ofrecer servicios profesionales.",
          },
          {
            question: "¿Es solamente teoría?",
            answer:
              "No. El enfoque está pensado para comprender cómo funciona el trabajo real y cómo aplicar lo aprendido.",
          },
          {
            question: "¿Puedo hacerlo si tengo poco tiempo?",
            answer:
              "Sí. La modalidad está diseñada para que puedas avanzar incorporando los conocimientos de manera progresiva.",
          },
        ],
      },
      {
        type: "scheduleCta",
        title: "Tu próxima oportunidad profesional puede empezar con una nueva habilidad.",
        body: "El mercado digital sigue creciendo. Las marcas necesitan profesionales preparados. Y la combinación entre redes sociales e Inteligencia Artificial abre nuevas posibilidades para quienes deciden aprender hoy. No necesitás saberlo todo para comenzar. Necesitás una formación que te guíe.",
        metaTitle: "Community Manager Operativo · Nivel I",
        metaBody: "5 semanas · Estrategia, contenido, métricas, IA y QuantumTraffic.",
        chips: ["Online", "Proyecto final", "Bonos incluidos", "$ar 28.500"],
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
        imageUrl: "/ethos/courses/community-manager-pro/hero.jpg",
        buttons: [{ text: "Quiero conocer el programa", link: contactLink, variant: "primary" }],
      },
      {
        type: "richText",
        title: "El CM que solo \"publica\" tiene un problema.",
        body: "Negocio + Estrategia + Contenido + IA + Marketing + Análisis + Posicionamiento. Hoy, competir con herramientas inteligentes que pueden generar decenas de posteos en segundos es una batalla perdida si tu único valor es \"subir contenido\". El mercado ya no busca operadores técnicos; busca profesionales capaces de pensar estratégicamente. Necesitás entender el modelo de negocio, interpretar datos y utilizar la tecnología como un amplificador de tu criterio.",
        background: "low",
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "Evolución",
          title: "¿Qué pasa cuando dejás de ser \"el que maneja las redes\"?",
          body: "Evolucionás de ser un tomador de pedidos a un consultor estratégico de negocios. Dejás de recibir órdenes sobre qué publicar y de competir por precio en un mercado saturado.",
        },
        right: {
          eyebrow: "IA con criterio",
          title: "IA: no para hacer más posts. Para hacer más negocio.",
          body: "Aprenderás a integrar la Inteligencia Artificial como tu asistente estratégico. La clave no es la herramienta, sino la decisión humana que la dirige.",
        },
      },
      {
        type: "iconGrid",
        title: "8 módulos. Una visión mucho más amplia del profesional digital.",
        description:
          "8 módulos · 2 horas cada uno · 100% online. Para vos si ya tenés conocimientos básicos de Community Management. Requisito: formación inicial de Community Manager o experiencia equivalente.",
        background: "container",
        items: [
          {
            iconName: "Target",
            title: "Dejar de competir solo por precio",
            description: "Aumentá el valor de tus servicios con una mirada de negocio.",
          },
          {
            iconName: "LineChart",
            title: "Desarrollar estrategias",
            description: "Aprendé a diseñar estrategias, no solo a ejecutar publicaciones.",
          },
          {
            iconName: "Sparkles",
            title: "Incorporar IA profesionalmente",
            description: "Usá IA como asistente estratégico, no solo como generador de posts.",
            tone: "primary",
          },
          {
            iconName: "Building2",
            title: "Construir tu agencia unipersonal",
            description:
              "Dejá de pensar como un freelancer desbordado para operar como un negocio escalable: sistemas, flujos y automatizaciones.",
            tone: "primary",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No se trata de aprender más herramientas.",
        body: "Se trata de convertirte en un profesional más valioso. El mercado está cambiando. La IA está cambiando. Las redes están cambiando. Y el trabajo del Community Manager también. El CM básico aprende el oficio. El CM PRO aprende a convertir ese oficio en una profesión y, si quiere, en un negocio.",
        imageUrl: "/ethos/courses/community-manager-pro/split.jpg",
      },
      {
        type: "scheduleCta",
        title: "Community Manager PRO",
        body: "El siguiente nivel empieza cuando dejás de pensar como operador y empezás a pensar como estratega. Si todavía no tenés formación inicial de Community Manager o experiencia equivalente, te sugerimos comenzar por nuestra Formación Inicial.",
        metaTitle: "Programa avanzado",
        metaBody: "8 módulos · 2 horas · 100% online",
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
        title:
          "No se trata solamente de perder el miedo. Se trata de aprender a comunicar, conectar y conducir.",
        paragraphs: [
          "Cuando llega el momento de hablar: ¿qué pasa cuando todas las miradas se dirigen a vos? ¿Sentís que tu mensaje llega con la fuerza que imaginaste?",
          "Ese instante en el que tomás la palabra define mucho más que la transmisión de información. Es el momento donde tu conocimiento se vuelve visible, donde tu liderazgo se pone a prueba y donde la conexión con los demás puede cambiar el rumbo de una decisión.",
          "La preparación técnica es importante, pero no alcanza. El mensaje más brillante pierde valor si no encuentra la forma adecuada de ser entregado.",
        ],
        imageUrl: "/ethos/courses/hablar-en-publico/hero.jpg",
        buttons: [{ text: "Quiero conocer la formación", link: contactLink, variant: "primary" }],
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
            description: "Presentaciones de resultados y reportes clave.",
          },
          {
            iconName: "Users",
            title: "Reuniones de equipo",
            description: "Reuniones donde se necesita alinear visiones.",
          },
          {
            iconName: "Shield",
            title: "Defensa de proyectos",
            description: "Defensa de proyectos ante clientes o directorios.",
          },
          {
            iconName: "Mic",
            title: "Charlas y eventos",
            description: "Conferencias, charlas y eventos formales.",
          },
        ],
      },
      {
        type: "twoColumn",
        left: {
          eyebrow: "Hablar / presentar",
          title: "Hablar es emitir palabras. Presentar es mostrar información.",
          body: "Muchas personas hablan; pocas logran que esas palabras tengan un destino claro y un impacto medible. Presentar es útil, sí, pero a menudo pone el foco en el material (diapositivas, datos) y deja al presentador en un rol secundario de \"relator\".",
        },
        right: {
          eyebrow: "Conducir",
          title: "Conducir es el nivel más alto.",
          body: "Significa hacer fácil lo complejo, guiar el proceso de comprensión del otro, gestionar la energía del grupo e involucrarlos para que el mensaje no solo se escuche, sino que se apropie.",
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
            description:
              "Cómo prepararte mentalmente, gestionar la ansiedad y proyectar seguridad desde el primer segundo.",
          },
          {
            iconName: "BookOpen",
            title: "Narrativa",
            description:
              "La diferencia entre un montón de datos y una historia que captura la atención. Marcos narrativos efectivos.",
          },
          {
            iconName: "AudioLines",
            title: "Voz",
            description:
              "Volumen, tono, pausas y matices. Cómo usar tu voz como un instrumento para enfatizar ideas.",
          },
          {
            iconName: "PersonStanding",
            title: "Cuerpo",
            description: "Gestos, postura, movimiento en el espacio y contacto visual estratégico.",
          },
          {
            iconName: "MessageCircle",
            title: "Interacción",
            description:
              "Técnicas para hacer preguntas, generar participación y gestionar interrupciones o situaciones difíciles.",
          },
          {
            iconName: "Layout",
            title: "Soportes",
            description:
              "Las diapositivas como apoyo, no como muletilla. Diseño minimalista y efectivo para acompañar tu mensaje.",
          },
        ],
      },
      {
        type: "darkBand",
        title: "No se aprende a hablar en público solamente escuchando hablar.",
        body: "Esta formación es un laboratorio. Un espacio seguro para experimentar, equivocarse y ajustar. No buscamos que hables \"perfecto\": la perfección suele ser aburrida y artificial. Buscamos que encuentres tu propio estilo. No hay una única forma correcta de comunicar. El objetivo es que seas la versión más auténtica, persuasiva y clara de vos mismo cuando tomás la palabra.",
      },
      {
        type: "richText",
        title: "También puede desarrollarse dentro de una organización",
        body: "Diseñamos programas In Company a medida para equipos directivos, fuerzas de venta o áreas de capacitación interna. Adaptamos los escenarios de práctica a las situaciones reales de tu empresa. Modalidades: inmersión en grupos reducidos, enfoque en entornos virtuales, y coaching individual 1:1 para preparar una presentación clave específica.",
        background: "surface",
      },
      {
        type: "splitMedia",
        title: "Una habilidad que te acompaña en diferentes ámbitos",
        body: "Profesionales y ejecutivos. Consultores y formadores. Quienes necesitan comunicar con claridad, seguridad y presencia frente a otras personas —en la empresa, en el aula o frente a un cliente.",
        imageUrl: "/ethos/courses/hablar-en-publico/split.jpg",
        imagePosition: "right",
      },
      {
        type: "scheduleCta",
        title: "¿Qué querés hacer con esta habilidad?",
        body: "El próximo momento en el que tengas que tomar la palabra está más cerca de lo que pensás. Preparate para que valga la pena. No se trata de aprender a parecer alguien que sabe hablar. Se trata de aprender a comunicar lo que sabés de una manera que otras personas puedan comprender, recordar y valorar.",
        metaTitle: "Hablar en Público",
        metaBody: "Práctica intensiva, feedback y desarrollo de estilo propio.",
        chips: ["Grupos reducidos", "In Company", "Coaching 1:1"],
        buttons: [{ text: "Quiero más información", link: contactLink, variant: "primary" }],
      },
    ],
  },
]
