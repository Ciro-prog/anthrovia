export type SeedFormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'file'
  required?: boolean
  step?: number
  multiple?: boolean
  showWhenField?: string
  showWhenEquals?: string
  options?: { label: string; value: string }[]
}

const yesNo = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
]

export const defaultApplicationFormTitle =
  'Postulación – Asesor Comercial | Planes de Salud'

export const defaultApplicationFormSubtitle =
  'Gracias por tu interés en esta oportunidad. A través de este formulario buscamos conocer tu perfil, tu experiencia comercial y validar si estás alineado/a con la modalidad de trabajo y contratación. La información será utilizada únicamente con fines de evaluación para procesos de selección. Completá todos los campos con datos reales y actualizados.'

export const defaultApplicationFormFields: SeedFormField[] = [
  { name: 'lastName', label: 'Apellido', type: 'text', required: true, step: 1 },
  { name: 'firstName', label: 'Nombre', type: 'text', required: true, step: 1 },
  { name: 'age', label: 'Edad', type: 'text', required: true, step: 1 },
  { name: 'phone', label: 'Teléfono con WhatsApp', type: 'tel', required: true, step: 1 },
  { name: 'email', label: 'Correo electrónico', type: 'email', required: true, step: 1 },
  { name: 'linkedin', label: 'Perfil de LinkedIn (si tenés)', type: 'text', required: false, step: 1 },
  { name: 'country', label: 'País de residencia actual', type: 'text', required: true, step: 1 },
  { name: 'province', label: 'Provincia', type: 'text', required: true, step: 1 },
  { name: 'city', label: 'Ciudad', type: 'text', required: true, step: 1 },
  {
    name: 'residencyStatus',
    label: 'En caso de ser extranjero/a: ¿contás con residencia habilitante en Argentina y CUIL?',
    type: 'select',
    required: true,
    step: 1,
    options: [
      { label: 'No aplica (soy argentino/a)', value: 'no_aplica' },
      { label: 'Sí, tengo documentación vigente', value: 'si_documentacion' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'educationLevel',
    label: 'Nivel educativo más alto alcanzado',
    type: 'select',
    required: true,
    step: 1,
    options: [
      { label: 'Secundario incompleto', value: 'Secundario incompleto' },
      { label: 'Secundario completo', value: 'Secundario completo' },
      { label: 'Terciario en curso', value: 'Terciario en curso' },
      { label: 'Terciario completo', value: 'Terciario completo' },
      { label: 'Universitario en curso', value: 'Universitario en curso' },
      { label: 'Universitario completo', value: 'Universitario completo' },
    ],
  },
  {
    name: 'secondaryStatus',
    label: 'En relación al nivel secundario, ¿cuál es tu situación actual?',
    type: 'select',
    required: true,
    step: 1,
    showWhenField: 'educationLevel',
    showWhenEquals: 'Secundario completo',
    options: [
      { label: 'Tengo todas las materias aprobadas', value: 'todas_aprobadas' },
      { label: 'Tengo materias pendientes', value: 'materias_pendientes' },
      { label: 'Cuento con analítico / título en trámite', value: 'analitico_en_tramite' },
    ],
  },
  {
    name: 'educationArea',
    label: 'Área de formación principal',
    type: 'select',
    required: true,
    step: 1,
    options: [
      { label: 'Comercial / Ventas', value: 'comercial' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Negocios', value: 'negocios' },
      { label: 'Gestión', value: 'gestion' },
      { label: 'Marketing de servicios de salud', value: 'marketing_salud' },
      { label: 'APM', value: 'apm' },
      { label: 'Otra', value: 'otra' },
    ],
  },
  { name: 'careerRun', label: 'Carrera cursada o en curso', type: 'text', required: false, step: 1 },
  {
    name: 'salesExperienceYears',
    label: '¿Cuántos años de experiencia tenés en ventas?',
    type: 'select',
    required: true,
    step: 2,
    options: [
      { label: 'Menos de 2 años', value: 'Menos de 2 años' },
      { label: '2–3 años', value: '2–3 años' },
      { label: '3–4 años', value: '3–4 años' },
      { label: 'Más de 4 años', value: 'Más de 4 años' },
    ],
  },
  {
    name: 'healthSalesExperience',
    label: '¿Tenés experiencia en venta de planes de salud / medicina prepaga u obras sociales?',
    type: 'select',
    required: true,
    step: 2,
    options: yesNo,
  },
  {
    name: 'healthSalesExperienceDesc',
    label: 'Contanos brevemente dónde y qué vendías.',
    type: 'textarea',
    required: true,
    step: 2,
    showWhenField: 'healthSalesExperience',
    showWhenEquals: 'si',
  },
  {
    name: 'salesSectors',
    label: 'Además de salud, ¿en qué rubros vendiste?',
    type: 'select',
    required: false,
    multiple: true,
    step: 2,
    options: [
      { label: 'Seguros', value: 'seguros' },
      { label: 'Financiera', value: 'financiera' },
      { label: 'Tecnología', value: 'tecnologia' },
      { label: 'Estética / cosmética', value: 'estetica' },
      { label: 'Call center', value: 'call_center' },
      { label: 'Venta consultiva', value: 'venta_consultiva' },
      { label: 'Otro', value: 'otro' },
    ],
  },
  {
    name: 'isWorking',
    label: '¿Actualmente estás trabajando?',
    type: 'select',
    required: true,
    step: 2,
    options: yesNo,
  },
  {
    name: 'currentRole',
    label: '¿En qué área o rol trabajás?',
    type: 'text',
    required: true,
    step: 2,
    showWhenField: 'isWorking',
    showWhenEquals: 'si',
  },
  {
    name: 'lookingForChange',
    label: '¿Estás buscando cambiar de trabajo en el corto plazo?',
    type: 'select',
    required: true,
    step: 2,
    showWhenField: 'isWorking',
    showWhenEquals: 'si',
    options: yesNo,
  },
  {
    name: 'willingToChange',
    label:
      'Este rol requiere dedicación full time y no aplica como complemento laboral. ¿Estarías dispuesto/a a evaluar un cambio si la propuesta resulta alineada a tus expectativas?',
    type: 'select',
    required: true,
    step: 2,
    showWhenField: 'lookingForChange',
    showWhenEquals: 'no',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
      { label: 'Tal vez / dependería de la propuesta', value: 'tal_vez' },
    ],
  },
  {
    name: 'changeCondition',
    label: '¿De qué dependería que evalúes un cambio laboral?',
    type: 'textarea',
    required: true,
    step: 2,
    showWhenField: 'willingToChange',
    showWhenEquals: 'tal_vez',
  },
  {
    name: 'startDate',
    label: '¿Cuándo podrías comenzar?',
    type: 'select',
    required: true,
    step: 2,
    options: [
      { label: 'Inmediato', value: 'inmediato' },
      { label: 'En 15 días', value: 'en_15_dias' },
      { label: 'En 1 mes', value: 'en_1_mes' },
      { label: 'En más de 2 meses', value: 'mas_de_2_meses' },
    ],
  },
  {
    name: 'motivation',
    label: '¿Por qué te interesa esta oportunidad laboral?',
    type: 'textarea',
    required: true,
    step: 2,
  },
  {
    name: 'healthAttraction',
    label: '¿Qué te atrae del rubro salud y de comercializar planes médicos?',
    type: 'textarea',
    required: true,
    step: 2,
  },
  {
    name: 'remoteWorkAgreement',
    label: 'La posición es 100% remota. ¿Estás de acuerdo con esta modalidad?',
    type: 'select',
    required: true,
    step: 3,
    options: yesNo,
  },
  {
    name: 'commissionSchemeAgreement',
    label:
      'El esquema de ingresos es 100% a comisión, sin sueldo básico, e incluye escalas comisionales desde la primera venta. ¿Estás de acuerdo con este esquema?',
    type: 'select',
    required: true,
    step: 3,
    options: yesNo,
  },
  {
    name: 'desiredIncomeScheme',
    label: '¿Qué tipo de esquema de ingresos estás buscando actualmente?',
    type: 'text',
    required: true,
    step: 3,
    showWhenField: 'commissionSchemeAgreement',
    showWhenEquals: 'no',
  },
  {
    name: 'contractTypeAgreement',
    label:
      'La modalidad de contratación es por prestación de servicios (no relación de dependencia). ¿Estás de acuerdo con esta forma de contratación?',
    type: 'select',
    required: true,
    step: 3,
    options: yesNo,
  },
  {
    name: 'monotributo',
    label: '¿Contás con monotributo o estarías dispuesto/a a gestionarlo para facturar tus servicios?',
    type: 'select',
    required: true,
    step: 3,
    options: [
      { label: 'Ya tengo', value: 'ya_tengo' },
      { label: 'Lo gestionaría', value: 'lo_gestionaria' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'hasPC',
    label: '¿Contás con PC propia para trabajar?',
    type: 'select',
    required: true,
    step: 3,
    options: yesNo,
  },
  {
    name: 'hasInternet',
    label: '¿Tenés conexión estable a internet?',
    type: 'select',
    required: true,
    step: 3,
    options: yesNo,
  },
  { name: 'cv', label: 'Adjuntá tu CV actualizado (PDF, JPG o PNG)', type: 'file', required: true, step: 3 },
  {
    name: 'consent',
    label:
      'Brindo mi conformidad para que mis datos personales y la información enviada en este formulario sean utilizados en procesos de reclutamiento y selección actuales o futuros. Autorizo a ser contactado/a para avanzar en el proceso.',
    type: 'checkbox',
    required: true,
    step: 3,
  },
]
