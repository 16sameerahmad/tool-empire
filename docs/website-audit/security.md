# Website Audit — Security

**Audit date:** 2026-10-14 · **Scope:** authorized, non-destructive checks on our own domain,
repo, and config. No aggressive tests, no load testing, no third-party targets.
**Posture:** static site (no auth, no DB, no cookies, no uploads, no API, no user data).
This is NOT a promise the site is 100% hack-proof — it is a record of what was checked,
what was found, and what remains.

## Verified clean

| Check | Result | Method |
|---|---|---|
| Secrets in working tree | **None found** | grep for API-key / private-key / token patterns across src/, public/, config files (values never printed) |
| .env files | **None exist** | ls — no `.env*` in repo |
| eval / innerHTML / document.write | **None** | grep src/ |
| dangerouslySetInnerHTML | Only JSON-LD via `JSON.stringify(...)` (11 sites) — **safe pattern**: data is developer-authored constants, never user input | grep src/ |
| API endpoints | **None** — static export; /api/hello → 404 | live curl |
| Auth / sessions / cookies | **None exist** — nothing to attack | architecture (static export) |
| File uploads | **None exist** | architecture |
| Database | **None exists** | architecture |
| Server logs | **None accessible** (Vercel-managed) | architecture |
| TLS chain | **Valid** (`ssl_verify_result=0`) | curl |
| HSTS | **Present:** `max-age=63072000; includeSubDomains; preload` | live response headers |

## Findings

### S1 — No Content-Security-Policy header · MEDIUM
**Evidence:** live response headers contain no `Content-Security-Policy`.
**Risk:** defense-in-depth gap. Actual XSS surface is low (no user content rendered as
HTML; JSON-LD uses `JSON.stringify`), but a CSP would contain any future injection.
**Remediation (queued):** add CSP via `vercel.json` headers. Start `Content-Security-Policy-Report-Only`
or a careful policy allowing `'self'`, inline JSON-LD scripts (`type="application/ld+json"`),
and Vercel's requirements. Test every tool page after applying — a too-strict CSP can
break inline scripts. Do NOT copy a random CSP from the internet; tailor it and verify.
**Residual risk after fix:** CSP is mitigation, not immunity.

### S2 — No clickjacking protection (X-Frame-Options / frame-ancestors) · LOW–MEDIUM
**Evidence:** no `X-Frame-Options` header; no CSP `frame-ancestors`.
**Risk:** site can be iframed. Impact is low (no auth, no state-changing actions), but
framing enables UI-redress tricks against visitors.
**Remediation (queued):** `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'` (site has
no legitimate embed use-case). Same `vercel.json` headers change as S1.

### S3 — Other hardening headers missing · LOW
**Evidence:** no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`.
**Remediation (queued):** add `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
`Permissions-Policy` (disable camera/mic/geolocation etc. — the site uses none).
Same headers change as S1/S2.

### S4 — `Access-Control-Allow-Origin: *` · INFO (not a finding)
**Evidence:** Vercel default header on the homepage response.
**Assessment:** harmless for a public static site with no credentials, cookies, or
private API. No action needed. Do not "fix" by restricting unless an API is added later.

### S5 — TLS certificate expiry not directly verified · INFO
**Evidence:** chain validates (`ssl_verify_result=0`), but `openssl s_client` could not
read the certificate (egress proxy blocks the direct handshake), so the expiry date was
not observed in this pass.
**Remediation (queued):** confirm expiry/renewal in the Vercel dashboard (Vercel
auto-renews certificates) or via an independent TLS checker. No action expected — just
evidence.

### S6 — Dependency vulnerabilities NOT verified · UNVERIFIED (not "passed")
**Evidence:** `npm audit` failed — the egress proxy returns `403 policy_denied` for the
npm security-audit endpoint. No vulnerability counts could be obtained.
**Remediation (queued):** re-run via an alternate method in the weekly run (e.g. the
weekly agent's environment, or a dependency-scan tool that works through the proxy).
Do NOT claim "no vulnerabilities" until a scan actually runs. Production deps are only
3 (next, react, react-dom), which bounds the surface.

### S7 — Git-history secret scan NOT run · QUEUED
**Evidence:** working-tree grep is clean (above), but `git log -p` history was not scanned.
**Remediation (queued):** run a history scan for secret patterns in the weekly run.
**Note:** the Google site-verification token lives in `src/app/layout.tsx` by design —
Google requires it in code. It is **required, not a leak**. Its value is never reproduced
in any report. If any REAL secret is ever found in history: revoke + rotate it, then
rewrite history or contact GitHub support — never just delete the file and assume safety.

## HONEST N/A — checks that do not apply to this site

These are documented as **not applicable**, never as "passed": XSS via stored user
content (no user content stored) · CSRF (no state-changing requests) · broken access
control / IDOR (no access control, no object references) · authentication / session
weaknesses (no auth) · credential stuffing / brute force (no login) · insecure file
uploads (no uploads) · rate limiting / DoS protection (no endpoints; Vercel edge
absorbs traffic — not our config to audit) · database access policies / backups
(no database) · cookie flags (no cookies) · CORS policy beyond S4 (no API).
Incident response: no formal plan exists; for a static site the recovery path is
`git revert` + redeploy (see change-log.md rollback note).

## Residual risks (after queued fixes)

- A dependency vulnerability could exist undetected until S6 is resolved.
- CSP misconfiguration could break pages — mitigated by report-only first + testing.
- Social-engineering / account-takeover risk lives in the GitHub + Vercel accounts
  (outside this audit's scope) — 2FA on both accounts is Sam's responsibility.
- No monitoring/alerting for attacks exists (static site, no logs) — the daily health
  check covers uptime/content; it cannot see attack traffic.

## 2026-10-19 — Weekly re-check (Day 6)

- **S1/S2/S3 → FIXED, verified live.** Commit `ff34254` added `vercel.json` response
  headers; the live homepage now serves: `Content-Security-Policy-Report-Only`
  (`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'
  'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';
  frame-ancestors 'none'; base-uri 'self'; form-action 'self'`), `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  and `Permissions-Policy: camera=(), microphone=(), geolocation=()`. CSP is report-only
  per the audit's own recommendation (a too-strict enforcing policy could break pages).
- **S7 → CLOSED.** Git-history scan (`git grep` over all revisions for
  `ghp_|gho_|github_pat|aws_secret|BEGIN (RSA )?PRIVATE KEY|sk-live|xoxb-`): no matches.
  Working tree re-grep is clean (only benign hits: the contact email and Base64
  documentation prose). The GSC verification token in `src/app/layout.tsx` remains
  required-by-Google, not a leak; its value is never reproduced in reports.
- **S6 → still UNVERIFIED.** `npm audit` still fails with egress-proxy `403
  policy_denied` (2026-10-19, same as 2026-10-14). Production dependency surface is still
  3 packages (next, react, react-dom). Do NOT claim "no vulnerabilities" until a scan
  actually runs.
- **S5 → still INFO.** The egress proxy performs TLS interception (presents a Hatch
  Sandbox Egress CA certificate), so the origin certificate's real expiry is not
  observable from this VM. Vercel auto-renews; confirmation stays Sam-side in the
  Vercel dashboard.
