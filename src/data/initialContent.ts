import { SiteContent } from "../types/cms";

export const initialContent: SiteContent = {
  sections: [
    {
      id: "hero",
      type: "hero",
      isVisible: true,
      title: "Anthrovia HR",
      subtitle: "Evolucionando el talento",
      description: "Soluciones integrales de Recursos Humanos diseñadas para transformar tu organización y maximizar el potencial de tu equipo. Impulsamos culturas más humanas, procesos más eficientes y equipos que crecen con propósito.",
      videoUrl: "/video.mp4",
      buttons: [
        {
          text: "Conoce nuestros servicios",
          link: "#servicios",
          variant: "secondary"
        },
        {
          text: "Contáctanos",
          link: "#contacto",
          variant: "primary"
        }
      ]
    },
    {
      id: "services",
      type: "services",
      isVisible: true,
      title: "Nuestros servicios",
      description: "Diseñamos soluciones a medida que conectan estrategia, personas y cultura. Acompañamos a las organizaciones en cada etapa de su evolución, impulsando procesos más eficientes y experiencias laborales con propósito.",
      videoUrl: "/bg-mov.mp4",
      services: [
        // Servicios para Empresas
        {
          iconName: "Search",
          title: "Atracción de Talento y Selección Estratégica",
          description: "Gestionamos procesos de reclutamiento, selección por competencias y evaluación especializada para asegurar incorporaciones alineadas al negocio, la cultura y los objetivos organizacionales. Incluye también servicios de sourcing, preselección y armado de shortlists para empresas o agencias que requieren apoyo parcial en sus búsquedas.",
          color: "from-primary to-accent-teal",
          category: "companies"
        },
        {
          iconName: "Rocket",
          title: "Onboarding y Desarrollo Ejecutivo",
          description: "Implementamos procesos estructurados de integración y seguimiento durante los primeros meses, combinando onboarding, diagnóstico temprano y sesiones de coaching profesional para fortalecer desempeño, actitud, adaptación cultural y retención.",
          color: "from-accent-teal to-primary-light",
          category: "companies"
        },
        {
          iconName: "BarChart3",
          title: "Diagnóstico Organizacional y RRHH Estratégico",
          description: "Analizamos y rediseñamos procesos clave del área con foco en eficiencia, experiencia del colaborador y toma de decisiones basada en datos. Incluye revisión de indicadores, People Analytics aplicado, diseño de flujos de trabajo y mejora continua.",
          color: "from-primary-light to-accent-rose",
          category: "companies"
        },
        {
          iconName: "Smile",
          title: "Cultura y Experiencia del Colaborador",
          description: "Diseñamos programas que fortalecen el compromiso y la motivación, integrando acciones de reconocimiento, bienestar integral y salario emocional alineados a cada organización.",
          color: "from-accent-rose to-accent-burgundy",
          category: "companies"
        },
        {
          iconName: "Briefcase",
          title: "Gestión Laboral y Administración",
          description: "Brindamos soluciones complementarias a través de partners especializados en asesoría legal laboral, compensaciones y beneficios, administración de nómina y soporte operativo en gestión de personal.",
          color: "from-accent-burgundy to-accent-teal",
          category: "companies"
        },
        // Servicios para Personas
        {
          iconName: "Compass",
          title: "Career Coaching y Empleabilidad",
          description: "Acompañamos a personas que buscan su primer empleo, desean crecer profesionalmente o atravesar una transición laboral. Optimizamos CV, perfil de LinkedIn, preparación para entrevistas y estrategias de búsqueda acordes al mercado.",
          color: "from-primary to-primary-light",
          category: "individuals"
        },
        {
          iconName: "TrendingUp",
          title: "Proyección y Desarrollo Profesional",
          description: "Espacios de análisis y conversación para clarificar objetivos, explorar oportunidades, redefinir el rumbo profesional y construir planes de desarrollo concretos y accionables.",
          color: "from-accent-teal to-primary",
          category: "individuals"
        }
      ]
    },
    {
      id: "about",
      type: "about",
      isVisible: true,
      title: "Sobre Nosotros",
      introText: [
        "En Anthrovia HR somos tu aliado estratégico en la gestión y desarrollo del talento. Diseñamos soluciones integrales y a medida que transforman organizaciones y maximizan el potencial de los equipos. Como consultora digital, acompañamos a personas y organizaciones sin límites geográficos, adaptándonos a cada cultura y necesidad.",
        "El nombre Anthrovia combina \"anthro\" (persona) y \"via\" (camino): representa nuestra visión práctica y estratégica del talento — un camino claro para que las personas y las organizaciones crezcan juntas. Trabajamos con metodologías probadas, entregables accionables y foco humano, para lograr resultados sostenibles y medibles."
      ],
      purpose: {
        title: "Nuestro Propósito",
        description: "Ser el puente que impulsa la evolución del talento y el desarrollo integral de las organizaciones."
      },
      mission: {
        title: "Nuestra Misión",
        description: "Potenciar el talento humano de las organizaciones mediante soluciones innovadoras y personalizadas que generen impacto real en su cultura, productividad y crecimiento. Nos comprometemos a ser el puente entre las empresas y el éxito de sus equipos."
      },
      videoUrl: "/bg-mov-1.mp4",
      values: [
        {
          iconName: "ShieldCheck",
          title: "Integridad",
          description: "Actuamos con ética, respeto y coherencia en cada acción"
        },
        {
          iconName: "Heart",
          title: "Compromiso",
          description: "Nos dedicamos completamente al éxito de nuestros clientes y sus equipos"
        },
        {
          iconName: "Users",
          title: "Colaboración",
          description: "Trabajamos en conjunto para crear soluciones innovadoras y efectivas"
        },
        {
          iconName: "Sparkles",
          title: "Sinergia",
          description: "Conectamos personas, ideas y propósitos para lograr resultados compartidos"
        },
        {
          iconName: "TrendingUp",
          title: "Innovación",
          description: "Adoptamos nuevas tendencias, tecnologías y metodologías en gestión de talento"
        }
      ]
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
      backgroundColor: 'linear-gradient(to right, #f8fafc, #e2e8f0)',
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
      title: "Conectemos",
      description: "\"El cambio comienza con una conversación\". Queremos conocer tu historia, tus desafíos y acompañarte en la evolución del talento dentro de tu organización. Escribinos y descubramos juntos cómo potenciar tu equipo.",
      whatsappNumber: "5492604085501",
      socialLinks: [
        {
          platform: "whatsapp",
          url: "https://wa.me/5492604085501",
          label: "Chatea con nosotros"
        },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/company/anthrovia-hr/",
          label: "Anthrovia HR"
        },
        {
          platform: "instagram",
          url: "https://www.instagram.com/anthrovia.hr/",
          label: "@anthrovia.hr"
        }
      ]
    },
    {
      id: "settings",
      type: "settings",
      isVisible: true,
      cvUrl: "https://talento.anthroviahr.com/",
      cvText: "Dejanos tu CV"
    }
  ]
};
