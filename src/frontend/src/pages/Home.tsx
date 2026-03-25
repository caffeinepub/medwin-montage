import { Link } from "@tanstack/react-router";
import {
  Camera,
  ChevronRight,
  Film,
  Mail,
  MessageCircle,
  Play,
  Share2,
  TrendingUp,
  Video,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import PageBackground from "../components/PageBackground";
import SectionTitle from "../components/SectionTitle";
import {
  useGetPublishedBrands,
  useGetPublishedVideos,
  useGetSiteStats,
} from "../hooks/useQueries";

const FALLBACK_VIMEO_IDS = [
  "1176462678",
  "1176462651",
  "1176462632",
  "1176462602",
  "1176462586",
];

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
];

const fallbackBrands = [
  "Beef Boss Thanjavur",
  "Anand Saloon Thanjavur",
  "Thanjai Car Accessories",
  "Kolapasi Restaurant",
  "My Thanjai",
  "Elto Landscapes",
  "Abi Kowsa",
];

function AnimatedCounter({
  target,
  suffix = "",
  label,
}: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gold">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2 font-sans-ui">
        {label}
      </p>
    </div>
  );
}

function VimeoCard({
  vimeoId,
  title,
  isMobile,
}: { vimeoId: string; title: string; isMobile: boolean }) {
  const [playing, setPlaying] = useState(false);

  if (isMobile) {
    return (
      <div className="relative rounded-sm overflow-hidden bg-black border border-gold/50 gold-border">
        <div className="aspect-[9/16] relative flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
          {!playing ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="relative z-10 play-btn"
                aria-label={`Play ${title}`}
                data-ocid="portfolio.button"
              >
                <Play
                  className="w-8 h-8 text-primary-foreground ml-1"
                  fill="currentColor"
                />
              </button>
              <div className="absolute bottom-3 left-4">
                <span className="text-xs text-gold uppercase tracking-widest">
                  {title}
                </span>
              </div>
            </>
          ) : (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={title}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-sm overflow-hidden bg-black border border-gold/50 gold-border group">
      <div className="aspect-[9/16] relative">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <span className="text-xs text-gold uppercase tracking-widest font-sans-ui">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { data: backendVideos } = useGetPublishedVideos();
  const { data: backendBrands } = useGetPublishedBrands();
  const { data: stats } = useGetSiteStats();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const featuredVideos =
    backendVideos && backendVideos.length > 0
      ? backendVideos
          .slice(0, 5)
          .map((v) => ({ id: v.vimeoId, title: v.title }))
      : FALLBACK_VIMEO_IDS.map((id, i) => ({ id, title: `Project ${i + 1}` }));

  const brands =
    backendBrands && backendBrands.length > 0
      ? backendBrands.map((b) => b.name)
      : fallbackBrands;

  const videosDelivered = stats ? Number(stats.videosDelivered) : 50;
  const happyClients = stats ? Number(stats.happyClients) : 15;
  const viewsGenerated = stats ? Number(stats.viewsGenerated) : 3;

  return (
    <div className="overflow-hidden relative">
      <PageBackground src="/assets/generated/bg-home.dim_1920x1080.jpg" />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            Freelancers · Tamilnadu
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

      {/* STATS */}
      <section className="py-16 bg-charcoal border-y border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8">
            <AnimatedCounter
              target={videosDelivered}
              suffix="+"
              label="Videos Delivered"
            />
            <AnimatedCounter
              target={happyClients}
              suffix="+"
              label="Happy Clients"
            />
            <AnimatedCounter
              target={viewsGenerated}
              suffix="M+"
              label="Views Generated"
            />
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Portfolio"
            title="Featured Work"
            subtitle="Real projects — watch them play right here"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuredVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-ocid={`featured.item.${i + 1}`}
              >
                <VimeoCard
                  vimeoId={video.id}
                  title={video.title}
                  isMobile={isMobile}
                />
              </motion.div>
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

      {/* SERVICES */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="What I Do"
            title="Your Vision, My Edit"
            subtitle="Full-service creative production — from concept to final delivery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center p-6 bg-black border border-gold/50 rounded-sm gold-border card-cinematic"
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
                className="border border-gold/50 rounded-sm p-6 text-center gold-border card-cinematic"
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

      {/* CTA */}
      <section className="py-20 bg-charcoal border-y border-gold/30">
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
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
              data-ocid="cta.primary_button"
            >
              <MessageCircle className="w-4 h-4" /> Start a Project
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border border-gold/50 text-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold/10 transition-all rounded-sm"
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
