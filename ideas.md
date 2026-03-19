# Marshall Wilkinson Link-in-Bio — Design Brainstorm

## Hero Image CDN URL
https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/marshall_hero_6c478c8c.webp

---

<response>
<text>
## Idea 1: "Obsidian Authority" — Dark Luxury Minimalism

**Design Movement:** Inspired by luxury fashion house digital presence (Tom Ford, Berluti) crossed with fintech authority (Stripe, Linear)

**Core Principles:**
1. Absolute darkness as the canvas — near-black backgrounds (#0A0A0B) with strategic light accents
2. Typographic hierarchy as the primary visual element — bold condensed headlines create authority
3. Restrained color — a single warm gold accent (#C9A96E) against monochrome creates premium feel
4. Negative space as luxury — generous padding communicates confidence and exclusivity

**Color Philosophy:**
- Background: Deep obsidian (#0A0A0B) — conveys power, sophistication, exclusivity
- Text: Off-white (#F5F0EB) — warm white feels more premium than pure white
- Accent: Muted gold (#C9A96E) — signals premium without being gaudy
- Card surfaces: Slightly elevated dark (#141416) with subtle border glow
- Gradient: Subtle radial gradient from dark center to slightly lighter edges

**Layout Paradigm:** Single-column vertical scroll with full-width hero, then centered card stack. Cards use a stacked deck metaphor — slightly overlapping edges creating depth. No grid — pure vertical flow optimized for thumb scrolling.

**Signature Elements:**
1. Thin gold horizontal rules that animate in from center outward
2. Subtle grain texture overlay on the entire page (adds tactile quality)
3. Cards with a faint border that glows on hover — like embers

**Interaction Philosophy:** Minimal but deliberate. Every interaction should feel weighty and intentional — slow, smooth transitions (0.6s ease). Hover states reveal subtle depth. Taps produce a brief luminous pulse.

**Animation:**
- Hero: Image slowly zooms in (Ken Burns effect) over 20s, name fades up with letter-by-letter stagger
- Tagline: Types in with a blinking cursor effect
- Cards: Slide up from below viewport with staggered 0.15s delays, opacity 0→1
- Card hover: Subtle scale(1.02) with border glow intensifying
- Background: Very subtle floating gradient orbs (dark purple/gold) moving slowly
- Gold rules: Expand from center on scroll-trigger

**Typography System:**
- Headlines: "Plus Jakarta Sans" 800 weight — geometric, modern authority
- Body: "Inter" 400 — clean readability
- Accent text (prices, badges): "JetBrains Mono" — technical credibility
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idea 2: "Concrete & Steel" — Industrial Construction Aesthetic

**Design Movement:** Brutalist-industrial meets high-tech — inspired by architectural visualization studios and construction tech brands

**Core Principles:**
1. Raw material textures — concrete, steel, glass translated into digital surfaces
2. Diagonal energy — angled cuts and skewed elements convey forward momentum
3. High contrast typography — oversized numbers and bold sans-serif create impact
4. Blueprint precision — grid lines and measurement marks as decorative elements

**Color Philosophy:**
- Background: Charcoal concrete (#1A1A1E) with subtle noise texture
- Text: Bright white (#FFFFFF) for maximum contrast and readability
- Accent: Electric amber (#FF8C00) — safety/construction orange elevated to premium
- Secondary: Steel blue (#4A6FA5) — technical, trustworthy
- Cards: Frosted glass effect (backdrop-blur) over dark surface

**Layout Paradigm:** Asymmetric blocks with diagonal clip-paths creating angular sections. Hero takes full viewport with diagonal bottom edge. Cards arranged in a staggered masonry-like column with alternating left/right alignment on desktop, single column on mobile.

**Signature Elements:**
1. Diagonal section dividers that echo construction site aesthetics
2. Animated measurement/ruler marks along card edges
3. "Blueprint" grid lines visible in the background, slowly animating

**Interaction Philosophy:** Energetic and mechanical. Interactions should feel like precision machinery — snappy transforms, mechanical easing curves. Cards slide in from alternating sides. Hover states trigger a "blueprint reveal" effect.

**Animation:**
- Hero: Image slides in from right, text from left — converging
- Stats counter: Numbers count up rapidly on scroll
- Cards: Alternate slide-in from left/right with spring physics
- Diagonal dividers: Draw themselves on scroll
- Background: Subtle grid lines pulse and shift

**Typography System:**
- Headlines: "Oswald" 700 — tall, condensed, industrial authority
- Body: "Source Sans 3" 400 — technical clarity
- Numbers/prices: "Space Mono" — monospaced precision
</text>
<probability>0.05</probability>
</response>

<response>
<text>
## Idea 3: "Midnight Ember" — Cinematic Dark Premium

**Design Movement:** Cinematic UI design (inspired by Apple TV+, Netflix premium content pages) crossed with executive personal branding

**Core Principles:**
1. Cinematic depth — layered z-axis with parallax and blur creating movie-poster depth
2. Warm-cool contrast — cool dark backgrounds with warm amber/copper highlights
3. Breathing motion — everything has subtle, organic movement like a living page
4. Progressive disclosure — content reveals itself as you scroll, creating narrative flow

**Color Philosophy:**
- Background: Deep navy-black (#08090D) — darker than pure black, feels infinite
- Text: Warm cream (#EDE6DB) — softer than white, feels handcrafted
- Primary accent: Warm copper/amber (#D4915C) — authority, warmth, premium
- Secondary: Soft steel (#8B95A5) — supporting text, subtle elements
- Glow: Amber radial gradients behind key elements — creates warmth in darkness
- Card surfaces: Semi-transparent dark (#12141A at 80%) with backdrop blur

**Layout Paradigm:** Full-bleed cinematic hero (100vh) flowing into a centered narrow column (max-w-md) for cards. The narrow column creates focus and intimacy — like a premium mobile app. Cards stack vertically with generous spacing (2rem gaps). No visual clutter.

**Signature Elements:**
1. Ambient glow spots — warm amber/copper radial gradients that float behind sections
2. Frosted glass card surfaces with subtle inner border light
3. A thin animated gradient line at the top of the page (like a loading bar that's always alive)

**Interaction Philosophy:** Cinematic and fluid. Everything moves with purpose — spring-based physics for natural feel. Scroll triggers feel like scene transitions. Cards breathe on hover (subtle scale + glow intensification). The page should feel alive but calm.

**Animation:**
- Hero: Slow parallax zoom on background image, name fades up with Y-translate, subtitle follows 0.3s later, tagline 0.6s later — cascading reveal
- Ambient glow: Slowly drifts and pulses (15s cycle) — page feels alive
- Cards: Scroll-triggered stagger animation — each card slides up 30px and fades in, 0.12s stagger
- Card hover/tap: Scale to 1.03, border glow brightens, subtle shadow expansion
- Top gradient bar: Continuously animates left-to-right (subtle, 8s cycle)
- Instagram icon: Gentle pulse animation on idle, scale up on hover

**Typography System:**
- Headlines: "Sora" 700 — geometric, modern, authoritative without being cold
- Body: "DM Sans" 400 — warm, readable, pairs beautifully with Sora
- Accent/prices: "Sora" 600 — consistent family, different weight for hierarchy
- Tagline: "DM Sans" italic 400 — subtle differentiation
</text>
<probability>0.07</probability>
</response>

---

## Selected Approach: Idea 3 — "Midnight Ember" (Cinematic Dark Premium)

This approach best serves Marshall's brand because:
- The cinematic depth and warm copper accents project authority and premium quality
- The narrow mobile-optimized column is perfect for Instagram traffic
- The ambient glow and breathing animations create a "wow" factor without being distracting
- The progressive scroll reveal creates a narrative that guides visitors through the offerings
- Warm cream text on deep navy feels more premium and approachable than stark black/white
