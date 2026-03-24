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
import { useState } from "react";
import { toast } from "sonner";
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
  const submit = useSubmitContactForm();
  const { data: backendFAQs } = useGetFAQs();
  const faqs =
    backendFAQs && backendFAQs.length > 0 ? backendFAQs : fallbackFAQs;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync(form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      const msg = encodeURIComponent(
        `Hi Medwin Montage!\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
      );
      window.open(`https://wa.me/919487897160?text=${msg}`, "_blank");
    }
  };

  return (
    <div>
      <PageHero
        title="Get In Touch"
        subtitle="Let's create something cinematic together — reach out via WhatsApp or Email"
        accent="Contact Us"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
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
                  className="flex items-center gap-5 p-6 bg-card border border-gold/30 rounded-sm gold-border card-cinematic group"
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
                  className="flex items-center gap-5 p-6 bg-card border border-border rounded-sm gold-border card-cinematic"
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

                <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-sm">
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

                <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-sm">
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

              <div
                className="mt-8 rounded-sm overflow-hidden border border-border"
                style={{ height: 280 }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=10.0739,78.0675&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(80%) invert(90%) contrast(80%)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  title="Location"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                accent="Message Us"
                title="Send a Message"
                center={false}
              />
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                data-ocid="contact.modal"
              >
                <div>
                  <Label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="bg-card border-border focus:border-gold"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="bg-card border-border focus:border-gold"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-card border-border focus:border-gold"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project..."
                    className="bg-card border-border focus:border-gold min-h-32"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submit.isPending}
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-light uppercase tracking-widest text-sm py-6 rounded-sm"
                  data-ocid="contact.submit_button"
                >
                  {submit.isPending ? "Sending..." : "Send Message"}
                </Button>
                {submit.isSuccess && (
                  <p
                    className="text-green-400 text-sm text-center"
                    data-ocid="contact.success_state"
                  >
                    Message sent successfully!
                  </p>
                )}
                {submit.isError && (
                  <p
                    className="text-destructive text-sm text-center"
                    data-ocid="contact.error_state"
                  >
                    Something went wrong. Opening WhatsApp instead...
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle accent="Questions" title="FAQs" />
          <Accordion type="single" collapsible className="mt-8 space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-sm px-6 data-[state=open]:border-gold/50"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground uppercase tracking-wide py-5 hover:no-underline hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
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
