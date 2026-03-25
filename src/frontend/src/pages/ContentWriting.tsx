import { BookOpen, MessageSquare, PenLine, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";

const areas = [
  {
    icon: PenLine,
    title: "Script Writing",
    desc: "Compelling scripts for Reels, YouTube videos, ads, and brand films. Every word chosen to captivate and convert.",
    types: [
      "Instagram Reel scripts",
      "YouTube video scripts",
      "Ad scripts (15s, 30s, 60s)",
      "Brand film narratives",
    ],
  },
  {
    icon: MessageSquare,
    title: "Caption Writing",
    desc: "Platform-native captions that drive engagement, reflect your brand voice, and include strategic hashtag research.",
    types: [
      "Instagram captions",
      "LinkedIn posts",
      "Facebook content",
      "Hashtag strategies",
    ],
  },
  {
    icon: Sparkles,
    title: "Creative Content Creation",
    desc: "Original content ideas that break through the noise — trend-driven yet timeless for your brand.",
    types: [
      "Content ideation",
      "Trending format adaptation",
      "Series concepts",
      "Campaign themes",
    ],
  },
  {
    icon: BookOpen,
    title: "Brand Storytelling",
    desc: "Long-form and short-form narratives that define your brand identity and connect emotionally with your audience.",
    types: [
      "Brand origin stories",
      "Founder narratives",
      "Product storytelling",
      "Customer journey content",
    ],
  },
];

export default function ContentWriting() {
  return (
    <div className="relative">
      <PageBackground src="/assets/generated/bg-content-writing.dim_1920x1080.jpg" />

      <PageHero
        title="Content Writing"
        subtitle="Words that work — scripts, captions, and stories that move your audience"
        accent="Storytelling"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Content" title="Writing Services" />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-black border border-gold/50 rounded-sm p-8 gold-border card-cinematic"
                  data-ocid={`content.item.${i + 1}`}
                >
                  <Icon className="w-10 h-10 text-gold mb-5" />
                  <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-wide mb-3">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {area.desc}
                  </p>
                  <ul className="space-y-2">
                    {area.types.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-charcoal border-y border-gold/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-4">
            Your Story, Perfectly Told
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Every brand has a unique story. Let us craft yours with words that
            resonate, engage, and convert.
          </p>
          <a
            href="mailto:medwinmontage@gmail.com"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="content.primary_button"
          >
            Start Writing Together
          </a>
        </div>
      </section>
    </div>
  );
}
