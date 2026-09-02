export type SeedFormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'file'
  required?: boolean
  step?: number
  options?: { label: string; value: string }[]
}

export const defaultApplicationFormTitle =
  'Postulación – Asesor Comercial | Planes de Salud'

export const defaultApplicationFormSubtitle =
  'Gracias por tu interés en esta oportunidad. A través de este formulario buscamos conocer tu perfil, tu experiencia comercial y validar si estás alineado/a con la modalidad de trabajo y contratación.'

export const defaultApplicationFormFields: SeedFormField[] = [
  { name: 'lastName', label: 'Apellido', type: 'text', required: true, step: 1 },
  { name: 'firstName', label: 'Nombre', type: 'text', required: true, step: 1 },
  { name: 'age', label: 'Edad', type: 'text', required: true, step: 1 },
  { name: 'phone', label: 'Teléfono con WhatsApp', type: 'tel', required: true, step: 1 },
  { name: 'email', label: 'Correo electrónico', type: 'email', required: true, step: 1 },
  { name: 'linkedin', label: 'Perfil de LinkedIn (opcional)', type: 'text', required: false, step: 1 },
  { name: 'country', label: 'País', type: 'text', required: true, step: 1 },
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
  { name: 'careerRun', label: 'Carrera o cursos', type: 'text', required: false, step: 1 },
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
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'healthSalesExperienceDesc',
    label: 'Contanos brevemente dónde y qué vendías',
    type: 'textarea',
    required: false,
    step: 2,
  },
  {
    name: 'isWorking',
    label: '¿Actualmente estás trabajando?',
    type: 'select',
    required: true,
    step: 2,
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  { name: 'currentRole', label: '¿En qué área o rol trabajás?', type: 'text', required: false, step: 2 },
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
    name: 'remoteWorkAgreement',
    label: 'La posición es 100% remota. ¿Estás de acuerdo con esta modalidad?',
    type: 'select',
    required: true,
    step: 3,
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'commissionSchemeAgreement',
    label:
      'El esquema de ingresos es 100% a comisión, sin sueldo básico, e incluye escalas comisionales desde la primera venta. ¿Estás de acuerdo con este esquema?',
    type: 'select',
    required: true,
    step: 3,
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'contractTypeAgreement',
    label:
      'La modalidad de contratación es por prestación de servicios (no relación de dependencia). ¿Estás de acuerdo con esta forma de contratación?',
    type: 'select',
    required: true,
    step: 3,
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
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
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    name: 'hasInternet',
    label: '¿Tenés conexión estable a internet?',
    type: 'select',
    required: true,
    step: 3,
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
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
