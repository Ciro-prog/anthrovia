# Anthrovia HR - Website

Sitio web de servicios de recursos humanos desarrollado con React, TypeScript, Tailwind CSS y shadcn/ui.

## Paleta de Colores

El diseño utiliza la identidad de marca Anthrovia HR:

- **Primary**: `#1A4C40` (Verde oscuro/teal)
- **Accent Teal**: `#9E5E57` (Teal/coral)
- **Accent Rose**: `#E5B6A8` (Rosa/melocotón claro)
- **Accent Burgundy**: `#E55E47` (Borgoña/granate)

## Características

- Hero section con gradientes de marca y efectos visuales
- Grid de servicios con tarjetas interactivas
- Sistema de diseño basado en shadcn/ui
- Totalmente responsive
- Animaciones suaves y transiciones
- Tipografía optimizada

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base de shadcn/ui
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── HeroSection.tsx  # Sección hero principal
│   └── ServicesSection.tsx # Grid de servicios
├── lib/
│   └── utils.ts         # Utilidades (cn helper)
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales y Tailwind
```

## Servicios Incluidos

1. Reclutamiento y Selección
2. Consultoría Organizacional
3. Evaluación de Desempeño
4. Capacitación y Desarrollo
5. Gestión del Cambio
6. Administración de Nómina
7. Onboarding y Cultura
8. Análisis y Métricas HR
9. Desarrollo de Liderazgo

## Tecnologías

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Lucide React** - Iconos
