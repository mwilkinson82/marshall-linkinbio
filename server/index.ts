import express from "express";
import { createServer } from "http";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxYndpdXFhcWp0YnZ4a3ZxcGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjEzNjMsImV4cCI6MjA4OTYzNzM2M30.Sv2T50J_uq3-KgOtI2OpFgHrBCZH2-BnnWCU2BOdkpY";

function supabaseFetch(
  method: string,
  reqPath: string,
  body?: object
): Promise<{ status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined;
    const options: https.RequestOptions = {
      hostname: "qqbwiuqaqjtbvxkvqplo.supabase.co",
      path: reqPath,
      method,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
        ...(payload ? { "Content-Length": String(Buffer.byteLength(payload)) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve({ status: res.statusCode ?? 0, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode ?? 0, body: data }); }
      });
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function buildUnsubscribePage(email: string, success: boolean, noEmail: boolean, alreadyUnsub: boolean): string {
  const displayEmail = email ? decodeURIComponent(email) : "";
  const headline = noEmail ? "Missing Email" : success ? (alreadyUnsub ? "Already Unsubscribed" : "You've Been Unsubscribed") : "Something Went Wrong";
  const message = noEmail
    ? "No email address was provided in the unsubscribe link."
    : success
    ? alreadyUnsub
      ? `<strong>${displayEmail}</strong> is already removed from our mailing list. You will not receive any further emails from ALP.`
      : `<strong>${displayEmail}</strong> has been successfully removed from the ALP mailing list. You will not receive any further emails from us.`
    : "We encountered an issue processing your request. Please try again or contact us directly.";
  const checkmark = success
    ? `<div style="width:72px;height:72px;border-radius:50%;background:#0d1333;border:2px solid #d4af37;display:flex;align-items:center;justify-content:center;margin:0 auto 28px auto;"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`
    : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${headline} | ALP</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#060b1e;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.card{background:#0d1333;border:1px solid #d4af37;border-radius:8px;max-width:520px;width:100%;padding:48px 40px;text-align:center}.gold-line{height:3px;background:#d4af37;border-radius:8px 8px 0 0;margin:-48px -40px 40px -40px}.logo{margin-bottom:32px}.logo img{max-width:200px;height:auto}h1{font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#d4af37;font-weight:normal;margin-bottom:20px;line-height:1.3}p{font-size:15px;line-height:1.7;color:#cccccc;margin-bottom:24px}p strong{color:#fff}.divider{height:1px;background:#1a2a50;margin:24px 0}.fn{font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#d4af37;margin-bottom:8px}.ft{font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase;margin-bottom:0}.fl a{color:#aaa;text-decoration:none}@media(max-width:560px){.card{padding:36px 24px}.gold-line{margin:-36px -24px 32px -24px}}</style></head><body><div class="card"><div class="gold-line"></div><div class="logo"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663332724241/DgHCLkKImcFCcyLQ.png" alt="ALP"></div>${checkmark}<h1>${headline}</h1><p>${message}</p><div class="divider"></div><p class="fn">Marshall Wilkinson</p><p class="ft">Founder, ALP &nbsp;|&nbsp; $2.5B+ in Construction</p><div style="height:1px;background:#1a2a50;margin:16px 0"></div><p class="fl"><a href="https://alpcontractorcircle.com">Visit ALP</a></p></div></body></html>`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // ── UNSUBSCRIBE ROUTE (must be before catch-all) ──────────────────────
  app.get("/unsubscribe", async (req, res) => {
    const email = (req.query.email as string) || "";
    if (!email) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(buildUnsubscribePage("", false, true, false));
    }
    try {
      const checkResult = await supabaseFetch("GET", `/rest/v1/email_unsubscribes?email=eq.${encodeURIComponent(email)}&select=id`);
      const existing = checkResult.body as { id: number }[];
      if (Array.isArray(existing) && existing.length > 0) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(buildUnsubscribePage(email, true, false, true));
      }
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";
      const ua = req.headers["user-agent"] || "";
      const insertResult = await supabaseFetch("POST", "/rest/v1/email_unsubscribes", { email: decodeURIComponent(email), ip_address: ip, user_agent: ua });
      const success = insertResult.status === 201 || insertResult.status === 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(buildUnsubscribePage(email, success, false, false));
    } catch (err) {
      console.error("Unsubscribe error:", err);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(buildUnsubscribePage(email, false, false, false));
    }
  });
  // ────────────────────────────────────────────────────────────────────────

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
