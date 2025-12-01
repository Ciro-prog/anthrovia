import { SiteContent } from "../types/cms";

export const initialContent: SiteContent = {
  sections: [
    {
      id: "hero",
      type: "hero",
      isVisible: true,
      title: "Anthrovia HR",
      subtitle: "Evolucionando el talento.",
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
        {
          iconName: "FileSearch",
          title: "Asesorías iniciales",
          description: "Diagnóstico estratégico rápido que identifica prioridades y propone una hoja de ruta práctica para gestionar talento y procesos.",
          color: "from-primary to-accent-teal"
        },
        {
          iconName: "Users",
          title: "Reclutamiento y Selección Estratégica por Competencias",
          description: "Identificamos, evaluamos y atraemos el mejor talento para tu organización mediante procesos estructurados y evaluaciones especializadas, asegurando incorporaciones alineadas a la cultura, los valores y los resultados del negocio.",
          color: "from-accent-teal to-primary-light"
        },
        {
          iconName: "Settings",
          title: "Diseño y Optimización de Procesos de RRHH",
          description: "Análisis y rediseño de los procesos clave del área con foco en la eficiencia, la trazabilidad y la experiencia del colaborador. Se aplican metodologías ágiles y herramientas digitales para simplificar tareas operativas, generar control de indicadores y fortalecer la toma de decisiones.",
          color: "from-primary-light to-accent-rose"
        },
        {
          iconName: "Heart",
          title: "Programas de Experiencia y Bienestar",
          description: "Desarrollamos programas que fortalecen la conexión entre las personas y su entorno laboral, integrando acciones de reconocimiento, bienestar integral y propuestas de salario emocional adaptadas a cada cultura organizacional. Nuestro enfoque impulsa el compromiso, promueve la motivación y genera experiencias laborales más significativas.",
          color: "from-accent-rose to-accent-burgundy"
        },
        {
          iconName: "GraduationCap",
          title: "Career Coaching & Desarrollo Profesional",
          description: "Brindamos acompañamiento personalizado para impulsar tu empleabilidad: optimizamos tu CV, potenciamos tu perfil de LinkedIn y te preparamos para entrevistas laborales con técnicas y estrategias actuales del mercado. Un enfoque práctico, claro y orientado a que te postules con seguridad y destaques en cada proceso.",
          color: "from-primary to-primary-light"
        },
        {
          iconName: "Layers",
          title: "Servicios complementarios",
          description: "Asesoría legal laboral, Compensaciones y beneficios, Administración de nómina, Employer Branding y People Analytics. (Disponibles próximamente.)",
          color: "from-accent-burgundy to-accent-teal"
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
    }
  ]
};
