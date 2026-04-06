import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import {
  useGetPortfolioPageContent,
  useGetPublishedVideos,
} from "../hooks/useQueries";

const CATEGORIES = [
  { key: "reels", label: "Reels" },
  { key: "ads", label: "Ads" },
  { key: "events", label: "Events" },
  { key: "youtube", label: "YouTube Videos" },
];

const FALLBACK_VIDEOS = [
  {
    id: 0n,
    vimeoId: "1176462678",
    title: "Brand Reel 2024",
    category: "reels",
    description: "A cinematic brand reel showcasing visual storytelling.",
    published: true,
  },
  {
    id: 1n,
    vimeoId: "1176462651",
    title: "Restaurant Ad",
    category: "ads",
    description: "Commercial advertisement for a local restaurant.",
    published: true,
  },
  {
    id: 2n,
    vimeoId: "1176462632",
    title: "Wedding Event Film",
    category: "events",
    description: "Beautiful wedding highlights film.",
    published: true,
  },
  {
    id: 3n,
    vimeoId: "1176462602",
    title: "Brand Story Film",
    category: "youtube",
    description: "Long-form brand documentary.",
    published: true,
  },
  {
    id: 4n,
    vimeoId: "1176462586",
    title: "Product Showcase",
    category: "ads",
    description: "Product reveal and showcase video.",
    published: true,
  },
];

const DEFAULT_CONTENT = {
  heroTitle: "Portfolio",
  heroSubtitle: "Real work. Real results. Watch our projects in action.",
  heroAccent: "Our Work",
  heroBackgroundImage: "/assets/generated/bg-portfolio.dim_1920x1080.jpg",
};

export default function Portfolio() {
  const { data: backendVideos } = useGetPublishedVideos();
  const { data: pageData } = useGetPortfolioPageContent();
  const content = pageData ?? DEFAULT_CONTENT;

  const videos =
    backendVideos && backendVideos.length > 0 ? backendVideos : FALLBACK_VIDEOS;

  return (
    <div className="relative">
      <PageBackground
        src={
          content.heroBackgroundImage ||
          "/assets/generated/bg-portfolio.dim_1920x1080.jpg"
        }
      />

      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        accent={content.heroAccent}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Categories" title="Browse By Category" />

          <Tabs defaultValue="reels" className="mt-12">
            <TabsList
              className="bg-black border border-gold/50 mb-10 flex-wrap h-auto gap-1 p-1"
              data-ocid="portfolio.tab"
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="text-xs uppercase tracking-widest data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
                  data-ocid="portfolio.tab"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => {
              const catVideos = videos.filter(
                (v) => v.category.toLowerCase() === cat.key.toLowerCase(),
              );
              const catDescriptions: Record<string, string> = {
                reels:
                  "Short-form vertical videos crafted for maximum engagement on Instagram, TikTok & YouTube Shorts.",
                ads: "Commercial & promotional content designed to convert \u2014 product showcases, brand films & ad campaigns.",
                events:
                  "Event coverage & cinematic highlights \u2014 weddings, corporate events, launches & celebrations.",
                youtube:
                  "Long-form content for YouTube \u2014 vlogs, brand documentaries, tutorials & channel series.",
              };
              return (
                <TabsContent key={cat.key} value={cat.key}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-10 bg-black border border-gold/30 rounded-sm gold-border flex flex-col items-center text-center gap-6"
                    data-ocid="portfolio.item.1"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Play className="w-7 h-7 text-gold" fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-widest mb-3">
                        {cat.label}
                      </h3>
                      <p className="text-muted-foreground max-w-md leading-relaxed">
                        {catDescriptions[cat.key] ||
                          "Premium video content in this category."}
                      </p>
                    </div>
                    <div className="text-xs border border-gold/40 text-gold px-4 py-1.5 rounded-full uppercase tracking-widest">
                      {catVideos.length}{" "}
                      {catVideos.length === 1 ? "project" : "projects"}{" "}
                      available
                    </div>
                    <a
                      href="https://wa.me/919487897160"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold/10 border border-gold/40 text-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-widest hover:bg-gold/20 rounded-sm transition-all"
                      data-ocid="portfolio.primary_button"
                    >
                      Request {cat.label} Project
                    </a>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal border-y border-gold/30 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-4">
            Want to be our next project?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss your vision and create something remarkable.
          </p>
          <a
            href="https://wa.me/919487897160"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="portfolio.primary_button"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}
