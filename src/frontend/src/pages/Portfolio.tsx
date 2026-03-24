import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PageHero from "../components/PageHero";

const categories = [
  "Video Editing",
  "Cinematography",
  "Reels & Short Content",
  "Ads & Promotions",
  "Before & After",
];

const gradients = [
  "from-amber-900 via-orange-950 to-black",
  "from-blue-950 via-slate-900 to-black",
  "from-purple-950 via-slate-900 to-black",
  "from-emerald-950 via-slate-900 to-black",
  "from-rose-950 via-slate-900 to-black",
  "from-cyan-950 via-slate-900 to-black",
  "from-yellow-950 via-amber-950 to-black",
  "from-fuchsia-950 via-slate-900 to-black",
];

const images = [
  "/assets/generated/portfolio-editing.dim_800x500.jpg",
  "/assets/generated/portfolio-cinematic.dim_800x500.jpg",
  "/assets/generated/portfolio-reels.dim_800x500.jpg",
  "/assets/generated/portfolio-ads.dim_800x500.jpg",
];

type ProjectItem = {
  id: number;
  title: string;
  category: string;
  img?: string | null;
  gradient: string;
};

const allProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Corporate Brand Film",
    category: "Video Editing",
    img: images[0],
    gradient: gradients[0],
  },
  {
    id: 2,
    title: "Wedding Cinematic",
    category: "Video Editing",
    gradient: gradients[1],
  },
  {
    id: 3,
    title: "Product Launch Edit",
    category: "Video Editing",
    gradient: gradients[2],
  },
  {
    id: 4,
    title: "Travel Documentary",
    category: "Video Editing",
    gradient: gradients[3],
  },
  {
    id: 5,
    title: "Music Video Edit",
    category: "Video Editing",
    gradient: gradients[4],
  },
  {
    id: 6,
    title: "Short Film Post",
    category: "Video Editing",
    gradient: gradients[5],
  },
  {
    id: 7,
    title: "Cityscape Aerial",
    category: "Cinematography",
    img: images[1],
    gradient: gradients[1],
  },
  {
    id: 8,
    title: "Golden Hour Shoot",
    category: "Cinematography",
    gradient: gradients[0],
  },
  {
    id: 9,
    title: "Studio Portrait Film",
    category: "Cinematography",
    gradient: gradients[6],
  },
  {
    id: 10,
    title: "Event Cinematography",
    category: "Cinematography",
    gradient: gradients[3],
  },
  {
    id: 11,
    title: "Fitness Brand Reel",
    category: "Reels & Short Content",
    img: images[2],
    gradient: gradients[2],
  },
  {
    id: 12,
    title: "Food Styling Reel",
    category: "Reels & Short Content",
    gradient: gradients[4],
  },
  {
    id: 13,
    title: "Fashion Reel",
    category: "Reels & Short Content",
    gradient: gradients[7],
  },
  {
    id: 14,
    title: "Lifestyle Content",
    category: "Reels & Short Content",
    gradient: gradients[5],
  },
  {
    id: 15,
    title: "Product TVC",
    category: "Ads & Promotions",
    img: images[3],
    gradient: gradients[0],
  },
  {
    id: 16,
    title: "Brand Commercial",
    category: "Ads & Promotions",
    gradient: gradients[6],
  },
  {
    id: 17,
    title: "Promotional Reel",
    category: "Ads & Promotions",
    gradient: gradients[3],
  },
  {
    id: 18,
    title: "Social Media Ad",
    category: "Ads & Promotions",
    gradient: gradients[2],
  },
];

const beforeAfterPairs = [
  { title: "Wedding Highlight", before: gradients[1], after: gradients[0] },
  { title: "Product Shoot", before: gradients[5], after: gradients[3] },
  { title: "Event Coverage", before: gradients[7], after: gradients[2] },
];

function ProjectCard({
  project,
  index,
}: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative rounded-sm overflow-hidden card-cinematic cursor-pointer gold-border group"
      data-ocid={`portfolio.item.${index + 1}`}
    >
      <div className="aspect-video relative overflow-hidden">
        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${project.gradient}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="play-btn">
            <Play
              className="w-5 h-5 text-primary-foreground ml-0.5"
              fill="currentColor"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="text-xs text-gold uppercase tracking-wider font-sans-ui">
            {project.category}
          </span>
          <h3 className="font-display text-sm font-semibold text-foreground mt-0.5">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("Video Editing");

  return (
    <div>
      <PageHero
        title="Our Portfolio"
        subtitle="A curated collection of work across every creative discipline"
        accent="Creative Work"
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="flex flex-wrap h-auto gap-2 bg-card border border-border p-2 rounded-sm mb-10"
              data-ocid="portfolio.tab"
            >
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs uppercase tracking-widest data-[state=active]:bg-gold data-[state=active]:text-primary-foreground rounded-sm px-4 py-2"
                  data-ocid="portfolio.tab"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.slice(0, -1).map((cat) => (
              <TabsContent key={cat} value={cat}>
                <AnimatePresence mode="wait">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProjects
                      .filter((p) => p.category === cat)
                      .map((project, i) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={i}
                        />
                      ))}
                  </div>
                </AnimatePresence>
              </TabsContent>
            ))}

            <TabsContent value="Before & After">
              <div className="grid md:grid-cols-3 gap-8">
                {beforeAfterPairs.map((pair, i) => (
                  <motion.div
                    key={pair.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="gold-border rounded-sm overflow-hidden"
                  >
                    <div className="p-4 bg-card border-b border-border">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                        {pair.title}
                      </h3>
                    </div>
                    <div className="flex">
                      <div className="flex-1 relative">
                        <div
                          className={`aspect-video bg-gradient-to-br ${pair.before}`}
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-xs text-muted-foreground px-2 py-0.5 rounded uppercase tracking-wide">
                          Before
                        </div>
                      </div>
                      <div className="w-px bg-gold/50" />
                      <div className="flex-1 relative">
                        <div
                          className={`aspect-video bg-gradient-to-br ${pair.after}`}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-xs text-gold px-2 py-0.5 rounded uppercase tracking-wide">
                          After
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
