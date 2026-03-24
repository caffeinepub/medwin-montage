import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ContentWriting from "./pages/ContentWriting";
import DigitalMarketing from "./pages/DigitalMarketing";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import SampleProjects from "./pages/SampleProjects";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: Portfolio,
});
const sampleProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sample-projects",
  component: SampleProjects,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const digitalMarketingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/digital-marketing",
  component: DigitalMarketing,
});
const contentWritingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/content-writing",
  component: ContentWriting,
});
const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: Testimonials,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: Pricing,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  portfolioRoute,
  sampleProjectsRoute,
  servicesRoute,
  digitalMarketingRoute,
  contentWritingRoute,
  testimonialsRoute,
  contactRoute,
  pricingRoute,
  adminRoute,
]);
