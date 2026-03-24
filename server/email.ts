import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("[Email] RESEND_API_KEY not set — email features will be unavailable");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ─── From address ─────────────────────────────────────────────────────────
// Using Marshall's verified domain for branded email delivery.
const FROM_ADDRESS = "Marshall Wilkinson | ALP <welcome@notifications.marshallwilkinson.com>";

// ─── Hero Image ───────────────────────────────────────────────────────────
const HERO_IMAGE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/marshall_hero_6c478c8c.webp";

// ─── Premium Welcome Email Template ──────────────────────────────────────
// Dark navy background (#08090D), gold/ember accents (#D4915C, #C9A96E),
// hero image, Founding Member badge, step-by-step onboarding, Discord invite,
// portal link, and Marshall's signature footer.
function buildWelcomeEmailHtml(params: { name: string }): string {
  const { name } = params;
  const firstName = name.split(" ")[0] || "there";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to The Contracting Circle</title>
</head>
<body style="margin:0;padding:0;background-color:#08090D;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#08090D;">
    <tr>
      <td align="center" style="padding:0;">

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- HERO IMAGE SECTION                                             -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:0;position:relative;">
              <img
                src="${HERO_IMAGE_URL}"
                alt="Marshall Wilkinson — Founder, ALP"
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;border-radius:0;"
              />
              <!-- Dark gradient overlay at bottom of hero -->
              <div style="height:80px;margin-top:-80px;position:relative;background:linear-gradient(to top,#08090D,transparent);"></div>
            </td>
          </tr>
        </table>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- MAIN CONTENT                                                   -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;padding:0 20px;">

          <!-- Top Gold Accent Bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#D4915C,#C9A96E,#D4915C);border-radius:2px;"></td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:32px;"></td></tr>

          <!-- ─── FOUNDING MEMBER BADGE ─── -->
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:rgba(212,145,92,0.12);border:1px solid rgba(212,145,92,0.35);border-radius:50px;padding:8px 22px;">
                    <span style="color:#D4915C;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;">&#9733; Founding Member &#9733;</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:28px;"></td></tr>

          <!-- ─── HEADLINE ─── -->
          <tr>
            <td align="center" style="color:#EDE6DB;font-size:34px;font-weight:700;line-height:1.15;letter-spacing:-0.5px;">
              Welcome to The Circle, ${firstName}.
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:16px;"></td></tr>

          <!-- ─── SUBTITLE ─── -->
          <tr>
            <td align="center" style="color:rgba(237,230,219,0.7);font-size:16px;line-height:1.7;padding:0 16px;">
              You just made a decision that separates you from 99% of contractors. This isn't just a membership &mdash; it's the execution engine that will change the trajectory of your business.
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:32px;"></td></tr>

          <!-- Gold Divider -->
          <tr>
            <td align="center">
              <div style="width:80px;height:2px;background:linear-gradient(90deg,transparent,#D4915C,transparent);"></div>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:32px;"></td></tr>

          <!-- ─── SECTION HEADER: GET STARTED ─── -->
          <tr>
            <td align="center" style="color:#D4915C;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">
              Your Onboarding Checklist
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:24px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- STEP 1: JOIN DISCORD                                       -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="52" valign="top">
                    <div style="width:44px;height:44px;background:linear-gradient(135deg,rgba(212,145,92,0.2),rgba(201,169,110,0.1));border:1px solid rgba(212,145,92,0.25);border-radius:12px;text-align:center;line-height:44px;font-size:20px;">&#128172;</div>
                  </td>
                  <td style="padding-left:18px;">
                    <p style="color:#D4915C;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 6px 0;font-weight:700;">Step 1</p>
                    <p style="color:#EDE6DB;font-size:19px;font-weight:700;margin:0 0 10px 0;">Join the Private Discord Community</p>
                    <p style="color:rgba(237,230,219,0.6);font-size:14px;line-height:1.7;margin:0 0 18px 0;">
                      This is where the real conversations happen. Introduce yourself, connect with other serious contractors, share wins, ask questions, and start building relationships that will accelerate your growth.
                    </p>
                    <a href="https://discord.gg/jnwDPTY6D3" style="display:inline-block;background:linear-gradient(135deg,#D4915C,#C9A96E);color:#08090D;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                      Join Discord &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:14px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- STEP 2: ACCESS THE PORTAL                                  -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="52" valign="top">
                    <div style="width:44px;height:44px;background:linear-gradient(135deg,rgba(212,145,92,0.2),rgba(201,169,110,0.1));border:1px solid rgba(212,145,92,0.25);border-radius:12px;text-align:center;line-height:44px;font-size:20px;">&#127919;</div>
                  </td>
                  <td style="padding-left:18px;">
                    <p style="color:#D4915C;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 6px 0;font-weight:700;">Step 2</p>
                    <p style="color:#EDE6DB;font-size:19px;font-weight:700;margin:0 0 10px 0;">Access Your Member Portal</p>
                    <p style="color:rgba(237,230,219,0.6);font-size:14px;line-height:1.7;margin:0 0 18px 0;">
                      Your private portal is where you'll find the template library, call replays, bootcamp recordings, deal review archives, and everything you need to execute at a higher level. Log in with Discord.
                    </p>
                    <a href="https://alpcontractorcircle.com" style="display:inline-block;background:linear-gradient(135deg,#D4915C,#C9A96E);color:#08090D;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                      Open Portal &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:14px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- STEP 3: MARK YOUR CALENDAR                                 -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="52" valign="top">
                    <div style="width:44px;height:44px;background:linear-gradient(135deg,rgba(212,145,92,0.2),rgba(201,169,110,0.1));border:1px solid rgba(212,145,92,0.25);border-radius:12px;text-align:center;line-height:44px;font-size:20px;">&#128197;</div>
                  </td>
                  <td style="padding-left:18px;">
                    <p style="color:#D4915C;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 6px 0;font-weight:700;">Step 3</p>
                    <p style="color:#EDE6DB;font-size:19px;font-weight:700;margin:0 0 10px 0;">Mark Your Calendar</p>
                    <p style="color:rgba(237,230,219,0.6);font-size:14px;line-height:1.7;margin:0;">
                      Our bi-weekly group calls are where the real breakthroughs happen. Come with questions, deals you're working, or challenges you're facing. Marshall and the community are here to help you win. Check Discord for the next call date.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:14px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- STEP 4: START EXECUTING                                    -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="52" valign="top">
                    <div style="width:44px;height:44px;background:linear-gradient(135deg,rgba(212,145,92,0.2),rgba(201,169,110,0.1));border:1px solid rgba(212,145,92,0.25);border-radius:12px;text-align:center;line-height:44px;font-size:20px;">&#128640;</div>
                  </td>
                  <td style="padding-left:18px;">
                    <p style="color:#D4915C;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 6px 0;font-weight:700;">Step 4</p>
                    <p style="color:#EDE6DB;font-size:19px;font-weight:700;margin:0 0 10px 0;">Start Executing</p>
                    <p style="color:rgba(237,230,219,0.6);font-size:14px;line-height:1.7;margin:0;">
                      Download the templates. Watch the replays. Implement immediately. The contractors in this room don't just learn &mdash; they execute. That's why they win. That's why <em>you'll</em> win.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:32px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- MEMBERSHIP INCLUDES — Gold gradient card                   -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(212,145,92,0.1),rgba(201,169,110,0.05));border:1px solid rgba(212,145,92,0.2);border-radius:16px;padding:28px;">
              <p style="color:#D4915C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;font-weight:700;text-align:center;">Your Founding Membership Includes</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:rgba(237,230,219,0.75);font-size:14px;line-height:2.2;padding:0 12px;">
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Bi-weekly group calls with Marshall<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Monthly deal reviews<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Monthly bootcamp sessions<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Complete template library (proposals, contracts, scripts &amp; more)<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Private Discord community of serious contractors<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Full replay library of all past sessions<br/>
                    <span style="color:#D4915C;">&#10003;</span>&nbsp; Founding member pricing &mdash; locked in forever
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:36px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- QUOTE                                                      -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td align="center" style="padding:0 24px;">
              <div style="width:40px;height:2px;background:linear-gradient(90deg,transparent,rgba(212,145,92,0.4),transparent);margin:0 auto 20px auto;"></div>
              <p style="color:rgba(237,230,219,0.45);font-size:15px;font-style:italic;line-height:1.7;margin:0 0 10px 0;">
                "The future is bright. The value is real. Welcome to a world where anything is possible."
              </p>
              <p style="color:#D4915C;font-size:13px;font-weight:700;margin:0;letter-spacing:0.5px;">
                &mdash; Marshall Wilkinson
              </p>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:36px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- DIVIDER                                                    -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:28px;"></td></tr>

          <!-- ═══════════════════════════════════════════════════════════ -->
          <!-- FOOTER — Signature block                                   -->
          <!-- ═══════════════════════════════════════════════════════════ -->
          <tr>
            <td align="center" style="padding:0 20px;">
              <p style="color:#EDE6DB;font-size:14px;font-weight:700;margin:0 0 4px 0;">
                Marshall Wilkinson
              </p>
              <p style="color:rgba(237,230,219,0.5);font-size:12px;margin:0 0 4px 0;letter-spacing:0.5px;">
                Founder, ALP &nbsp;|&nbsp; $2.5B+ in Construction
              </p>
              <p style="color:rgba(237,230,219,0.35);font-size:12px;margin:0 0 16px 0;">
                <a href="mailto:marshall@marshallwilkinson.com" style="color:rgba(212,145,92,0.6);text-decoration:none;">marshall@marshallwilkinson.com</a>
              </p>
              <p style="margin:0;">
                <a href="https://instagram.com/marshallwilkinson.alp" style="color:rgba(212,145,92,0.45);text-decoration:none;font-size:12px;">Instagram</a>
                <span style="color:rgba(237,230,219,0.2);">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
                <a href="https://alpcontractorcircle.com" style="color:rgba(212,145,92,0.45);text-decoration:none;font-size:12px;">Member Portal</a>
                <span style="color:rgba(237,230,219,0.2);">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
                <a href="https://altitudelogicpressure.com" style="color:rgba(212,145,92,0.45);text-decoration:none;font-size:12px;">Website</a>
              </p>
            </td>
          </tr>

          <!-- Bottom Gold Accent Bar -->
          <tr><td style="height:32px;"></td></tr>
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#D4915C,#C9A96E,#D4915C);border-radius:2px;"></td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:40px;"></td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Plain text version ──────────────────────────────────────────────────
function buildWelcomeEmailText(params: { name: string }): string {
  const firstName = params.name.split(" ")[0] || "there";

  return `
★ FOUNDING MEMBER ★

Welcome to The Circle, ${firstName}.

You just made a decision that separates you from 99% of contractors. This isn't just a membership — it's the execution engine that will change the trajectory of your business.

════════════════════════════════════════

STEP 1: Join the Private Discord Community
This is where the real conversations happen. Introduce yourself, connect with other serious contractors, share wins, ask questions, and start building relationships.
→ Join Discord: https://discord.gg/jnwDPTY6D3

STEP 2: Access Your Member Portal
Your private portal has the template library, call replays, bootcamp recordings, deal review archives, and everything you need to execute at a higher level. Log in with Discord.
→ Open Portal: https://alpcontractorcircle.com

STEP 3: Mark Your Calendar
Our bi-weekly group calls are where the real breakthroughs happen. Come with questions, deals you're working, or challenges you're facing. Check Discord for the next call date.

STEP 4: Start Executing
Download the templates. Watch the replays. Implement immediately. The contractors in this room don't just learn — they execute. That's why they win. That's why you'll win.

════════════════════════════════════════

YOUR FOUNDING MEMBERSHIP INCLUDES:
✓ Bi-weekly group calls with Marshall
✓ Monthly deal reviews
✓ Monthly bootcamp sessions
✓ Complete template library (proposals, contracts, scripts & more)
✓ Private Discord community of serious contractors
✓ Full replay library of all past sessions
✓ Founding member pricing — locked in forever

════════════════════════════════════════

"The future is bright. The value is real. Welcome to a world where anything is possible."
— Marshall Wilkinson

────────────────────────────────────────
Marshall Wilkinson
Founder, ALP | $2.5B+ in Construction
marshall@marshallwilkinson.com

Instagram: https://instagram.com/marshallwilkinson.alp
Portal: https://alpcontractorcircle.com
Website: https://altitudelogicpressure.com
  `.trim();
}

// ─── Send Welcome Email ──────────────────────────────────────────────────
export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn("[Email] Resend not configured — skipping welcome email");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      subject: "Welcome to The Contracting Circle — You're In, Founding Member",
      html: buildWelcomeEmailHtml({ name: params.name }),
      text: buildWelcomeEmailText({ name: params.name }),
    });

    if (error) {
      console.error("[Email] Failed to send welcome email:", error);
      return { success: false, error: error.message };
    }

    console.log(`[Email] Welcome email sent to ${params.to} — id: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("[Email] Unexpected error sending welcome email:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// Export template builders for testing
export { buildWelcomeEmailHtml, buildWelcomeEmailText };
