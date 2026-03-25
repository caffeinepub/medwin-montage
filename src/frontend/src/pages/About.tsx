import { Award, Camera, CheckCircle, Users } from "lucide-react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";

const skills = [
  { label: "Video Editing", level: 95 },
  { label: "Color Grading", level: 90 },
  { label: "Cinematography", level: 88 },
  { label: "Motion Graphics", level: 80 },
  { label: "Social Media", level: 92 },
  { label: "Digital Marketing", level: 85 },
  { label: "Script Writing", level: 82 },
];

const usps = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Every frame is crafted with cinematic precision and an eye for detail.",
  },
  {
    icon: Camera,
    title: "Full-Service Studio",
    desc: "From shoot to final delivery — one team, zero compromise.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    desc: "Your vision leads the process. Revisions until you're 100% satisfied.",
  },
  {
    icon: CheckCircle,
    title: "On-Time Delivery",
    desc: "Consistent, reliable turnaround. Your deadlines are our deadlines.",
  },
];

const milestones = [
  { year: "2020", event: "Founded Medwin Montage in Thanjavur" },
  { year: "2021", event: "First 10 client brands onboarded" },
  { year: "2022", event: "Expanded to full cinematography services" },
  { year: "2023", event: "1M+ views generated for clients" },
  { year: "2024", event: "3M+ views, 15+ happy clients" },
];

export default function About() {
  return (
    <div>
      <PageHero
        title="About Medwin Montage"
        subtitle="A creative studio built on passion, precision, and storytelling."
        accent="Who We Are"
      />

      {/* Who I Am */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-sans-ui">
                My Story
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground uppercase mb-6">
                Who I Am
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Medwin Montage began with a passion for storytelling and visual
                creativity, growing from simple edits into a full-service
                creative brand delivering high-quality videos, reels, and
                digital marketing solutions for modern businesses and creators.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With years of hands-on experience behind the lens and at the
                editing desk, I bring a unique blend of technical mastery and
                creative vision to every project — ensuring your brand's story
                is told the way it deserves to be.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Video Editing",
                  "Cinematography",
                  "Motion Graphics",
                  "Digital Marketing",
                  "Content Strategy",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-gold/40 text-gold px-3 py-1 rounded-sm uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/assets/generated/about-bts.dim_1200x600.jpg"
                alt="Behind the scenes"
                className="w-full rounded-sm object-cover"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-sm" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Timeline" title="The Journey" />
          <div className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-6 items-start pb-8 relative"
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="font-display text-gold font-bold text-lg">
                    {m.year}
                  </span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gold mt-1.5" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gold/30 mt-1 min-h-[2rem]" />
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed pt-0.5">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Expertise" title="Skills & Mastery" />
          <div className="space-y-6 mt-12">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wide font-sans-ui">
                    {skill.label}
                  </span>
                  <span className="text-gold text-sm font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    style={{
                      backgroundColor:
                        skill.level <= 60
                          ? "#b45309"
                          : skill.level <= 80
                            ? "#d97706"
                            : "#f59e0b",
                    }}
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Why Us" title="Why Choose Medwin Montage" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {usps.map((usp, i) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={usp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 bg-card border border-border/50 rounded-sm gold-border card-cinematic"
                  data-ocid={`about.item.${i + 1}`}
                >
                  <Icon className="w-8 h-8 text-gold mb-4" />
                  <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-2">
                    {usp.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {usp.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold/10 border-y border-gold/30 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase mb-4">
            Ready to Tell Your Story?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's create something unforgettable together.
          </p>
          <a
            href="https://wa.me/919487897160"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="about.primary_button"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
