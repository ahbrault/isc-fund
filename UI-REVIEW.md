# ISC Fund Homepage -- Design-Focused UI Review

**Audited:** 2026-03-23
**Baseline:** Abstract 6-pillar standards (no UI-SPEC exists)
**Screenshots:** Provided by reviewer (10 section screenshots at 1440px desktop)
**Audience context:** High-net-worth donors and philanthropists connected to luxury/entertainment. Gala at Nikki Beach Saint-Tropez with Cathy Guetta as ambassador. Price points: 500 EUR (individual) to 5,000 EUR (VIP table).

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Truncated hero sentence, typo on mobile, unclosed parenthesis, and generic CTAs undermine credibility for a luxury fundraising audience |
| 2. Visuals | 2/4 | Babies and Partners sections show premium design language, but the Event mega-section, repetitive orange blocks, and bare footer destroy page rhythm |
| 3. Color | 3/4 | Orange/teal palette is warm and distinctive; minor hardcoded hex values and stat-card accent monotony |
| 4. Typography | 2/4 | 10 distinct font sizes and 5 weights across the page; inconsistent heading hierarchy where h2s outsize the h1 |
| 5. Spacing | 2/4 | No consistent vertical rhythm between sections; Event section is 3x longer than peers; Contact/Footer feel abandoned |
| 6. Experience Design | 2/4 | No navigation on a 10-section page forces blind scrolling; two near-identical orange CTAs dilute conversion; zero trust signals in footer |

**Overall: 13/24**

---

## Top 3 Priority Fixes

1. **Split the Event Presentation mega-section into 3 distinct sections** -- Visitors face an overwhelming wall mixing ambassador bio, impact stats, and event booking with no visual separation. Break into (a) Ambassador section with portrait, (b) Impact Stats section with a tinted background, (c) Gala Booking section with its own dark or photographic treatment. This single change transforms the page's pacing and scannability.

2. **Add a sticky section navigation** -- With 10 sections and no menu, a donor scanning the page cannot jump to Event, Partners, Donate, or Contact. Add a minimal sticky nav with 4-5 anchor links that appears after scrolling past the hero. For a luxury audience accustomed to polished web experiences, the current blind-scroll model feels unfinished.

3. **Complete the hero copy and differentiate the Donate CTA section** -- The hero paragraph ends mid-sentence at `HeroSection.tsx:77` ("This silent epidemic claims more children lives than...") which reads as a bug. The Donate section (section 8) is visually near-identical to the Hero (same orange bg, child photo, teal button). Redesign Donate with a contrasting treatment -- dark background with a single powerful number, or a full-bleed image with text overlay -- to create a distinct emotional climax.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**Critical issues:**

- **Truncated hero sentence** (`HeroSection.tsx:77`): "This silent epidemic claims more children lives than..." ends with an ellipsis and no completion. For a first-impression headline on a fundraising page, this reads as broken. Every word in the hero must land with intention.

- **Typo in mobile DREPAF section** (`DrepafSection.tsx:31`): Mobile reads "6$0" instead of "60EUR". The desktop version at line 49 correctly reads "60EUR". This is the most damaging kind of error -- it shows donors that the mobile experience was not proofread.

- **Unclosed parenthesis** (`DrepafSection.tsx:32` and `:51`): Both mobile and desktop end a sentence with "prescribed by the prescribing physician" and never close the parenthesis opened earlier. Small but it signals carelessness.

- **"Sickle Cells disease" vs "Sickle Cell disease"** (`DrepafSection.tsx:38` desktop vs `:10` mobile): Inconsistent disease name across the same section.

- **"Drep.Afrique" vs "Drep.Africa"** (`EventPresentationSection.tsx:99`): Organization name inconsistency in the stat descriptions.

**Design-relevant copy concerns:**

- **Generic CTA repetition**: Both "Donate Now" buttons (Hero and Donate section) use identical text. For a luxury gala context, the hero CTA could be more inviting -- "Join the Gala" or "Save a Child Today" -- while the bottom CTA delivers the direct "Donate Now."

- **"Reserve now" misdirects** (`EventPresentationSection.tsx:31`): This button links to the generic donation page, not a reservation flow. A VIP table buyer clicking "Reserve now" and landing on a donation form experiences a trust gap at the 5,000 EUR price point.

- **Contact section feels like a placeholder** (`ContactSection.tsx`): Two paragraphs -- one external link, one email address. No phone, no address, no social media. For an organization asking for thousands of euros, this is insufficient.

**Strengths:**
- Hero headline is powerful and provocative: "Every day 1000 children die from a disease that no one talks about"
- Babies section has the best narrative arc on the page -- it builds from emotional hook to specific data
- "Distinguished Partners" heading strikes the right luxury register
- Impact stat labels are specific and credible (amounts, percentages, beneficiary counts)

### Pillar 2: Visuals (2/4)

**The Event Presentation mega-section is the page's biggest visual problem.**
`EventPresentationSection.tsx` (143 lines) contains what should be three distinct visual experiences: an ambassador introduction with portrait photo, a 4-card impact statistics grid with two accent info bars and a logo, and a full event booking banner with pricing, poster image, and CTA. All of this lives in a single white-background container with only subtle spacing changes between sub-parts. The visual effect is an endless scroll of text and cards with no clear "chapters." A luxury brand partner visiting this page to see their logo association would have to scroll through walls of medical statistics first.

**Three orange sections create monotonous rhythm.**
The page pattern is: Orange Hero -> White -> White -> White -> Orange Banner -> White -> Dark Partners -> Orange Donate -> White Contact. The Hero and Donate sections are structurally near-identical (orange bg, 2-col with child photo, white text, teal button). A donor scrolling to the bottom might experience deja vu rather than a building emotional crescendo. The Donate section should feel like an arrival, not a repeat.

**Babies section is the design high-water mark.**
`BabiesSection.tsx` demonstrates what every section could aspire to: warm gradient background (`from-amber-50 via-orange-50 to-rose-50`), glassmorphism stat cards with hover glow effects, considered spacing (`py-20 md:py-28`), decorative SVG divider, intentional opacity layering. This section alone proves the team can execute premium visual design. The gap between this section and the others (particularly DREPAF, Contact, Footer) is striking.

**Footer communicates "unfinished."**
`Footer.tsx` is a single `<p>` tag with centered copyright text. No background color, no padding, no logo, no links, no social icons. This is the last visual impression a donor has before deciding to donate or leave. For comparison, every luxury brand website the target audience visits daily has a richly designed footer with navigation, social links, newsletter signup, and legal information.

**Contact section is visually lopsided.**
A large organization logo on the left paired with only two text paragraphs on the right creates an imbalanced layout with significant dead whitespace. This section needs either more content on the right (address, phone, social links, a small form) or a complete redesign as a more compact band.

**Strengths:**
- Partners section dark background creates excellent contrast in the page flow
- Marquee animation with fade edges is polished
- Stat cards in Babies section use glass/blur effects that feel premium
- Hero event pill badge is a nice detail that creates urgency

### Pillar 3: Color (3/4)

**Palette is well-chosen for the mission.**
Orange (#F48E12) evokes warmth, energy, and African sun. Teal (#245D51) provides sophistication and medical credibility. Together they create a distinctive identity that avoids the typical "charity blue" and stands apart in the nonprofit space. The combination works well for a cause that bridges luxury events with African healthcare.

**60/30/10 distribution is approximately correct but tilts orange-heavy:**
- ~55% white/light backgrounds (Event, Sickle Cell, Babies, DREPAF, Contact)
- ~30% orange (Hero, Banner, Donate -- three full sections)
- ~15% dark/teal accents (Partners, buttons, text highlights)

Three full-width orange sections is one too many. The Banner section works as a visual separator, but having both Hero and Donate in identical orange treatment weakens the accent's impact. Consider making the Donate section dark (matching Partners) or using a photographic/gradient treatment.

**Hardcoded hex values in PartnersSection:**
- `bg-[#1a1a1a]` at line 27 instead of a semantic dark token
- `bg-[#F48E12]` at line 65 instead of `bg-primary`
- `from-[#1a1a1a]` at lines 102-103 for gradient edges

These will drift if the brand palette changes. Replace with Tailwind config tokens.

**Stat card accent monotony:**
`EventPresentationSection.tsx:93-110` -- All four impact numbers use `text-primary` (orange). Using teal (`text-secondary`) for one or two stats would create visual variety and help the eye distinguish between different metrics at a glance.

**Babies section shows excellent color sophistication:**
Uses opacity modifiers (`text-secondary/80`, `text-secondary/60`, `text-secondary/90`) and gradient layering to create depth and hierarchy within the brand palette. This refinement is absent in all other sections, which use flat solid colors.

### Pillar 4: Typography (2/4)

**10 distinct font size tokens is excessive.**
The homepage uses: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`. Best practice for a single page is 4-5 sizes. The visual effect is that nothing feels "settled" -- every section establishes its own scale.

The most jarring inconsistency: stat numbers in EventPresentationSection use `text-3xl` while stat numbers in BabiesSection use `text-6xl`/`text-7xl`. These sections serve similar purposes (presenting impact data) but look like they belong to different websites.

**Heading hierarchy is inverted.**
- Global h1: `text-3xl md:text-5xl` (globals.css:31)
- BabiesSection h2: `text-4xl md:text-5xl lg:text-6xl` (line 25) -- LARGER than h1
- DonateSection h2: `text-5xl` (line 37) -- LARGER than h1 at desktop
- PartnersSection h2: `text-4xl` (line 61) -- Equal to h1 at base

When h2 elements routinely exceed the h1 in visual weight, the typographic hierarchy collapses. The hero h1 should be the largest text on the page.

**Orphaned serif typeface.**
`PartnersSection.tsx:61` uses `font-serif text-4xl font-light italic` for "Distinguished Partners." This is the ONLY serif usage on the entire page. It introduces a completely different typographic voice that is never reinforced elsewhere. Either commit to serif for section titles across premium contexts (Partners, Babies, Banner), or remove it to maintain consistency.

**Five font weights is broad but defensible -- with caveats.**
`font-light` (300), `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700) all appear. The Babies section alone uses three weights (light, semibold, bold). For a luxury aesthetic, `font-light` can be elegant, but it appears inconsistently -- only in BabiesSection and PartnersSection -- making those sections feel like a different brand.

**Recommendation:** Establish a type scale of 5 sizes (sm, base, lg, 2xl, 5xl) and 3 weights (light, normal, bold) and refactor all sections to conform.

### Pillar 5: Spacing (2/4)

**No consistent vertical rhythm between sections.**
Section vertical padding varies across four different patterns:
- Default `Section` component: `py-16 md:py-20` (Section.tsx:17)
- Babies section: `py-20 md:py-28` (BabiesSection.tsx:7)
- Contact section: `py-20 md:py-32` (ContactSection.tsx:13)
- Hero section: `pt-6 md:py-16 md:pt-32` (HeroSection.tsx:51)

A luxury page should feel like a carefully paced scroll where each section breathes at a consistent rhythm. The current variation creates subtle but perceptible unevenness.

**Event section internal spacing is chaotic.**
Within EventPresentationSection.tsx: the grid uses `gap-4` and `md:gap-16`, the stats section uses `mt-6 space-y-6`, then `mt-24` (a massive 6rem jump) appears before the ambassador logo, followed by the event banner with its own `p-4` and `mt-8` patterns. The `mt-24` gap before the logo image creates a visual void that reads as a mistake.

**Container max-width is very wide.**
`globals.css:47` sets `max-w-[88rem]` (1408px). At 1440px viewport, content stretches nearly edge-to-edge. For body text readability, optimal line length is 60-75 characters. With `text-lg` on a 1408px container, text lines easily exceed 100 characters, straining readability. Consider reducing to `max-w-6xl` (1152px) or `max-w-7xl` (1280px).

**Footer has zero spacing.**
`Footer.tsx` defines no padding, margin, or background. The copyright text butts directly against the Contact section content above it with no visual separation.

**Positive: Babies section demonstrates excellent internal spacing.**
Uses `space-y-6 md:space-y-8` for text blocks, `gap-12 md:gap-16 lg:gap-20` for the responsive grid, and `mb-12 md:mb-16` for the header area. This section alone shows what considered spacing feels like.

### Pillar 6: Experience Design (2/4)

**No navigation is the single biggest UX failure.**
The Header (`Header.tsx`) contains only a logo and a "Donate now" button. There are 10 sections with no way to navigate between them. A high-net-worth donor who hears about the gala from a friend and visits the site to find event details must scroll through the hero, ambassador bio, medical information, and statistics before reaching any booking information. A partner brand checking their logo placement must scroll through 7 sections to reach Partners.

For comparison: every luxury charity website (amfAR, Robin Hood Foundation, Met Gala) provides clear navigation. The absence here communicates "early-stage project," not "established international fund."

**Two identical-feeling donation CTAs dilute rather than reinforce.**
Hero (section 1) and Donate (section 8) share: orange background, 2-column layout with child photo, white body text about sickle cell, teal "Donate Now" button. The second CTA should feel like an emotional crescendo after the user has absorbed the story -- not a repetition of the opening pitch. After reading about the disease, the treatment, the partners, the visitor should arrive at a CTA that feels earned and distinct.

**"Reserve now" and "Donate Now" lead to the same destination.**
Both `EventPresentationSection.tsx:31` and `HeroSection.tsx:79` link to `APP_ROUTES.donate.path`. VIP table reservation at 5,000 EUR requires its own dedicated flow -- name, guest count, seating preferences, payment. Routing this to a generic donation page is a conversion-killing mismatch for the highest-value user action on the site.

**Zero trust signals for a donation-focused page.**
Missing elements that luxury donors expect:
- No testimonials from previous gala attendees
- No direct quotes from Cathy Guetta herself
- No press/media logos or mentions
- No nonprofit registration number or fiscal transparency
- No social media links anywhere
- Footer contains only a copyright line -- no legal links (privacy, terms, CGV)

At the 500-5,000 EUR price point, trust must be established through transparency. The current page relies entirely on brand names (Cathy Guetta, Chopard, Audemars Piguet) without reinforcing organizational legitimacy.

**Strengths:**
- Header scroll behavior is well-designed: "Donate now" button appears progressively after 60% scroll
- Spring animations on the logo position are smooth and feel premium
- Partners marquee pauses on hover, respecting user intent
- Button component includes touch target expansion and disabled state handling

---

## Additional Design Observations

**The page tells a story but the pacing is wrong.**
The narrative arc (awareness -> urgency -> solution -> community -> action) is sound conceptually. But the execution front-loads too much information before the first visual break. A donor sees: Hero (orange) -> massive Event section (white, ~3 screens of scrolling) -> Sickle Cell explanation (white) -> Babies section (subtle gradient). By the time they reach the beautiful Babies section, they have already scrolled through ~5 screens of dense content.

**Suggested section reorder for better emotional pacing:**
1. Hero (hook)
2. Ambassador intro (credibility -- who is behind this)
3. What is Sickle Cell (education)
4. Early Hope / Babies (emotional peak)
5. Impact Stats (proof it works)
6. DREPAF Treatment (the solution)
7. Partners (social proof)
8. Gala Event (the invitation)
9. Donate CTA (the ask -- with different visual treatment)
10. Contact + Footer (trust and legitimacy)

---

## Files Audited

- `src/app/page.tsx`
- `src/app/components/HeroSection.tsx`
- `src/app/components/EventPresentationSection.tsx`
- `src/app/components/WhatIsSickleSection.tsx`
- `src/app/components/BabiesSection.tsx`
- `src/app/components/BannerSection.tsx`
- `src/app/components/DrepafSection.tsx`
- `src/app/components/PartnersSection.tsx`
- `src/app/components/DonateSection.tsx`
- `src/app/components/ContactSection.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/Section.tsx`
- `src/components/Button/Button.tsx`
- `src/components/Button/styles.ts`
- `src/styles/globals.css`
