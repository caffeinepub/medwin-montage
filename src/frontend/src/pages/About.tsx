import { Award, Camera, CheckCircle, Cpu, Users } from "lucide-react";
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

const gear = [
  {
    cat: "Camera Gear",
    items: [
      "Sony A7 III",
      "DJI Drone",
      "Gimbal Stabilizer",
      "Studio Lighting Kit",
      "DJI Action Camera",
    ],
  },
  {
    cat: "Editing Software",
    items: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Adobe Photoshop",
      "Canva Pro",
    ],
  },
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
    icon: Cpu,
    title: "Latest Technology",
    desc: "Professional-grade equipment and industry-leading software.",
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        title="About Medwin Montage"
        subtitle="A creative studio built on passion, precision, and storytelling."
        accent="Who We Are"
      />

      {/* Who I Am + Journey */}
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

      {/* Skills */}
      <section className="py-24 bg-charcoal-light">
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
                  <span className="text-sm text-gold font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-charcoal rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.08 + 0.2,
                      ease: "easeOut",
                    }}
                    className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Equipment" title="Gear I Use" />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {gear.map((g, i) => (
              <motion.div
                key={g.cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-sm p-8 gold-border"
              >
                <h3 className="font-display text-lg font-bold text-gold uppercase tracking-widest mb-6">
                  {g.cat}
                </h3>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ME */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Why Us" title="Why Choose Medwin Montage" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {usps.map((usp, i) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={usp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-8 bg-card border border-border rounded-sm gold-border card-cinematic text-center"
                >
                  <Icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-3">
                    {usp.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {usp.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
