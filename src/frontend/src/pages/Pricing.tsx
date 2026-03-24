import { CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";

const packages = [
  {
    name: "Basic",
    price: "₹5,499",
    highlight: false,
    features: [
      "Up to 5 videos/month",
      "1–2 min video editing",
      "2 revision rounds",
      "Color correction",
      "Background music",
      "MP4 delivery",
      "7-day turnaround",
    ],
  },
  {
    name: "Standard",
    price: "₹7,999",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 10 videos/month",
      "1–3 min video editing",
      "3 revision rounds",
      "Advanced color grading",
      "Motion graphics & titles",
      "Sound design",
      "Social media optimization",
      "5-day turnaround",
    ],
  },
  {
    name: "Premium",
    price: "₹9,999",
    highlight: false,
    features: [
      "Up to 20 videos/month",
      "Up to 5 min videos",
      "Unlimited revisions",
      "Cinematic color grade",
      "Custom motion graphics",
      "Full sound design",
      "Thumbnail design",
      "Priority support",
      "3-day turnaround",
    ],
  },
];

export default function Pricing() {
  return (
    <div>
      <PageHero
        title="Pricing Packages"
        subtitle="Flexible packages built for creators, brands, and businesses of every size"
        accent="Investment"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Plans" title="Choose Your Package" />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12 items-stretch">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-sm p-8 flex flex-col ${
                  pkg.highlight
                    ? "bg-gradient-to-b from-gold/10 to-card border-2 border-gold shadow-gold-lg animate-pulse-gold"
                    : "bg-card border border-border gold-border"
                }`}
                data-ocid={`pricing.item.${i + 1}`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3
                    className={`font-display text-2xl font-bold uppercase tracking-widest mb-4 ${
                      pkg.highlight ? "text-gold" : "text-foreground"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <div className="font-display text-4xl font-bold text-foreground">
                    {pkg.price}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    per month
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          pkg.highlight ? "text-gold" : "text-gold/60"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/919487897160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block text-center py-3 text-sm font-semibold uppercase tracking-widest rounded-sm transition-all ${
                    pkg.highlight
                      ? "bg-gold text-primary-foreground hover:bg-gold-light gold-shimmer"
                      : "border border-gold/40 text-gold hover:bg-gold/10"
                  }`}
                  data-ocid={`pricing.primary_button.${i + 1}`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>

          {/* Custom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-8 border border-dashed border-gold/40 rounded-sm text-center"
          >
            <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-wide mb-3">
              Custom / Negotiable
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">
              Have unique requirements? Let's build a custom package tailored
              specifically to your brand, budget, and content goals.
            </p>
            <a
              href="https://wa.me/919487897160"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
              data-ocid="pricing.primary_button"
            >
              <MessageCircle className="w-4 h-4" /> Discuss Custom Package
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
