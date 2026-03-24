import { Link, useRouterState } from "@tanstack/react-router";
import { Film, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Sample Projects", to: "/sample-projects" },
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  const prevPath = useState(currentPath)[0];
  useEffect(() => {
    if (prevPath !== currentPath) {
      setMobileOpen(false);
    }
  });

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
            Let’s Talk
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
              className="lg:hidden bg-charcoal border-t border-border overflow-hidden"
            >
              <ul className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`block py-3 px-2 text-sm uppercase tracking-widest border-b border-border/40 transition-colors ${
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
                <li className="pt-4">
                  <a
                    href="https://wa.me/919487897160"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gold text-primary-foreground py-3 text-xs font-semibold uppercase tracking-widest rounded-sm"
                    data-ocid="nav.primary_button"
                  >
                    Let’s Talk
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16 lg:pt-20">{children}</main>

      <footer className="bg-charcoal border-t border-border wave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-gold" />
                <div>
                  <div className="font-display text-base font-bold text-gold tracking-widest uppercase">
                    Medwin
                  </div>
                  <div className="font-display text-base font-bold text-foreground tracking-widest uppercase">
                    Montage
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Turning Ideas Into Cinematic Stories. Create. Capture. Convert.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-4">
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Video Editing",
                  "Cinematography",
                  "Content Creation",
                  "Digital Marketing",
                  "Script Writing",
                ].map((s) => (
                  <li key={s}>
                    <Link
                      to="/services"
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      data-ocid="nav.link"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-4">
                Pages
              </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      data-ocid="nav.link"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-4">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:medwinmontage@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <span>✉</span> medwinmontage@gmail.com
                </a>
                <a
                  href="https://wa.me/919487897160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <span>📱</span> +91 9487897160
                </a>
                <p className="text-sm text-muted-foreground">
                  📍 Thanjavur, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Medwin Montage. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                data-ocid="nav.link"
              >
                Admin
              </Link>
              <p className="text-xs text-muted-foreground">
                Built with ❤ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
