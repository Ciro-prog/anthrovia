import { motion } from "framer-motion";

export const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center py-12 bg-white overflow-hidden">
      <div className="relative flex items-center justify-center w-full max-w-2xl px-4">
        {/* Left Line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-1.5 bg-gradient-to-l from-primary/30 to-transparent w-full"
        />

        {/* Central Geometric Element */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="mx-4 relative"
        >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity, 
                repeatDelay: 5 
              }}
              className="relative"
            >
              <div className="w-3 h-3 bg-primary rotate-45 transform" />
              <div className="absolute top-0 left-0 w-3 h-3 border border-accent-terracotta rotate-45 transform scale-150" />
            </motion.div>
        </motion.div>

        {/* Right Line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-1.5 bg-gradient-to-r from-primary/30 to-transparent w-full"
        />
      </div>
    </div>
  );
};
