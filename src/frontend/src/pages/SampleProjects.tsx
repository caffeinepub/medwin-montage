import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import { useGetPublishedBrands } from "../hooks/useQueries";

const staticVideos = [
  {
    id: "1176462678",
    title: "Shri Dhivyam",
    category: "Brand Film",
    client: "Shri Dhivyam",
  },
  {
    id: "1176462651",
    title: "TCA — Thanjai Car Accessories",
    category: "Promotional",
    client: "Thanjai Car Accessories",
  },
  {
    id: "1176462632",
    title: "FO-1",
    category: "Social Content",
    client: "Featured Brand",
  },
  {
    id: "1176462602",
    title: "Beef Boss BB5",
    category: "Restaurant Promo",
    client: "Beef Boss Thanjavur",
  },
  {
    id: "1176462586",
    title: "Beef Boss BB",
    category: "Restaurant Promo",
    client: "Beef Boss Thanjavur",
  },
];

const fallbackBrands = [
  {
    id: 1n,
    name: "Beef Boss Thanjavur",
    category: "Restaurant",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Popular restaurant known for its signature beef dishes and vibrant ambiance in the heart of Thanjavur.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 2n,
    name: "Anand Saloon",
    category: "Grooming & Beauty",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Premium grooming salon offering top-tier hair and beauty services with a modern touch.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 3n,
    name: "Thanjai Car Accessories",
    category: "Automobile",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Leading car accessories store in Thanjavur offering a wide range of automotive products and fitments.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 4n,
    name: "Kolapasi Restaurant",
    category: "Restaurant",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Authentic South Indian cuisine restaurant serving traditional Chettinad and Thanjavur specialties.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 5n,
    name: "My Thanjai",
    category: "Digital Marketing",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Leading digital marketing agency in Thanjavur helping local businesses thrive online.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 6n,
    name: "Elto Landscapes",
    category: "Landscaping",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Professional landscaping and garden design company transforming outdoor spaces across Thanjavur.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
  {
    id: 7n,
    name: "Abi Kowsa",
    category: "Retail",
    location: "Thanjavur, Tamil Nadu",
    description:
      "Trusted retail brand in Thanjavur offering quality products with exceptional customer service.",
    mapsUrl: "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8",
    published: true,
  },
];

export default function SampleProjects() {
  const { data: backendBrands } = useGetPublishedBrands();
  const brands =
    backendBrands && backendBrands.length > 0 ? backendBrands : fallbackBrands;

  return (
    <div>
      <PageHero
        title="Sample Projects"
        subtitle="Cinematic work delivered for brands across Thanjavur and beyond"
        accent="Our Work"
      />

      {/* Videos Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Reel" title="Brand Videos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {staticVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-gold/20 rounded-sm overflow-hidden group"
                data-ocid={`projects.item.${i + 1}`}
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "177.78%",
                    height: 0,
                  }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${video.id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title={video.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {video.client}
                      </p>
                    </div>
                    <Badge className="bg-gold/20 text-gold border-gold/30 text-xs uppercase tracking-widest shrink-0">
                      {video.category}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Trusted By" title="Brands Worked With" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {brands.map((brand, i) => (
              <motion.div
                key={String(brand.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-card border border-border rounded-sm p-6 gold-border card-cinematic flex flex-col gap-3"
                data-ocid={`brands.item.${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      📍 {brand.location}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-gold/30 text-gold uppercase tracking-widest shrink-0"
                  >
                    {brand.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {brand.description}
                </p>
                {brand.mapsUrl && (
                  <a
                    href={brand.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors mt-auto"
                    data-ocid={`brands.link.${i + 1}`}
                  >
                    <ExternalLink className="w-3 h-3" /> View on Maps
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
