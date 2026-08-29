import { SiteContent } from "../types/cms";
import { coursesData } from "./coursesContent";

export const initialContent: SiteContent = {
  sections: [
    {
      id: "hero",
      type: "hero",
      isVisible: true,
      badge: "Consultoría de Recursos Humanos",
      title: "Personas, estrategia y",
      titleHighlight: "tecnología",
      subtitle: "para transformar la gestión de Recursos Humanos.",
      description: "Ayudamos a empresas a incorporar talento, desarrollar equipos e implementar soluciones que impulsan su crecimiento. También acompañamos a profesionales que buscan potenciar su desarrollo laboral.",
      imageUrl: "/ethos/hero-pomelli-1.png",
      floatingCardTitle: "Enfoque Humano",
      floatingCardSubtitle: "Potencial Estratégico",
      videoUrl: "",
      backgroundType: "color",
      backgroundColor: "#f6f3f2",
      buttons: [
        {
          text: "Conocer servicios",
          link: "#servicios",
          variant: "primary"
        },
        {
          text: "Contactanos",
          link: "#contacto",
          variant: "secondary"
        }
      ]
    },
    {
      id: "services",
      type: "services",
      isVisible: true,
      eyebrow: "Nuestras Soluciones",
      title: "¿Cómo podemos ayudarte?",
      description: "Diseñamos soluciones a medida, conectando el talento adecuado con el entorno ideal, impulsando tanto a organizaciones como a individuos.",
      videoUrl: "",
      services: [
        {
          iconName: "UserSearch",
          title: "Talent Acquisition",
          description: "Encontramos el talento adecuado para tu organización, alineando cada incorporación con su cultura, estrategia y necesidades, y optimizando el proceso de selección de principio a fin.",
          color: "primary",
          includesLabel: "Incluye",
          includes: [
            "Búsqueda y selección de perfiles generalistas, comerciales, técnicos e IT.",
            "Diseño y definición del perfil del puesto.",
            "Evaluación de candidatos por competencias.",
            "Entrevistas estructuradas.",
            "Presentación de candidatos finalistas.",
            "Acompañamiento en la decisión de incorporación."
          ],
          ctaText: "Quiero incorporar talento",
          ctaLink: "/?service=Talent%20Acquisition#contacto"
        },
        {
          iconName: "TrendingUp",
          title: "Growth",
          description: "Potenciamos tu perfil profesional para que puedas presentarte con mayor claridad, confianza y estrategia frente a nuevas oportunidades laborales.",
          color: "secondary",
          includes: [
            "Diagnóstico de perfil profesional.",
            "Definición de propuesta de valor.",
            "Preparación estratégica para entrevistas.",
            "Identificación de fortalezas y oportunidades de mejora.",
            "Estrategia de búsqueda laboral.",
            "Orientación para posicionamiento profesional."
          ],
          ctaText: "Quiero potenciar mi perfil",
          ctaLink: "/?service=Growth%20Profesional#contacto"
        },
        {
          iconName: "BookOpen",
          title: "Learning",
          description: "Diseñamos experiencias de aprendizaje orientadas a desarrollar habilidades, fortalecer equipos y acompañar las necesidades reales de cada organización y profesional.",
          color: "tertiary",
          includes: [
            "Capacitaciones In Company.",
            "Cursos y programas abiertos.",
            "Formación virtual.",
            "Talleres prácticos.",
            "Programas adaptados a necesidades específicas.",
            "Recursos y materiales de aprendizaje."
          ],
          ctaText: "Ver capacitaciones",
          ctaLink: "/capacitaciones"
        },
        {
          iconName: "Network",
          title: "HR Tech",
          description: "Acercamos tecnología aplicada a Recursos Humanos para centralizar la gestión, optimizar procesos y transformar información en decisiones más estratégicas.",
          color: "neutral",
          includesLabel: "Incluye",
          includes: [
            "Gestión centralizada de información.",
            "Automatización de tareas y procesos.",
            "Comunicación y gestión interna.",
            "Seguimiento de indicadores de RRHH.",
            "Herramientas para la experiencia del colaborador.",
            "Funcionalidades potenciadas con Inteligencia Artificial."
          ],
          ctaText: "Conocer la plataforma",
          ctaLink: "/?service=HR%20Tech#contacto"
        }
      ]
    },
    {
      id: "about",
      type: "about",
      isVisible: true,
      title: "¿Por qué Anthrovia?",
      eyebrow: "",
      personName: "Betsabé Sánchez",
      personRole: "Founder & CEO",
      personImage: "/ethos/founder-betsabe.png",
      introText: [
        "No es un nombre elegido al azar...",
        "Anthrovia nace de la unión entre Anthropos (persona) y Vía (camino).",
        "Porque creemos que detrás de cada organización hay personas que recorren distintos caminos: quienes se incorporan, quienes buscan desarrollarse, quienes lideran equipos y quienes toman decisiones para hacer crecer una empresa.",
        "Acompañamos ese proceso integrando personas, estrategia y tecnología, para transformar necesidades en soluciones y generar oportunidades de crecimiento.",
        "Entendemos que cada realidad tiene su propio camino. Nosotros ayudamos a encontrar la mejor forma de recorrerlo.",
        "Ese es el propósito que guía cada proyecto que acompañamos."
      ],
      pillarsTitle: "Una forma más humana y estratégica de gestionar personas.",
      pillars: [
        {
          iconName: "Target",
          title: "Estrategia",
          description: "Alineamos el talento con los objetivos de negocio para generar impacto real y medible en la organización."
        },
        {
          iconName: "Handshake",
          title: "Cercanía",
          description: "Trabajamos como aliados, involucrándonos en cada proyecto."
        },
        {
          iconName: "Lightbulb",
          title: "Innovación",
          description: "Aplicamos metodologías ágiles y tecnología para crear soluciones de RRHH adaptadas a los desafíos actuales."
        }
      ],
      purpose: {
        title: "Nuestro Propósito",
        description: "Ser el puente que impulsa la evolución del talento y el desarrollo integral de las organizaciones."
      },
      mission: {
        title: "Nuestra Misión",
        description: "Potenciar el talento humano de las organizaciones mediante soluciones innovadoras y personalizadas."
      },
      videoUrl: "",
      values: []
    },
    {
      id: "learning-hero",
      type: "hero",
      isVisible: true,
      badge: "Learning",
      title: "FORMACIÓN Y DESARROLLO",
      subtitle: "Aprender para transformar. Desarrollar habilidades para generar resultados.",
      description: "En Anthrovia diseñamos y facilitamos experiencias de aprendizaje orientadas a desarrollar personas, potenciar equipos y acompañar a las organizaciones frente a los desafíos del mundo laboral actual. Porque capacitar no es simplemente transmitir información. Es lograr que una persona pueda hacer, pensar y desenvolverse de una manera diferente después de la experiencia de aprendizaje.",
      imageUrl: "/ethos/hero-card.jpg",
      statsValue: "100%",
      statsLabel: "Enfoque Práctico",
      videoUrl: "/ethos/hero.jpg",
      backgroundType: "media",
      buttons: [
        {
          text: "Ver formaciones",
          link: "#formaciones",
          variant: "primary"
        },
        {
          text: "Capacitar a mi equipo",
          link: "#in-company",
          variant: "secondary"
        }
      ]
    },
    {
      id: "learning-services",
      type: "services",
      isVisible: true,
      title: "Nuestras Formaciones",
      description: "Propuestas pensadas para incorporar conocimientos, desarrollar habilidades y adquirir herramientas aplicables al trabajo y al crecimiento profesional.",
      videoUrl: "",
      modalidadesTitle: "Elegí la modalidad que mejor se adapte a tu forma de aprender.",
      modalidades: [
        {
          iconName: "Timer",
          title: "Autogestiva",
          description: "Contenido para aprender a tu ritmo, con materiales y recursos prácticos."
        },
        {
          iconName: "MessagesSquare",
          title: "Con Acompañamiento",
          description: "Contenido y recursos audiovisuales, con espacios de consulta para avanzar con orientación.",
          featured: true
        },
        {
          iconName: "Video",
          title: "En Vivo",
          description: "Encuentros en tiempo real, participación, práctica y acompañamiento del formador. Las clases quedan grabadas para volver a consultarlas."
        }
      ],
      formacionesTitle: "Nuestras Formaciones",
      formacionesDescription: "Propuestas pensadas para incorporar conocimientos, desarrollar habilidades y adquirir herramientas aplicables al trabajo y al crecimiento profesional.",
      formaciones: [
        {
          id: "cm-nivel-1",
          title: "Community Manager Operativo · Nivel I",
          description: "Formación práctica para aprender a gestionar redes sociales profesionalmente, trabajar con clientes y desarrollar una actividad como Community Manager.",
          category: "Marketing Digital",
          imageUrl: "/ethos/formacion-1.jpg",
          link: "/capacitaciones/community-manager-nivel-1"
        },
        {
          id: "cm-pro",
          title: "Community Manager PRO",
          description: "Formación avanzada en gestión de redes, inteligencia artificial, estrategia de contenidos y posicionamiento de marca.",
          category: "Marketing Digital",
          imageUrl: "/ethos/formacion-2.jpg",
          link: "/capacitaciones/community-manager-pro"
        },
        {
          id: "hablar-publico",
          title: "Hablar en Público",
          description: "Herramientas prácticas para comunicar con mayor claridad, seguridad y presencia frente a otras personas.",
          category: "Habilidades Blandas",
          imageUrl: "/ethos/formacion-3.jpg",
          link: "/capacitaciones/hablar-en-publico"
        },
        {
          id: "academia-comercial",
          title: "Academia de Desarrollo Comercial",
          description: "Formación orientada a desarrollar habilidades comerciales, mejorar la comunicación con clientes y fortalecer el proceso de venta.",
          category: "Ventas",
          imageUrl: "/ethos/formacion-4.jpg",
          link: "/capacitaciones/academia-desarrollo-comercial"
        },
        {
          id: "liderazgo-emocional",
          title: "Liderazgo Emocional",
          description: "Herramientas prácticas para liderar personas, gestionar tensiones y fortalecer la comunicación y el vínculo dentro de los equipos.",
          category: "Habilidades Blandas",
          imageUrl: "/ethos/formacion-5.jpg",
          link: "#contacto"
        }
      ],
      formacionesComingSoon: {
        title: "Nuevas formaciones próximamente",
        description: "Nuestro catálogo se encuentra en constante crecimiento. Iremos incorporando nuevas propuestas."
      },
      inCompany: {
        title: "FORMACIÓN",
        highlight: "IN COMPANY",
        description: "Las formaciones que ofrecemos también pueden llevarse a tu organización. Adaptamos los contenidos para responder a la realidad de tu empresa y tu equipo en áreas clave como:",
        imageUrl: "/ethos/in-company.jpg",
        areas: [
          "Comunicación y habilidades interpersonales",
          "Liderazgo y equipos",
          "Oratoria y comunicación profesional",
          "Ventas y desarrollo comercial",
          "Marketing digital",
          "IA aplicada al trabajo"
        ],
        modalitiesTitle: "Modalidades de Implementación",
        modalities: [
          {
            iconName: "Laptop",
            title: "Online",
            description: "Para equipos remotos o distribuidos geográficamente."
          },
          {
            iconName: "MapPin",
            title: "Presencial / Híbrida",
            description: "Disponible en Mendoza y San Luis."
          }
        ],
        ctaText: "Capacitar a mi equipo",
        ctaLink: "#contacto"
      },
      services: []
    },
    {
      id: "learning-about",
      type: "about",
      isVisible: true,
      title: "Mauricio Ramos",
      eyebrow: "Quién está detrás de las formaciones",
      personName: "Mauricio Ramos",
      personRole: "Formador · Coach · Speaker · Consultor",
      personImage: "/ethos/mauricio.jpg",
      specialties: [
        "Capacitación y desarrollo",
        "Habilidades interpersonales",
        "Comunicación y oratoria",
        "Desarrollo comercial y ventas",
        "Marketing digital",
        "Inteligencia Artificial"
      ],
      introText: [
        "La formación ha sido una parte central de su recorrido profesional, con experiencia en capacitación de equipos y desarrollo de competencias vinculadas a personas, comunicación y negocio. A lo largo de su trayectoria ha trabajado en diferentes áreas de formación y desarrollo.",
        "Cuenta además con formación como Coach, Speaker y Consultor, junto con un Diplomado en Dirección de Empresas. Su enfoque combina personas, comunicación, negocio y nuevas herramientas, buscando que cada experiencia de aprendizaje tenga una aplicación concreta."
      ],
      purpose: {
        title: "Nuestro Propósito",
        description: "Ser el puente que impulsa la evolución del talento y el desarrollo integral de las organizaciones."
      },
      mission: {
        title: "Nuestra Misión",
        description: "Potenciar el talento humano mediante experiencias de aprendizaje con aplicación concreta."
      },
      videoUrl: "",
      values: []
    },
    {
      id: "news",
      type: "news",
      isVisible: true,
      title: "Noticias y Recursos",
      subtitle: "Mantente actualizado con las últimas tendencias, mejores prácticas y consejos expertos en gestión de recursos humanos",
      backgroundType: 'color',
      backgroundColor: '#ffffff',
      headerBgColor: 'transparent',
      titleColor: '#1f2937',
      subtitleColor: '#4b5563',
      descriptionColor: '#4b5563',
      newsItems: [
        {
          id: "2",
          title: "Humanos 4.0: El Futuro del Trabajo y la Gestión de Talento hacia 2026",
          excerpt: "Un análisis exhaustivo sobre la transformación del mercado laboral en Latinoamérica, explorando cómo la inteligencia artificial y la aceleración tecnológica exigen un nuevo liderazgo híbrido centrado en la capacidad de aprendizaje y la empatía humana.",
          content: `El futuro del trabajo no llega, se actualiza: Crehana presenta el reporte "Humanos 4.0"

En un mundo donde la vida útil de las habilidades técnicas ha colapsado de 15 años a tan solo 2.5 años, las empresas se enfrentan a una realidad ineludible: la velocidad ya no es una ventaja competitiva, es el costo de entrada. Bajo esta premisa, Crehana lanza su más reciente reporte, "Humanos 4.0: La visión más clara del 2026", una guía estratégica para líderes de talento que buscan navegar la disrupción tecnológica con un enfoque humano.

El reporte revela datos críticos para la región: Latinoamérica enfrenta un déficit de 1.2 millones de desarrolladores para 2025 y una escasez del 65% en roles de ciencia de datos e IA. A través de casos de éxito de gigantes regionales como Nubank, Mercado Libre y Globant, el documento demuestra que las empresas ganadoras no serán las que tengan la tecnología más avanzada, sino las que logren la simbiosis perfecta entre la eficiencia de la IA y las capacidades "irreductiblemente humanas", como el pensamiento crítico y la inteligencia emocional.

Entre las tendencias clave que analiza el estudio se encuentran el auge del talento fraccionado (gig economy ejecutivo), la aparición de los "empleados digitales", los gemelos digitales de CEOs y la transición hacia el upskilling-as-a-service. Además, propone un framework de 90 días para que las organizaciones dejen de ser simples observadoras y se conviertan en arquitectas de su propio futuro.

"Humanos 4.0" es una lectura obligatoria para quienes comprenden que el contrato social del trabajo ha cambiado y que la única forma de sobrevivir es aprendiendo más rápido que el ritmo de la obsolescencia.`,
          media: [
            {
              type: 'image',
              url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
              isMain: true
            }
          ],
          date: new Date().toISOString(),
          author: "Crehana",
          category: "Tendencias",
          attachments: [
            {
              id: "report-2026",
              name: "HR Reporte 2026",
              url: "/HR_REPORT_2026-2.pdf",
              type: "pdf"
            }
          ]
        },
        {
          id: "1",
          title: "El futuro de los Recursos Humanos en 2026: estrategia, datos y personas",
          excerpt: "El mundo del trabajo avanza a un ritmo acelerado y obliga a los departamentos de Recursos Humanos a anticiparse a los cambios. De cara a 2026, la función de RRHH evoluciona hacia un modelo más estratégico, digital y centrado en las personas.",
          content: `El mundo del trabajo avanza a un ritmo acelerado y obliga a los departamentos de Recursos Humanos a anticiparse a los cambios. De cara a 2026, la función de RRHH evoluciona hacia un modelo más estratégico, digital y centrado en las personas, donde la tecnología, los datos y la cultura corporativa se convierten en palancas clave para la transformación de las organizaciones.

El mundo del trabajo continúa evolucionando a gran velocidad, y los departamentos de Recursos Humanos se enfrentan a un reto clave: anticiparse a los cambios y liderar la transformación de las organizaciones. De cara a 2026, las tendencias en RR. HH. apuntan a un modelo más digital, estratégico y centrado en las personas, donde la tecnología y la cultura corporativa avanzan de la mano. 

En este artículo analizamos las principales tendencias de Recursos Humanos in 2026 y cómo las empresas pueden prepararse para afrontarlas con éxito.

1. RRHH como socio estratégico del negocio
Una de las tendencias más consolidadas para 2026 es la evolución definitiva de RR. HH. hacia un rol estratégico. El área deja atrás su función puramente operativa para convertirse en un actor clave en la toma de decisiones empresariales. 

Gracias al acceso a datos fiables y en tiempo real, RRHH puedes: 

Anticipar necesidades de talento. 
Alinear la estrategia de personas con los objetivos de negocio. 
Medir el impacto real de las políticas de talento en los resultados de la empresa. 
La digitalización es el principal habilitador de este cambio.

2. Digitalización integral de los procesos de RRHH
En 2026, la digitalización ya no será una ventaja competitiva, sino un requisito básico. Las organizaciones apuestan por plataformas integrales de RR. HH. que unifican procesos como nómina, gestión de ausencias, evaluación del desempeño, analítica y reporting. 

Entre los beneficios más relevantes destacan: 

Reducción de errores y tareas manuales. 
Ahorro de tiempo administrativo. 
Mayor transparencia y trazabilidad de la información. 
La tendencia apunta a soluciones conectadas, escalables y adaptadas al marco normativo español. 

3. Inteligencia artificial aplicada a Recursos Humanos
La inteligencia artificial en RR. HH. será una de las grandes protagonistas en 2026. Su adopción se centra en mejorar la eficiencia sin perder el componente humano. 

Algunos usos clave de la IA incluyen: 

Análisis predictivo de rotación y absentismo. 
Personalización de la experiencia del empleado. 
Apoyo en la toma de decisiones basadas en datos. 
Automatización inteligente del soporte y la gestión interna. 
La clave estará en utilizar la IA como un refuerzo del acompañamiento humano, no como un sustituto. 

4. Evaluación del desempeño continua y basada en datos
El modelo tradicional de evaluación anual está dando paso a sistemas de evaluación continua del desempeño. En 2026, las empresas priorizan: 

Feedback frecuente y estructurado. 
Objetivos claros y medibles (OKR y KPI). 
Conversaciones de desarrollo apoyadas en datos objetivos. 
Este enfoque mejora la motivación, el compromiso y la retención del talento, además de facilitar la planificación del desarrollo profesional.

5. Analítica de personas y toma de decisiones informada
People analytics se consolida como una tendencia clave en RR. HH. para 2026. Los equipos de personas necesitan transformar los datos en conocimiento accionable. 

Los cuadros de mando y los informes avanzados permiten: 

Detectar patrones de absentismo o rotación. 
Analizar costes laborales con mayor precisión. 
Medir el impacto de las políticas de talento. 
Las organizaciones que basan sus decisiones en datos ganan agilidad y reducen riesgos. 

6. Experiencia del empleado y bienestar como prioridad
El bienestar y la experiencia del empleado dejan de ser iniciativas aisladas para convertirse en un eje estratégico. En 2026, las empresas apuestan por: 

Modelos de trabajo flexibles. 
Políticas reales de conciliación. 
Programas de bienestar sostenibles en el tiempo. 
La tecnología facilita la gestión, pero el foco sigue estando en las personas y en crear entornos de trabajo saludables y comprometidos.

7. Cumplimiento normativo y adaptación constante
En un entorno legislativo cambiante como el español, el compliance laboral seguirá siendo una prioridad para RR. HH. La automatización de procesos como la nómina, el control horario o la gestión de ausencias ayuda a: 

Reducir riesgos legales. 
Garantizar el cumplimiento normativo. 
Mantener la información siempre actualizada. 
La tecnología se convierte en una aliada clave para gestionar la complejidad normativa.  

Preparar hoy los RRHH de 2026 
Las tendencias de Recursos Humanos en 2026 apuntan a un modelo más digital, analítico y humano al mismo tiempo. Las organizaciones que apuesten por la tecnología como palanca estratégica estarán mejor preparadas para atraer, gestionar y desarrollar el talento en un entorno cada vez más exigente. 

Invertir en digitalización, analítica e innovación no es solo una cuestión de eficiencia, sino una decisión estratégica que marcará la diferencia en los próximos años.`,
          media: [
            {
              type: 'image',
              url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
              isMain: true
            }
          ],
          date: "2025-12-27T00:00:00.000Z",
          author: "Anthrovia HR",
          category: "Tendencias",
          citation: "https://www.rrhhdigital.com/",
          attachments: []
        },
        {
          id: "3",
          title: "La era de la IA autónoma: RR. HH. automatizará más de la mitad de sus procesos administrativos en 2026.",
          excerpt: "La implementación de agentes de IA autónomos permitirá automatizar el 56% del ciclo de vida del empleado para 2026, desplazando la carga administrativa hacia un modelo de gestión basado en habilidades humanas críticas.",
          content: `# IA Agente y Automatización Total: El Nuevo Paradigma del Empleado Digital en 2026

La gestión del capital humano está cruzando su frontera más ambiciosa. Al cierre de 2025 y con la mirada puesta en 2026, las empresas han dejado de ver a la Inteligencia Artificial como un simple asistente de chat para convertirla en el motor operativo de toda la organización. La era de la IA Agente y la Automatización del Ciclo de Vida (Hire-to-Retire) ha llegado para redefinir el trabajo administrativo.

## Del "Copiloto" al "Agente Autónomo"
La gran tendencia para 2026 es el despliegue de los Agentes de IA. A diferencia de los modelos anteriores que requerían instrucciones constantes (prompts), estos nuevos sistemas son capaces de ejecutar flujos de trabajo de extremo a extremo sin intervención humana constante.
En los departamentos de RRHH, esto significa que un agente de IA puede detectar una vacante, redactar la oferta, filtrar candidatos por competencias, coordinar entrevistas según las agendas disponibles y, una vez seleccionado el talento, iniciar el proceso de alta legal y técnica de forma autónoma.

## Automatización del Ciclo de Vida: El fin de la burocracia
Se estima que para 2026, hasta el 56% de las tareas administrativas del ciclo de vida del empleado (desde la contratación hasta el retiro) estarán completamente automatizadas. Los puntos clave de esta transformación incluyen:
1. Onboarding Dinámico: Programas de bienvenida personalizados por IA que ajustan el contenido de capacitación según la velocidad de aprendizaje del nuevo empleado.
2. Gestión de Nómina y Beneficios: Sistemas que ajustan automáticamente las deducciones y pagos en tiempo real ante cambios legislativos o peticiones de adelantos salariales.
3. Offboarding Predictivo: Herramientas de análisis que identifican patrones de desvinculación antes de que ocurran, permitiendo a las empresas actuar para retener el talento clave o gestionar la salida de forma fluida.

## El impacto en el empleo: Habilidades sobre Títulos
La automatización masiva está desplazando el enfoque de los reclutadores. Para 2026, la tendencia de "Skills-based Hiring" (contratación basada en habilidades) se consolida. Dado que la IA se encarga del procesamiento de datos y la administración, las empresas están priorizando perfiles con alta inteligencia emocional, pensamiento crítico y capacidad de supervisión de sistemas automatizados.

## El Desafío Ético y Humano
A pesar del avance tecnológico, el reporte de tendencias 2026 subraya un riesgo: la deshumanización. El reto para los líderes de RRHH este año será mantener el "toque humano" en una estructura donde la mayoría de las interacciones transaccionales son gestionadas por algoritmos.
"La tecnología hace el trabajo, pero las personas construyen la cultura", es el lema que resuena en las conferencias globales de cara al próximo año.

## ¿Cómo prepararse para 2026?
1. Auditoría de Procesos: Identificar qué tareas repetitivas de "Hire-to-Retire" pueden delegarse a agentes de IA.
2. Upskilling Digital: Capacitar a los equipos de RRHH en el manejo y supervisión de herramientas de automatización.
3. Transparencia de Datos: Asegurar que el uso de IA en la toma de decisiones sea ético y auditable.`,
          media: [
            {
              type: 'image',
              url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
              isMain: true
            }
          ],
          date: "2025-12-27T00:00:00.000Z",
          author: "Anthrovia HR",
          category: "Tecnología",
          attachments: []
        }
      ]
    },
    {
      id: "posts",
      type: "posts",
      isVisible: true,
      title: "Últimas Novedades",
      subtitle: "Síguenos en redes",
      backgroundType: 'color',
      backgroundColor: '#f6f3f2',
      videoUrl: "",
      posts: [
        {
          id: "1",
          imageUrl: "/nosiempre.png",
          description: "El estrés laboral no siempre se nota como ansiedad o crisis.",
          postUrl: "https://www.instagram.com/p/DSpyhAIj0A5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          platform: "instagram"
        },
        {
          id: "2",
          imageUrl: "/linkpst1.jpg",
          description: "En estas semanas muchas personas llegan al límite justo cuando el año termina. Y enero aparece como una oportunidad… o como más de lo mismo.",
          postUrl: "https://www.linkedin.com/posts/anthrovia-hr_volviendo-al-tema-que-venimos-conversando-activity-7410314699197689856-FNiP?utm_source=share&utm_medium=member_desktop&rcm=ACoAADxdw-sB9Bsnn1BphidW8OUw49O-QewzNKo",
          platform: "linkedin"
        },
        {
          id: "3",
          imageUrl: "/dospost.png",
          description: "¿TENÉS UNA ENTREVISTA Y NO SABÉS SI LO ESTÁS HACIENDO BIEN?",
          postUrl: "https://www.instagram.com/p/DSa7g6xDWzL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          platform: "instagram"
        },
        {
          id: "4",
          imageUrl: "/despues.png",
          description: "POR QUÉ TANTAS ENTREVISTAS TERMINAN EN MALAS CONTRATACIONES?",
          postUrl: "https://www.instagram.com/p/DSYP3eADdYp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          platform: "instagram"
        },
        {
          id: "5",
          imageUrl: "/elviaje.png",
          description: "El viaje del talento es un recorrido clave para construir organizaciones sólidas, humanas y sostenibles.",
          postUrl: "https://www.instagram.com/p/DUD26czDUe1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          platform: "instagram"
        },
        {
          id: "6",
          imageUrl: "/costo.jpg",
          description: "⚠️ El costo de no invertir en RRHH no siempre se ve en números… pero sí en lo cotidiano.",
          postUrl: "https://www.instagram.com/p/DT20otzgTzo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          platform: "instagram"
        }
      ]
    },
    {
      id: "contact",
      type: "contact",
      isVisible: true,
      title: "¿En qué podemos ayudarte?",
      description: "Contanos brevemente qué necesitás y te respondemos a la brevedad.",
      whatsappNumber: "5492604085501",
      email: "anthroviahr@gmail.com",
      customTraining: {
        title: "¿Necesitás una capacitación que todavía no tenemos publicada?",
        description: "Desarrollamos programas a medida siguiendo una metodología probada para garantizar el impacto en tu equipo.",
        steps: [
          {
            number: "1",
            title: "Entendemos el desafío",
            description: "Conversamos sobre la necesidad, el equipo y el resultado que se busca alcanzar."
          },
          {
            number: "2",
            title: "Diseñamos la propuesta",
            description: "Definimos contenidos, modalidad, duración y metodología."
          },
          {
            number: "3",
            title: "Desarrollamos la formación",
            description: "Creamos los contenidos y recursos necesarios para la experiencia."
          },
          {
            number: "4",
            title: "La llevamos a la práctica",
            description: "Buscamos que el aprendizaje pueda trasladarse a situaciones reales de trabajo."
          }
        ],
        ctaText: "Hablemos"
      },
      socialLinks: [
        {
          platform: "email",
          url: "mailto:anthroviahr@gmail.com",
          label: "anthroviahr@gmail.com"
        },
        {
          platform: "whatsapp",
          url: "https://wa.me/5492604085501",
          label: "+54 9 260 4085501"
        },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/company/anthrovia-hr/",
          label: "/anthrovia.hr"
        }
      ]
    },
    {
      id: "settings",
      type: "settings",
      isVisible: true,
      cvUrl: "https://talento.anthroviahr.com/",
      cvText: "Dejanos tu CV",
      footerTagline: "Personas, estrategia y tecnología para transformar la gestión de Recursos Humanos."
    },
    {
      id: "courses",
      type: "courses",
      isVisible: true,
      courses: coursesData
    }
  ]
};
