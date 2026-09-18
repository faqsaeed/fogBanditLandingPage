# Fog Bandit Jewellery Landing Page

V2 jewellery-store landing page for Fog Bandit ANZ, built around PAS and shortened for paid-traffic conversion.

## V2 conversion structure
1. Thin top CTA banner
2. Jewellery-specific hero
3. Problem + response-gap visual
4. Actual Fog Bandit jewellery robbery video as the solution centerpiece
5. Three-step mechanism
6. Compact day/night use cases
7. Jewellery proof/testimonial
8. Four purchase-blocking FAQs
9. Security assessment form
10. Responsive sticky CTA + delayed/exit-intent assessment popup

## Responsive behaviour
- Desktop: full navigation, bottom sticky assessment bar after the hero, exit-intent or ~56% scroll popup.
- Mobile: stacked content, full-width bottom CTA, popup at ~66% scroll, no exit-intent dependency.
- Sticky CTA hides over the hero and assessment form to avoid CTA collisions.

## Local preview
```bash
python3 -m http.server 4173
```
Open `http://localhost:4173`.

## Sources used for factual product copy
- https://www.banditanz.com.au/
- https://www.banditanz.com.au/bandit-320-series/
- https://www.bandituk.co.uk/applications/jewellery-shop-protection-fog-bandit/
- https://www.bandituk.co.uk/bandit-in-action-videos/
- https://www.bandituk.co.uk/glasgow-argyll-arcade-robbery-foiled-fog-bandit/

## Calendly
All booking CTAs use the single `CALENDLY_URL` constant at the top of `script.js`. Paste the official Fog Bandit ANZ Calendly event URL there and every hero, solution, sticky, final-section, and popup booking link will update automatically. Until configured, booking CTAs fall back to the store assessment section rather than sending visitors to a broken URL.

## V2 conversion changes
- Short jewellery-only PAS flow
- Real Glasgow Argyll Arcade jewellery robbery video in the solution section
- Top red CTA banner
- Scroll-aware sticky CTA for desktop and mobile
- Scroll-depth / exit-intent assessment popup
- Secondary Calendly booking path without weakening the primary assessment CTA
