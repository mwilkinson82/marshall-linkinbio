import "dotenv/config";
import express from "express";
import { createServer } from "http";
import https from "https";
import net from "net";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxYndpdXFhcWp0YnZ4a3ZxcGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjEzNjMsImV4cCI6MjA4OTYzNzM2M30.Sv2T50J_uq3-KgOtI2OpFgHrBCZH2-BnnWCU2BOdkpY";

function supabaseFetch(method: string, reqPath: string, body?: object): Promise<{ status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined;
    const opts: https.RequestOptions = {
      hostname: "qqbwiuqaqjtbvxkvqplo.supabase.co",
      path: reqPath, method,
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal", ...(payload ? { "Content-Length": String(Buffer.byteLength(payload)) } : {}) },
    };
    const req = https.request(opts, (res) => {
      let d = ""; res.on("data", c => d += c);
      res.on("end", () => { try { resolve({ status: res.statusCode ?? 0, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode ?? 0, body: d }); } });
    });
    req.on("error", reject); if (payload) req.write(payload); req.end();
  });
}

function buildUnsubPage(email: string, success: boolean, noEmail: boolean, already: boolean): string {
  const de = email ? decodeURIComponent(email) : "";
  const h = noEmail ? "Missing Email" : success ? (already ? "Already Unsubscribed" : "You've Been Unsubscribed") : "Something Went Wrong";
  const m = noEmail ? "No email address was provided." : success ? (already ? `<strong>${de}</strong> is already removed from the ALP mailing list.` : `<strong>${de}</strong> has been successfully removed from the ALP mailing list. You will not receive any further emails from us.`) : "We encountered an issue. Please try again.";
  const ck = success ? `<div style="width:72px;height:72px;border-radius:50%;background:#0d1333;border:2px solid #d4af37;display:flex;align-items:center;justify-content:center;margin:0 auto 28px auto"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>` : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${h} | ALP</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#060b1e;font-family:Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.card{background:#0d1333;border:1px solid #d4af37;border-radius:8px;max-width:520px;width:100%;padding:48px 40px;text-align:center}.gl{height:3px;background:#d4af37;border-radius:8px 8px 0 0;margin:-48px -40px 40px -40px}.logo{margin-bottom:32px}.logo img{max-width:200px;height:auto}h1{font-family:Georgia,serif;font-size:26px;color:#d4af37;font-weight:normal;margin-bottom:20px;line-height:1.3}p{font-size:15px;line-height:1.7;color:#ccc;margin-bottom:24px}p strong{color:#fff}.dv{height:1px;background:#1a2a50;margin:24px 0}.fn{font-family:Georgia,serif;font-size:15px;color:#d4af37;margin-bottom:8px}.ft{font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase}.fl a{color:#aaa;text-decoration:none}@media(max-width:560px){.card{padding:36px 24px}.gl{margin:-36px -24px 32px -24px}}</style></head><body><div class="card"><div class="gl"></div><div class="logo"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663332724241/DgHCLkKImcFCcyLQ.png" alt="ALP"></div>${ck}<h1>${h}</h1><p>${m}</p><div class="dv"></div><p class="fn">Marshall Wilkinson</p><p class="ft">Founder, ALP &nbsp;|&nbsp; $2.5B+ in Construction</p><div style="height:1px;background:#1a2a50;margin:16px 0"></div><p class="fl"><a href="https://alpcontractorcircle.com">Visit ALP</a></p></div></body></html>`;
}
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerStripeWebhook } from "../stripeWebhook";
import { registerDiscordOAuthRoutes } from "../discord";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // IMPORTANT: Register Stripe webhook BEFORE express.json() to preserve raw body
  registerStripeWebhook(app);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Discord OAuth for member portal
  registerDiscordOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // ── UNSUBSCRIBE ROUTE — must be before static/vite catch-all ──────────
  app.get("/unsubscribe", async (req, res) => {
    const email = (req.query.email as string) || "";
    if (!email) { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.send(buildUnsubPage("", false, true, false)); }
    try {
      const chk = await supabaseFetch("GET", `/rest/v1/email_unsubscribes?email=eq.${encodeURIComponent(email)}&select=id`);
      const existing = chk.body as { id: number }[];
      if (Array.isArray(existing) && existing.length > 0) { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.send(buildUnsubPage(email, true, false, true)); }
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";
      const ua = req.headers["user-agent"] || "";
      const ins = await supabaseFetch("POST", "/rest/v1/email_unsubscribes", { email: decodeURIComponent(email), ip_address: ip, user_agent: ua });
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(buildUnsubPage(email, ins.status === 201 || ins.status === 200, false, false));
    } catch (err) { console.error("Unsubscribe error:", err); res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.send(buildUnsubPage(email, false, false, false)); }
  });
  // ────────────────────────────────────────────────────────────────────────

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
