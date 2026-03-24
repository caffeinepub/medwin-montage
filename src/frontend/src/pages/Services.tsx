import { Slider } from "@/components/ui/slider";
import {
  Camera,
  PenLine,
  Share2,
  TrendingUp,
  Video,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";

const services = [
  {
    icon: Video,
    title: "Video Editing",
    desc: "Professional post-production with color grading, sound design, motion graphics, and seamless cuts. Available in any resolution up to 4K.",
    features: [
      "Color grading & correction",
      "Sound design & mixing",
      "Motion graphics & titles",
      "Multi-camera editing",
    ],
  },
  {
    icon: Camera,
    title: "Cinematic Shooting",
    desc: "On-location or studio cinematography using professional Sony A7 III, drone, and gimbal stabilizer for breathtaking visuals.",
    features: [
      "Sony A7 III & lens kit",
      "DJI drone aerials",
      "Gimbal stabilized shots",
      "Studio & location shoots",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Content",
    desc: "Platform-optimized short-form content: Instagram Reels, YouTube Shorts, TikTok, and Facebook — engineered for engagement.",
    features: [
      "Instagram Reels",
      "YouTube Shorts",
      "TikTok content",
      "Story templates",
    ],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Full-funnel digital marketing: paid ads, organic growth strategies, brand positioning, and performance analytics.",
    features: [
      "Meta & Google Ads",
      "Brand strategy",
      "Analytics & reporting",
      "Campaign management",
    ],
  },
  {
    icon: PenLine,
    title: "Script & Content Writing",
    desc: "Compelling scripts for reels, ads, YouTube, and brand films. Creative captions and long-form brand storytelling.",
    features: [
      "Ad scripts",
      "YouTube scripts",
      "Caption writing",
      "Brand storytelling",
    ],
  },
  {
    icon: Youtube,
    title: "YouTube & Instagram Growth",
    desc: "Channel strategy, content calendar, SEO optimization, and consistent posting to build an engaged audience.",
    features: [
      "Channel strategy",
      "Content calendar",
      "SEO optimization",
      "Thumbnail design",
    ],
  },
];

export default function Services() {
  const [videoCount, setVideoCount] = useState([5]);
  const baseRate = 400;
  const discount =
    videoCount[0] >= 15
      ? 0.85
      : videoCount[0] >= 10
        ? 0.9
        : videoCount[0] >= 5
          ? 0.95
          : 1;
  const total = Math.round(videoCount[0] * baseRate * discount);

  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="End-to-end creative production services tailored to your brand's needs"
        accent="What We Offer"
      />

      {/* Service Cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Services" title="Everything You Need" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card border border-border rounded-sm p-8 gold-border card-cinematic"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <Icon className="w-10 h-10 text-gold mb-5" />
                  <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                  <ul className="space-y-2">
                    {svc.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Pricing" title="Transparent Pricing" />
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                label: "Per 1–2 min video",
                price: "₹500",
                note: "Full production",
              },
              { label: "Editing only", price: "₹400", note: "Per video" },
              {
                label: "Editing + Camera + Content",
                price: "₹1,200",
                note: "Complete package",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-card border border-gold/30 rounded-sm"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  {item.label}
                </p>
                <p className="font-display text-3xl font-bold text-gold mb-1">
                  {item.price}
                </p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </motion.div>
            ))}
          </div>

          {/* Monthly slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-card border border-gold/30 rounded-sm"
          >
            <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-wide mb-6 text-center">
              Monthly Package Calculator
            </h3>
            <div className="mb-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Videos per month</span>
              <span className="text-gold font-bold">
                {videoCount[0]} videos
              </span>
            </div>
            <Slider
              min={1}
              max={20}
              step={1}
              value={videoCount}
              onValueChange={setVideoCount}
              className="mb-6"
              data-ocid="pricing.select"
            />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Monthly total</p>
                <p className="font-display text-2xl font-bold text-gold">
                  ₹{total.toLocaleString("en-IN")}
                </p>
                {discount < 1 && (
                  <p className="text-xs text-green-400 mt-1">
                    {Math.round((1 - discount) * 100)}% volume discount applied
                  </p>
                )}
              </div>
              <a
                href="https://wa.me/919487897160"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-primary-foreground px-6 py-3 text-sm uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
                data-ocid="pricing.primary_button"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
