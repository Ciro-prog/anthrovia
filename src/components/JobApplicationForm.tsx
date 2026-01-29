import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  CheckCircle, 
  Upload, 
  AlertCircle,
  Laptop,
  Wifi,
  Handshake,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Linkedin,
  Instagram
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LOCATIONS } from '../data/argentina-locations';
import LegalModal from './LegalModal';

// --- Constants ---

const EDUCATION_LEVELS = [
  'Secundario incompleto',
  'Secundario completo',
  'Terciario en curso',
  'Terciario completo',
  'Universitario en curso',
  'Universitario completo'
];

const STUDY_AREAS = [
  'Comercial / Ventas',
  'Marketing',
  'Negocios',
  'Gestión',
  'Marketing de servicios de salud',
  'APM',
  'Otra'
];

const SALES_EXP_YEARS = [
  'Menos de 2 años',
  '2–3 años',
  '3–4 años',
  'Más de 4 años'
];

const OTHER_SALES_TYPES = [
  'Seguros',
  'Financiera',
  'Tecnología',
  'Estética / cosmética',
  'Call center',
  'Venta consultiva',
  'Otro'
];

// --- Validation Schema ---

const formSchema = z.object({
  // Sección 2: Datos Personales
  lastName: z.string().min(2, 'Ingresa tu apellido'),
  firstName: z.string().min(2, 'Ingresa tu nombre'),
  age: z.string().regex(/^\d+$/, 'Ingresa una edad válida'),
  phone: z.string().min(8, 'Ingresa un teléfono válido'),
  email: z.string().email('Email inválido'),
  linkedin: z.string().optional().or(z.literal('')),

  // Sección 3: Ubicación y Documentación
  country: z.string().min(1, 'Ingresa tu país'),
  province: z.string().min(1, 'Ingresa tu provincia'),
  city: z.string().min(1, 'Ingresa tu ciudad'),
  cityOther: z.string().optional(),
  residencyStatus: z.enum([
    'no_aplica', 
    'si_documentacion', 
    'no'
  ]),

  // Sección 4: Formación
  educationLevel: z.string().min(1, 'Selecciona tu nivel educativo'),
  secondaryStatus: z.enum(['aprobadas', 'pendientes', 'en_tramite']).optional(),
  studyArea: z.string().min(1, 'Selecciona tu área de formación'),
  studyAreaOther: z.string().optional(),
  careerRun: z.string().optional(),

  // Sección 5: Experiencia Comercial
  salesExperienceYears: z.string().min(1, 'Selecciona tus años de experiencia'),
  healthSalesExperience: z.enum(['si', 'no']),
  healthSalesExperienceDesc: z.string().optional(),
  otherSalesExperience: z.array(z.string()).optional(),
  otherSalesExperienceOther: z.string().optional(),

  // Sección 6: Situación Laboral y Disponibilidad
  isWorking: z.enum(['si', 'no']),
  currentRole: z.string().optional(),
  lookingForChange: z.enum(['si', 'no']).optional(),
  willingToChange: z.enum(['si', 'no', 'depende']).optional(),
  changeCondition: z.string().optional(),
  startDate: z.string().min(1, 'Selecciona cuándo podrías comenzar'),

  // Sección 7: Modalidad y Condiciones
  remoteWorkAgreement: z.string().refine(val => val === 'si' || val === 'no', { message: 'Debes responder sobre la modalidad remota' }),
  
  commissionSchemeAgreement: z.string().refine(val => val === 'si' || val === 'no', { message: 'Debes responder sobre el esquema de ingresos' }),
    
  desiredIncomeScheme: z.string().optional(),
  
  contractTypeAgreement: z.string().refine(val => val === 'si' || val === 'no', { message: 'Debes responder sobre la contratación' }),
    
  monotributo: z.string().refine(val => ['ya_tengo', 'lo_gestionaria', 'no'].includes(val), { message: 'Selecciona tu situación de monotributo' }),

  // Sección 8: Requisitos Técnicos
  hasPC: z.string().refine(val => val === 'si' || val === 'no', { message: 'Selecciona si tienes PC' }),
    
  hasInternet: z.string().refine(val => val === 'si' || val === 'no', { message: 'Selecciona si tienes internet estable' }),

  // Sección 9: Motivación
  motivationStats: z.string().min(10, 'Cuéntanos por qué te interesa esta oportunidad'),

  motivationHealth: z.string().min(10, 'Cuéntanos qué te atrae del rubro salud'),

  // Sección 10: CV (handled via state/file input, validated manually on submit)
  
  // Sección 11: Consentimiento
  consent: z.literal(true, {
    message: 'Debes brindar tu conformidad para continuar'
  })

}).superRefine((data, ctx) => {
  // Logic for Education
  if (data.educationLevel === 'Secundario completo' && !data.secondaryStatus) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Indica tu situación del secundario',
      path: ['secondaryStatus']
    });
  }
  if (data.studyArea === 'Otra' && !data.studyAreaOther) {
    ctx.addIssue({
       code: z.ZodIssueCode.custom,
       message: 'Especifica el área',
       path: ['studyAreaOther']
    });
  }

  // Logic for City Other
  if ((data.city === 'Otros' || data.city === 'Otro') && !data.cityOther) {
     ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Especifique su ciudad',
        path: ['cityOther']
     });
  }

  // Logic for Sales Exp
  if (data.healthSalesExperience === 'si' && !data.healthSalesExperienceDesc) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Cuéntanos sobre tu experiencia en salud',
      path: ['healthSalesExperienceDesc']
    });
  }
  if (data.otherSalesExperience?.includes('Otro') && !data.otherSalesExperienceOther) {
     ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Especifica el otro rubro',
        path: ['otherSalesExperienceOther']
     });
  }

  // Logic for Work Status
  if (data.isWorking === 'si') {
    if (!data.currentRole) {
       ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Indica tu rol actual', path: ['currentRole'] });
    }
    if (!data.lookingForChange) {
       ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Indica si buscas cambio', path: ['lookingForChange'] });
    }
  } else {
    // Not working
    if (data.willingToChange === undefined) { 
        // We only check if specific logic requires it, but for "No" working, the prompt logic was slightly ambiguous.
        // Assuming we rely on the willingToChange field being presented and required if rendered.
        // But if 'isWorking' is NO, we render nothing about "willingToChange" in the JSX?
        // Let's check JSX. 
        // In JSX: if isWorking === 'si' -> render role, lookingForChange.
        // if lookingForChange === 'no' -> render willingToChange.
        // It seems if isWorking === 'no', we just go to startDate?
        // Let's verify prompt deeply later if needed, but for now ensure we don't block.
    }
  }

  // Logic fix based on re-reading prompt structure:
  if (data.isWorking === 'si') {
     if (data.lookingForChange === 'no') {
        if (!data.willingToChange) {
           ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Selecciona una opción', path: ['willingToChange'] });
        }
        if (data.willingToChange === 'depende' && !data.changeCondition) {
           ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Indica de qué dependería', path: ['changeCondition'] });
        }
     }
  }

  // Logic for Conditions
  if (data.commissionSchemeAgreement === 'no' && !data.desiredIncomeScheme) {
     ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Indica qué esquema buscas', path: ['desiredIncomeScheme'] });
  }

});

type FormData = z.infer<typeof formSchema>;

interface JobApplicationFormProps {
  webhookUrl?: string;
}

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4 mb-8 pb-8 border-b border-durazno/20 last:border-0 last:pb-0 last:mb-0">
    <h3 className="font-playfair text-xl text-verde-profundo font-semibold mb-6 flex items-center gap-2">
      {title}
    </h3>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export default function JobApplicationForm({ webhookUrl = '' }: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy'
  });

  // Steps Field definitions for validation trigger
  const STEP_1_FIELDS: (keyof FormData)[] = [
     'lastName', 'firstName', 'age', 'phone', 'email', 'linkedin',
     'country', 'province', 'city', 'cityOther', 'residencyStatus',
     'educationLevel', 'secondaryStatus', 'studyArea', 'studyAreaOther', 'careerRun'
  ];
  const STEP_2_FIELDS: (keyof FormData)[] = [
     'salesExperienceYears', 'healthSalesExperience', 'healthSalesExperienceDesc', 'otherSalesExperience', 'otherSalesExperienceOther',
     'isWorking', 'currentRole', 'lookingForChange', 'willingToChange', 'changeCondition', 'startDate'
  ];

  const {
     trigger,
     register,
     handleSubmit,
     watch,
     reset,
     setValue,
     clearErrors,
     formState: { errors, touchedFields }
  } = useForm<any>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched', // Validate only when touched to prevent premature errors
    defaultValues: {
      otherSalesExperience: [],
      consent: undefined 
    }
  });

  /*
  const openLegalModal = (type: 'privacy' | 'terms') => {
    setLegalModal({ isOpen: true, type });
  };
  */

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) fieldsToValidate = STEP_1_FIELDS;
    if (currentStep === 2) fieldsToValidate = STEP_2_FIELDS;

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Watchers for conditional rendering
  const educationLevel = watch('educationLevel');
  const studyArea = watch('studyArea');
  const healthSalesExperience = watch('healthSalesExperience');
  const otherSalesExperience = watch('otherSalesExperience');
  const isWorking = watch('isWorking');
  const lookingForChange = watch('lookingForChange');
  const willingToChange = watch('willingToChange');
  const commissionSchemeAgreement = watch('commissionSchemeAgreement');
  const country = watch('country');
  const province = watch('province');
  const city = watch('city');

  // --- Effects to clear conditional fields ---

  // Location
  useEffect(() => {
    if (country === 'Argentina') {
      // If switched to Argentina, clear manually typed province if it was not select-based (though layout handles this, good to be safe)
    } else {
       // If not Argentina, clear city select value if it doesn't match
    }
  }, [country]);

  // Education
  useEffect(() => {
    if (educationLevel !== 'Secundario completo') {
      setValue('secondaryStatus', undefined);
      clearErrors('secondaryStatus');
    }
  }, [educationLevel, setValue, clearErrors]);

  useEffect(() => {
    if (studyArea !== 'Otra') {
      setValue('studyAreaOther', '');
      clearErrors('studyAreaOther');
    }
  }, [studyArea, setValue, clearErrors]);

  // Sales Experience
  useEffect(() => {
    if (healthSalesExperience === 'no') {
      setValue('healthSalesExperienceDesc', '');
      clearErrors('healthSalesExperienceDesc');
    }
  }, [healthSalesExperience, setValue, clearErrors]);

  useEffect(() => {
    if (!otherSalesExperience?.includes('Otro')) {
      setValue('otherSalesExperienceOther', '');
      clearErrors('otherSalesExperienceOther');
    }
  }, [otherSalesExperience, setValue, clearErrors]);

  // Work Status
  useEffect(() => {
    if (isWorking === 'no') {
      setValue('currentRole', '');
      setValue('lookingForChange', undefined);
      // Also clear children of lookingForChange
      setValue('willingToChange', undefined);
      setValue('changeCondition', '');
      clearErrors(['currentRole', 'lookingForChange', 'willingToChange', 'changeCondition']);
    }
  }, [isWorking, setValue, clearErrors]);

  useEffect(() => {
    if (lookingForChange === 'si') {
      // If looking for change is YES, we DON'T ask willingToChange (it's implicit/not asked)
      setValue('willingToChange', undefined);
      setValue('changeCondition', '');
      clearErrors(['willingToChange', 'changeCondition']);
    }
  }, [lookingForChange, setValue, clearErrors]);

  useEffect(() => {
    if (willingToChange !== 'depende') {
      setValue('changeCondition', '');
      clearErrors('changeCondition');
    }
  }, [willingToChange, setValue, clearErrors]);

  // Commission
  useEffect(() => {
     if (commissionSchemeAgreement === 'si') {
        setValue('desiredIncomeScheme', '');
        clearErrors('desiredIncomeScheme');
     }
  }, [commissionSchemeAgreement, setValue, clearErrors]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
   
    if (selectedFile) {
       const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
       if (!validTypes.includes(selectedFile.type)) {
         setFileError('Por favor sube un archivo PDF, PNG o JPG');
         setFile(null);
         return;
       }
       if (selectedFile.size > 10 * 1024 * 1024) { 
         setFileError('El archivo no debe superar los 10MB');
         setFile(null);
         return;
       }
       setFile(selectedFile);
       setFileError(''); // Clear error on successful select
    }
  };

  // Submit handler
  const onSubmit = async (data: any) => {
    console.log('🚀 Iniciando envío de formulario...');
    console.log('Webhook URL configurada:', webhookUrl);

    if (!file) {
      console.warn('❌ No hay archivo adjunto');
      setFileError('Por favor adjunta tu CV');
      return;
    }
    if (!webhookUrl) {
      console.error('❌ URL del webhook no configurada/vacía');
      setSubmitStatus('error');
      setSubmitMessage('URL del webhook no configurada.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      
      // Define all fields to ensure consistent column order and existence in the payload
      const ALL_FIELDS: (keyof FormData)[] = [
        'lastName', 'firstName', 'age', 'phone', 'email', 'linkedin',
        'country', 'province', 'city', 'residencyStatus',
        'educationLevel', 'secondaryStatus', 'studyArea', 'studyAreaOther', 'careerRun',
        'salesExperienceYears', 'healthSalesExperience', 'healthSalesExperienceDesc', 
        'otherSalesExperience', 'otherSalesExperienceOther',
        'isWorking', 'currentRole', 'lookingForChange', 'willingToChange', 'changeCondition', 'startDate',
        'remoteWorkAgreement', 'commissionSchemeAgreement', 'desiredIncomeScheme', 
        'contractTypeAgreement', 'monotributo',
        'hasPC', 'hasInternet',
        'motivationStats', 'motivationHealth',
        'consent'
      ];

      ALL_FIELDS.forEach(key => {
        let value = data[key];
        
        // Handle city override if "Otros"
        if (key === 'city' && (value === 'Otros' || value === 'Otro')) {
           value = data.cityOther || value;
        }

        if (Array.isArray(value)) {
           // For arrays (like otherSalesExperience), join them or send empty string
           formData.append(key, value.length > 0 ? value.join(', ') : '');
        } else {
           // For all other fields, send value or empty string if undefined/null
           formData.append(key, value !== undefined && value !== null ? String(value) : '');
        }
      });

      formData.append('cv', file);
      formData.append('submittedAt', new Date().toISOString());

      // Log what we are sending (excluding file content)
      // Create a plain object for logging purposes
      const logData: Record<string, any> = {};
      formData.forEach((value, key) => {
         if (key !== 'cv') logData[key] = value;
         else logData[key] = file.name;
      });
      console.log('📦 Datos a enviar (Structure Fixed):', logData);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      if (response.ok) {
        console.log('✅ Envío exitoso');
        setSubmitStatus('success');
        setSubmitMessage('¡Postulación enviada con éxito!');
        reset();
        setFile(null);
        setCurrentStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const responseText = await response.text();
        console.error('❌ Error en la respuesta:', responseText);
        // Include the response body in the error message so the user sees it in the UI
        throw new Error(`Server Error (${response.status}): ${responseText.slice(0, 200)}`);
      }
    } catch (error: any) {
      console.error('❌ Error capturado en onSubmit:', error);
      setSubmitStatus('error');
      
      let errorDetails = error.message || String(error);
      if (error?.cause) {
        errorDetails += ` (Cause: ${error.cause})`;
      }
      
      setSubmitMessage(`Error al enviar (${errorDetails}). Por favor revisa tu conexión o intenta más tarde.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 px-2">
        {['Datos y Formación', 'Experiencia', 'Condiciones y CV'].map((label, index) => {
           const stepNum = index + 1;
           const isActive = currentStep === stepNum;
           const isCompleted = currentStep > stepNum;
           
           return (
             <div key={label} className="flex flex-col items-center">
               <div 
                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                   ${isActive ? 'bg-verde-profundo text-blanco scale-110 shadow-lg' : 
                     isCompleted ? 'bg-verde-profundo/80 text-blanco' : 'bg-durazno/20 text-gris-neutro'}`}
               >
                 {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNum}
               </div>
               <span className={`text-xs mt-2 font-montserrat hidden md:block ${isActive ? 'text-verde-profundo font-semibold' : 'text-gris-neutro'}`}>
                 {label}
               </span>
             </div>
           );
        })}
      </div>
      <div className="w-full h-2 bg-durazno/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-verde-profundo transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  if (submitStatus === 'success') {
    return <SuccessView />;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-blanco rounded-2xl shadow-xl p-6 md:p-10 border border-durazno/20 relative">
          
          <StepIndicator />

          <form onSubmit={handleSubmit(onSubmit as any)}>
            
            {/* --- STEP 1 --- */}
            {currentStep === 1 && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-crema/30 p-6 rounded-lg mb-8 border border-durazno/20 text-center space-y-3">
                   <p className="text-gris-neutro font-lora">Gracias por tu interés en esta oportunidad.</p>
                   <p className="text-gris-neutro font-lora">A través de este formulario buscamos conocer tu perfil, tu experiencia comercial y validar si estás alineado/a con la modalidad de trabajo y contratación.</p>
                   <p className="text-sm italic opacity-80 text-verde-profundo">
                     La información será utilizada únicamente con fines de evaluación para procesos de selección.
                     <br/>
                     Completá todos los campos con datos reales y actualizados.
                   </p>
                </div>
                <FormSection title="🔹 Datos Personales">
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Apellido *</label>
                        <input {...register('lastName')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                        {errors.lastName && <p className="text-vino text-xs mt-1">{errors.lastName.message as string}</p>}
                      </div>
                      <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Nombre *</label>
                        <input {...register('firstName')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                        {errors.firstName && <p className="text-vino text-xs mt-1">{errors.firstName.message as string}</p>}
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Edad *</label>
                        <input {...register('age')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                        {errors.age && <p className="text-vino text-xs mt-1">{errors.age.message as string}</p>}
                      </div>
                      <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Teléfono con WhatsApp *</label>
                        <input type="tel" {...register('phone')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" placeholder="+54 9..." />
                        {errors.phone && <p className="text-vino text-xs mt-1">{errors.phone.message as string}</p>}
                      </div>
                   </div>

                   <div>
                       <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Correo electrónico *</label>
                       <input type="email" {...register('email')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                       {errors.email && <p className="text-vino text-xs mt-1">{errors.email.message as string}</p>}
                   </div>

                   <div>
                       <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Perfil de LinkedIn (Opcional)</label>
                       <input type="url" {...register('linkedin')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                       {errors.linkedin && <p className="text-vino text-xs mt-1">{errors.linkedin.message as string}</p>}
                   </div>
                </FormSection>

                <FormSection title="🔹 Ubicación y Documentación">
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                         <label className="block mb-2 font-montserrat font-medium text-verde-profundo">País *</label>
                         <input {...register('country')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                         {errors.country && <p className="text-vino text-xs mt-1">{errors.country.message as string}</p>}
                      </div>
                      <div>
                         <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Provincia *</label>
                         {country?.toLowerCase() === 'argentina' ? (
                            <select {...register('province')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                               <option value="">Seleccionar...</option>
                               {Object.keys(LOCATIONS).sort().map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                         ) : (
                            <input {...register('province')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                         )}
                         {errors.province && <p className="text-vino text-xs mt-1">{errors.province.message as string}</p>}
                      </div>
                   </div>
                                      <div>
                          <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Ciudad *</label>
                           {country?.toLowerCase() === 'argentina' ? (
                                <select {...register('city')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                                   <option value="">Seleccionar...</option>
                                   {province && LOCATIONS[province]?.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                             ) : (
                                <input {...register('city')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                             )}
                          {errors.city && <p className="text-vino text-xs mt-1">{errors.city.message as string}</p>}
                          
                          {/* Custom City Input if "Otros" selected */}
                          {(city === 'Otros' || city === 'Otro') && (
                             <div className="mt-2 animate-fade-in pl-4 border-l-2 border-durazno/50">
                                <label className="block mb-1 font-lora text-sm text-verde-profundo">Especifique su ciudad:</label>
                                <input {...register('cityOther')} className="w-full px-4 py-2 rounded-lg border border-durazno/30 bg-blanco" placeholder="Ingrese nombre de su ciudad..." />
                                {errors.cityOther && <p className="text-vino text-xs mt-1">{errors.cityOther.message as string}</p>}
                             </div>
                          )}
                       </div>

                   <div>
                      <label className="block mb-2 font-montserrat font-medium text-verde-profundo">
                        En caso de ser extranjero/a: ¿contás con residencia habilitante en Argentina y CUIL? *
                      </label>
                      <div className="space-y-2">
                        {['no_aplica', 'si_documentacion', 'no'].map((val) => (
                           <label key={val} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" value={val} {...register('residencyStatus')} className="text-verde-profundo" />
                              <span className="font-lora text-sm">
                                {val === 'no_aplica' && 'No aplica (soy argentino/a)'}
                                {val === 'si_documentacion' && 'Sí, tengo documentación vigente'}
                                {val === 'no' && 'No'}
                              </span>
                           </label>
                        ))}
                      </div>
                      {errors.residencyStatus && <p className="text-vino text-xs mt-1">{errors.residencyStatus.message as string}</p>}
                   </div>
                </FormSection>

                <FormSection title="🔹 Formación">
                   <div>
                      <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Nivel educativo más alto alcanzado *</label>
                      <select {...register('educationLevel')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                         <option value="">Seleccionar...</option>
                         {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      {errors.educationLevel && <p className="text-vino text-xs mt-1">{errors.educationLevel.message as string}</p>}
                   </div>

                   {educationLevel === 'Secundario completo' && (
                     <div className="animate-fade-in pl-4 border-l-2 border-durazno">
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">En relación al nivel secundario, ¿cuál es tu situación actual? *</label>
                        <div className="space-y-2">
                           {['aprobadas', 'pendientes', 'en_tramite'].map(val => (
                              <label key={val} className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value={val} {...register('secondaryStatus')} className="text-verde-profundo" />
                                 <span className="font-lora text-sm">
                                    {val === 'aprobadas' && 'Tengo todas las materias aprobadas'}
                                    {val === 'pendientes' && 'Tengo materias pendientes'}
                                    {val === 'en_tramite' && 'Cuento con analítico / título en trámite'}
                                 </span>
                              </label>
                           ))}
                        </div>
                        {errors.secondaryStatus && <p className="text-vino text-xs mt-1">{errors.secondaryStatus.message as string}</p>}
                     </div>
                   )}

                   <div>
                      <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Área de formación principal *</label>
                      <select {...register('studyArea')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                         <option value="">Seleccionar...</option>
                         {STUDY_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                      {errors.studyArea && <p className="text-vino text-xs mt-1">{errors.studyArea.message as string}</p>}
                   </div>

                   {studyArea === 'Otra' && (
                      <div className="animate-fade-in">
                         <input {...register('studyAreaOther')} placeholder="Especificar área" className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                         {errors.studyAreaOther && <p className="text-vino text-xs mt-1">{errors.studyAreaOther.message as string}</p>}
                      </div>
                   )}

                   <div>
                      <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Carrera cursada o en curso</label>
                      <input {...register('careerRun')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                   </div>
                </FormSection>
              </div>
            )}

            {/* --- STEP 2 --- */}
            {currentStep === 2 && (
               <div className="animate-fade-in space-y-6">
                  <FormSection title="🔹 Experiencia Comercial">
                     <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿Cuántos años de experiencia tenés en ventas? *</label>
                        <select {...register('salesExperienceYears')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                           <option value="">Seleccionar...</option>
                           {SALES_EXP_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {errors.salesExperienceYears && <p className="text-vino text-xs mt-1">{errors.salesExperienceYears.message as string}</p>}
                     </div>

                     <div className="space-y-2">
                        <label className="block font-montserrat font-medium text-verde-profundo">¿Tenés experiencia en venta de planes de salud / medicina prepaga u obras sociales? *</label>
                        <div className="flex gap-6">
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" value="si" {...register('healthSalesExperience')} className="text-verde-profundo" />
                              <span className="font-lora">Sí</span>
                           </label>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" value="no" {...register('healthSalesExperience')} className="text-verde-profundo" />
                              <span className="font-lora">No</span>
                           </label>
                        </div>
                        {errors.healthSalesExperience && <p className="text-vino text-xs mt-1">{errors.healthSalesExperience.message as string}</p>}
                     </div>

                     {healthSalesExperience === 'si' && (
                        <div className="animate-fade-in pl-4 border-l-2 border-durazno">
                           <label className="block mb-2 font-montserrat font-medium text-verde-profundo">Contanos brevemente dónde y qué vendías *</label>
                           <textarea {...register('healthSalesExperienceDesc')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" rows={3} />
                           {errors.healthSalesExperienceDesc && <p className="text-vino text-xs mt-1">{errors.healthSalesExperienceDesc.message as string}</p>}
                        </div>
                     )}

                     <div>
                        <label className="block mb-3 font-montserrat font-medium text-verde-profundo">Además de salud, ¿en qué rubros vendiste?</label>
                        <div className="grid grid-cols-2 gap-2">
                           {OTHER_SALES_TYPES.map(type => (
                              <label key={type} className="flex items-center gap-2 cursor-pointer p-2 border border-durazno/10 rounded hover:bg-crema/50">
                                 <input type="checkbox" value={type} {...register('otherSalesExperience')} className="text-verde-profundo rounded" />
                                 <span className="font-lora text-sm">{type}</span>
                              </label>
                           ))}
                        </div>
                     </div>

                     {otherSalesExperience?.includes('Otro') && (
                        <div className="animate-fade-in">
                           <input {...register('otherSalesExperienceOther')} placeholder="Especificar otro rubro" className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                           {errors.otherSalesExperienceOther && <p className="text-vino text-xs mt-1">{errors.otherSalesExperienceOther.message as string}</p>}
                        </div>
                     )}
                  </FormSection>

                  <FormSection title="🔹 Situación Laboral y Disponibilidad">
                     <div className="space-y-4">
                        <label className="block font-montserrat font-medium text-verde-profundo">¿Actualmente estás trabajando? *</label>
                        <div className="flex gap-6">
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" value="si" {...register('isWorking')} className="text-verde-profundo" />
                              <span className="font-lora">Sí</span>
                           </label>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" value="no" {...register('isWorking')} className="text-verde-profundo" />
                              <span className="font-lora">No</span>
                           </label>
                        </div>
                        {errors.isWorking && <p className="text-vino text-xs mt-1">{errors.isWorking.message as string}</p>}
                     </div>

                     {/* Logic for Currently Working */}
                     {isWorking === 'si' && (
                        <div className="animate-fade-in space-y-4 pl-4 border-l-2 border-durazno">
                           <div>
                              <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿En qué área o rol trabajás? *</label>
                              <input {...register('currentRole')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                              {errors.currentRole && <p className="text-vino text-xs mt-1">{errors.currentRole.message as string}</p>}
                           </div>
                           
                           <div className="space-y-2">
                              <label className="block font-montserrat font-medium text-verde-profundo">¿Estás buscando cambiar de trabajo en el corto plazo? *</label>
                              <div className="flex gap-6">
                                 <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="si" {...register('lookingForChange')} className="text-verde-profundo" />
                                    <span className="font-lora">Sí</span>
                                 </label>
                                 <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="no" {...register('lookingForChange')} className="text-verde-profundo" />
                                    <span className="font-lora">No</span>
                                 </label>
                              </div>
                              {errors.lookingForChange && <p className="text-vino text-xs mt-1">{errors.lookingForChange.message as string}</p>}
                           </div>

                           {lookingForChange === 'no' && (
                              <div className="animate-fade-in space-y-3 pt-2">
                                 <p className="font-lora text-sm italic text-gray-600">Este rol requiere dedicación full time y no aplica como complemento laboral.</p>
                                 <label className="block font-montserrat font-medium text-verde-profundo">¿Estarías dispuesto/a a evaluar un cambio si la propuesta resulta alineada a tus expectativas? *</label>
                                 <div className="space-y-2">
                                    {['si', 'no', 'depende'].map(val => (
                                       <label key={val} className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" value={val} {...register('willingToChange')} className="text-verde-profundo" />
                                          <span className="font-lora">
                                             {val === 'si' && 'Sí'}
                                             {val === 'no' && 'No'}
                                             {val === 'depende' && 'Tal vez / dependería de la propuesta'}
                                          </span>
                                       </label>
                                    ))}
                                 </div>
                                 {errors.willingToChange && <p className="text-vino text-xs mt-1">{errors.willingToChange.message as string}</p>}

                                 {willingToChange === 'depende' && (
                                    <div className="animate-fade-in pt-2">
                                       <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿De qué dependería que evalúes un cambio laboral? *</label>
                                       <textarea {...register('changeCondition')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" rows={2} />
                                       {errors.changeCondition && <p className="text-vino text-xs mt-1">{errors.changeCondition.message as string}</p>}
                                    </div>
                                 )}
                              </div>
                           )}
                        </div>
                     )}

                     <div>
                        <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿Cuándo podrías comenzar? *</label>
                        <select {...register('startDate')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50">
                           <option value="">Seleccionar...</option>
                           <option value="inmediato">Inmediato</option>
                           <option value="en_15_dias">En 15 días</option>
                           <option value="en_1_mes">En 1 mes</option>
                           <option value="mas_de_2_meses">En más de 2 meses</option>
                        </select>
                        {errors.startDate && <p className="text-vino text-xs mt-1">{errors.startDate.message as string}</p>}
                     </div>
                  </FormSection>
               </div>
            )}

            {/* --- STEP 3 --- */}
            {currentStep === 3 && (
               <div className="animate-fade-in space-y-6">
                  <FormSection title="🔹 Modalidad y Condiciones">
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="block font-montserrat font-medium text-verde-profundo leading-tight">La posición es 100% remota. ¿Estás de acuerdo con esta modalidad? *</label>
                           <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="si" {...register('remoteWorkAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="no" {...register('remoteWorkAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">No</span>
                              </label>
                           </div>
                           {(touchedFields.remoteWorkAgreement || isSubmitting) && errors.remoteWorkAgreement && <p className="text-vino text-xs mt-1">{errors.remoteWorkAgreement.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                           <label className="block font-montserrat font-medium text-verde-profundo leading-tight">El esquema de ingresos es 100% a comisión, sin sueldo básico, e incluye escalas comisionales desde la primera venta. ¿Estás de acuerdo con este esquema? *</label>
                           <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="si" {...register('commissionSchemeAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="no" {...register('commissionSchemeAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">No</span>
                              </label>
                           </div>
                           {(touchedFields.commissionSchemeAgreement || isSubmitting) && errors.commissionSchemeAgreement && <p className="text-vino text-xs mt-1">{errors.commissionSchemeAgreement.message as string}</p>}
                        </div>

                        {commissionSchemeAgreement === 'no' && (
                           <div className="animate-fade-in pl-4 border-l-2 border-durazno">
                              <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿Qué tipo de esquema de ingresos estás buscando actualmente? *</label>
                              <input {...register('desiredIncomeScheme')} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                              {errors.desiredIncomeScheme && <p className="text-vino text-xs mt-1">{errors.desiredIncomeScheme.message as string}</p>}
                           </div>
                        )}

                        <div className="space-y-2">
                           <label className="block font-montserrat font-medium text-verde-profundo leading-tight">La modalidad de contratación es por prestación de servicios (no relación de dependencia). ¿Estás de acuerdo con esta forma de contratación? *</label>
                           <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="si" {...register('contractTypeAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" value="no" {...register('contractTypeAgreement')} className="text-verde-profundo" />
                                 <span className="font-lora">No</span>
                              </label>
                           </div>
                           {(touchedFields.contractTypeAgreement || isSubmitting) && errors.contractTypeAgreement && <p className="text-vino text-xs mt-1">{errors.contractTypeAgreement.message as string}</p>}
                        </div>

                         <div className="space-y-2">
                           <label className="block font-montserrat font-medium text-verde-profundo">¿Contás con monotributo o estarías dispuesto/a a gestionarlo para facturar tus servicios? *</label>
                           <div className="space-y-2">
                              {['ya_tengo', 'lo_gestionaria', 'no'].map(val => (
                                 <label key={val} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value={val} {...register('monotributo')} className="text-verde-profundo" />
                                    <span className="font-lora">
                                       {val === 'ya_tengo' && 'Ya tengo'}
                                       {val === 'lo_gestionaria' && 'Lo gestionaría'}
                                       {val === 'no' && 'No'}
                                    </span>
                                 </label>
                              ))}
                           </div>
                           {(touchedFields.monotributo || isSubmitting) && errors.monotributo && <p className="text-vino text-xs mt-1">{errors.monotributo.message as string}</p>}
                        </div>
                     </div>
                  </FormSection>

                  <FormSection title="🔹 Requisitos Técnicos">
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="flex items-center gap-2 font-montserrat font-medium text-verde-profundo">
                              <Laptop className="w-4 h-4" /> ¿Contás con PC propia para trabajar? *
                           </label>
                            <div className="flex gap-6">
                               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="si" {...register('hasPC')} /> Sí</label>
                               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="no" {...register('hasPC')} /> No</label>
                            </div>
                            {errors.hasPC && <p className="text-vino text-xs mt-1">{errors.hasPC.message as string}</p>}
                         </div>

                         <div className="space-y-2">
                           <label className="flex items-center gap-2 font-montserrat font-medium text-verde-profundo">
                              <Wifi className="w-4 h-4" /> ¿Tenés conexión estable a internet? *
                           </label>
                            <div className="flex gap-6">
                               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="si" {...register('hasInternet')} /> Sí</label>
                               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="no" {...register('hasInternet')} /> No</label>
                            </div>
                            {errors.hasInternet && <p className="text-vino text-xs mt-1">{errors.hasInternet.message as string}</p>}
                         </div>
                      </div>
                  </FormSection>

                  <FormSection title="🔹 Motivación">
                     <div className="space-y-4">
                        <div>
                           <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿Por qué te interesa esta oportunidad laboral? *</label>
                           <textarea {...register('motivationStats')} rows={3} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                           {errors.motivationStats && <p className="text-vino text-xs mt-1">{errors.motivationStats.message as string}</p>}
                        </div>
                        <div>
                           <label className="block mb-2 font-montserrat font-medium text-verde-profundo">¿Qué te atrae del rubro salud y de comercializar planes médicos? *</label>
                           <textarea {...register('motivationHealth')} rows={3} className="w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50" />
                           {errors.motivationHealth && <p className="text-vino text-xs mt-1">{errors.motivationHealth.message as string}</p>}
                        </div>
                     </div>
                  </FormSection>

                  <FormSection title="🔹 CV y Consentimiento">
                    <div className="space-y-6">
                       <div className="space-y-2">
                           <label className="flex items-center gap-2 font-montserrat font-medium text-verde-profundo">
                             <Upload className="w-4 h-4" /> Adjuntá tu CV actualizado (PDF, JPG o PNG) *
                           </label>
                           <div className="relative">
                             <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" id="cv-upload" />
                             <label htmlFor="cv-upload" className={`flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed cursor-pointer transition-all ${file ? 'border-verde-profundo bg-verde-profundo/5 text-verde-profundo' : 'border-durazno/50 hover:border-verde-profundo hover:bg-verde-profundo/5'}`}>
                                {file ? <><CheckCircle className="w-6 h-6" /><span className="font-lora">{file.name}</span></> : <><Upload className="w-6 h-6 text-gris-neutro" /><span className="font-lora text-gris-neutro">Subir archivo (máx 10MB)</span></>}
                             </label>
                           </div>
                           {fileError && <p className="text-vino text-sm">{fileError}</p>}
                        </div>

                         <div className="p-4 bg-crema/30 rounded-lg border border-durazno/20">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input type="checkbox" {...register('consent')} className="mt-1 w-5 h-5 text-verde-profundo rounded" />
                              <div className="text-sm font-lora text-verde-profundo leading-relaxed">
                                 Brindo mi conformidad para que mis datos personales y la información enviada en este formulario sean utilizados en procesos de reclutamiento y selección actuales o futuros.
                                 Autorizo a ser contactado/a para avanzar en el proceso.
                              </div>
                            </label>
                            {errors.consent && <p className="text-vino text-sm mt-2">{errors.consent.message as string}</p>}
                         </div>
                    </div>
                  </FormSection>
               </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-durazno/20">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl border border-verde-profundo text-verde-profundo font-semibold hover:bg-verde-profundo/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 px-6 py-3 rounded-xl bg-verde-profundo text-blanco font-semibold hover:bg-verde-profundo/90 hover:shadow-lg hover:shadow-verde-profundo/20 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95 ml-auto"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-naranja text-blanco font-semibold hover:bg-naranja/90 hover:shadow-lg hover:shadow-naranja/20 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Postulación
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {currentStep === totalSteps && submitStatus === 'error' && (
              <div className="mt-4 flex items-center gap-3 p-4 bg-vino/10 border border-vino rounded-lg animate-fade-in">
                 <AlertCircle className="w-6 h-6 text-vino" />
                 <p className="font-lora text-vino">{submitMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type} 
      />
    </div>
  );
}

function SuccessView() {
  return (
    <div className="py-12 px-4 flex justify-center items-center min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-blanco rounded-2xl shadow-xl p-8 md:p-12 border border-durazno/20 text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="w-24 h-24 bg-verde-profundo/10 rounded-full flex items-center justify-center text-verde-profundo"
            >
               <Handshake className="w-12 h-12" />
            </motion.div>
            <motion.div
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.5, 0, 0.5]
               }}
               transition={{ 
                 duration: 2,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
               className="absolute inset-0 bg-verde-profundo/5 rounded-full z-[-1]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-playfair text-3xl md:text-4xl font-bold text-verde-profundo"
          >
            ¡Gracias por postularte!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-montserrat text-lg text-verde-profundo/80 font-medium"
          >
            Recibimos tu información y CV correctamente.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <p className="font-lora text-gris-neutro leading-relaxed">
             Nuestro equipo va a revisar tu perfil y, si se alinea con los requisitos del puesto, nos pondremos en contacto.
             <br /><br />
             Sabemos que completar una postulación lleva tiempo, por lo que desde Anthrovia HR valoramos tu interés y por haberte tomado ese momento para aplicar.
          </p>
          
          <div className="p-6 bg-crema/50 rounded-xl border border-durazno/10 space-y-4">
             <p className="font-montserrat text-sm font-medium text-verde-profundo">
                Seguinos en nuestras redes:
             </p>
             <div className="flex justify-center gap-6">
                <a 
                  href="https://www.linkedin.com/company/anthrovia-hr/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-blanco shadow-sm rounded-full group-hover:bg-verde-profundo group-hover:text-blanco transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-montserrat text-gris-neutro group-hover:text-verde-profundo transition-colors">LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/anthrovia.hr/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-blanco shadow-sm rounded-full group-hover:bg-durazno group-hover:text-white transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-montserrat text-gris-neutro group-hover:text-durazno transition-colors">Instagram</span>
                </a>
             </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
        >
           <button 
             onClick={() => window.location.reload()} 
             className="text-verde-profundo hover:text-terracota font-montserrat text-sm font-medium underline transition-colors"
           >
             Volver al inicio
           </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
