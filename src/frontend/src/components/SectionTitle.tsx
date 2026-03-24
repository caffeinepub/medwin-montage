import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface SectionTitleProps {
  accent?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  accent,
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`mb-12 ${center ? "text-center" : ""}`}>
      {accent && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-sans-ui"
        >
          {accent}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
