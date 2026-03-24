import { Star } from "lucide-react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import { useGetTestimonials } from "../hooks/useQueries";

const fallbackTestimonials = [
  {
    clientName: "Arjun Reddy",
    company: "NovaTech Solutions",
    review:
      "Medwin Montage transformed our brand video completely. The cinematic quality was beyond what we expected. Our engagement tripled after using their videos for our campaigns.",
    rating: 5n,
  },
  {
    clientName: "Priya Sharma",
    company: "Bloom Café",
    review:
      "Absolutely phenomenal work! The reels they created for our café went viral. Professional, creative, and always delivers on time. Highly recommended!",
    rating: 5n,
  },
  {
    clientName: "Karthik Venkatesh",
    company: "Urban Closet Fashion",
    review:
      "The product shoot and editing quality is world-class. Our Instagram grew by 40% within two months of working with Medwin Montage. Worth every rupee.",
    rating: 5n,
  },
  {
    clientName: "Divya Krishnan",
    company: "SkyView Realty",
    review:
      "The drone cinematography and property videos they delivered helped us close deals faster. Clients were impressed by the quality. Truly professional service.",
    rating: 5n,
  },
  {
    clientName: "Rahul Menon",
    company: "Spark Fitness",
    review:
      "Our YouTube channel went from 500 to 10,000 subscribers after implementing Medwin's content strategy. The editing quality keeps our audience coming back.",
    rating: 5n,
  },
  {
    clientName: "Sneha Patel",
    company: "Digital First Agency",
    review:
      "We've partnered with many video editors, but Medwin Montage is on another level. The storytelling, pacing, and visual quality are consistently exceptional.",
    rating: 5n,
  },
];

const starIndices = [0, 1, 2, 3, 4];

function StarRating({ rating }: { rating: bigint }) {
  return (
    <div className="flex gap-1">
      {starIndices.map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Number(rating) ? "text-gold fill-gold" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: backendTestimonials } = useGetTestimonials();
  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : fallbackTestimonials;

  return (
    <div>
      <PageHero
        title="Client Testimonials"
        subtitle="Stories of success from the brands we've helped grow"
        accent="What Clients Say"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Reviews" title="What Clients Say" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-sm p-8 gold-border card-cinematic flex flex-col"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <StarRating rating={t.rating} />
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    {t.clientName}
                  </p>
                  <p className="text-xs text-gold mt-0.5">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Impact" title="Success Stories" />
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              { metric: "500+", label: "Videos Delivered" },
              { metric: "50+", label: "Happy Clients" },
              { metric: "10M+", label: "Views Generated" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-12 border border-gold/30 rounded-sm gold-border"
              >
                <p className="font-display text-5xl font-bold text-gold mb-2">
                  {s.metric}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
