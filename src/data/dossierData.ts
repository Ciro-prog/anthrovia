export interface ModuleItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  shortDescription: string;
  longDescription: string;
  keyFeatures: string[];
  colorClass: 'primary' | 'secondary' | 'tertiary';
}

export interface ModuleCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: 'primary' | 'secondary' | 'tertiary';
  modules: ModuleItem[];
}

export const DOSSIER_CATEGORIES: ModuleCategory[] = [
  {
    id: 'comunicacion',
    title: 'Comunicación interna',
    description: 'Conectividad y transparencia en toda la organización',
    icon: 'hub',
    colorClass: 'primary',
    modules: [
      {
        id: 'red-social',
        title: 'Red Social Interna',
        icon: 'public',
        badge: 'Engagement',
        shortDescription: 'Espacio de interacción social con muros dinámicos y reacciones.',
        longDescription: 'Fomenta la interacción social y el sentido de pertenencia. Los colaboradores pueden realizar publicaciones, reaccionar a novedades corporativas, interactuar en muros por áreas y participar de encuestas de pulso instantáneas.',
        keyFeatures: ['Muros interactivos y comentarios', 'Reacciones y multimedia', 'Encuestas rápidas corporativas', 'Grupos de afinidad por áreas'],
        colorClass: 'primary'
      },
      {
        id: 'noticias',
        title: 'Noticias',
        icon: 'newspaper',
        badge: 'Información',
        shortDescription: 'Portal centralizado para comunicados corporativos.',
        longDescription: 'Canal oficial de comunicación institucional para asegurar que toda la empresa esté alineada con las decisiones corporativas, eventos futuros, reconocimientos, revistas digitales y lanzamientos importantes.',
        keyFeatures: ['Comunicados con segmentación', 'Programación de publicaciones', 'Notificaciones push en tiempo real', 'Estadísticas de lectura'],
        colorClass: 'primary'
      },
      {
        id: 'biblioteca',
        title: 'Biblioteca de Recursos',
        icon: 'local_library',
        badge: 'Documentación',
        shortDescription: 'Repositorio de documentos y políticas esenciales.',
        longDescription: 'Centraliza manuales, políticas de la empresa, credenciales, información de obra social y cualquier recurso de consulta frecuente, asegurando que todos los colaboradores accedan a información actualizada.',
        keyFeatures: ['Carpeta jerárquica ilimitada', 'Filtro de búsqueda inteligente', 'Accesos con control de permisos', 'Formatos PDF, imágenes y enlaces'],
        colorClass: 'primary'
      },
      {
        id: 'chat',
        title: 'Chat & Canales',
        icon: 'chat',
        badge: 'Agilidad',
        shortDescription: 'Mensajería instantánea y canales de soporte.',
        longDescription: 'Agiliza la comunicación diaria sin salir del ecosistema seguro de la empresa. Permite conversaciones individuales, grupales y canales corporativos para resolver incidencias de forma inmediata.',
        keyFeatures: ['Chats encriptados e individuales', 'Canales públicos y privados', 'Buscador de contactos del organigrama', 'Compartir archivos directo'],
        colorClass: 'primary'
      },
      {
        id: 'agenda',
        title: 'Agenda Corporativa',
        icon: 'calendar_month',
        badge: 'Hitos',
        shortDescription: 'Calendario compartido con fechas clave e hitos.',
        longDescription: 'Alinea al equipo con las fechas clave de la empresa: reuniones generales, hitos comerciales, festivos corporativos y fechas importantes para cada colaborador.',
        keyFeatures: ['Integración con calendario de equipos', 'Recordatorio automático de eventos', 'Invitaciones directas por sucursal', 'Vistas mensual, semanal y diaria'],
        colorClass: 'primary'
      },
      {
        id: 'organigrama',
        title: 'Organigrama Dinámico',
        icon: 'account_tree',
        badge: 'Estructura',
        shortDescription: 'Visualización jerárquica y funcional en tiempo real.',
        longDescription: 'Facilita el entendimiento de la jerarquía organizacional. Los colaboradores pueden navegar por la estructura del equipo, identificar dependencias jerárquicas y contactar directamente a cualquier líder o par.',
        keyFeatures: ['Actualización automática en tiempo real', 'Ficha rápida de contacto por nodo', 'Búsqueda por nombre o posición', 'Filtro por departamento y sucursal'],
        colorClass: 'primary'
      },
      {
        id: 'videollamadas',
        title: 'Videollamadas & Streaming',
        icon: 'video_call',
        badge: 'Conectividad',
        shortDescription: 'Reuniones virtuales nativas y transmisiones.',
        longDescription: 'Herramienta de videollamadas 100% integrada en el portal. Permite realizar reuniones de equipo o transmisiones en directo para toda la empresa (Town Halls) sin licencias de terceros.',
        keyFeatures: ['Llamadas de alta definición integradas', 'Streaming en vivo (Town Halls)', 'Grabación de sesiones directo en la nube', 'Interacciones por chat de video'],
        colorClass: 'primary'
      }
    ]
  },
  {
    id: 'gestion-rrhh',
    title: 'Gestión de RR. HH.',
    description: 'Eficiencia administrativa y digitalización del empleado',
    icon: 'badge',
    colorClass: 'secondary',
    modules: [
      {
        id: 'vacaciones',
        title: 'Vacaciones y Permisos',
        icon: 'beach_access',
        badge: 'Autogestión',
        shortDescription: 'Solicitud y aprobación autónoma de licencias.',
        longDescription: 'Permite a los colaboradores solicitar días de vacaciones, ausencias por enfermedad o permisos especiales de forma online. Los líderes reciben notificaciones automáticas y pueden aprobar en un clic.',
        keyFeatures: ['Cálculo y saldo de días en tiempo real', 'Calendario grupal de ausencias para líderes', 'Flujo de aprobación multinivel', 'Carga de justificativos médicos'],
        colorClass: 'secondary'
      },
      {
        id: 'recibos',
        title: 'Recibos & Firma Digital',
        icon: 'draw',
        badge: 'Legal',
        shortDescription: 'Firma electrónica de recibos de sueldo y contratos.',
        longDescription: 'Elimina el papel de los procesos administrativos. Los colaboradores visualizan, descargan y firman sus recibos de sueldo y contratos mediante firma electrónica válida por ley.',
        keyFeatures: ['Firma electrónica con validez jurídica', 'Notificaciones de recibos pendientes', 'Historial completo de liquidaciones', 'Descarga masiva segura'],
        colorClass: 'secondary'
      },
      {
        id: 'legajos',
        title: 'Archivos / Legajos',
        icon: 'folder_shared',
        badge: 'Administración',
        shortDescription: 'Expediente digital único por colaborador.',
        longDescription: 'Centraliza el legajo del colaborador en un solo lugar: datos personales, familiares, obra social, estudios, habilidades y certificaciones corporativas con control de acceso.',
        keyFeatures: ['Actualización autónoma por colaborador', 'Control de permisos por rol de RRHH', 'Alertas de vencimiento de documentos', 'Historial de cargos y salarios'],
        colorClass: 'secondary'
      },
      {
        id: 'onboarding',
        title: 'Onboarding Digital',
        icon: 'person_add',
        badge: 'Bienvenida',
        shortDescription: 'Flujo de bienvenida e integración digital.',
        longDescription: 'Garantiza una incorporación exitosa. Define pasos estructurados para el nuevo colaborador, como ver videos de bienvenida, cargar documentación legal y agendar su primera sesión de inducción.',
        keyFeatures: ['Rutas paso a paso para el ingresante', 'Asignación de tutores corporativos', 'Seguimiento de avance del líder', 'Checklist de tareas iniciales'],
        colorClass: 'secondary'
      }
    ]
  },
  {
    id: 'operaciones',
    title: 'Operaciones',
    description: 'Control y agilidad en los procesos diarios',
    icon: 'settings_applications',
    colorClass: 'tertiary',
    modules: [
      {
        id: 'asistencia',
        title: 'Control de Asistencia',
        icon: 'more_time',
        badge: 'Operación',
        shortDescription: 'Registro de jornada con geolocalización o biometría.',
        longDescription: 'Facilita el marcaje de entrada y salida para colaboradores presenciales, remotos y personal de planta. Incluye validaciones por ubicación y sincronización directa con nómina.',
        keyFeatures: ['Marcaje móvil con geolocalización', 'Reconocimiento facial biométrico', 'Gestión y asignación de turnos', 'Cálculo de horas extras automático'],
        colorClass: 'tertiary'
      },
      {
        id: 'formularios',
        title: 'Formularios / Trámites',
        icon: 'assignment_turned_in',
        badge: 'Automatización',
        shortDescription: 'Constructor de procesos internos dinámicos.',
        longDescription: 'Constructor visual de formularios para estandarizar cualquier solicitud: reembolso de viáticos, pedido de uniformes, reporte de accidentes de trabajo o declaraciones juradas.',
        keyFeatures: ['Creador visual de campos drag-and-drop', 'Flujo de firmas y aprobaciones', 'Exportación automática a PDF/Excel', 'Integración con almacenamiento de nube'],
        colorClass: 'tertiary'
      },
      {
        id: 'servicios',
        title: 'Gestión de Servicios (Ticketing)',
        icon: 'support_agent',
        badge: 'Soporte',
        shortDescription: 'Ticketing para TI, mantenimiento y administración.',
        longDescription: 'Canaliza los requerimientos de los colaboradores hacia los departamentos correspondientes (TI, Mantenimiento, Administración, Compras) garantizando tiempos de resolución.',
        keyFeatures: ['Creación rápida de tickets con fotos', 'Definición y control de SLAs', 'Asignación automática por área', 'Panel de control e historial'],
        colorClass: 'tertiary'
      }
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura Empresarial',
    description: 'Fortalecimiento de la identidad y el compromiso',
    icon: 'diversity_1',
    colorClass: 'primary',
    modules: [
      {
        id: 'hitos',
        title: 'Hitos y Celebraciones',
        icon: 'cake',
        badge: 'Cercanía',
        shortDescription: 'Automatización de felicitaciones por cumpleaños y aniversarios.',
        longDescription: 'Crea una cultura cercana. La plataforma felicita automáticamente en el muro general y envía notificaciones por cumpleaños, aniversarios de ingreso a la empresa o hitos del equipo.',
        keyFeatures: ['Publicaciones automáticas configurables', 'Felicitación rápida desde el muro', 'Muro interactivo de deseos', 'Envío de tarjetas de felicitación personalizadas'],
        colorClass: 'primary'
      },
      {
        id: 'reconocimientos',
        title: 'Reconocimientos (Kudos)',
        icon: 'emoji_events',
        badge: 'Motivación',
        shortDescription: 'Sistema de premios basado en valores corporativos.',
        longDescription: 'Fomenta el agradecimiento mutuo. Los colaboradores pueden enviar reconocimientos o "Kudos" públicos a sus compañeros de trabajo que mejor representen los valores de la empresa.',
        keyFeatures: ['Medallas asociadas a valores de la empresa', 'Muro de Kudos visibles para todos', 'Suma de puntos por kudos recibidos', 'Tablero mensual de los más reconocidos'],
        colorClass: 'primary'
      },
      {
        id: 'marketplace',
        title: 'Marketplace Interno',
        icon: 'shopping_bag',
        badge: 'Comunidad',
        shortDescription: 'Espacio de beneficios y canje entre pares.',
        longDescription: 'Crea una red interna de economía colaborativa donde los empleados pueden publicar productos para venta/intercambio o canjear puntos de la plataforma por beneficios corporativos.',
        keyFeatures: ['Canje de puntos por merchandising', 'Clasificados internos de compra/venta', 'Gestión de stock de premios por RRHH', 'Validación automática de transacciones'],
        colorClass: 'primary'
      }
    ]
  },
  {
    id: 'talento',
    title: 'Desarrollo de Talento',
    description: 'Crecimiento profesional y mejora continua',
    icon: 'trending_up',
    colorClass: 'secondary',
    modules: [
      {
        id: 'desempeno',
        title: 'Evaluación de Desempeño',
        icon: 'analytics',
        badge: 'Desarrollo',
        shortDescription: 'Feedback 360 y evaluaciones por competencias.',
        longDescription: 'Mide y potencia el talento. Implementa evaluaciones de desempeño anuales o semestrales con retroalimentación en 360 grados, permitiendo autoevaluación, evaluación de líderes y pares.',
        keyFeatures: ['Configuración flexible de competencias', 'Feedback 360 y autoevaluaciones', 'Matriz 9-Box y planes de acción', 'Reportes analíticos de brechas'],
        colorClass: 'secondary'
      },
      {
        id: 'cursos',
        title: 'Cursos / LMS',
        icon: 'school',
        badge: 'Aprendizaje',
        shortDescription: 'Capacitación y certificaciones internas corporativas.',
        longDescription: 'Plataforma integrada de aprendizaje para capacitar y evaluar constantemente a tus colaboradores. Sube contenido multimedia, crea exámenes interactivos y emite certificados.',
        keyFeatures: ['Cursos estructurados por módulos', 'Cuestionarios de evaluación automáticos', 'Generación de certificados dinámicos', 'Reportes de avance y participación'],
        colorClass: 'secondary'
      },
      {
        id: 'encuestas',
        title: 'Encuestas & Clima',
        icon: 'quiz',
        badge: 'Escucha Activa',
        shortDescription: 'Medición de clima organizacional en tiempo real.',
        longDescription: 'Mide la satisfacción y bienestar de tus equipos de manera anónima y regular. Diseña encuestas de clima completas o pulsos breves para tomar decisiones basadas en datos.',
        keyFeatures: ['Encuestas 100% anónimas o nominativas', 'Métricas de participación y sentimiento', 'Dashboard analítico para RRHH', 'Preguntas con escalas de valoración de 1-5'],
        colorClass: 'secondary'
      },
      {
        id: 'experience',
        title: 'People Experience & Bienestar',
        icon: 'volunteer_activism',
        badge: 'Bienestar',
        shortDescription: 'Seguimiento y métricas del bienestar laboral.',
        longDescription: 'Promueve el bienestar integral del colaborador a través de desafíos de salud, hábitos saludables y acompañamiento en aspectos físicos y emocionales dentro de su ciclo de vida.',
        keyFeatures: ['Programas de salud y bienestar', 'Tips de hábitos saludables automáticos', 'Canal confidencial de ayuda psicológica/legal', 'Eventos corporativos de integración'],
        colorClass: 'secondary'
      },
      {
        id: 'okrs',
        title: 'Objetivos (OKRs)',
        icon: 'target',
        badge: 'Estrategia',
        shortDescription: 'Alineación estratégica mediante OKRs.',
        longDescription: 'Alinea los esfuerzos de todos los colaboradores con la estrategia de la compañía. Define Objetivos corporativos, desglósalos en Resultados Clave y visualiza el progreso colectivo.',
        keyFeatures: ['Visualización en cascada de OKRs', 'Seguimiento con barras de progreso', 'Check-ins periódicos automatizados', 'Conexión entre objetivos e iniciativas'],
        colorClass: 'secondary'
      }
    ]
  }
];
