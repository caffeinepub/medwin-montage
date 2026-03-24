# Medwin Montage

## Current State
A multi-page cinematic portfolio website for Medwin Montage (video editing / cinematography studio in Tamil Nadu). Has: Home, About, Portfolio, Services, Digital Marketing, Content Writing, Testimonials, Pricing, Contact pages. Backend has basic contact form submission, FAQ, and testimonial storage. No admin panel. Location shows "Tamil Nadu, India" (needs Thanjavur).

## Requested Changes (Diff)

### Add
- Password-protected admin login at `/admin` using authorization component
- Admin dashboard with tabs for: Portfolio Videos, Brands, Services, Pricing Plans, Testimonials, FAQs, Contact Enquiries, Office Profile
- Full CRUD (add, edit, remove, publish/unpublish) for each content type
- Sample Projects page/section with 5 embedded Vimeo videos
- Brands section with 7 real Thanjavur brands (Beef Boss, Anand Saloon, Thanjai Car Accessories, Kolapasi Restaurant, My Thanjai, Elto Landscapes, Abi Kowsa)
- Admin "Received Enquiries" tab to view all contact form submissions
- Office Profile CRUD: edit contact email, phone, address, WhatsApp, social links
- Publish toggle on all content so only published items show publicly

### Modify
- Fix location from "Tamil Nadu, India" to "Thanjavur, Tamil Nadu, India" everywhere (Contact page, footer, Layout)
- Portfolio page: load published videos from backend instead of static data
- Home page brands section: load published brands from backend
- Testimonials page: load published testimonials from backend
- Contact page: load FAQs from backend, show published office profile details

### Remove
- Static hardcoded brands on Home page (replace with backend-driven)
- Static fallback projects on Portfolio (keep as fallback only)

## Implementation Plan
1. Select `authorization` component for admin login
2. Generate Motoko backend with:
   - PortfolioVideo: id, title, category, vimeoId, description, published
   - Brand: id, name, category, location, description, mapsUrl, published
   - Service: id, title, description, features, published
   - PricingPlan: id, label, price, note, published
   - Testimonial: id, clientName, company, review, rating, published
   - FAQItem: id, question, answer, published
   - ContactEnquiry: id, name, email, phone, message, timestamp
   - OfficeProfile: email, phone, whatsapp, address, city, mapsUrl
   - Full CRUD for all, admin-only writes, public reads (published only)
3. Build frontend:
   - Admin login page at /admin with password auth
   - Admin dashboard with 8 tabs, each with add/edit/delete/publish controls
   - Public pages updated to use backend data
   - Location fixed everywhere to Thanjavur, Tamil Nadu, India
