import { BarChart2, Calendar, Megaphone, Target } from "lucide-react";
import { motion } from "motion/react";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import { useGetDigitalMarketingPageContent } from "../hooks/useQueries";

const FALLBACK_ICONS = [BarChart2, Megaphone, Target, Calendar];

const DEFAULT_CONTENT = {
  heroTitle: "Digital Marketing",
  heroSubtitle:
    "Data-driven marketing strategies to amplify your brand's digital presence",
  heroAccent: "Grow Your Brand",
  heroBackgroundImage:
    "/assets/generated/bg-digital-marketing.dim_1920x1080.jpg",
  areas: [
    {
      title: "Social Media Management",
      desc: "Complete management of your brand's social media presence across Instagram, Facebook, YouTube and more.",
      deliverables: [
        "Daily/weekly post scheduling",
        "Engagement & community management",
        "Performance analytics",
        "Competitor analysis",
      ],
    },
    {
      title: "Ad Campaign Creation",
      desc: "Strategic paid advertising campaigns on Meta, Google, and YouTube — designed to convert, not just impress.",
      deliverables: [
        "Ad creative design",
        "Audience targeting",
        "A/B testing",
        "ROI reporting",
      ],
    },
    {
      title: "Brand Promotion Strategies",
      desc: "Customized brand positioning and promotion strategies that set you apart from competitors.",
      deliverables: [
        "Brand identity audit",
        "Market positioning",
        "Content strategy",
        "Influencer outreach",
      ],
    },
    {
      title: "Content Planning",
      desc: "30/60/90-day content calendars aligned with your campaigns, seasons, and business goals.",
      deliverables: [
        "Monthly content calendar",
        "Theme & campaign ideation",
        "Caption & hashtag strategy",
        "Platform-specific optimization",
      ],
    },
  ],
  ctaHeading: "Ready to Grow Your Brand?",
  ctaBody:
    "Let's craft a digital marketing strategy that converts visitors into loyal customers.",
  ctaButtonLabel: "Get a Free Consultation",
  ctaButtonLink: "https://wa.me/919487897160",
};

export default function DigitalMarketing() {
  const { data: pageData } = useGetDigitalMarketingPageContent();
  const content = pageData ?? DEFAULT_CONTENT;

  return (
    <div className="relative">
      <PageBackground
        src={
          content.heroBackgroundImage ||
          "/assets/generated/bg-digital-marketing.dim_1920x1080.jpg"
        }
      />

      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        accent={content.heroAccent}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Services" title="Marketing Solutions" />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {content.areas.map((area, i) => {
              const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-black border border-gold/50 rounded-sm p-8 gold-border card-cinematic"
                  data-ocid={`marketing.item.${i + 1}`}
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3 border border-gold/30 rounded-sm flex-shrink-0">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide mb-3">
                        {area.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {area.desc}
                      </p>
                      <ul className="space-y-2">
                        {area.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal border-y border-gold/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-4">
            {content.ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            {content.ctaBody}
          </p>
          <a
            href={content.ctaButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="marketing.primary_button"
          >
            {content.ctaButtonLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
