---
name: Resend testing mode
description: Resend connector behavior when the account is still in testing mode
---

Resend’s testing mode only accepts test emails addressed to the connected Resend account inbox. Sending to another recipient returns a 403 validation error until a domain is verified and the sender uses that domain.

**Why:** A contact-form delivery test can look like an API or payload failure when the real issue is Resend’s recipient restriction.

**How to apply:** Keep the contact recipient on the connected account inbox during testing, use `onboarding@resend.dev` or another allowed sender, and only expand recipients after verifying a domain in Resend.