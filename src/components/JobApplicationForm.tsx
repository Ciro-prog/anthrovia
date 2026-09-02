import { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Handshake,
  Instagram,
  Linkedin,
  Loader2,
  Upload,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useCMS } from '@/context/CMSContext'
import { defaultApplicationForm, ensureRequiredApplicationFields } from '@/data/applicationFormDefaults'
import { isCmsConfigured, submitApplication } from '@/lib/cmsApi'
import type { ApplicationAnswer, ApplicationField } from '@/types/cms'

const N8N_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || ''

const STEP_LABELS = ['Datos y Formación', 'Experiencia', 'Condiciones y CV']
const inputClass = 'w-full px-4 py-3 rounded-lg border border-durazno/30 bg-crema/50'

type Values = Record<string, string | boolean>
type Errors = Record<string, string>

function optionLabel(field: ApplicationField, value: string) {
  return field.options?.find((o) => o.value === value)?.label || value
}

function validateField(field: ApplicationField, value: string | boolean, file: File | null): string {
  if (field.type === 'file') {
    if (field.required && !file) return 'Adjuntá tu CV'
    return ''
  }
  if (field.type === 'checkbox') {
    if (field.required && value !== true) return 'Debes brindar tu conformidad para continuar'
    return ''
  }
  const text = typeof value === 'string' ? value.trim() : ''
  if (field.required && !text) return 'Completá este campo'
  if (field.type === 'email' && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Email inválido'
  if (field.type === 'tel' && text && text.replace(/\D/g, '').length < 8) return 'Ingresá un teléfono válido'
  return ''
}

export default function JobApplicationForm({ webhookUrl = N8N_WEBHOOK_URL }: { webhookUrl?: string }) {
  const { applicationForm, isPreview } = useCMS()
  const fields = useMemo(
    () => ensureRequiredApplicationFields(applicationForm.fields || defaultApplicationForm.fields),
    [applicationForm.fields],
  )
  const steps = useMemo(() => {
    const present = [...new Set(fields.map((f) => f.step || 1))].sort((a, b) => a - b)
    return present.length ? present : [1]
  }, [fields])

  const [currentStep, setCurrentStep] = useState(steps[0] || 1)
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Errors>({})
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    if (!steps.includes(currentStep)) setCurrentStep(steps[0] || 1)
  }, [steps, currentStep])

  const stepFields = fields.filter((f) => (f.step || 1) === currentStep)
  const isLast = currentStep === steps[steps.length - 1]
  const stepIndex = steps.indexOf(currentStep)

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateStep = (step: number) => {
    const next: Errors = {}
    for (const field of fields.filter((f) => (f.step || 1) === step)) {
      const err = validateField(field, values[field.name] ?? (field.type === 'checkbox' ? false : ''), file)
      if (err) next[field.name] = err
    }
    setErrors((prev) => ({ ...prev, ...next }))
    return Object.keys(next).length === 0
  }

  const onFile = (selected: File | null) => {
    if (!selected) {
      setFile(null)
      return
    }
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg']
    if (!validTypes.includes(selected.type)) {
      setErrors((prev) => ({ ...prev, cv: 'Por favor subí un archivo PDF, PNG o JPG' }))
      setFile(null)
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: 'El archivo no debe superar los 10MB' }))
      setFile(null)
      return
    }
    setFile(selected)
    setErrors((prev) => ({ ...prev, cv: '' }))
  }

  const goNext = () => {
    if (!validateStep(currentStep)) return
    const next = steps[stepIndex + 1]
    if (next) {
      setCurrentStep(next)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    const prev = steps[stepIndex - 1]
    if (prev) setCurrentStep(prev)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return
    if (isPreview) return

    const answers: ApplicationAnswer[] = fields
      .filter((f) => f.type !== 'file')
      .map((f) => {
        const raw = values[f.name]
        const value =
          f.type === 'checkbox'
            ? raw === true
            : typeof raw === 'string'
              ? optionLabel(f, raw)
              : ''
        return { name: f.name, label: f.label, value }
      })

    const email = String(values.email || '').trim()
    const payload = {
      email,
      firstName: String(values.firstName || ''),
      lastName: String(values.lastName || ''),
      age: String(values.age || ''),
      phone: String(values.phone || ''),
      linkedin: String(values.linkedin || ''),
      country: String(values.country || ''),
      province: String(values.province || ''),
      city: String(values.city || ''),
      residencyStatus: String(values.residencyStatus || ''),
      educationLevel: String(values.educationLevel || ''),
      secondaryStatus: String(values.secondaryStatus || ''),
      careerRun: String(values.careerRun || ''),
      salesExperienceYears: String(values.salesExperienceYears || ''),
      healthSalesExperience: String(values.healthSalesExperience || ''),
      healthSalesExperienceDesc: String(values.healthSalesExperienceDesc || ''),
      isWorking: String(values.isWorking || ''),
      currentRole: String(values.currentRole || ''),
      lookingForChange: String(values.lookingForChange || ''),
      willingToChange: String(values.willingToChange || ''),
      changeCondition: String(values.changeCondition || ''),
      startDate: String(values.startDate || ''),
      remoteWorkAgreement: String(values.remoteWorkAgreement || ''),
      commissionSchemeAgreement: String(values.commissionSchemeAgreement || ''),
      desiredIncomeScheme: String(values.desiredIncomeScheme || ''),
      contractTypeAgreement: String(values.contractTypeAgreement || ''),
      monotributo: String(values.monotributo || ''),
      hasPC: String(values.hasPC || ''),
      hasInternet: String(values.hasInternet || ''),
      consent: values.consent === true,
      answers,
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      if (isCmsConfigured()) {
        const result = await submitApplication(payload, file)
        if (result.ok) {
          setSubmitStatus('success')
          setValues({})
          setFile(null)
          setCurrentStep(steps[0] || 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }

      if (!webhookUrl) {
        setSubmitStatus('error')
        setSubmitMessage('No se pudo enviar. Probá de nuevo.')
        return
      }

      const formData = new FormData()
      for (const row of answers) {
        formData.append(row.name, String(row.value))
      }
      formData.append('answers', JSON.stringify(answers))
      if (file) formData.append('cv', file)
      formData.append('submittedAt', new Date().toISOString())

      const response = await fetch(webhookUrl, { method: 'POST', body: formData })
      if (!response.ok) throw new Error(`Server Error (${response.status})`)
      setSubmitStatus('success')
      setValues({})
      setFile(null)
      setCurrentStep(steps[0] || 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('No se pudo enviar. Probá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') return <SuccessView />

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-blanco rounded-2xl shadow-xl p-6 md:p-10 border border-durazno/20 relative">
          {steps.length > 1 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 px-2">
                {steps.map((step, index) => {
                  const isActive = currentStep === step
                  const isCompleted = stepIndex > index
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-verde-profundo text-blanco scale-110 shadow-lg'
                            : isCompleted
                              ? 'bg-verde-profundo/80 text-blanco'
                              : 'bg-durazno/20 text-gris-neutro'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                      </div>
                      <span
                        className={`text-xs mt-2 font-montserrat hidden md:block ${
                          isActive ? 'text-verde-profundo font-semibold' : 'text-gris-neutro'
                        }`}
                      >
                        {STEP_LABELS[step - 1] || `Paso ${step}`}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="w-full h-2 bg-durazno/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-verde-profundo transition-all duration-500 ease-in-out"
                  style={{
                    width: `${steps.length < 2 ? 100 : (stepIndex / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              {stepFields.map((field, index) => {
                const globalIndex = fields.findIndex((f) => f.name === field.name)
                return (
                  <FieldControl
                    key={field.name}
                    field={field}
                    index={globalIndex >= 0 ? globalIndex : index}
                    value={values[field.name] ?? (field.type === 'checkbox' ? false : '')}
                    file={file}
                    error={errors[field.name]}
                    onChange={(v) => setValue(field.name, v)}
                    onFile={onFile}
                  />
                )
              })}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-durazno/20">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-3 rounded-xl border border-verde-profundo text-verde-profundo font-semibold hover:bg-verde-profundo/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </button>
              )}
              {isLast ? (
                <button
                  type="submit"
                  disabled={isSubmitting || isPreview}
                  className="flex-1 px-6 py-3 rounded-xl bg-terracota text-blanco font-semibold hover:bg-terracota/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 ml-auto"
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
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 px-6 py-3 rounded-xl bg-verde-profundo text-blanco font-semibold hover:bg-verde-profundo/90 transition-all duration-300 flex items-center justify-center gap-2 ml-auto"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="mt-4 flex items-center gap-3 p-4 bg-vino/10 border border-vino rounded-lg">
                <AlertCircle className="w-6 h-6 text-vino" />
                <p className="font-lora text-vino">{submitMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

function FieldControl({
  field,
  index,
  value,
  file,
  error,
  onChange,
  onFile,
}: {
  field: ApplicationField
  index: number
  value: string | boolean
  file: File | null
  error?: string
  onChange: (value: string | boolean) => void
  onFile: (file: File | null) => void
}) {
  const requiredMark = field.required ? ' *' : ''
  const cmsField = `fields.${index}.label`
  const fieldId = `app-field-${field.name}`

  if (field.type === 'file') {
    return (
      <div className="space-y-2" data-cms-field={cmsField}>
        <label htmlFor={fieldId} className="flex items-center gap-2 font-montserrat font-medium text-verde-profundo">
          <Upload className="w-4 h-4" />
          {field.label}
          {requiredMark}
        </label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          id={fieldId}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
        <label
          htmlFor={fieldId}
          className={`flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
            file
              ? 'border-verde-profundo bg-verde-profundo/5 text-verde-profundo'
              : 'border-durazno/50 hover:border-verde-profundo hover:bg-verde-profundo/5'
          }`}
        >
          {file ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span className="font-lora">{file.name}</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-gris-neutro" />
              <span className="font-lora text-gris-neutro">Subir archivo (máx 10MB)</span>
            </>
          )}
        </label>
        {error && <p className="text-vino text-sm">{error}</p>}
      </div>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <div className="p-4 bg-crema/30 rounded-lg border border-durazno/20" data-cms-field={cmsField}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 w-5 h-5 text-verde-profundo rounded"
          />
          <div className="text-sm font-lora text-verde-profundo leading-relaxed">{field.label}</div>
        </label>
        {error && <p className="text-vino text-sm mt-2">{error}</p>}
      </div>
    )
  }

  if (field.type === 'select') {
    const options = field.options || []
    const asRadio = options.length > 0 && options.length <= 3
    return (
      <div className="space-y-2" data-cms-field={cmsField}>
        <label htmlFor={asRadio ? undefined : fieldId} className="block font-montserrat font-medium text-verde-profundo">
          {field.label}
          {requiredMark}
        </label>
        {asRadio ? (
          <div className="space-y-2" role="radiogroup" aria-label={field.label}>
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  className="text-verde-profundo"
                />
                <span className="font-lora text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <select
            id={fieldId}
            className={inputClass}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        {error && <p className="text-vino text-xs mt-1">{error}</p>}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="space-y-2" data-cms-field={cmsField}>
        <label htmlFor={fieldId} className="block font-montserrat font-medium text-verde-profundo">
          {field.label}
          {requiredMark}
        </label>
        <textarea
          id={fieldId}
          rows={3}
          className={inputClass}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="text-vino text-xs mt-1">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2" data-cms-field={cmsField}>
      <label htmlFor={fieldId} className="block font-montserrat font-medium text-verde-profundo">
        {field.label}
        {requiredMark}
      </label>
      <input
        id={fieldId}
        type={field.type === 'email' || field.type === 'tel' ? field.type : 'text'}
        className={inputClass}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-vino text-xs mt-1">{error}</p>}
    </div>
  )
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
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-24 h-24 bg-verde-profundo/10 rounded-full flex items-center justify-center text-verde-profundo"
            >
              <Handshake className="w-12 h-12" />
            </motion.div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-verde-profundo">
            ¡Gracias por postularte!
          </h2>
          <p className="font-montserrat text-lg text-verde-profundo/80 font-medium">
            Recibimos tu información y CV correctamente.
          </p>
        </div>
        <p className="font-lora text-gris-neutro leading-relaxed">
          Nuestro equipo va a revisar tu perfil y, si se alinea con los requisitos del puesto, nos
          pondremos en contacto.
        </p>
        <div className="p-6 bg-crema/50 rounded-xl border border-durazno/10 space-y-4">
          <p className="font-montserrat text-sm font-medium text-verde-profundo">Seguinos en nuestras redes:</p>
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
              <span className="text-xs font-montserrat text-gris-neutro">LinkedIn</span>
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
              <span className="text-xs font-montserrat text-gris-neutro">Instagram</span>
            </a>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-verde-profundo hover:text-terracota font-montserrat text-sm font-medium underline transition-colors"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  )
}
