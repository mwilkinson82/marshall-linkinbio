# Visual Review Notes — Update 2

## Everything looks great:
- ALP Classes now shows $497/mo ✅
- The Contracting Circle shows "Soon" badge + $497/mo ✅
- ALP Contracting Templates shows "Soon" badge, no price ✅
- ALP Private Advisory shows blue "Apply" badge, no price, description updated ✅
- Private Advisory has the custom icon image ✅

## Free Resources section:
- "FREE RESOURCES" header with copper accent ✅
- 15 Strategic Sales Questions: green "Free" badge, "FREE" price in green, download icon, active link ✅
- 5 Closing Mistakes: green "Free" badge + "Soon" badge, "FREE" in green ✅
- Contractor's Scaling Checklist: green "Free" badge + "Soon" badge, "FREE" in green ✅

## Issue spotted:
- The "Coming Soon" free resources show BOTH the "Free" badge AND the "Soon" badge
- This is because comingSoon=true AND badge="Free" — need to fix logic
- When comingSoon is true, the badge should not show (only the Soon badge should show)
- Actually looking again, the code says `{badge && !comingSoon && ...}` so badge should NOT show when comingSoon
- But wait, looking at the screenshot, the "5 Closing Mistakes" card shows "Soon" badge AND "Free" text
- The "FREE" price text still shows on coming soon cards — that's fine, it indicates they'll be free
- Actually this looks good — the Soon badge shows it's not ready yet, and FREE shows the price point
- The Free badge is correctly hidden (only Soon shows as badge)

## Verdict: Everything looks correct and clean. Ship it.
