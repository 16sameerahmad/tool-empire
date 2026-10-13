# Website Audit — User Needs

**Audit date:** 2026-10-14 · **Rule:** only real feedback actually read is reported as
user-reported. Everything else is labeled **intent-derived** (from search intent + PAA
questions), not user-reported.

## User-reported feedback

**No public feedback found for Tulyro itself.** The site went live 2026-10-14; no reviews,
comments, or discussions about Tulyro exist yet. That is expected, not a gap — but it
means every need below is either category-level (about free tool sites in general) or
intent-derived.

### Category-level feedback (public sources actually read)

1. **"Every EMI calculator gave me a different number and none explained anything."**
   — dev.to, "I Built 1200 Free Calculators That Show Their Work" (2026). Need: formula
   transparency + step-by-step breakdown. Tulyro status: formula + example shown ✅;
   step-by-step breakdown for EMI ❌ (gap — schedule table).
2. **Calculator defects are usually state bugs, not arithmetic: stale results, unit drift,
   unlabeled numbers** — dev.to, "Small Calculator, Three Bugs" (2026). Need: clear stale
   outputs on invalid input, units on every number. Tulyro status: validation + alerts
   present ✅; stale-output review on mode switches is hypothesis H5 (bugs.md).
3. **"My answer wasn't locked behind a paywall for once"** — Trustpilot review of
   calculator-online.net (Sep 2026), praising no-paywall answers; other reviews on the
   same page complain tools "not working". Need: free + working, no paywall. Tulyro
   status: free, no paywall ✅; "working" is protected by tests + daily health check.
4. **"Most calculator sites show you a result and send you away" / formula accuracy
   problems (e.g. outdated TDEE formula)** — Medium, "I built 700+ free calculators"
   (2026). Need: cite authoritative sources, use current formulas. Tulyro status: BMI
   cites WHO ✅; other tools' source citations are a gap (GEO pass added some).
5. **AI chatbots give wrong financial answers most of the time** (Saturn study via
   wealthprofessional.ca, 2026). Need: users checking financial math want a tool whose
   formula they can verify — not an AI answer. Tulyro status: formulas shown ✅.

## Intent-derived needs (from PAA + suggestion mining — NOT user-reported)

These come from `docs/seo/suggestion-mining.md` — questions people actually ask search
engines. They are evidence of demand, not quotes from users:

- "How much house can I afford?" → affordability guide (28/36 rule) — GAP-MORT-1.
- "What does an amortisation schedule look like?" → EMI schedule explainer/table.
- "What is my CGPA in percentage for [university]?" → one comparison guide, not doorway pages.
- "Is BMI accurate? What is a healthy BMI?" → chart + screening framing.
- "How many words in a 10-minute speech?" → words-per-minute guide.
- "Invoice vs receipt vs quote?" → comparison guide.
- "Can I download TTS as MP3?" → honest "not in v1" answer (do NOT promise).
- "Is it legal to make a fake text message?" → responsible-use framing (covered in FAQ).
- "Base64 vs encryption?" → explainer (covered in planned guide).
- "How do I calculate EMI in Excel?" → PMT guide candidate.

## Improvement opportunities (from needs)

1. **Show-your-work outputs** (EMI schedule, CGPA table, BMI range) — the single biggest
   category-level need, and our biggest feature gap.
2. **Honest limitation labels everywhere** (what the tool does NOT do) — users punish
   tools that over-promise (see TTS MP3, GPA, invoice templates).
3. **Source citations per tool** (BMI/WHO pattern) — builds the trust the category lacks.
4. **A feedback channel that actually gets read** — contact page exists; once real user
   feedback arrives, this file gets a genuine user-reported section.
