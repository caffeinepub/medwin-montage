import { motion } from "motion/react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export default function PageHero({ title, subtitle, accent }: PageHeroProps) {
  return (
    <section className="relative py-28 md:py-36 bg-charcoal overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light/50 to-charcoal" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        {/* Filmstrip lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {accent && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-sans-ui"
          >
            {accent}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-wide"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
