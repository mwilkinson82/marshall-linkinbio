# Project TODO

- [x] Basic homepage layout with dark premium aesthetic
- [x] Hero section with parallax zoom and cascading text reveal
- [x] Product cards with scroll-triggered stagger animations
- [x] Ambient background glow effects
- [x] Social links and footer
- [x] Fix ALP Classes price to $497/mo
- [x] Rewrite Private Advisory as application-based (no price, Apply badge)
- [x] Add Free Resources section with 3 lead magnets
- [x] Clean up unnecessary backend/Stripe files
- [x] Final polish and publish to live URL
- [x] Build Contracting Circle sales page at /circle route
- [x] Hero section with founding members badge and parallax
- [x] Stats section ($2.5B+, 1,000+ Contractors, Daily)
- [x] What's Included section with 6 feature cards
- [x] Testimonials section with 4 real testimonials from ALP site
- [x] Pricing section ($497/mo, founding member angle)
- [x] FAQ section with 8 accordion questions
- [x] Final CTA with urgency copy
- [x] Update link-in-bio card from Coming Soon to live /circle link
- [x] Fix $5B+ references to $2.5B+
- [x] Darken hero gradient overlay for better text readability
- [x] Pull correct testimonials from bottom of altitudelogicpressure.com (video embed + updated text)
- [x] Upgrade animations to cinematic quality — text splitting, parallax cards, staggered reveals
- [x] Build member portal with Discord OAuth login
- [x] Member dashboard with subscription status
- [x] Replay library page for recorded calls/bootcamps
- [x] Template downloads page
- [x] Account/subscription management
- [x] Create Stripe product/price config for $497/mo Contracting Circle
- [x] Build checkout session tRPC endpoint
- [x] Set up Stripe webhook handler for subscription events
- [x] Connect all CTA buttons on /circle to trigger Stripe checkout
- [x] Test Stripe checkout flow end-to-end (vitest passed)
- [x] Deploy with Stripe integration live
- [x] Build cinematic animated success/welcome page at /circle/welcome
- [x] Confetti/particle celebration animation on page load
- [x] "Welcome to The Circle" messaging with next steps
- [x] Mention welcome email is coming
- [x] Discord community link/CTA
- [x] Build welcome email triggered on successful Stripe payment
- [x] Wire Stripe checkout success_url to /circle/welcome
- [x] Test full checkout-to-welcome flow end-to-end (9/9 vitest tests passing)
- [x] Add tRPC verifyCheckout endpoint for personalized welcome page
- [x] Add owner notification on new member subscription via webhook
- [x] Personalized greeting on welcome page when session_id is present
- [x] Set up Resend API key as environment secret
- [x] Install Resend SDK
- [x] Build branded welcome email template (HTML)
- [x] Create email sending helper function
- [x] Wire welcome email into Stripe webhook on checkout.session.completed
- [x] Write vitest tests for email integration (14 tests passing)
- [x] Test end-to-end email delivery (sent to delivered@resend.dev)
- [x] Update email from address to notifications.marshallwilkinson.com verified domain
- [x] Set up Discord OAuth credentials (Client ID + Secret)
- [x] Build Discord OAuth server-side auth flow (login, callback, session)
- [x] Create member database schema (members table with Discord + Stripe info)
- [x] Push database migrations
- [x] Build member dashboard page with subscription status
- [x] Build replay library page for recorded calls/bootcamps
- [x] Build template downloads page
- [x] Build account/subscription management page
- [x] Wire Discord OAuth login into member portal with sidebar layout
- [x] Write vitest tests for Discord OAuth and member features (39 total tests passing)
- [ ] Test full Discord login flow end-to-end (requires manual browser test)
- [x] Fix Discord OAuth redirect_uri to use hardcoded production domain
- [x] Publish site publicly
- [x] Update Discord invite link to https://discord.gg/TFSN7YPRWD across all pages

## Operational Roadmap (from Marshall's voice notes)

### Priority 1 — Auto Member Creation on Stripe Payment
- [x] Auto-create member portal account when Stripe checkout.session.completed fires
- [x] Link Stripe customer email to Discord member record on signup
- [x] Filter Stripe webhook to only process events from THIS app (avoid cross-site webhook noise)

### Priority 2 — Cloudflare Stream Video Integration
- [x] Add Cloudflare Stream video player component to Replay Library
- [x] Create admin tRPC endpoints (addReplay, deleteReplay) for Cloudflare Stream video IDs
- [x] Store replay metadata in database (title, date, duration, category, cloudflare_stream_id)
- [x] Replace placeholder replay cards with real database-driven content
- [x] Document workflow: Download Zoom recording → Upload to Cloudflare Stream → Add ID to portal

### Priority 3 — Zoom Call Calendar Integration
- [x] Add recurring Thursday call Zoom link to portal dashboard (ZOOM_CALL_LINK placeholder)
- [ ] Add "Add to Calendar" button (.ics download) for weekly calls
- [x] Show next upcoming call date/time dynamically in the portal

### Priority 4 — Real Templates
- [ ] Repurpose existing ALP templates (from outdoor living sales course) for the template library
- [ ] Create additional contractor-specific templates
- [ ] Add real download links to template library page

### Priority 5 — Future: Multi-Membership Expansion
- [ ] Evaluate duplicating this portal for: Contractor School, Sales & Marketing School, Power Hour, ALP University
- [ ] Consider making existing Kajabi members "honorary" Contracting Circle members
- [ ] Design membership tier system if multiple portals are consolidated into one

### Notes
- Cloudflare Stream is already in use for ALP Living Sales course — use same workflow here
- All memberships currently in Kajabi; plan to migrate forward (not backward) to this platform
- Stripe account is shared across multiple sites — webhook filtering is critical
- Zoom recordings need to be manually downloaded and uploaded to Cloudflare Stream (no automation yet)

## Admin Panel
- [x] Add admin role field to members table and push migration
- [x] Create adminProcedure (protectedProcedure + role === "admin" check)
- [x] Add admin tRPC endpoints: addReplay, deleteReplay
- [x] Build admin panel UI page at /portal/admin (only visible to admins)
- [x] Add replay form: title, date, duration, category, Cloudflare Stream video ID, description
- [x] Add edit/delete actions on each replay card in admin view
- [x] Add admin nav item in sidebar (only shown to admin members)
- [x] Promote Marshall's Discord account to admin in the database
- [x] Write vitest tests for admin procedures (55 total tests passing)
