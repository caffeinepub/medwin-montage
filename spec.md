# Medwin Montage – Pricing Page Update (Version 13)

## Current State
- Pricing section heading: "Preset Packages"
- Middle plan name: "Standard"
- Season offer badge: gold background, positioned inline in plan box
- No countdown timer
- No post-offer message window
- No floating "Customised Plan" button
- Customised plan (calculator) is at the bottom of the page

## Requested Changes (Diff)

### Add
- Countdown timer below "Choose Your Plan" heading, counting down to April 10, 2026 midnight
- Season offer subtext: "🎉 Season Offer — Save ₹1,000 on Pro & Premium! Ends April 10th"
- After offer ends (April 10): automatically hide season offer badges/prices; show post-offer message for 10 days: "You just missed our Season Offer that ended April 10th — but you're early enough to get a special deal that no other editor or freelancer can match. Contact us!"
- After 10 days post-offer (April 20): hide everything offer-related
- Floating bottom-left button: "Make Your Customised Plan" — clicking smooth-scrolls to calculator section
- Season offer badge: red filled background (#dc2626), white text, positioned absolute top-left corner of plan card

### Modify
- Section heading "Preset Packages" → "Choose Your Plan"
- SectionTitle accent/title updated accordingly
- Middle plan name "Standard" → "Pro" (in FALLBACK_PRESETS, SEASON_OFFERS key, and display)
- Season offer badge style: from gold/20 border to solid red background with white text, repositioned to absolute top-left of card

### Remove
- Old inline season offer badge placement (centered above price)

## Implementation Plan
1. Update FALLBACK_PRESETS name "Standard" → "Pro"
2. Update SEASON_OFFERS key "Standard" → "Pro"
3. Change SectionTitle to "Choose Your Plan"
4. Add offer state logic: isOfferActive (before Apr 10), isPostOfferWindow (Apr 10–20), showNothing (after Apr 20)
5. Add countdown timer component (days/hours/minutes/seconds) shown when isOfferActive
6. Add subtext line about season offer end date
7. Reposition season offer badge to absolute top-left of card with red filled bg + white text
8. Add post-offer message banner when isPostOfferWindow
9. Add floating bottom-left button that smooth-scrolls to calculator section (add id to that section)
