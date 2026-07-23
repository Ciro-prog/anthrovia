import { useState, useEffect, useRef } from 'react';
import { DOSSIER_CATEGORIES, ModuleItem } from '../data/dossierData';

export default function DossierPage() {
  // Store the active module ID for each of the 5 categories
  const [activeModules, setActiveModules] = useState<Record<string, string>>({
    comunicacion: 'red-social',
    'gestion-rrhh': 'vacaciones',
    operaciones: 'asistencia',
    cultura: 'hitos',
    talento: 'desempeno',
  });

  const [fullscreenModule, setFullscreenModule] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState('');

  // Keyboard navigation for fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenModule) return;
      const allModulesList = DOSSIER_CATEGORIES.flatMap(c => c.modules);
      const curIndex = allModulesList.findIndex(m => m.id === fullscreenModule);

      if (e.key === 'Escape') {
        setFullscreenModule(null);
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (curIndex < allModulesList.length - 1) {
          setFullscreenModule(allModulesList[curIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (curIndex > 0) {
          setFullscreenModule(allModulesList[curIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenModule]);

  // Update dynamic SVG path connecting the cell phones
  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < DOSSIER_CATEGORIES.length; i++) {
        const phone = phoneRefs.current[i];
        if (phone) {
          const rect = phone.getBoundingClientRect();
          const x = rect.left + rect.width / 2 - containerRect.left;
          const y = rect.top + rect.height / 2 - containerRect.top;
          points.push({ x, y });
        }
      }

      if (points.length < 2) return;

      // Generate smooth cubic bezier curve path connecting all phones
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpY1 = p0.y + (p1.y - p0.y) / 2;
        const cpY2 = p0.y + (p1.y - p0.y) / 2;
        d += ` C ${p0.x} ${cpY1}, ${p1.x} ${cpY2}, ${p1.x} ${p1.y}`;
      }
      setPathD(d);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    // Trigger recalculation after DOM elements load and settle
    const timer1 = setTimeout(updatePath, 200);
    const timer2 = setTimeout(updatePath, 1000);

    return () => {
      window.removeEventListener('resize', updatePath);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Helper to render customized interactive UI mockups inside the smartphone
  const renderPhoneScreen = (moduleId: string) => {
    switch (moduleId) {
      // --- COMUNICACIÓN INTERNA ---
      case 'red-social':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            {/* App Bar */}
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md tracking-tight">Comunidad</span>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[14px]">search</span>
                <span className="material-symbols-outlined text-[14px]">notifications</span>
              </div>
            </div>
            {/* Stories */}
            <div className="flex gap-2 p-2 bg-white border-b overflow-x-hidden">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 p-0.5"><div className="w-full h-full bg-slate-300 rounded-full flex items-center justify-center font-bold text-[8px]">Yo</div></div>
                <span className="text-[7px] text-slate-500">Mi Historia</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 p-0.5"><div className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-800 text-[8px]">SP</div></div>
                <span className="text-[7px] text-slate-500">Sofia P.</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 p-0.5"><div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-800 text-[8px]">LM</div></div>
                <span className="text-[7px] text-slate-500">Lucas M.</span>
              </div>
            </div>
            {/* Feed Scroll */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 text-[8px]">SP</div>
                  <div>
                    <h5 className="font-bold text-[9px] leading-none">Sofia Perez</h5>
                    <span className="text-[6px] text-slate-400">Gerente de HR · Hace 10 min</span>
                  </div>
                </div>
                <p className="text-[8px] text-slate-700 leading-tight mb-2">
                  ¡Bienvenidos al nuevo ecosistema Anthrovia! Esperamos que esta red sea nuestro espacio para conectarnos, colaborar y crecer juntos. 🚀
                </p>
                <div className="w-full h-20 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-md flex items-center justify-center text-white font-bold text-[10px]">
                  #AnthroviaCulture
                </div>
                <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-50 text-slate-500 text-[8px]">
                  <div className="flex items-center gap-1 text-emerald-700 font-bold">
                    <span className="material-symbols-outlined text-[10px] fill-current">favorite</span>
                    <span>24 Me Gusta</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">chat_bubble</span>
                    <span>5 Comentarios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'noticias':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 font-bold flex justify-between items-center shadow-sm">
              <span className="font-headline-md">Portal de Noticias</span>
              <span className="material-symbols-outlined text-[14px]">rss_feed</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {/* Featured Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100">
                <div className="w-full h-24 bg-gradient-to-tr from-amber-600 to-amber-700 flex items-end p-2 text-white font-headline-md">
                  <div className="bg-black/40 backdrop-blur-sm p-1 rounded">
                    <span className="text-[6px] uppercase tracking-wider font-bold text-amber-300">Oficial</span>
                    <h4 className="font-bold text-[9px] leading-tight mt-0.5">Inauguración de Nuevas Oficinas en Neuquén</h4>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[8px] text-slate-500 mb-1">Hace 2 horas · Anthrovia HR</p>
                  <p className="text-[8px] text-slate-700 leading-tight">
                    Seguimos expandiendo nuestro equipo. Las nuevas oficinas están listas para recibir a los equipos de ventas y soporte.
                  </p>
                  <button className="mt-2 text-[#77574d] font-bold text-[8px] flex items-center gap-0.5">
                    Leer más <span className="material-symbols-outlined text-[8px]">chevron_right</span>
                  </button>
                </div>
              </div>
              {/* Minor news */}
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 flex gap-2 items-center">
                <div className="w-10 h-10 bg-emerald-50 rounded flex-shrink-0 flex items-center justify-center text-[#124a43]">
                  <span className="material-symbols-outlined text-lg">health_and_safety</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-[8px] truncate leading-tight">Campaña de Vacunación Antigripal 2026</h5>
                  <p className="text-[7px] text-slate-500">Inscripciones abiertas hasta el viernes</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'biblioteca':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Biblioteca</span>
              <span className="material-symbols-outlined text-[14px]">search</span>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-md px-2 py-1 flex items-center gap-1 border border-slate-200 shadow-inner">
                <span className="material-symbols-outlined text-[10px] text-slate-400">search</span>
                <span className="text-slate-400 text-[7px]">Buscar documentos, guías...</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-3">
              <div>
                <h5 className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Carpetas Principales</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-amber-500 text-lg">folder</span>
                    <div className="leading-tight">
                      <p className="font-bold text-[8px]">Políticas</p>
                      <span className="text-[6px] text-slate-400">4 Archivos</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-amber-500 text-lg">folder</span>
                    <div className="leading-tight">
                      <p className="font-bold text-[8px]">Beneficios</p>
                      <span className="text-[6px] text-slate-400">6 Archivos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Archivos Recientes</h5>
                <div className="bg-white rounded-lg border border-slate-100 divide-y divide-slate-100 shadow-sm">
                  <div className="p-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-red-500 text-sm">picture_as_pdf</span>
                      <span className="text-[8px] font-bold text-slate-700 truncate max-w-[120px]">Manual_Empleado_2026.pdf</span>
                    </div>
                    <span className="material-symbols-outlined text-[10px] text-slate-400">download</span>
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-red-500 text-sm">picture_as_pdf</span>
                      <span className="text-[8px] font-bold text-slate-700 truncate max-w-[120px]">Politica_Gastos_V2.pdf</span>
                    </div>
                    <span className="material-symbols-outlined text-[10px] text-slate-400">download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[8px]">TI</div>
                <div>
                  <h4 className="font-bold text-[8px] leading-tight">Soporte Técnico TI</h4>
                  <span className="text-[6px] text-emerald-300 flex items-center gap-0.5">🟢 Activo ahora</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[14px]">more_vert</span>
            </div>
            {/* Conversation list */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
              <div className="flex gap-1.5 max-w-[85%] items-end">
                <div className="w-4 h-4 rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center font-bold text-[6px]">TI</div>
                <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-[8px] leading-tight shadow-sm">
                  Hola Juan, recibimos tu aviso de ticket. Ya restablecimos tus claves corporativas.
                </div>
              </div>
              <div className="flex gap-1.5 max-w-[85%] ml-auto justify-end items-end">
                <div className="bg-emerald-800 text-white p-1.5 rounded-lg text-[8px] leading-tight shadow-sm">
                  Excelente, ¡muchas gracias por la rapidez de la respuesta!
                </div>
              </div>
              <div className="flex gap-1.5 max-w-[85%] items-end">
                <div className="w-4 h-4 rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center font-bold text-[6px]">TI</div>
                <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-[8px] leading-tight shadow-sm">
                  ¡De nada! Avisanos si necesitás algo más. Que tengas buen día.
                </div>
              </div>
            </div>
            {/* Message input */}
            <div className="p-1.5 bg-white border-t flex gap-1 items-center">
              <input type="text" placeholder="Escribir mensaje..." className="flex-1 border border-slate-200 rounded-full px-2 py-0.5 text-[8px] focus:outline-none" readOnly />
              <button className="w-5 h-5 bg-[#124a43] rounded-full text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px]">send</span>
              </button>
            </div>
          </div>
        );
      case 'agenda':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Agenda de Equipo</span>
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            </div>
            <div className="p-2 flex-1 overflow-y-auto space-y-2">
              {/* Mini Calendar Grid */}
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-center">
                <h5 className="font-bold text-[9px] mb-1">Julio 2026</h5>
                <div className="grid grid-cols-7 gap-1 text-[7px] font-medium text-slate-400 mb-1">
                  <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[8px] text-slate-700">
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const isEvent = day === 15 || day === 23 || day === 28;
                    return (
                      <span
                        key={day}
                        className={`w-4 h-4 mx-auto flex items-center justify-center rounded-full ${
                          isEvent ? 'bg-amber-100 text-amber-900 font-bold border border-amber-400' : ''
                        } ${day === 23 ? 'bg-[#124a43] text-white font-bold' : ''}`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>
              {/* Event list */}
              <div className="space-y-1">
                <h6 className="text-[7px] font-bold text-slate-400 uppercase tracking-widest px-1">Próximos Eventos</h6>
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex gap-2 items-center shadow-sm">
                  <div className="bg-emerald-50 text-[#124a43] font-bold text-center px-1.5 py-0.5 rounded leading-none">
                    <p className="text-[10px]">23</p>
                    <span className="text-[5px] uppercase">Hoy</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-[8px] text-slate-800 leading-tight">Reunión de Resultados Q2</h6>
                    <span className="text-[6px] text-slate-500">09:30 AM · Sala Virtual 1</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex gap-2 items-center shadow-sm">
                  <div className="bg-pink-50 text-pink-700 font-bold text-center px-1.5 py-0.5 rounded leading-none">
                    <p className="text-[10px]">28</p>
                    <span className="text-[5px] uppercase">Mar</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-[8px] text-slate-800 leading-tight">Aniversario Corporativo</h6>
                    <span className="text-[6px] text-slate-500">Celebración general · Planta Neuquén</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'organigrama':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Estructura</span>
              <span className="material-symbols-outlined text-[14px]">hierarchy</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col items-center justify-center gap-2">
              {/* Simple tree structure representation */}
              <div className="bg-white p-1.5 rounded border-2 border-[#124a43] shadow-sm text-center w-28">
                <h5 className="font-bold text-[8px] leading-tight">Carlos Alvarez</h5>
                <p className="text-[6px] text-[#77574d] uppercase font-bold">CEO & Fundador</p>
              </div>
              <div className="w-0.5 h-3 bg-[#124a43]/40"></div>
              <div className="w-32 border-t-2 border-[#124a43]/40 flex justify-between relative">
                <div className="absolute left-1/2 -top-0.5 -translate-x-1/2 w-0.5 h-3 bg-[#124a43]/40"></div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-1 bg-[#124a43]/40"></div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 shadow-sm text-center w-24">
                    <h6 className="font-bold text-[7px] leading-tight">Sofia Perez</h6>
                    <p className="text-[5px] text-slate-500 uppercase">HR Manager</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-1 bg-[#124a43]/40"></div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 shadow-sm text-center w-24">
                    <h6 className="font-bold text-[7px] leading-tight">Lucas Perez</h6>
                    <p className="text-[5px] text-slate-500 uppercase">Sales Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'videollamadas':
        return (
          <div className="flex flex-col h-full bg-[#1e293b] text-white text-[10px] font-sans">
            {/* Streaming Head */}
            <div className="bg-slate-900/80 px-3 pt-6 pb-2 flex justify-between items-center shadow-md">
              <span className="font-bold text-[8px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                Town Hall Q2 (Live)
              </span>
              <span className="bg-red-600 text-white font-bold text-[6px] px-1.5 py-0.5 rounded uppercase">En Vivo</span>
            </div>
            {/* Live Video Feed */}
            <div className="flex-1 bg-slate-950 relative flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-emerald-900/60 to-slate-900 flex flex-col items-center justify-center p-3 text-center">
                <span className="material-symbols-outlined text-4xl text-white/40 mb-1">podium</span>
                <h5 className="font-bold text-[9px]">Carlos Alvarez (Presentador)</h5>
                <p className="text-[7px] text-slate-400">"Presentando metas del próximo trimestre"</p>
              </div>
              {/* Floating viewer camera */}
              <div className="absolute bottom-2 right-2 w-12 h-16 bg-slate-800 rounded border border-white/20 shadow-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500">face</span>
              </div>
            </div>
            {/* Meeting Controls bar */}
            <div className="bg-slate-900 p-2 flex justify-center items-center gap-3">
              <button className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-slate-300 text-[10px]">mic_off</span></button>
              <button className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-slate-300 text-[10px]">videocam_off</span></button>
              <button className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-slate-300 text-[10px]">screen_share</span></button>
              <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-white text-[10px]">call_end</span></button>
            </div>
          </div>
        );

      // --- GESTIÓN DE RR. HH. ---
      case 'vacaciones':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Mis Vacaciones</span>
              <span className="material-symbols-outlined text-[14px]">beach_access</span>
            </div>
            <div className="p-2 flex-1 overflow-y-auto space-y-3">
              {/* Donut progress */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm flex items-center justify-around gap-2">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  {/* SVG Donut Circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="22" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                    <circle cx="28" cy="28" r="22" stroke="#77574d" strokeWidth="4" fill="transparent" strokeDasharray="138" strokeDashoffset="27" />
                  </svg>
                  <div className="absolute text-center leading-none">
                    <p className="font-bold text-[11px] text-slate-800">12</p>
                    <span className="text-[5px] text-slate-400">Días</span>
                  </div>
                </div>
                <div className="leading-tight">
                  <h6 className="font-bold text-[9px] text-[#77574d]">Saldo disponible</h6>
                  <p className="text-[7px] text-slate-500">12 días hábiles (de 15 en total)</p>
                  <span className="text-[6px] bg-emerald-50 text-emerald-800 font-bold px-1 py-0.5 rounded mt-0.5 inline-block">Ciclo 2026 al día</span>
                </div>
              </div>
              {/* Form */}
              <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-2">
                <h6 className="font-bold text-[8px] text-slate-600 uppercase">Nueva Solicitud</h6>
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <label className="text-[6px] text-slate-400 font-bold">Desde</label>
                    <input type="text" value="24/07/2026" className="w-full border p-1 rounded text-[7px]" readOnly />
                  </div>
                  <div>
                    <label className="text-[6px] text-slate-400 font-bold">Hasta</label>
                    <input type="text" value="31/07/2026" className="w-full border p-1 rounded text-[7px]" readOnly />
                  </div>
                </div>
                <button className="w-full bg-[#77574d] text-white py-1.5 rounded font-bold text-[8px] hover:bg-[#5d4036] transition-colors">
                  Enviar Solicitud
                </button>
              </div>
            </div>
          </div>
        );
      case 'recibos':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Recibos de Sueldo</span>
              <span className="material-symbols-outlined text-[14px]">description</span>
            </div>
            <div className="p-2 flex-1 overflow-y-auto space-y-2">
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <h6 className="font-bold text-[8px]">Liquidación - Junio 2026</h6>
                  <p className="text-[6px] text-slate-400">Sueldo Básico + Presentismo</p>
                </div>
                <span className="text-[6px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[8px]">check_circle</span> Firmado
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <h6 className="font-bold text-[8px]">Liquidación - Mayo 2026</h6>
                  <p className="text-[6px] text-slate-400">Sueldo Básico</p>
                </div>
                <span className="text-[6px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[8px]">check_circle</span> Firmado
                </span>
              </div>
              <div className="bg-red-50 p-2.5 rounded-lg border border-red-100 shadow-sm flex flex-col gap-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="font-bold text-[8px] text-red-900">Liquidación - Abril 2026</h6>
                    <p className="text-[6px] text-red-600 font-bold">Pendiente de firma electrónica</p>
                  </div>
                  <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
                </div>
                <button className="bg-[#77574d] text-white py-1 rounded font-bold text-[8px] flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">edit</span> Firmar Recibo
                </button>
              </div>
            </div>
          </div>
        );
      case 'legajos':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Mi Legajo Digital</span>
              <span className="material-symbols-outlined text-[14px]">manage_accounts</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
              {/* Profile Card */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#77574d] flex items-center justify-center font-bold text-[#77574d] text-sm">JP</div>
                <h5 className="font-bold text-[9px] mt-1.5 leading-none">Juan Pérez</h5>
                <span className="text-[6px] text-slate-400 mt-0.5">Asesor Comercial de Alarmas</span>
              </div>
              {/* Details table */}
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-[7px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">DNI / CUIL</span>
                  <span className="font-bold text-slate-800">20-35661991-8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Fecha Ingreso</span>
                  <span className="font-bold text-slate-800">12/03/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Obra Social</span>
                  <span className="font-bold text-slate-800">OSDE 310</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Monotributo</span>
                  <span className="font-bold text-slate-800">Categoría C</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'onboarding':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Onboarding</span>
              <span className="material-symbols-outlined text-[14px]">explore</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {/* Progress */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                <div className="flex justify-between text-[7px] font-bold text-slate-600 mb-1">
                  <span>Tu Progreso</span>
                  <span>75% Completado</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-[#77574d]" />
                </div>
              </div>
              {/* Step checklist */}
              <div className="space-y-1.5">
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span className="text-[8px] text-slate-700">1. Video de bienvenida del Fundador</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span className="text-[8px] text-slate-700">2. Subida de documentación legal</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span className="text-[8px] text-slate-700">3. Configurar firma digital</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border-2 border-[#77574d] flex items-center justify-between shadow-sm animate-pulse">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-sm">pending</span>
                    <span className="text-[8px] text-slate-800 font-bold">4. Realizar curso inducción inicial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // --- OPERACIONES ---
      case 'asistencia':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#6d2c43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Fichaje Horario</span>
              <span className="material-symbols-outlined text-[14px]">more_time</span>
            </div>
            <div className="p-2 flex-grow flex flex-col justify-between">
              {/* Date/Time */}
              <div className="text-center py-2">
                <h5 className="font-bold text-[13px] text-[#6d2c43]">09:02:15 AM</h5>
                <p className="text-[6px] text-slate-400 font-bold uppercase tracking-wider">Jueves, 23 de Julio</p>
              </div>
              {/* Map pin simulation */}
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg animate-bounce">location_on</span>
                </div>
                <p className="font-bold text-[7px] text-slate-700">Sede Neuquén (Rango de Fichaje)</p>
                <span className="text-[5px] text-slate-400">Precisión GPS: +/- 5 metros</span>
              </div>
              {/* Punch Button */}
              <div className="py-2 text-center">
                <button className="w-20 h-20 rounded-full bg-[#6d2c43] text-white font-bold text-[9px] shadow-lg shadow-pink-900/10 border-4 border-pink-50 flex items-center justify-center flex-col leading-none hover:scale-105 active:scale-95 transition-transform mx-auto">
                  <span className="material-symbols-outlined text-lg mb-0.5">touch_app</span>
                  FICHAR
                  <span className="text-[5px] font-normal uppercase tracking-widest mt-0.5">Entrada</span>
                </button>
              </div>
              {/* Last punch */}
              <div className="bg-white p-1.5 rounded border border-slate-100 shadow-inner text-[6px] text-slate-500 flex justify-between">
                <span>Último marcaje:</span>
                <span className="font-bold text-[#6d2c43]">Ayer 18:03 PM (Salida)</span>
              </div>
            </div>
          </div>
        );
      case 'formularios':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#6d2c43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Trámites y Formularios</span>
              <span className="material-symbols-outlined text-[14px]">assignment_turned_in</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm space-y-2 text-[7px]">
                <h6 className="font-bold text-[8px] text-[#6d2c43] mb-1">Rendición de Gastos</h6>
                <div className="space-y-1.5">
                  <div>
                    <label className="text-slate-400 font-bold block">Categoría de Gasto</label>
                    <input type="text" value="Viáticos / Combustible" className="w-full border p-1 rounded text-[7px]" readOnly />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block">Monto Solicitado ($)</label>
                    <input type="text" value="12,500.00" className="w-full border p-1 rounded text-[7px] font-bold" readOnly />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block">Comprobante de Pago</label>
                    <div className="border border-dashed p-1 rounded text-center text-slate-400 flex items-center justify-center gap-1 bg-slate-50">
                      <span className="material-symbols-outlined text-[10px]">image</span>
                      <span>ticket_combustible.jpg (Adjuntado)</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#6d2c43] text-white py-1 rounded font-bold text-[8px]">
                  Enviar Solicitud
                </button>
              </div>
            </div>
          </div>
        );
      case 'servicios':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#6d2c43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Mesa de Servicios</span>
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
            </div>
            <div className="p-2.5 flex-1 overflow-y-auto space-y-3">
              {/* Grid selectors */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white p-2 rounded border border-slate-100 shadow-sm flex flex-col items-center">
                  <span className="material-symbols-outlined text-slate-500 text-base">computer</span>
                  <span className="text-[5px] font-bold mt-1 uppercase">Soporte TI</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-100 shadow-sm flex flex-col items-center">
                  <span className="material-symbols-outlined text-slate-500 text-base">engineering</span>
                  <span className="text-[5px] font-bold mt-1 uppercase">Mantenimiento</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-100 shadow-sm flex flex-col items-center">
                  <span className="material-symbols-outlined text-slate-500 text-base">payments</span>
                  <span className="text-[5px] font-bold mt-1 uppercase">Sueldos</span>
                </div>
              </div>
              {/* Ticket list */}
              <div className="space-y-1.5">
                <h6 className="text-[7px] text-slate-400 font-bold uppercase tracking-wider px-1">Tus Solicitudes</h6>
                <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm">
                  <div>
                    <h6 className="font-bold text-[7px]">#2140 - Problema de acceso VPN</h6>
                    <p className="text-[5px] text-slate-400">Creado hace 2 días</p>
                  </div>
                  <span className="text-[5px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1 py-0.2 rounded">
                    En Proceso
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      // --- CULTURA EMPRESARIAL ---
      case 'hitos':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Celebraciones</span>
              <span className="material-symbols-outlined text-[14px]">celebration</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto flex flex-col justify-center items-center text-center space-y-3">
              {/* Birthday card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 w-full shadow-md space-y-2 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-10 h-10 rounded-full bg-amber-200/40" />
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto">
                  <span className="material-symbols-outlined text-xl">cake</span>
                </div>
                <h5 className="font-headline-md text-amber-900 leading-tight">¡Feliz Cumpleaños!</h5>
                <p className="text-[8px] text-amber-800 leading-tight font-medium">
                  Hoy felicitamos a **Valeria Soliz** por su cumpleaños. ¡Que pases un gran día en equipo! 🎉
                </p>
                <button className="bg-[#124a43] text-white px-3 py-1 rounded-full font-bold text-[7px] shadow-md flex items-center gap-1 mx-auto hover:bg-[#184f47]">
                  <span className="material-symbols-outlined text-[8px]">chat</span> Enviar Saludo
                </button>
              </div>
            </div>
          </div>
        );
      case 'reconocimientos':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Kudos</span>
              <span className="material-symbols-outlined text-[14px]">award_star</span>
            </div>
            <div className="p-2.5 flex-1 overflow-y-auto space-y-3 flex flex-col justify-center">
              <div className="bg-white border border-yellow-200 rounded-xl p-3 shadow-md flex flex-col gap-2 relative">
                <div className="absolute top-2 right-2 text-yellow-500"><span className="material-symbols-outlined text-base">emoji_events</span></div>
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-[#124a43] text-white flex items-center justify-center font-bold text-[7px]">MP</div>
                  <div className="leading-none">
                    <h6 className="font-bold text-[8px]">Martin Perez</h6>
                    <span className="text-[5px] text-slate-400">Envió Kudos</span>
                  </div>
                </div>
                <div className="bg-yellow-50/50 p-2 rounded border border-yellow-100">
                  <p className="font-bold text-[7px] text-yellow-950 uppercase tracking-widest flex items-center gap-0.5">
                    🤝 Valor: COLABORACIÓN
                  </p>
                  <p className="text-[8px] text-slate-700 leading-tight mt-1 font-medium italic">
                    "Gracias Diego por darme una mano ayer a última hora para preparar la presentación del cliente. ¡Gran trabajo de equipo!"
                  </p>
                </div>
                <span className="text-[6px] text-slate-400 font-bold self-end">Destinatario: **Diego Medina**</span>
              </div>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#124a43] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Marketplace</span>
              <span className="text-[#b7ede3] font-bold text-[8px] bg-emerald-900 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                🪙 450 pts
              </span>
            </div>
            <div className="p-2 flex-grow overflow-y-auto space-y-2">
              <h6 className="text-[7px] text-slate-400 uppercase tracking-widest px-1 font-bold">Catálogo de Beneficios</h6>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="w-full h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400 mb-1.5"><span className="material-symbols-outlined text-lg">local_cafe</span></div>
                  <div>
                    <h6 className="font-bold text-[7px] leading-tight">Taza Corporativa</h6>
                    <span className="text-[6px] text-amber-600 font-bold">🪙 50 pts</span>
                  </div>
                  <button className="w-full bg-[#124a43] text-white py-0.5 rounded mt-1.5 font-bold text-[6px]">Canjear</button>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="w-full h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400 mb-1.5"><span className="material-symbols-outlined text-lg">hotel_class</span></div>
                  <div>
                    <h6 className="font-bold text-[7px] leading-tight">Día Libre de Cumpleaños</h6>
                    <span className="text-[6px] text-amber-600 font-bold">🪙 350 pts</span>
                  </div>
                  <button className="w-full bg-[#124a43] text-white py-0.5 rounded mt-1.5 font-bold text-[6px]">Canjear</button>
                </div>
              </div>
            </div>
          </div>
        );

      // --- DESARROLLO DE TALENTO ---
      case 'desempeno':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Mi Desempeño</span>
              <span className="material-symbols-outlined text-[14px]">analytics</span>
            </div>
            <div className="p-2.5 flex-1 overflow-y-auto space-y-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm space-y-2">
                <h6 className="font-bold text-[8px] text-[#77574d]">Evaluación Semestral 2026</h6>
                {/* Competencies bars */}
                <div className="space-y-2 text-[7px]">
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-600">
                      <span>Trabajo en Equipo</span>
                      <span>5 / 5</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-emerald-600" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-600">
                      <span>Proactividad</span>
                      <span>4 / 5</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[80%] h-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-600">
                      <span>Orientación a Resultados</span>
                      <span>5 / 5</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cursos':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Capacitación</span>
              <span className="material-symbols-outlined text-[14px]">school</span>
            </div>
            <div className="p-2.5 flex-grow overflow-y-auto space-y-2.5">
              <h6 className="text-[7px] text-slate-400 uppercase tracking-wider font-bold">Mis Cursos</h6>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm space-y-2">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded bg-pink-100 text-[#77574d] flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-base">lock</span></div>
                  <div>
                    <h6 className="font-bold text-[8px] leading-tight">Seguridad de Datos Básica</h6>
                    <span className="text-[6px] text-slate-400">Curso obligatorio</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[6px] text-slate-500 font-bold">
                    <span>Progreso del curso</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-[#77574d]" />
                  </div>
                </div>
                <button className="w-full bg-[#77574d] text-white py-1 rounded font-bold text-[7px]">Continuar Módulo</button>
              </div>
            </div>
          </div>
        );
      case 'encuestas':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Pulso Clima</span>
              <span className="material-symbols-outlined text-[14px]">quiz</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto flex flex-col justify-center space-y-3">
              <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-3 text-center">
                <h6 className="font-bold text-[8px] text-slate-600">Pregunta del Día Anónima</h6>
                <p className="font-bold text-[9px] text-[#77574d]">¿Cómo calificarías el nivel de comunicación y apoyo de tu líder esta semana?</p>
                {/* Smiley face picker */}
                <div className="flex justify-center gap-2">
                  <span className="text-base cursor-pointer hover:scale-125 transition-transform">😞</span>
                  <span className="text-base cursor-pointer hover:scale-125 transition-transform">😐</span>
                  <span className="text-base cursor-pointer hover:scale-125 transition-transform font-bold scale-110">🙂</span>
                  <span className="text-base cursor-pointer hover:scale-125 transition-transform">😄</span>
                </div>
                <button className="w-full bg-[#77574d] text-white py-1 rounded font-bold text-[7px]">Enviar Respuesta</button>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Bienestar</span>
              <span className="material-symbols-outlined text-[14px]">favorite</span>
            </div>
            <div className="p-2.5 flex-1 overflow-y-auto space-y-3">
              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-lg">spa</span>
                <div className="leading-tight">
                  <h6 className="font-bold text-[8px] text-emerald-950">Consejo Saludable de Hoy</h6>
                  <p className="text-[7px] text-emerald-800 font-medium">Recordá pausar para tomar agua y realizar estiramientos cortos cada 2 horas de trabajo.</p>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                <h6 className="font-bold text-[8px] text-slate-600 mb-1.5 uppercase">Desafío Saludable Semanal</h6>
                <div className="flex justify-between text-[7px] font-bold text-slate-500 mb-1">
                  <span>Pasos caminados (Meta: 10k diarios)</span>
                  <span>4 de 5 Días</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'okrs':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 text-[10px] font-sans">
            <div className="bg-[#77574d] text-white px-3 pt-6 pb-2 flex justify-between items-center shadow-sm">
              <span className="font-bold font-headline-md">Estrategia OKR</span>
              <span className="material-symbols-outlined text-[14px]">target</span>
            </div>
            <div className="p-2.5 flex-1 overflow-y-auto space-y-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <h6 className="font-bold text-[8px] text-slate-700 leading-tight">O1: Optimizar procesos comerciales internos</h6>
                  <span className="text-[7px] font-bold text-emerald-600">75%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-[#77574d]" />
                </div>
                <div className="space-y-1 pt-1.5 border-t text-[6px]">
                  <div className="flex justify-between text-slate-500">
                    <span>KR1: Capacitar al 100% de asesores</span>
                    <span className="font-bold text-emerald-700">100% ✅</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>KR2: Automatizar rendiciones viáticos</span>
                    <span className="font-bold text-amber-700">50% ⏳</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-full items-center justify-center bg-white p-4 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">touch_app</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pantalla de la App</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#faf9f9] text-[#1b1c1c] font-sans selection:bg-[#b7ede3] selection:text-[#124a43] min-h-screen">
      {/* Dossier Header */}
      <nav className="bg-[#faf9f9]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#bfc8c5]/30 transition-all duration-300 py-3 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-2xl text-[#124a43] tracking-tight font-bold">
              Anthrovia<span className="text-[#77574d] font-light">|Dossier</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-[#124a43] font-bold border-b-2 border-[#124a43] pb-1 text-sm" href="#intro">
              Introducción
            </a>
            <a className="text-[#404946] hover:text-[#124a43] transition-colors text-sm" href="#modulos">
              Módulos
            </a>
            <a className="text-[#404946] hover:text-[#124a43] transition-colors text-sm" href="#roi">
              Impacto
            </a>
            <a className="text-[#404946] hover:text-[#124a43] transition-colors text-sm" href="#contacto">
              Contacto
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="/"
              className="text-[#124a43] font-bold text-xs px-4 py-2 border border-[#124a43]/20 rounded-full hover:bg-[#124a43]/5 transition-all"
            >
              Volver al Sitio
            </a>
            <a
              href="#contacto"
              className="bg-[#124a43] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#184f47] transition-all shadow-md"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-12 pb-16 px-6 md:px-16 max-w-[1440px] mx-auto border-b border-[#bfc8c5]/20"
          id="intro"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffdbd0] text-[#5d4036] text-xs font-bold uppercase tracking-widest">
                Resumen Ejecutivo 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#124a43] leading-tight font-headline-md">
                Elevando la <span className="text-[#77574d] italic">Experiencia Humana</span> en el Trabajo
              </h1>
              <p className="text-base md:text-lg text-[#404946] max-w-2xl leading-relaxed">
                Anthrovia HR es un ecosistema integral diseñado para armonizar la eficiencia corporativa con la empatía
                humana. Este dossier presenta nuestra arquitectura completa de módulos para cada etapa del ciclo del
                colaborador.
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl md:text-4xl text-[#124a43] font-bold">22</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#404946]">Módulos Especializados</p>
                </div>
                <div className="w-px h-12 bg-[#bfc8c5]" />
                <div>
                  <p className="text-3xl md:text-4xl text-[#77574d] font-bold">5</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#404946]">Categorías Estratégicas</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              {/* App Mockup */}
              <div className="w-60 border-8 border-slate-900 rounded-[2rem] bg-white aspect-[9/19] shadow-2xl relative overflow-hidden flex flex-col pt-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-slate-800 rounded-full" />
                </div>
                <div className="flex-1 bg-slate-100 flex flex-col justify-between p-3 text-center">
                  <div className="pt-8">
                    <span className="material-symbols-outlined text-4xl text-[#124a43] mb-1 animate-bounce">
                      touch_app
                    </span>
                    <h4 className="font-bold text-xs text-[#124a43]">Ecosistema Integrado</h4>
                  </div>
                  <p className="text-[9px] text-[#404946] leading-tight">
                    Navega a continuación para probar cada módulo de manera interactiva.
                  </p>
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 text-left space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Segmentation Guide Table */}
        <section className="py-12 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#bfc8c5]/30 shadow-lg">
            <div className="p-6 bg-[#124a43] text-white">
              <h3 className="text-xl md:text-2xl font-headline-md font-bold">Guía de Segmentación: Ideal para...</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#bfc8c5]/30">
                    <th className="p-4 font-bold text-[#124a43] uppercase text-xs">Tamaño de Empresa</th>
                    <th className="p-4 font-bold text-[#124a43] uppercase text-xs">Necesidad Principal</th>
                    <th className="p-4 font-bold text-[#124a43] uppercase text-xs">Módulos Sugeridos</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#404946]">
                  <tr className="border-b border-[#bfc8c5]/10">
                    <td className="p-4 font-bold text-[#124a43]">PyME Dinámica</td>
                    <td className="p-4">Digitalización base y comunicación ágil.</td>
                    <td className="p-4">Recibos, Chat, Vacaciones, Noticias.</td>
                  </tr>
                  <tr className="border-b border-[#bfc8c5]/10">
                    <td className="p-4 font-bold text-[#124a43]">Corporativo Scale-up</td>
                    <td className="p-4">Cultura, Engagement y Retención.</td>
                    <td className="p-4">Reconocimientos, Marketplace, OKRs, People Experience.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#124a43]">Gran Empresa / Holding</td>
                    <td className="p-4">Automatización, Operaciones y Talento.</td>
                    <td className="p-4">LMS, Firma Electrónica, Gestión de Servicios, Evaluación 360.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-16 bg-[#faf9f9] relative" id="modulos">
          <div className="mb-12 text-center max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl text-[#124a43] font-bold font-headline-md mb-4">
              Arquitectura Funcional Completa
            </h2>
            <p className="text-sm md:text-base text-[#404946]">
              Explora nuestra suite completa de 22 módulos interactivos organizados en 5 categorías clave. Selecciona los
              módulos en cada sección para visualizar una simulación en tiempo real de la aplicación.
            </p>
          </div>

          {/* Scrolling Connecting Line SVG */}
          <div ref={containerRef} className="relative max-w-[1440px] mx-auto px-6 md:px-16 space-y-24 z-10">
            {pathD && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
                {/* Background Shadow line */}
                <path d={pathD} fill="none" stroke="#124a43" strokeOpacity="0.08" strokeWidth="6" />
                {/* Main animated connecting dashed line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#gradient-line)"
                  strokeWidth="3.5"
                  strokeDasharray="10 10"
                  className="flowing-line"
                />
                <defs>
                  <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#124a43" />
                    <stop offset="25%" stopColor="#77574d" />
                    <stop offset="50%" stopColor="#6d2c43" />
                    <stop offset="75%" stopColor="#124a43" />
                    <stop offset="100%" stopColor="#77574d" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Custom style for the flowing line animation */}
            <style>{`
              @keyframes flowAnimation {
                to {
                  stroke-dashoffset: -40;
                }
              }
              .flowing-line {
                animation: flowAnimation 2s linear infinite;
              }
            `}</style>

            {DOSSIER_CATEGORIES.map((category, index) => {
              const isEven = index % 2 === 0;
              const activeModId = activeModules[category.id];
              const activeModule = category.modules.find((m) => m.id === activeModId) || category.modules[0];
              const categoryColorTheme =
                category.colorClass === 'primary'
                  ? '#124a43'
                  : category.colorClass === 'secondary'
                  ? '#77574d'
                  : '#6d2c43';
              const categoryBgColor =
                category.colorClass === 'primary'
                  ? 'bg-emerald-50 text-[#124a43]'
                  : category.colorClass === 'secondary'
                  ? 'bg-[#ffd3c6]/40 text-[#77574d]'
                  : 'bg-pink-50 text-[#6d2c43]';

              return (
                <div key={category.id} id={`categoria-${category.id}`} className="relative z-10">
                  {/* Desktop Grid Layout (hidden on mobile/tablet) */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Modules List or Smartphone Mockup depending on alternating order */}
                    <div
                      className={`lg:col-span-6 space-y-6 ${
                        isEven ? 'order-1' : 'order-1 lg:order-2'
                      }`}
                    >
                      {/* Category Title Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: `${categoryColorTheme}15`, color: categoryColorTheme }}
                        >
                          <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                        </div>
                        <div>
                          <span
                            className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${categoryBgColor}`}
                          >
                            Categoría {index + 1}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-[#1b1c1c] font-headline-md leading-tight mt-1">
                            {category.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-[#404946] mb-6">{category.description}</p>

                      {/* Module items grid / list */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {category.modules.map((m) => {
                          const isActive = m.id === activeModId;
                          return (
                            <button
                              key={m.id}
                              onClick={() =>
                                setActiveModules((prev) => ({
                                  ...prev,
                                  [category.id]: m.id,
                                }))
                              }
                              className={`p-3 text-left rounded-xl border transition-all duration-300 group flex items-start gap-3 w-full outline-none ${
                                isActive
                                  ? 'bg-white shadow-md'
                                  : 'bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300'
                              }`}
                              style={{
                                borderColor: isActive ? categoryColorTheme : undefined,
                                boxShadow: isActive ? `0 10px 25px -10px ${categoryColorTheme}30` : undefined,
                              }}
                            >
                              <span
                                className={`material-symbols-outlined text-lg rounded-lg p-1.5 transition-colors ${
                                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                                }`}
                                style={{
                                  backgroundColor: isActive ? categoryColorTheme : '#f1f5f9',
                                }}
                              >
                                {m.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-xs truncate text-[#1b1c1c]">
                                    {m.title}
                                  </span>
                                  <span className="text-[7px] px-1.5 py-0.2 rounded font-bold uppercase bg-slate-100 text-slate-500 scale-90">
                                    {m.badge}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                                  {m.shortDescription}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active module full description card */}
                      {activeModule && (
                        <div
                          className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 transition-all duration-500"
                          style={{ borderLeftWidth: '4px', borderLeftColor: categoryColorTheme }}
                        >
                          <div>
                            <h4 className="font-bold text-sm text-[#1b1c1c]">{activeModule.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">
                              {activeModule.longDescription}
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                            {activeModule.keyFeatures.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-1.5 text-[9px] text-[#404946]">
                                <span className="material-symbols-outlined text-[12px] font-bold" style={{ color: categoryColorTheme }}>
                                  check_circle
                                </span>
                                <span className="font-medium">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Smartphone Mockup */}
                    <div
                      ref={(el) => (phoneRefs.current[index] = el)}
                      className={`lg:col-span-6 flex justify-center z-10 ${
                        isEven ? 'order-2' : 'order-2 lg:order-1'
                      }`}
                    >
                      {/* Realistic iPhone mockup */}
                      <div
                        onClick={() => setFullscreenModule(activeModId)}
                        className="w-[240px] border-8 border-slate-900 rounded-[2.5rem] bg-slate-900 aspect-[9/19] shadow-2xl relative overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02] cursor-pointer group/phone"
                        style={{
                          boxShadow: `0 25px 60px -15px ${categoryColorTheme}25`,
                        }}
                      >
                        {/* Notch / Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-slate-800 rounded-full ml-auto mr-4" />
                        </div>

                        {/* Phone status bar */}
                        <div className="absolute top-0 left-0 w-full px-4 pt-1 flex justify-between items-center text-[7px] text-slate-400 font-bold z-20 select-none">
                          <span>09:41</span>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[8px] font-bold">signal_cellular_4_bar</span>
                            <span className="material-symbols-outlined text-[8px] font-bold">wifi</span>
                            <span className="material-symbols-outlined text-[8px] font-bold">battery_5_bar</span>
                          </div>
                        </div>

                        {/* Phone screen container */}
                        <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative shadow-inner">
                          {renderPhoneScreen(activeModId)}
                        </div>

                        {/* Bottom home indicator bar */}
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-800 rounded-full z-20" />
                        
                        {/* Hover overlay for zoom */}
                        <div className="absolute inset-0 bg-slate-950/0 group-hover/phone:bg-slate-950/10 transition-colors flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-xs bg-slate-950/60 p-2 rounded-full opacity-0 group-hover/phone:opacity-100 transition-opacity flex items-center gap-1 font-bold">
                            zoom_in <span className="text-[8px] font-sans">Ampliar</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Horizontal Carousel Layout (hidden on desktop) */}
                  <div className="lg:hidden space-y-6">
                    {/* Category Title Header */}
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${categoryColorTheme}15`, color: categoryColorTheme }}
                      >
                        <span className="material-symbols-outlined text-xl">{category.icon}</span>
                      </div>
                      <div>
                        <span
                          className={`text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${categoryBgColor}`}
                        >
                          Categoría {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-[#1b1c1c] font-headline-md leading-tight mt-0.5">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#404946]">{category.description}</p>

                    {/* Horizontal scroll track */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
                      {category.modules.map((m) => (
                        <div
                          key={m.id}
                          className="w-[260px] shrink-0 snap-center bg-white p-4 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between gap-4"
                          style={{ scrollSnapAlign: 'center' }}
                        >
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span
                                className="material-symbols-outlined text-sm rounded-lg p-1.5 text-white"
                                style={{ backgroundColor: categoryColorTheme }}
                              >
                                {m.icon}
                              </span>
                              <span className="text-[7px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-500">
                                {m.badge}
                              </span>
                            </div>
                            <h4 className="font-bold text-xs text-[#1b1c1c] mt-1">{m.title}</h4>
                            <p className="text-[10px] text-slate-500 leading-tight">{m.shortDescription}</p>
                          </div>

                          {/* Compact phone mockup inside slide */}
                          <div className="flex justify-center py-2">
                            <div
                              onClick={() => setFullscreenModule(m.id)}
                              className="w-[120px] border-4 border-slate-900 rounded-[1.5rem] bg-slate-900 aspect-[9/19] shadow-md relative overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.02]"
                            >
                              {/* Notch */}
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-900 rounded-b-md z-20" />
                              {/* Screen */}
                              <div className="flex-1 bg-slate-100 rounded-[1.1rem] overflow-hidden relative shadow-inner">
                                {renderPhoneScreen(m.id)}
                              </div>
                              {/* Overlay zoom indicator */}
                              <div className="absolute inset-0 bg-slate-950/0 hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xs bg-slate-950/60 p-1 rounded-full pointer-events-none">
                                  zoom_in
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setFullscreenModule(m.id)}
                            className="w-full text-center py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-[8px] hover:bg-slate-50 transition-colors"
                          >
                            Ver pantalla completa
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ROI Impact Section */}
        <section
          className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#124a43] text-white rounded-[2.5rem] my-12"
          id="roi"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline-md font-bold leading-tight">
                Impacto Real: ROI en el Primer Trimestre
              </h2>
              <p className="text-sm md:text-base text-emerald-100/90 leading-relaxed">
                Nuestros clientes experimentan transformaciones tangibles en la eficiencia y el clima organizacional
                desde la implementación inicial de la plataforma.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-headline-md font-bold mb-1">3 Meses</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">Retorno de Inversión</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-headline-md font-bold mb-1">3.5hs</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                    Ahorro Semanal por Líder
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-headline-md font-bold mb-1">40%</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                    Menos Carga Administrativa
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-headline-md font-bold mb-1">+25%</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">Engagement General</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-[#77574d]/20 rounded-full blur-3xl" />
              <div className="relative z-10 p-6 bg-[#faf9f9] text-[#124a43] rounded-3xl border border-[#bfc8c5]/30 shadow-2xl">
                <p className="font-bold font-headline-md text-sm mb-4">Crecimiento de Eficiencia Operativa</p>
                <div className="h-56 flex items-end gap-4 pt-4 border-b border-[#bfc8c5]/30 pb-1">
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#124a43]/20 rounded-t-lg h-16 transition-all duration-500" />
                    <span className="text-[8px] font-bold text-slate-500">Mes 1</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#124a43]/40 rounded-t-lg h-28 transition-all duration-500" />
                    <span className="text-[8px] font-bold text-slate-500">Mes 2</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#124a43]/70 rounded-t-lg h-40 transition-all duration-500" />
                    <span className="text-[8px] font-bold text-slate-500">Mes 3</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#124a43] rounded-t-lg h-48 transition-all duration-500" />
                    <span className="text-[8px] font-bold text-[#124a43]">Mes 4+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto border-b border-[#bfc8c5]/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#124a43] font-bold font-headline-md mb-4">
              Integración Sin Fricciones
            </h2>
            <p className="text-sm md:text-base text-[#404946] max-w-2xl mx-auto">
              Conéctese de manera segura con las herramientas que impulsan su negocio a diario. Anthrovia se integra
              nativamente con su ecosistema de sistemas de TI.
            </p>
          </div>
          <div className="bg-[#f5f3f3] p-10 rounded-[2.5rem] border border-[#bfc8c5]/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center opacity-85">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center font-bold text-[#124a43] text-lg border border-slate-100">
                  SAP
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#404946]">ERP/HRIS</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center font-bold text-[#124a43] text-lg border border-slate-100">
                  O365
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#404946]">Productividad</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center font-bold text-[#124a43] text-lg border border-slate-100">
                  Slack
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#404946]">Colaboración</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center font-bold text-[#124a43] text-lg border border-slate-100">
                  Gmail
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#404946]">Email</span>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-slate-700">
              <div className="flex gap-3 p-2.5 rounded-xl hover:bg-white/50 transition-colors">
                <span className="material-symbols-outlined text-[#124a43]">hub</span>
                <div>
                  <h4 className="font-bold text-xs text-[#124a43]">Acceso Transversal</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Sincronización automática de bases y legajos.</p>
                </div>
              </div>
              <div className="flex gap-3 p-2.5 rounded-xl hover:bg-white/50 transition-colors">
                <span className="material-symbols-outlined text-[#124a43]">api</span>
                <div>
                  <h4 className="font-bold text-xs text-[#124a43]">API Abierta</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Capacidad para integraciones y webhooks.</p>
                </div>
              </div>
              <div className="flex gap-3 p-2.5 rounded-xl hover:bg-white/50 transition-colors">
                <span className="material-symbols-outlined text-[#124a43]">security</span>
                <div>
                  <h4 className="font-bold text-xs text-[#124a43]">SSO Nativo</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Autenticación unificada de un solo clic.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiplatform Section */}
        <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#b7ede3] text-[#184f47] text-xs font-bold uppercase tracking-widest">
                Omnicanalidad
              </div>
              <h2 className="text-4xl text-[#124a43] leading-tight font-headline-md font-bold">
                Anthrovia es <span className="text-[#77574d] italic">multiplataforma</span>
              </h2>
              <p className="text-sm md:text-base text-[#404946] leading-relaxed">
                Diseñamos una experiencia fluida que acompaña al colaborador donde sea que esté. Desde la profundidad
                analítica en escritorio hasta la agilidad instantánea en dispositivos móviles.
              </p>
              <ul className="space-y-3 pt-2 font-bold text-sm text-[#124a43]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#77574d]">check_circle</span>
                  Experiencia Web de alto rendimiento corporativo
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#77574d]">check_circle</span>
                  Aplicaciones nativas en iOS y Android
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#77574d]">check_circle</span>
                  Terminales de autogestión físicas para plantas
                </li>
              </ul>
            </div>
            {/* Visual compositions */}
            <div className="flex gap-4 items-center justify-center">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-[#124a43]/40 text-3xl">desktop_windows</span>
                <div>
                  <h5 className="font-bold text-xs text-[#124a43]">Desktop</h5>
                  <span className="text-[9px] text-slate-500">Módulos analíticos</span>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-[#124a43]/40 text-3xl">smartphone</span>
                <div>
                  <h5 className="font-bold text-xs text-[#124a43]">Mobile</h5>
                  <span className="text-[9px] text-slate-500">Acciones ágiles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-[#2e625a]/5 border-t border-[#bfc8c5]/30" id="contacto">
          <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-[#bfc8c5]/20 grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-headline-md font-bold text-[#124a43] leading-tight">
                  ¿Listo para transformar su estrategia de RR. HH.?
                </h2>
                <p className="text-xs md:text-sm text-[#404946] leading-relaxed">
                  Nuestro equipo está listo para ofrecer un recorrido personalizado por la plataforma Anthrovia.
                  Construyamos juntos el futuro del trabajo de su empresa.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="bg-[#124a43] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#184f47] transition-all shadow-md">
                    Agendar Consulta
                  </button>
                  <a
                    className="inline-flex items-center gap-2 text-[#124a43] font-bold text-xs px-4 py-3"
                    href="#"
                  >
                    Catálogo Completo (PDF){' '}
                    <span className="material-symbols-outlined text-[10px]">download</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[9px] text-[#124a43] font-bold uppercase tracking-wider mb-1">
                    Contacto Corporativo
                  </p>
                  <p className="font-headline-md text-xl md:text-2xl font-bold">hello@anthrovia.hr</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[9px] text-[#124a43] font-bold uppercase tracking-wider mb-1">
                    Soporte Regional
                  </p>
                  <p className="font-headline-md text-xl md:text-2xl font-bold">+1 (555) 012-3456</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Dossier Footer */}
      <footer className="bg-slate-100 py-12 border-t border-[#bfc8c5]/20">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-headline-md text-xl text-[#124a43] font-bold">
              Anthrovia<span className="text-[#77574d] font-light">|HR</span>
            </span>
            <p className="text-xs text-[#404946] leading-relaxed">
              © 2026 Anthrovia HR. Todos los derechos reservados.
              <br />
              Dossier Corporativo Confidencial.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#124a43] mb-4 text-xs uppercase tracking-wider">Mapa de Soluciones</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="text-[#404946] hover:text-[#124a43] transition-all" href="#modulos">
                  Directorio de Módulos
                </a>
              </li>
              <li>
                <a className="text-[#404946] hover:text-[#124a43] transition-all" href="#roi">
                  Motor de Impacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#124a43] mb-4 text-xs uppercase tracking-wider">Recursos</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="text-[#404946] hover:text-[#124a43] transition-all" href="#">
                  Metodología
                </a>
              </li>
              <li>
                <a className="text-[#404946] hover:text-[#124a43] transition-all" href="#">
                  Privacidad & Seguridad
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#124a43] mb-2 text-xs uppercase tracking-wider">Boletín</h4>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="bg-white border border-[#bfc8c5]/40 rounded-lg px-3 py-1.5 text-xs w-full focus:ring-1 focus:ring-[#124a43] outline-none"
                placeholder="Email Corporativo"
                type="email"
              />
              <button className="bg-[#124a43] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#184f47]">
                Conectar Ahora
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Fullscreen Module Modal */}
      {fullscreenModule && (() => {
        // Find module data
        const allModulesList = DOSSIER_CATEGORIES.flatMap(c => c.modules);
        const curIndex = allModulesList.findIndex(m => m.id === fullscreenModule);
        const moduleItem = allModulesList[curIndex];
        
        if (!moduleItem) return null;
        
        const category = DOSSIER_CATEGORIES.find(c => c.modules.some(m => m.id === fullscreenModule));
        const categoryColorTheme =
          category?.colorClass === 'primary'
            ? '#124a43'
            : category?.colorClass === 'secondary'
            ? '#77574d'
            : '#6d2c43';

        const showPrev = curIndex > 0;
        const showNext = curIndex < allModulesList.length - 1;

        const handlePrev = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (showPrev) setFullscreenModule(allModulesList[curIndex - 1].id);
        };

        const handleNext = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (showNext) setFullscreenModule(allModulesList[curIndex + 1].id);
        };

        return (
          <div 
            className="fixed inset-0 bg-slate-950/90 z-[100] flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
            onClick={() => setFullscreenModule(null)}
          >
            {/* Modal Container */}
            <div 
              className="bg-white rounded-3xl p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 flex items-center justify-center transition-colors"
                onClick={() => setFullscreenModule(null)}
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>

              {/* Full-size phone mockup (Left on Desktop, Top on Mobile) */}
              <div className="flex-grow flex justify-center items-center relative py-4 min-h-[340px] md:min-h-[440px] select-none">
                {/* Navigation Arrows inside modal */}
                {showPrev && (
                  <button 
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 flex items-center justify-center z-30 transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                )}
                
                {showNext && (
                  <button 
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 flex items-center justify-center z-30 transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                )}

                {/* iPhone Frame */}
                <div 
                  className="w-[200px] md:w-[240px] border-8 border-slate-900 rounded-[2.5rem] bg-slate-900 aspect-[9/19] shadow-2xl relative overflow-hidden flex flex-col"
                  style={{ boxShadow: `0 20px 50px -10px ${categoryColorTheme}35` }}
                >
                  {/* Notch / Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-lg z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-800 rounded-full ml-auto mr-3" />
                  </div>
                  {/* Phone status bar */}
                  <div className="absolute top-0 left-0 w-full px-4 pt-1 flex justify-between items-center text-[7px] text-slate-400 font-bold z-20 select-none">
                    <span>09:41</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[8px] font-bold">signal_cellular_4_bar</span>
                      <span className="material-symbols-outlined text-[8px] font-bold">wifi</span>
                      <span className="material-symbols-outlined text-[8px] font-bold">battery_5_bar</span>
                    </div>
                  </div>
                  {/* Phone screen */}
                  <div className="flex-1 bg-slate-100 rounded-[2.1rem] overflow-hidden relative shadow-inner">
                    {renderPhoneScreen(moduleItem.id)}
                  </div>
                  {/* Bottom home indicator bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-800 rounded-full z-20" />
                </div>
              </div>

              {/* Module Information (Right on Desktop, Bottom on Mobile) */}
              <div className="flex-grow md:w-1/2 flex flex-col justify-center space-y-4 md:border-l md:border-slate-100 md:pl-6">
                <div>
                  <span 
                    className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{ 
                      backgroundColor: `${categoryColorTheme}15`, 
                      color: categoryColorTheme 
                    }}
                  >
                    {category?.title}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-headline-md text-slate-800 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: categoryColorTheme }}>{moduleItem.icon}</span>
                    {moduleItem.title}
                  </h3>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mt-1 block">Módulo {curIndex + 1} de {allModulesList.length}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {moduleItem.longDescription}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Funcionalidades Clave</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {moduleItem.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[9px] text-slate-700">
                        <span className="material-symbols-outlined text-xs font-bold" style={{ color: categoryColorTheme }}>
                          check_circle
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-100">
                  <span>Usa las flechas del teclado (← / →) o haz clic para cambiar de módulo</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
