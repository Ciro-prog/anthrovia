import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { LEGAL_CONTENT } from '../data/legal-content';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const content = type === 'privacy' ? LEGAL_CONTENT.privacyPolicy : LEGAL_CONTENT.termsConditions;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-verde-profundo/40 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-blanco rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-durazno/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-durazno/10 flex items-center justify-between bg-crema/30">
              <div className="flex items-center gap-3">
                {type === 'privacy' ? (
                  <ShieldCheck className="w-6 h-6 text-verde-profundo" />
                ) : (
                  <FileText className="w-6 h-6 text-verde-profundo" />
                )}
                <h2 className="font-playfair text-2xl font-bold text-verde-profundo">
                  {content.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-durazno/10 rounded-full transition-colors text-gris-neutro hover:text-vino"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-durazno/30">
              {content.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-playfair text-lg font-semibold text-verde-profundo flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-durazno" />
                    {section.title}
                  </h3>
                  <p className="font-lora text-gris-neutro leading-relaxed text-sm md:text-base">
                    {section.content}
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t border-durazno/10">
                <p className="font-montserrat text-[10px] text-gris-neutro uppercase tracking-wider text-center">
                  Anthrovia HR • Procesos de Selección
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-crema/30 border-t border-durazno/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-verde-profundo text-blanco rounded-lg font-montserrat font-medium hover:bg-verde-profundo/90 transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
