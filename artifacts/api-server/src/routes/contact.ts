import { Router, type IRouter, type Request } from "express";


const router: IRouter = Router();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  projectType?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validateContactBody(body: ContactBody) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const projectType =
    typeof body.projectType === "string" ? body.projectType.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (website) {
    return { error: "Invalid submission." };
  }

  if (!name || name.length > 120) {
    return { error: "Please provide your name." };
  }

  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  if (!message || message.length > 5000) {
    return { error: "Please provide a message under 5,000 characters." };
  }

  if (projectType.length > 100) {
    return { error: "Please choose a valid project type." };
  }

  return { value: { name, email, message, projectType } };
}

router.post("/contact", async (req, res) => {
  const now = Date.now();
  const ip = getClientIp(req);
  const current = submissionsByIp.get(ip);

  if (!current || current.resetAt <= now) {
    submissionsByIp.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    res.status(429).json({
      status: "error",
      message: "Too many messages from this connection. Please try again later.",
    });
    return;
  } else {
    current.count += 1;
  }

  const parsed = validateContactBody((req.body ?? {}) as ContactBody);
  if (!parsed.value) {
    res.status(400).json({
      status: "error",
      message: parsed.error,
    });
    return;
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  if (!recipient) {
    req.log.error("CONTACT_RECIPIENT_EMAIL is not configured");
    res.status(503).json({
      status: "error",
      message: "Contact delivery is temporarily unavailable.",
    });
    return;
  }

  const { name, email, message, projectType } = parsed.value;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const safeProjectType = escapeHtml(projectType || "Not specified");

  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

if (!resendApiKey) {
  req.log.error("RESEND_API_KEY is not configured");
  res.status(503).json({
    status: "error",
    message: "Contact delivery is temporarily unavailable.",
  });
  return;
}

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${resendApiKey}`,
  },
  body: JSON.stringify({
    from:
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "onboarding@resend.dev",
    to: [recipient],
    reply_to: email,
    subject: `New portfolio inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType || "Not specified"}`,
      "",
      message,
    ].join("\n"),
    html: `
      <h2>New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Project type:</strong> ${safeProjectType}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  }),
});

    if (!response.ok) {
      req.log.error(
        { statusCode: response.status, statusText: response.statusText },
        "Resend rejected contact message",
      );
      res.status(502).json({
        status: "error",
        message: "Your message could not be delivered. Please try again.",
      });
      return;
    }

    req.log.info({ recipient }, "Contact message delivered through Resend");
    res.status(200).json({
      status: "ok",
      message: "Thanks — your message has been sent.",
    });
  } catch (error) {
    req.log.error({ err: error }, "Contact message delivery failed");
    res.status(502).json({
      status: "error",
      message: "Your message could not be delivered. Please try again.",
    });
  }
});

export default router;