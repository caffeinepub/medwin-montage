import { Link } from "@tanstack/react-router";
import { CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
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

// Season offers: planName -> { originalPrice, discountedPrice }
const SEASON_OFFERS: Record<string, { original: number; discounted: number }> =
  {
    Standard: { original: 7999, discounted: 6999 },
    Premium: { original: 9999, discounted: 8999 },
  };

const OFFER_END = new Date("2026-04-10T23:59:59");
const POST_OFFER_WINDOW_END = new Date("2026-04-20T23:59:59");

function WhatsAppLink(msg: string) {
  return `https://wa.me/919487897160?text=${encodeURIComponent(msg)}`;
}

function fmt(n: bigint | number) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, target.getTime() - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(0, target.getTime() - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: timeLeft <= 0 };
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

  const now = new Date();
  const isOfferActive = now < OFFER_END;
  const isPostOfferWindow = now >= OFFER_END && now < POST_OFFER_WINDOW_END;

  const countdown = useCountdown(OFFER_END);

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
            accent="Plans"
            title="Choose Your Plan"
            subtitle="All-inclusive plans for consistent content creators"
          />

          {/* ── OFFER INFO CARD ── */}
          {isOfferActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 mx-auto max-w-3xl border border-red-700 bg-black rounded-lg px-8 py-6"
              data-ocid="pricing.panel"
            >
              {/* Title */}
              <p className="text-center text-xl font-black uppercase text-red-500 tracking-wide">
                🎉 SEASON OFFER — SAVE ₹1,000 ON PRO &amp; PREMIUM!
              </p>
              {/* Subtitle */}
              <p className="text-center text-sm text-muted-foreground mt-1">
                Valid until April 10, 2026
              </p>

              {/* Countdown row */}
              {!countdown.done && (
                <div className="flex items-center justify-between mt-5 flex-wrap gap-4">
                  {/* Left label */}
                  <span className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    OFFER ENDS IN
                  </span>

                  {/* Countdown boxes */}
                  <div className="flex items-center gap-2">
                    {[
                      { value: countdown.days, label: "DAYS" },
                      { value: countdown.hours, label: "HRS" },
                      { value: countdown.minutes, label: "MIN" },
                      { value: countdown.seconds, label: "SEC" },
                    ].map((unit, i) => (
                      <div key={unit.label} className="flex items-center">
                        <motion.div
                          key={`${unit.label}-${unit.value}`}
                          initial={{ scale: 1.12 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.18 }}
                          className="bg-black border border-red-700 rounded px-4 py-2 min-w-[64px] text-center"
                        >
                          <span className="block text-3xl font-black text-red-500 tabular-nums leading-none">
                            {String(unit.value).padStart(2, "0")}
                          </span>
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                            {unit.label}
                          </span>
                        </motion.div>
                        {i < 3 && (
                          <span className="text-red-500 text-2xl font-black mx-1 leading-none">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {isPostOfferWindow && (
            <div className="mt-6 mb-2 mx-auto max-w-2xl p-5 bg-black border border-gold/60 rounded-sm text-center">
              <p className="text-foreground text-sm">
                You just missed our Season Offer that ended April 10th — but
                you&apos;re early enough to get a special deal that no other
                editor or freelancer can match.{" "}
                <Link
                  to="/contact"
                  className="text-gold underline font-semibold hover:text-gold-light"
                >
                  Contact us!
                </Link>
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12 items-stretch">
            {presets
              .filter((p) => p.enabled)
              .map((pkg, i) => {
                const isHighlight = i === 1;
                const offer = SEASON_OFFERS[pkg.name];
                const showOffer = isOfferActive && !!offer;
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
                    {/* Season offer badge — absolute top-left */}
                    {showOffer && (
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-tl-sm rounded-br-sm z-10">
                        🎉 Season Offer
                      </div>
                    )}

                    {isHighlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-gold text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div
                      className={`text-center mb-8 ${showOffer ? "pt-6" : ""}`}
                    >
                      <h3
                        className={`font-display text-2xl font-bold uppercase tracking-widest mb-4 ${
                          isHighlight ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {pkg.name}
                      </h3>
                      {showOffer ? (
                        <div>
                          <div className="flex items-center justify-center gap-3">
                            <span className="font-display text-2xl text-muted-foreground line-through">
                              {fmt(BigInt(offer!.original))}
                            </span>
                            <span className="font-display text-4xl font-bold text-gold">
                              {fmt(BigInt(offer!.discounted))}
                            </span>
                          </div>
                          <p className="text-xs text-green-400 mt-1 font-semibold">
                            Save ₹1,000 — Limited Time!
                          </p>
                        </div>
                      ) : (
                        <div className="font-display text-4xl font-bold text-foreground">
                          {fmt(pkg.price)}
                        </div>
                      )}
                      <p className="text-xs text-orange-400 mt-2 font-medium">
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
      <section id="customised-plan" className="py-24 bg-charcoal-light">
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

      {/* Floating button — scroll to customised plan */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          type="button"
          onClick={() => {
            document
              .getElementById("customised-plan")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-gold text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
          data-ocid="pricing.secondary_button"
        >
          <span>✦</span> Make Your Customised Plan
        </button>
      </div>
    </div>
  );
}
