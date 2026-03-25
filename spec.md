# Medwin Montage — Version 6

## Current State
Full-stack portfolio site with Motoko backend + React frontend. Backend has: portfolio videos, brands, services, pricing plans, testimonials, FAQs, contact enquiries (without selectedPlan), office profile, page content, preset packages, reel pricing, monthly package, slider rates, site stats. Frontend has all pages including admin panel.

## Requested Changes (Diff)

### Add
- `selectedPlan` field to `ContactEnquiry` type and `submitContactEnquiry` function
- Favicon using the uploaded M logo image (`/assets/uploads/chatgpt_image_mar_25_2026_09_20_23_am-removebg-preview-019d2321-fedb-7422-b14e-7a3fc0f63f2a-1.png`)
- Portfolio cards displayed in 9:16 vertical ratio (1080x1920 aspect)
- Skills section with progress bars, dynamic fill color by % (low=muted, mid=amber, high=gold)
- Book Now flow: click → navigate to /contact with `?plan=PlanName` query param → pre-fill form → on submit redirect to WhatsApp with plan+details
- Admin enquiries: show selectedPlan, add "Download XLSX" button

### Modify
- `ContactEnquiry`: add `selectedPlan: Text` field
- `submitContactEnquiry`: add `selectedPlan` parameter
- Portfolio page: Browse By Category shows only category cards/labels, no embedded videos
- About page: remove Sony A7 III & lens kit and DJI drone aerials from equipment list
- Pricing: update preset packages to exact specs:
  - Basic ₹3,099 – Delivery 2-3 days – 7 Videos, Basic Cuts, Color Correction, 2 Captions+Script Ideas, Posting Guidance
  - Standard ₹7,999 – Delivery 1-1.5 days – 10 Videos, Advanced Color Grading, Sound Design, 4 Captions+Script Writing, Hashtag Strategy, Social Media Handling, Basic Growth Strategy
  - Premium ₹9,999 – Delivery 0.5 day High Priority – 15 Videos, Shoot Session, Cinematic Editing+Effects, Pro Sound Design, Full Content Planning, Social Media Management, Branding+Optimization, Performance Report, Priority Delivery
- Admin enquiries tab: display selectedPlan per enquiry, add download as .xlsx button
- Admin panel: fix all broken error/success messages
- Seed data: update preset packages with new values

### Remove
- Sony A7 III & DJI drone from About page equipment section
- Embedded videos from Browse By Category section on Portfolio page

## Implementation Plan
1. Update backend: add `selectedPlan` to `ContactEnquiry`, update `submitContactEnquiry(name, email, phone, message, selectedPlan)`, update seedData preset packages with new values
2. Update `index.html` favicon to use uploaded M logo
3. Update `Portfolio.tsx`: Browse By Category shows only category name tiles (no video iframes), Featured Work cards in 9:16 aspect ratio
4. Update `About.tsx`: remove equipment items (Sony A7 III, DJI drone), add skills progress bars with dynamic fill colors
5. Update `Pricing.tsx`: preset packages with exact new details; Book Now button navigates to /contact?plan=PlanName
6. Update `Contact.tsx`: read `?plan` query param, pre-fill hidden field in form, on submit redirect to WhatsApp with plan+details
7. Update `Admin.tsx`: enquiries tab shows selectedPlan, add xlsx download using json-to-sheet approach (SheetJS/xlsx or manual CSV fallback), fix error message states
