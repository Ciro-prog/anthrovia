
import React from 'react';
import { SERVICES } from '../constants';

const IconWrapper: React.FC<{ type: string }> = ({ type }) => {
  const icons: Record<string, React.ReactNode> = {
    search: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    briefcase: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    smile: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    users: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  };
  return icons[type] || icons['briefcase'];
};

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-cta text-brand-terracotta text-xs uppercase tracking-[0.5em] font-bold mb-6 block">Nuestra Experiencia</span>
            <h2 className="font-display text-5xl md:text-7xl text-brand-green leading-tight">
              Soluciones <span className="italic text-brand-wine">Integrales</span> de RRHH
            </h2>
          </div>
          <p className="font-body text-brand-gray text-lg max-w-sm md:text-right border-r-2 border-brand-peach/30 pr-6">
            Estrategias personalizadas para el crecimiento sostenible de su organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {SERVICES.map((service, index) => {
            // Estilos alternados para crear el efecto de mosaico asimétrico
            const isEven = index % 2 === 0;
            const isThird = (index + 1) % 3 === 0;
            
            return (
              <div 
                key={service.id} 
                className={`
                  relative p-12 transition-all duration-1000 group
                  ${index % 3 === 0 ? 'bg-brand-cream rounded-tr-[120px] rounded-bl-[120px] hover:rounded-tr-[40px] hover:rounded-bl-[40px]' : ''}
                  ${index % 3 === 1 ? 'bg-brand-green text-white rounded-tl-[120px] rounded-br-[120px] hover:rounded-tl-[40px] hover:rounded-br-[40px] md:translate-y-12' : ''}
                  ${index % 3 === 2 ? 'bg-brand-wine text-white rounded-tr-[120px] rounded-bl-[120px] hover:rounded-tr-[40px] hover:rounded-bl-[40px] lg:translate-y-24' : ''}
                `}
              >
                <div className={`
                  mb-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110
                  ${index % 3 === 0 ? 'text-brand-green' : 'text-brand-peach'}
                `}>
                  <IconWrapper type={service.icon} />
                </div>

                <h3 className="font-display text-2xl md:text-3xl mb-6 leading-snug">
                  {service.title}
                </h3>

                <p className={`
                  font-body text-sm md:text-base leading-relaxed opacity-90
                  ${index % 3 === 0 ? 'text-brand-gray' : 'text-white/80'}
                `}>
                  {service.description}
                </p>

                {/* Marca de agua decorativa con el número del servicio */}
                <span className={`
                  absolute bottom-8 right-12 font-display text-6xl opacity-5 transition-opacity group-hover:opacity-10
                  ${index % 3 === 0 ? 'text-brand-green' : 'text-white'}
                `}>
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elementos decorativos de fondo para romper la monotonía */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/20 -z-10 skew-x-12 transform origin-top" />
    </section>
  );
};

export default Services;