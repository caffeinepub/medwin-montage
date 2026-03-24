import { Link } from "@tanstack/react-router";
import {
  Camera,
  ChevronRight,
  Film,
  Mail,
  MessageCircle,
  Play,
  Share2,
  Star,
  TrendingUp,
  Video,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import SectionTitle from "../components/SectionTitle";

const services = [
  {
    icon: Video,
    label: "Video Editing",
    desc: "Professional cuts, color grading & post-production",
  },
  {
    icon: Camera,
    label: "Cinematography",
    desc: "Cinematic shoots with professional equipment",
  },
  {
    icon: Share2,
    label: "Content Creation",
    desc: "Reels, shorts & social media content",
  },
  {
    icon: TrendingUp,
    label: "Digital Marketing",
    desc: "Brand growth & campaign management",
  },
  {
    icon: Film,
    label: "Script Writing",
    desc: "Compelling scripts for any format",
  },
  {
    icon: Star,
    label: "YouTube Growth",
    desc: "Strategy & content for channel expansion",
  },
];

const featuredWork = [
  {
    title: "Brand Commercial",
    category: "Ads & Promotions",
    gradient: "from-amber-900/80 via-orange-950/90 to-black",
    img: "/assets/generated/portfolio-ads.dim_800x500.jpg",
  },
  {
    title: "Cityscape Timelapse",
    category: "Cinematography",
    gradient: "from-blue-950/80 via-slate-900/90 to-black",
    img: "/assets/generated/portfolio-cinematic.dim_800x500.jpg",
  },
  {
    title: "Product Launch Reel",
    category: "Reels & Short Content",
    gradient: "from-purple-950/80 via-slate-900/90 to-black",
    img: "/assets/generated/portfolio-reels.dim_800x500.jpg",
  },
  {
    title: "Edit Showreel 2024",
    category: "Video Editing",
    gradient: "from-emerald-950/80 via-slate-900/90 to-black",
    img: "/assets/generated/portfolio-editing.dim_800x500.jpg",
  },
  {
    title: "Wedding Highlights",
    category: "Cinematography",
    gradient: "from-rose-950/80 via-slate-900/90 to-black",
    img: null,
  },
  {
    title: "Tech Startup Story",
    category: "Brand Film",
    gradient: "from-cyan-950/80 via-slate-900/90 to-black",
    img: null,
  },
];

const brands = [
  "Beef Boss Thanjavur",
  "Anand Saloon Thanjavur",
  "Thanjai Car Accessories",
  "Kolapasi Restaurant",
  "My Thanjai",
  "Elto Landscapes",
  "Abi Kowsa",
];

const processSteps = [
  {
    num: "01",
    label: "Shoot",
    desc: "Capturing your vision with professional cinema gear",
  },
  {
    num: "02",
    label: "Edit",
    desc: "Precision editing with world-class software",
  },
  {
    num: "03",
    label: "Review",
    desc: "Collaborative feedback and refinement rounds",
  },
  {
    num: "04",
    label: "Deliver",
    desc: "Final delivery in all required formats",
  },
];

const filmstripItems = Array.from({ length: 40 }, (_, i) => i);

function FeaturedCard({
  item,
  index,
}: { item: (typeof featuredWork)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-sm overflow-hidden card-cinematic cursor-pointer gold-border group"
    >
      <div className="aspect-video relative overflow-hidden">
        {item.img ? (
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="play-btn">
            <Play
              className="w-6 h-6 text-primary-foreground ml-1"
              fill="currentColor"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-xs text-gold uppercase tracking-widest font-sans-ui">
            {item.category}
          </span>
          <h3 className="font-display text-base font-semibold text-foreground mt-1">
            {item.title}
          </h3>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-cinematographer.dim_1920x1080.jpg"
            alt="Cinematographer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold text-xs uppercase tracking-[0.4em] mb-6 font-sans-ui"
          >
            Creative Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase leading-none tracking-tight"
          >
            <span className="block text-foreground">Medwin</span>
            <span className="block text-gold-gradient">Montage</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-muted-foreground text-base md:text-xl tracking-wide max-w-lg mx-auto"
          >
            Crafting Stories, Capturing Moments
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all gold-shimmer rounded-sm"
              data-ocid="hero.primary_button"
            >
              Explore Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:medwinmontage@gmail.com"
              className="inline-flex items-center gap-2 border border-gold/50 text-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-gold hover:bg-gold/10 transition-all rounded-sm"
              data-ocid="hero.secondary_button"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a
              href="https://wa.me/919487897160"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/50 text-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-gold hover:bg-gold/10 transition-all rounded-sm"
              data-ocid="hero.secondary_button"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* WHAT I DO */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="What I Do"
            title="Your Vision, My Edit"
            subtitle="Full-service creative production — from concept to final delivery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center p-6 bg-card border border-border/50 rounded-sm gold-border card-cinematic"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <Icon className="w-8 h-8 text-gold mb-3" />
                  <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                    {svc.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Portfolio"
            title="Featured Work"
            subtitle="A curated selection of recent projects across video editing, cinematography, and content creation"
          />
          <div className="relative mb-8">
            <div className="h-6 flex items-center gap-2 overflow-hidden opacity-30">
              {filmstripItems.map((n) => (
                <div
                  key={n}
                  className="w-4 h-4 flex-shrink-0 border border-gold/40 rounded-sm"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWork.map((item, i) => (
              <FeaturedCard key={item.title} item={item} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 border border-gold/50 text-gold px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold/10 transition-all rounded-sm"
              data-ocid="featured.primary_button"
            >
              View Full Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-sm border border-gold/30 p-8 md:p-16 text-center bg-gradient-to-br from-charcoal to-charcoal-mid relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-2 font-sans-ui">
              How It Works
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground uppercase mb-12">
              Discover · Create · Deliver
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-display text-4xl font-bold text-gold/30 mb-2">
                    {step.num}
                  </span>
                  <h3 className="font-display text-lg font-bold text-gold uppercase tracking-wide mb-2">
                    {step.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Trusted By" title="Brands Worked With" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {brands.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-border/50 rounded-sm p-6 text-center gold-border card-cinematic"
                data-ocid={`brands.item.${i + 1}`}
              >
                <p className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                  {brand}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINE BANNER */}
      <section className="py-20 bg-gold/10 border-y border-gold/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-4xl font-bold text-foreground uppercase leading-tight"
          >
            Create. Capture. Convert.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-sm"
          >
            Turning ideas into cinematic stories since day one.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="https://wa.me/919487897160"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all gold-shimmer rounded-sm"
              data-ocid="cta.primary_button"
            >
              <MessageCircle className="w-4 h-4" /> Start a Project
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border border-gold/50 text-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-gold hover:bg-gold/10 transition-all rounded-sm"
              data-ocid="cta.secondary_button"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
