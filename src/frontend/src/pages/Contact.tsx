import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageBackground from "../components/PageBackground";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import { useGetFAQs, useSubmitContactForm } from "../hooks/useQueries";

const fallbackFAQs = [
  {
    question: "What is your turnaround time for video editing?",
    answer:
      "Standard turnaround is 3–5 business days for 1–2 minute videos. Rush delivery (24–48 hrs) is available at an additional charge.",
  },
  {
    question: "Do you provide raw footage along with the edited video?",
    answer:
      "Yes, raw footage can be provided upon request. An additional storage fee may apply for large projects.",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "All packages include 2 free revision rounds. Additional revisions are available at a nominal fee.",
  },
  {
    question: "What formats do you deliver in?",
    answer:
      "We deliver in MP4 (H.264/H.265) by default. Other formats (MOV, ProRes, etc.) are available upon request.",
  },
  {
    question: "Can you work remotely for clients outside Tamil Nadu?",
    answer:
      "Absolutely! We work with clients across India and internationally. File sharing and remote collaboration tools ensure seamless delivery.",
  },
  {
    question: "Do you offer monthly retainer packages?",
    answer:
      "Yes! Monthly packages start from 5 videos/month with discounted rates. Contact us for a custom quote based on your volume.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedPlan, setSelectedPlan] = useState("");
  const submit = useSubmitContactForm();
  const { data: backendFAQs } = useGetFAQs();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan) setSelectedPlan(plan);
  }, []);
  const faqs =
    backendFAQs && backendFAQs.length > 0 ? backendFAQs : fallbackFAQs;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const waMsg = `Hi Medwin Montage!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}${selectedPlan ? `\n\nSelected Plan: ${selectedPlan}` : ""}\n\nMessage: ${form.message}`;

    // Always open WhatsApp first
    window.open(
      `https://wa.me/919487897160?text=${encodeURIComponent(waMsg)}`,
      "_blank",
    );

    // Try to save to backend (non-blocking)
    try {
      await submit.mutateAsync({ ...form, selectedPlan });
    } catch {
      // Backend save failed, but WhatsApp was already opened — that's fine
    }

    toast.success("Message sent! Redirecting to WhatsApp...");
    setForm({ name: "", email: "", phone: "", message: "" });
    setSelectedPlan("");
  };

  return (
    <div className="relative">
      <PageBackground src="/assets/generated/bg-contact.dim_1920x1080.jpg" />

      <PageHero
        title="Get In Touch"
        subtitle="Let's create something cinematic together — reach out via WhatsApp or Email"
        accent="Contact Us"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact info + map */}
            <div>
              <SectionTitle
                accent="Reach Us"
                title="Let's Connect"
                center={false}
              />
              <div className="space-y-5 mt-8">
                <a
                  href="https://wa.me/919487897160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 bg-black border border-gold/30 rounded-sm gold-border card-cinematic group"
                  data-ocid="contact.primary_button"
                >
                  <div className="p-3 bg-gold/10 rounded-sm">
                    <MessageCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      WhatsApp
                    </p>
                    <p className="text-foreground font-semibold">
                      +91 9487897160
                    </p>
                    <p className="text-xs text-gold mt-0.5">
                      Click to chat instantly
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:medwinmontage@gmail.com"
                  className="flex items-center gap-5 p-6 bg-black border border-gold/50 rounded-sm gold-border card-cinematic"
                  data-ocid="contact.secondary_button"
                >
                  <div className="p-3 bg-gold/10 rounded-sm">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <p className="text-foreground font-semibold">
                      medwinmontage@gmail.com
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Response within 24 hours
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-5 p-6 bg-black border border-gold/50 rounded-sm">
                  <div className="p-3 bg-gold/10 rounded-sm">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <p className="text-foreground font-semibold">
                      +91 9487897160
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-6 bg-black border border-gold/50 rounded-sm">
                  <div className="p-3 bg-gold/10 rounded-sm">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Location
                    </p>
                    <p className="text-foreground font-semibold">
                      Thanjavur, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Static Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 rounded-sm overflow-hidden border border-gold/30"
              >
                <a
                  href="https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-ocid="contact.map_marker"
                >
                  <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 h-56 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold/30 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-gold/20 rounded-full" />
                      <div className="grid grid-cols-8 h-full opacity-30">
                        {Array.from({ length: 32 }, (_, i) => (
                          <div
                            key={i.toString()}
                            className="border-r border-gold/10 h-full"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-gold-lg">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-center">
                        <p className="text-foreground font-semibold">
                          Thanjavur, Tamil Nadu
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          India
                        </p>
                      </div>
                      <span className="text-xs border border-gold/40 text-gold px-4 py-1.5 rounded-full uppercase tracking-widest">
                        View on Google Maps →
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Right: Form */}
            <div>
              <SectionTitle
                accent="Send Message"
                title="Drop Us a Line"
                center={false}
              />
              {selectedPlan && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 bg-charcoal border border-gold/40 rounded-sm text-center"
                  data-ocid="contact.panel"
                >
                  <p className="text-gold text-sm font-semibold uppercase tracking-wide">
                    Booking: {selectedPlan} Plan — Fill in your details below
                  </p>
                </motion.div>
              )}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="mt-8 space-y-5 bg-black border border-gold/50 rounded-sm p-8"
                data-ocid="contact.modal"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
                      Your Name *
                    </Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Arjun Kumar"
                      className="bg-background border-border focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
                      Phone
                    </Label>
                    <Input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 9XXXXXXXXX"
                      className="bg-background border-border focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Email *
                  </Label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="bg-background border-border focus:border-gold"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Message *
                  </Label>
                  <Textarea
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="bg-background border-border focus:border-gold resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-light uppercase tracking-widest text-sm py-5 rounded-sm"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  After sending, you'll be redirected to{" "}
                  <span className="text-gold">WhatsApp</span> with your details
                  pre-filled.
                </p>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="FAQs" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={"question" in faq ? faq.question : String(i)}
                value={String(i)}
                className="border border-gold/50 rounded-sm px-5 gold-border"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="font-sans-ui text-sm text-foreground hover:text-gold transition-colors text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
