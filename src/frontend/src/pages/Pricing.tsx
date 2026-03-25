import { CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import {
  useGetMonthlyPackage,
  useGetPresetPackages,
  useGetReelPricing,
  useGetSliderRates,
} from "../hooks/useQueries";

const FALLBACK_PRESETS = [
  {
    id: 1n,
    name: "Basic",
    price: 3099n,
    features: [
      "7 Video Edits (Reels/Shorts/Videos)",
      "Basic Cuts & Transitions",
      "Simple Color Correction",
      "2 Captions + Script Ideas",
      "Posting Guidance",
    ],
    deliveryDays: 3n,
    enabled: true,
  },
  {
    id: 2n,
    name: "Standard",
    price: 7999n,
    features: [
      "10 Video Edits (Reels/Shorts/Videos)",
      "Advanced Color Grading",
      "Sound Design",
      "Captions + Script Writing",
      "Hashtag Strategy",
      "Social Media Handling",
      "Growth Strategy",
    ],
    deliveryDays: 1n,
    enabled: true,
  },
  {
    id: 3n,
    name: "Premium",
    price: 9999n,
    features: [
      "15 Video Edits (Reels/Shorts/Videos)",
      "Shoot Session Included",
      "Cinematic Editing + Effects",
      "Pro Sound Design",
      "Full Content Planning",
      "Social Media Management",
      "Branding + Optimization",
      "Performance Report",
      "Priority Delivery",
    ],
    deliveryDays: 1n,
    enabled: true,
  },
];

function getDeliveryLabel(pkg: { name: string; deliveryDays: bigint }): string {
  if (pkg.name === "Basic") return "Delivery in 2–3 days";
  if (pkg.name === "Standard") return "Delivery in 1–1½ days";
  if (pkg.name === "Premium") return "Delivery in ½ day — High Priority ⚡";
  return `Delivery in ${Number(pkg.deliveryDays)} days`;
}

const FALLBACK_REEL = {
  editingOnly: 450n,
  editingCamera: 900n,
  editingContentCamera: 1500n,
};
const FALLBACK_MONTHLY = {
  price: 8999n,
  videoCount: 12n,
  description: "10-12 videos per month, all services included",
  enabled: true,
};
const FALLBACK_SLIDER = {
  editing: 450n,
  videography: 500n,
  content: 150n,
  other: 500n,
};

function WhatsAppLink(msg: string) {
  return `https://wa.me/919487897160?text=${encodeURIComponent(msg)}`;
}

function fmt(n: bigint | number) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function Pricing() {
  const { data: presetPackages } = useGetPresetPackages();
  const { data: reelPricing } = useGetReelPricing();
  const { data: monthlyPkg } = useGetMonthlyPackage();
  const { data: sliderRates } = useGetSliderRates();

  const presets =
    presetPackages && presetPackages.length > 0
      ? presetPackages
      : FALLBACK_PRESETS;
  const reel = reelPricing ?? FALLBACK_REEL;
  const monthly = monthlyPkg ?? FALLBACK_MONTHLY;
  const rates = sliderRates ?? FALLBACK_SLIDER;

  // Slider state
  const [editingQty, setEditingQty] = useState(5);
  const [videoQty, setVideoQty] = useState(2);
  const [contentQty, setContentQty] = useState(5);
  const [otherQty, setOtherQty] = useState(1);

  const calcTotal =
    editingQty * Number(rates.editing) +
    videoQty * Number(rates.videography) +
    contentQty * Number(rates.content) +
    otherQty * Number(rates.other);

  const calcMsg = `Hi Medwin Montage! I'd like to book a custom package:\n- Editing: ${editingQty} videos\n- Videography: ${videoQty} shoots\n- Content: ${contentQty} items\n- Other: ${otherQty}\nEstimated Total: ₹${calcTotal.toLocaleString("en-IN")}`;

  return (
    <div className="relative">
      <PageBackground src="/assets/generated/bg-pricing.dim_1920x1080.jpg" />

      <PageHero
        title="Pricing"
        subtitle="Transparent pricing for every stage of your content journey"
        accent="Investment"
      />

      {/* PRESET PACKAGES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Packages"
            title="Preset Packages"
            subtitle="All-inclusive plans for consistent content creators"
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12 items-stretch">
            {presets
              .filter((p) => p.enabled)
              .map((pkg, i) => {
                const isHighlight = i === 1;
                return (
                  <motion.div
                    key={String(pkg.id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative rounded-sm p-8 flex flex-col ${
                      isHighlight
                        ? "bg-gradient-to-b from-gold/10 to-card border-2 border-gold shadow-gold-lg"
                        : "bg-black border border-gold/50 gold-border"
                    }`}
                    data-ocid={`pricing.item.${i + 1}`}
                  >
                    {isHighlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-8">
                      <h3
                        className={`font-display text-2xl font-bold uppercase tracking-widest mb-4 ${
                          isHighlight ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {pkg.name}
                      </h3>
                      <div className="font-display text-4xl font-bold text-foreground">
                        {fmt(pkg.price)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {getDeliveryLabel(pkg)}
                      </p>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = `/contact?plan=${encodeURIComponent(pkg.name)}`;
                      }}
                      className={`w-full text-center py-3 text-sm font-semibold uppercase tracking-widest rounded-sm transition-all ${
                        isHighlight
                          ? "bg-gold text-primary-foreground hover:bg-gold-light"
                          : "border border-gold/50 text-gold hover:bg-gold/10"
                      }`}
                      data-ocid={`pricing.primary_button.${i + 1}`}
                    >
                      Book Now
                    </button>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* PER REEL PRICING */}
      <section className="py-20 bg-charcoal-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Per Video"
            title="Per Reel Pricing"
            subtitle="Pay per video — no monthly commitment"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                label: "Editing Only",
                price: reel.editingOnly,
                desc: "Post-production editing, color grading, and export",
              },
              {
                label: "Editing + Camera",
                price: reel.editingCamera,
                desc: "Shooting on location + full editing",
              },
              {
                label: "Editing + Content + Camera",
                price: reel.editingContentCamera,
                desc: "Script, shoot, edit — complete content creation",
              },
            ].map((option, i) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-black border border-gold/50 rounded-sm gold-border text-center"
                data-ocid={`reel.item.${i + 1}`}
              >
                <p className="text-xs text-gold uppercase tracking-widest mb-3 font-sans-ui">
                  {option.label}
                </p>
                <div className="font-display text-3xl font-bold text-foreground mb-2">
                  {fmt(option.price)}
                  <span className="text-sm text-muted-foreground font-normal">
                    /video
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {option.desc}
                </p>
                <a
                  href={WhatsAppLink(
                    `Hi! I'm interested in the "${option.label}" option at ${fmt(option.price)}/video.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-gold/40 text-gold px-4 py-2 text-xs uppercase tracking-widest hover:bg-gold/10 rounded-sm transition-all"
                  data-ocid={`reel.primary_button.${i + 1}`}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Book Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MONTHLY PACKAGE */}
      {monthly.enabled && (
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionTitle accent="Best Value" title="Monthly Package" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-8 md:p-12 bg-gradient-to-br from-gold/10 via-card to-card border-2 border-gold rounded-sm relative overflow-hidden"
              data-ocid="monthly.card"
            >
              <div className="absolute top-4 right-4">
                <span className="bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Best Value
                </span>
              </div>
              <div className="text-center">
                <div className="font-display text-5xl md:text-6xl font-bold text-gold mb-2">
                  {fmt(monthly.price)}
                  <span className="text-xl text-muted-foreground font-normal">
                    /month
                  </span>
                </div>
                <p className="text-foreground font-semibold mt-2">
                  {Number(monthly.videoCount)}+ Videos per Month
                </p>
                <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
                  {monthly.description}
                </p>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  "10-12 Videos/Month",
                  "Professional Editing",
                  "Camera + Shooting",
                  "Content Planning",
                  "Growth Support",
                  "Priority Delivery",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href={WhatsAppLink(
                    `Hi Medwin Montage! I'm interested in the Monthly Package at ₹${Number(monthly.price).toLocaleString("en-IN")}/month.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
                  data-ocid="monthly.primary_button"
                >
                  <MessageCircle className="w-4 h-4" /> Book Monthly Package
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* DYNAMIC CALCULATOR */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle
            accent="Custom"
            title="Price Calculator"
            subtitle="Mix and match services to get an instant estimate"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-8 bg-black border border-gold/50 rounded-sm"
            data-ocid="calculator.card"
          >
            <div className="space-y-8">
              {[
                {
                  label: "Video Editing",
                  value: editingQty,
                  max: 20,
                  rate: Number(rates.editing),
                  onChange: setEditingQty,
                  unit: "video",
                },
                {
                  label: "Videography (Shoots)",
                  value: videoQty,
                  max: 10,
                  rate: Number(rates.videography),
                  onChange: setVideoQty,
                  unit: "shoot",
                },
                {
                  label: "Content Writing",
                  value: contentQty,
                  max: 20,
                  rate: Number(rates.content),
                  onChange: setContentQty,
                  unit: "piece",
                },
                {
                  label: "Other Services",
                  value: otherQty,
                  max: 10,
                  rate: Number(rates.other),
                  onChange: setOtherQty,
                  unit: "unit",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wide font-sans-ui">
                      {item.label}
                    </span>
                    <span className="text-gold text-sm font-bold">
                      {item.value} {item.unit}
                      {item.value !== 1 ? "s" : ""} &times; {fmt(item.rate)} ={" "}
                      {fmt(item.value * item.rate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={item.max}
                    value={item.value}
                    onChange={(e) => item.onChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-gold"
                    data-ocid="calculator.input"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">0</span>
                    <span className="text-xs text-muted-foreground">
                      {item.max}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Estimated Total
                </p>
                <p className="font-display text-3xl font-bold text-gold mt-1">
                  {fmt(calcTotal)}
                </p>
              </div>
              <a
                href={WhatsAppLink(calcMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-gold-light transition-all rounded-sm"
                data-ocid="calculator.primary_button"
              >
                <MessageCircle className="w-4 h-4" /> Book This Package
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
