import { BarChart2, Calendar, Megaphone, Target } from "lucide-react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";

const areas = [
  {
    icon: BarChart2,
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
    icon: Megaphone,
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
    icon: Target,
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
    icon: Calendar,
    title: "Content Planning",
    desc: "30/60/90-day content calendars aligned with your campaigns, seasons, and business goals.",
    deliverables: [
      "Monthly content calendar",
      "Theme & campaign ideation",
      "Caption & hashtag strategy",
      "Platform-specific optimization",
    ],
  },
];

export default function DigitalMarketing() {
  return (
    <div>
      <PageHero
        title="Digital Marketing"
        subtitle="Data-driven marketing strategies to amplify your brand's digital presence"
        accent="Grow Your Brand"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Services" title="Marketing Solutions" />
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
                  className="bg-card border border-border rounded-sm p-8 gold-border card-cinematic"
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
      <section className="py-16 bg-gold/10 border-y border-gold/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-4">
            Ready to Grow Your Brand?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Let's craft a digital marketing strategy that converts visitors into
            loyal customers.
          </p>
          <a
            href="https://wa.me/919487897160"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
            data-ocid="marketing.primary_button"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
