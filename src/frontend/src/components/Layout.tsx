import { Link, useRouterState } from "@tanstack/react-router";
import { Film, Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Digital Marketing", to: "/digital-marketing" },
  { label: "Content Writing", to: "/content-writing" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPath intentionally triggers the effect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMobileOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md border-b border-border shadow-cinematic"
            : "bg-charcoal/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex-shrink-0" data-ocid="nav.link">
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-gold" />
              <div className="leading-none">
                <div className="font-display text-sm font-bold text-gold tracking-[0.15em] uppercase">
                  Medwin
                </div>
                <div className="font-display text-sm font-bold text-foreground tracking-[0.15em] uppercase">
                  Montage
                </div>
              </div>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`font-sans-ui text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    currentPath === link.to
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/919487897160"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-gold text-primary-foreground px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all hover:bg-gold-light gold-shimmer rounded-sm"
            data-ocid="nav.primary_button"
          >
            Let's Talk
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-charcoal border-t border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-sans-ui text-sm uppercase tracking-widest py-2 border-b border-border/30 ${
                      currentPath === link.to
                        ? "text-gold"
                        : "text-muted-foreground"
                    }`}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/919487897160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground px-4 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm"
                  data-ocid="nav.primary_button"
                >
                  Let's Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16 lg:pt-20">{children}</main>

      <footer className="bg-charcoal border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-gold" />
                <span className="font-display text-lg font-bold text-gold tracking-widest uppercase">
                  Medwin Montage
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Creative studio specializing in video editing, cinematography,
                and digital marketing. Based in Thanjavur, Tamil Nadu.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-widest mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.slice(0, 5).map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground text-sm hover:text-gold transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-widest mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>medwinmontage@gmail.com</p>
                <p>+91 9487897160</p>
                <p>Thanjavur, Tamil Nadu, India</p>
                <a
                  href="https://wa.me/919487897160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-gold hover:underline"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Medwin Montage. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-gold transition-colors text-xs"
                data-ocid="nav.link"
              >
                <Shield className="w-3 h-3" /> Admin Panel
              </Link>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/50 hover:text-muted-foreground text-xs transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
