import { Star } from "lucide-react";
import { motion } from "motion/react";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import {
  useGetTestimonials,
  useGetTestimonialsPageContent,
} from "../hooks/useQueries";

const DEFAULT_CONTENT = {
  heroTitle: "Client Testimonials",
  heroSubtitle: "Stories of success from the brands we've helped grow",
  heroAccent: "What Clients Say",
  heroBackgroundImage: "/assets/generated/bg-testimonials.dim_1920x1080.jpg",
  ctaHeading: "Ready to Join Our Happy Clients?",
  ctaBody: "Let's create content that speaks for itself.",
  ctaButtonLabel: "Start Your Project",
  ctaButtonLink: "https://wa.me/919487897160",
};

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
          key={String(i)}
          className={`w-4 h-4 ${
            i < Number(rating) ? "text-gold fill-gold" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: backendTestimonials } = useGetTestimonials();
  const { data: pageData } = useGetTestimonialsPageContent();
  const content = pageData ?? DEFAULT_CONTENT;

  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : fallbackTestimonials;

  return (
    <div className="relative">
      <PageBackground
        src={
          content.heroBackgroundImage ||
          "/assets/generated/bg-testimonials.dim_1920x1080.jpg"
        }
      />

      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        accent={content.heroAccent}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Reviews"
            title="What Our Clients Say"
            subtitle="Real feedback from real brands we've partnered with"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={`${t.clientName}-${t.company}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 bg-black border border-gold/50 rounded-sm gold-border card-cinematic flex flex-col"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <StarRating rating={t.rating} />
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-1 italic">
                  "{t.review}"
                </p>
                <div className="mt-6 pt-4 border-t border-border/40">
                  <p className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                    {t.clientName}
                  </p>
                  <p className="text-xs text-gold mt-0.5">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal border-y border-gold/30 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-4">
            {content.ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-8">{content.ctaBody}</p>
          <a
            href={content.ctaButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="testimonials.primary_button"
          >
            {content.ctaButtonLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
