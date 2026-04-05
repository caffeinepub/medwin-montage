# Medwin Montage — Admin Pricing CRUD + Season Offer Tab

## Current State

The `/admin` panel has a `PricingTab` component that shows basic `PricingPlan` records (planLabel, price, note) from the backend. The `PresetPackage` type in the backend is the actual plan model (name, price, features[], deliveryDays, enabled) used by the public Pricing page. These two systems are disconnected — the admin Pricing tab doesn't manage PresetPackages (which drive the public page). There is no admin UI for plan services, offer badges, season offer dates, or post-offer messages.

## Requested Changes (Diff)

### Add

1. **New backend type: `FullPricingPlan`** — extends `PresetPackage` with:
   - `planTypeBadge: Text` (e.g., "Most Popular", "Most People Trust", "" for none)
   - `offerPrice: Nat` (0 = no offer)
   - `offerDescription: Text` (e.g., "Save ₹1,000 — Limited Time!") shown in green
   - `hasSeasonOffer: Bool` (whether the season offer applies to this plan)

2. **New backend type: `SeasonOfferSettings`** — stored as a single var:
   - `title: Text`
   - `discountAmount: Nat`
   - `badgeColor: Text` (e.g., "red", "gold")
   - `startDate: Text` (ISO date string)
   - `endDate: Text` (ISO date string)
   - `postOfferWindowDays: Nat` (how many days after endDate to show post-offer message)
   - `offerMessage: Text` (shown during offer period)
   - `postOfferMessage: Text` (shown after offer ends, within window)
   - `applicablePlanIds: [Nat]` (which plan IDs the offer applies to)

3. **New backend CRUD functions** for `FullPricingPlan`:
   - `addFullPricingPlan(plan: FullPricingPlanInput) : async Nat`
   - `updateFullPricingPlan(plan: FullPricingPlan) : async ()`
   - `deleteFullPricingPlan(planId: Nat) : async ()`
   - `toggleFullPricingPlanEnabled(planId: Nat) : async Bool`
   - `getAllFullPricingPlans() : async [FullPricingPlan]`
   - `getEnabledFullPricingPlans() : async [FullPricingPlan]`

4. **New backend functions** for `SeasonOfferSettings`:
   - `updateSeasonOfferSettings(settings: SeasonOfferSettings) : async ()`
   - `getSeasonOfferSettings() : async SeasonOfferSettings`

5. **Admin panel: expanded Pricing tab** — replace the existing basic `PricingTab` with a full CRUD interface using `FullPricingPlan`:
   - Table listing all plans: name, original price, offer price, plan type badge, services count, enabled status
   - Add / Edit dialog with all fields:
     - Plan Name
     - Original Price (₹)
     - Delivery Days
     - Video Count (optional helper field shown as plan note)
     - Services list (add/remove individual lines with + and ✕)
     - Plan Type badge selector (None / Most Popular / Most People Trust / custom text)
     - Season Offer toggle (checkbox — whether this plan participates in the season offer)
     - Offer Price (₹) — shown when Season Offer is toggled on
     - Offer Description (text shown in green, e.g. "Save ₹1,000")
   - Delete plan button with confirmation
   - Enabled/disabled toggle per plan

6. **Admin panel: new Season Offer tab** inside `/admin`:
   - Offer Title
   - Discount Amount (₹)
   - Badge Color (dropdown: red / gold / green)
   - Start Date (date picker)
   - End Date (date picker)
   - Post-offer Window (days, default 10)
   - Offer Message (shown to visitors during offer period)
   - Post-offer Message (shown 0–N days after end date)
   - Checkboxes: which plans the offer applies to (loaded from FullPricingPlans list)
   - Live preview: countdown display using entered dates
   - Save button

7. **Public Pricing page** updated to read from `getEnabledFullPricingPlans()` and `getSeasonOfferSettings()` instead of hardcoded `SEASON_OFFERS` and `OFFER_END` constants. Fallback to existing hardcoded data if backend returns empty.

### Modify

- `Admin.tsx`: Replace simple `PricingTab` with new full `FullPricingTab`. Add new `SeasonOfferTab` to the tab list.
- `Pricing.tsx`: Read offer dates and plan offer prices from backend `SeasonOfferSettings` instead of hardcoded constants. Map `FullPricingPlan` offer fields to the existing season offer rendering logic.
- `useQueries.ts`: Add hooks for `FullPricingPlan` and `SeasonOfferSettings` CRUD.
- `backend.d.ts`: Add new types and function signatures.
- `main.mo`: Add new types, state vars, and CRUD functions.

### Remove

- The old minimal `PricingTab` (planLabel + price + note only) — replaced by the new full CRUD tab.
- Hardcoded `SEASON_OFFERS`, `OFFER_END`, `POST_OFFER_WINDOW_END` constants in `Pricing.tsx` (kept as fallback only).

## Implementation Plan

1. Add `FullPricingPlan`, `FullPricingPlanInput`, `SeasonOfferSettings` types to `main.mo`.
2. Add state vars and all CRUD functions to `main.mo`.
3. Update `backend.d.ts` with new types and function signatures.
4. Add new query/mutation hooks to `useQueries.ts`.
5. Replace `PricingTab` in `Admin.tsx` with `FullPricingTab` (full CRUD: add, edit, delete, toggle, service line management, badge selector, offer fields).
6. Add `SeasonOfferTab` to `Admin.tsx` with all offer settings fields and checkboxes for applicable plans.
7. Update `Pricing.tsx` to fetch `SeasonOfferSettings` and `FullPricingPlans` from backend, use live data for offer dates, offer prices, and offer descriptions; keep hardcoded fallback.
