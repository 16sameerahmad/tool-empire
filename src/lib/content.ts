export type FAQItem = { question: string; answer: string };

export type ToolContent = {
  /** One quotable 1-2 sentence definition, plain facts, no marketing fluff. */
  definition: string;
  intro: string;
  howTo: string[];
  content: string[];
  faq: FAQItem[];
  /** Verified external sources cited by the page content (label + URL). */
  sources?: { label: string; href: string }[];
  /** Internal guides a visitor would naturally want next after using this tool. */
  guides?: { label: string; href: string }[];
};

const faq = (items: FAQItem[]): FAQItem[] => items;

export const content: Record<string, ToolContent> = {
  "age-calculator": {
    definition: "An age calculator finds the exact time between a date of birth and a chosen date, expressed as completed years, remaining months, and remaining days.",
    intro: "Find an exact calendar age from a date of birth without creating an account.",
    howTo: ["Choose a date of birth.", "Read the exact age and days lived.", "Check the next birthday countdown."],
    content: [
      "An age calculator answers a simple question with calendar precision: how old is someone on a particular day? Enter a date of birth and this browser-only calculator compares it with today on your device. The result separates completed years, remaining months, and remaining days, so it is more useful than subtracting birth years. It also shows total calendar days lived and the date of the next birthday. No date is sent to a server, and refreshing the page clears the input.",
      "Calendar age is different from dividing a number of days by 365.25. Months have different lengths, and a birthday is reached only when the month and day arrive. The calculator therefore advances the birth date one month at a time while keeping the local calendar date. This makes the result readable for birthdays near the end of a month and avoids a UTC shift that can make a date appear one day early or late. The result uses the local date on the visitor's device.",
      "Leap years need one explicit rule. For a person born on 29 February, the birthday is treated as 1 March in a non-leap year. Age therefore increases on 1 March in those years. On a leap year, 29 February remains the birthday. If the date of birth is today, the result is zero years, zero months, and zero days, while the next birthday is one year ahead. If today is the birthday for someone at least one year old, the next birthday is shown as Today with zero days remaining.",
      "The result is informational and should not be used as legal proof of age. Official processes may use documents, local rules, or a different definition of an age threshold. For school, work, insurance, or travel paperwork, follow the organisation's stated method. The calculator accepts dates from 1 January 1900 through today. Future dates and dates before that minimum receive a plain-language message instead of a blank result. The method is deterministic in the underlying logic, which also makes it straightforward to check against a known as-of date.",
      "For a reliable comparison, write down the as-of date before entering a birthday and make sure the device date is correct. The calculator describes elapsed calendar time, so it is useful for planning a celebration, checking an application draft, or explaining the difference between a birthday and a total-day count. It intentionally avoids pretending that every month has the same number of days. When a result looks surprising, check the day before and after the birthday, especially around February and the end of a month. The explanation below the result states the assumptions so another person can reproduce the calculation.",
      "A worked example shows every output. Someone born on 15 August 1990, measured on 17 October 2026, is 36 years, 2 months, and 2 days old: 36 full years to 15 August 2026, then 2 months and 2 days more. The same span is 13,212 total days lived, which is 1,887 weeks and 3 days, or 317,088 hours. The next birthday falls on 15 August 2027. Writing the as-of date down first keeps the result reproducible — the same birthday measured a week later legitimately gives a different answer.",
      "Exact age comes up in paperwork more often than birthdays. School admissions, competitive exams, government IDs, insurance underwriting, and retirement eligibility all use thresholds like 18 years completed or 60 years as of a cutoff date. A year-subtraction shortcut can misclassify someone whose birthday falls after the cutoff — being born in December 2006 does not make you 20 in January 2026. When a form asks for age as of a specific date, use the as-of feature instead of today's date.",
      "Hand calculation fails in three predictable ways. First, people divide total days by 365, ignoring that months differ in length. Second, they forget the birthday has not occurred yet this year and add a year too many. Third, February edge cases — especially 29 February birthdays — get guessed instead of ruled. The calculator's month-by-month advance handles all three deterministically, which is also why its results can be checked against any reference implementation.",
      "The as-of date turns the calculator into a time machine for records. Genealogists use it to state an ancestor's age at a historical event; HR teams verify age on the date of joining; applicants check eligibility on an exam's cutoff date. Enter the target date, not today, and the arithmetic is identical — only the endpoint changes. Keep the endpoint written next to the result so anyone reading it later knows which date the age refers to.",
      "Because the calculation uses your device's local date, a wrong device clock gives a wrong age — check the date if a result looks off by a day. Crossing timezones near midnight can also shift today by one date. These are display-level issues, not formula errors: the same inputs on a correct clock reproduce the same result. For legal or official use, confirm the age against the document's own stated method rather than relying on any single calculator.",
      "Total-day and week counts are handy for planning, not just curiosity. Parental leave, probation periods, and notice periods are often counted in days or weeks from a start date; knowing the exact span avoids off-by-one disputes. Milestone birthdays — 10,000 days lived, for instance — make memorable celebrations. The calculator reports the raw counts alongside the calendar age so the same result serves both the form-filler and the curious.",
      "Age thresholds also decide what you can do, not just what you must file. Voting, driving licences, alcohol purchase, senior-citizen benefits, and pension eligibility all switch on at a completed age defined by law, and the definition of completed can vary by jurisdiction — some count the day before the birthday. When a threshold matters, read the exact rule behind it instead of assuming the calculator's calendar age matches the legal one. The page gives you the precise elapsed time; the authority holding the threshold decides how it applies.",
    ],
    guides: [
      { label: "How to Calculate Age in Days", href: "/guides/how-to-calculate-age-in-days/" },
      { label: "Calculate Age in Excel", href: "/guides/calculate-age-in-excel/" },
    ],
    faq: faq([
      { question: "How is exact age calculated?", answer: "The calculator compares your date of birth with today's local calendar date and reports completed years, then remaining months, then remaining days. It advances month by month instead of dividing by 365.25, so months of different lengths and leap years are handled correctly. The result also shows total days lived." },
      { question: "Does it use my device's local date?", answer: "Yes. Date calculations use the local date on your device rather than UTC." },
      { question: "How is a 29 February birthday handled?", answer: "In a non-leap year, the birthday is treated as 1 March." },
      { question: "Can I enter a future date?", answer: "No. A future date shows an inline validation message." },
      { question: "Is my date stored?", answer: "No. The value stays in browser memory and refreshing clears it." },
      { question: "How do I calculate my age from my date of birth?", answer: "Subtract your birth year from the current year, then subtract one more year if your birthday has not happened yet this year. The remaining months and days are counted from your most recent birthday to today. This page does the same arithmetic for you and also shows total days lived and the next birthday." },
      { question: "How do I find how many days old I am?", answer: "Enter your date of birth — the result shows total days lived alongside the calendar age. For example, 15 August 1990 to 17 October 2026 is 13,212 days." },
      { question: "Can I calculate age as of a past or future date?", answer: "Yes. Use the as-of date input instead of today — useful for exam cutoff dates, joining dates, or historical records. The arithmetic is the same; only the endpoint changes." },
      { question: "Why is subtracting birth years not enough?", answer: "Because it ignores whether the birthday has occurred yet this year and treats all months as equal. Someone born in December 2006 is still 19 for most of 2026, not 20. The calculator counts completed years, then remaining months and days." },
      { question: "Does the calculator work for 29 February birthdays?", answer: "Yes. In non-leap years the birthday is treated as 1 March, following the explicit rule stated on the page." },
      { question: "Can I use this as proof of age?", answer: "No. It is informational — official processes use documents and their own rules. Use the result for planning and drafts, and follow the organisation's stated method for anything official." },
    ]),
  },
  "emi-calculator": {
    definition: "An EMI is a fixed monthly payment that repays a loan over a set tenure, with each payment covering that month's interest plus part of the principal.",
    intro: "Estimate an Indian loan's monthly EMI, total interest, and total payment.",
    howTo: ["Enter the loan amount and annual rate.", "Choose years or months and enter the tenure.", "Review the estimate formatted in rupees."],
    content: [
      "An EMI calculator estimates the equal monthly instalment for a reducing-balance loan. Enter the principal, annual interest rate, and tenure, then choose whether the tenure is in years or months. The calculator converts years to months and applies the standard fixed-payment formula. It returns the monthly EMI, the total amount paid across the full term, and the total interest. Values are formatted with Indian grouping so large numbers are easier to read in lakh and crore style.",
      "The calculation uses r = annual rate divided by 12 and then divided by 100, n as the number of monthly payments, and EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1). When the interest rate is zero, the result uses principal divided by n rather than attempting the formula's zero denominator. Total payment uses the unrounded EMI multiplied by the number of months. Total interest is total payment minus principal; rounding happens only for display.",
      "This is an estimate, not a lender quote. A bank or finance company may use daily accrual, a different rounding policy, fees, insurance, taxes, a changing rate, or a different repayment schedule. The calculator does not include processing fees, late charges, prepayments, amortisation tables, or other extras. Compare the result with the lender's disclosure before making a financial decision. The page is designed for Indian readers, uses the rupee symbol, and does not target mortgage terminology.",
      "All checks happen in the browser. The amount must be greater than zero and no more than 1,000,000,000,000. The rate can be from 0 to 100 percent with up to two decimal places, and tenure must be a whole number from one to 600 months. Invalid or incomplete input keeps the result area in its placeholder state. No loan details are stored, and a refresh clears the form. For a US-oriented page with dollar formatting and mortgage language, use the linked Mortgage Calculator.",
      "Try comparing two rates while leaving the amount and tenure unchanged to see how interest changes the total. A longer tenure can lower the monthly payment while increasing the total interest, so a single monthly figure does not describe the full cost. The calculation does not know your income, credit profile, lender policy, or eligibility. Use it to prepare questions and rough scenarios, then check the official schedule and disclosures supplied by the lender. Because the form is local, you can explore scenarios without an account or a saved history.",
      "A concrete example makes the formula tangible. Borrow Rs.10,00,000 at 9 percent annual interest for 5 years, which is 60 months. The monthly rate is 0.0075, and the formula gives an EMI of about Rs.20,758. Over 60 payments you repay roughly Rs.12,45,501 in total, of which about Rs.2,45,501 is interest — nearly a quarter of everything you pay. Change one input and watch the total move: the same loan at a higher rate costs more every month and in total, which is why comparing total interest matters more than comparing the monthly figure alone.",
      "Early payments are mostly interest. In the Rs.10,00,000 example above, the first month's interest alone is Rs.7,500 — the full balance times the monthly rate — leaving only about Rs.13,258 of the Rs.20,758 EMI to reduce the principal. By the final months the balance is small, so almost the entire EMI goes toward principal. This front-loaded pattern is called amortisation, and it is why the outstanding balance falls slowly at first. It also explains why extra payments early in the tenure save far more interest than the same amount paid near the end.",
      "A lump-sum prepayment can cut months off a loan. Take a Rs.50,00,000 home loan at 8.5 percent for 20 years: the EMI is about Rs.43,391 and the total interest over the full term is roughly Rs.54,13,879. Pay an extra Rs.1,00,000 once, after the 12th EMI, and the loan finishes around month 229 instead of month 240 — about 11 months early — while total interest falls to roughly Rs.50,31,614. That single prepayment saves about Rs.3,82,265 in interest. Lenders may charge a prepayment fee or restrict part-payments, so check the loan terms; this calculator shows the arithmetic, not your lender's policy.",
      "Tenure is a trade-off between monthly comfort and total cost. Stretching the same loan over more years shrinks each EMI but adds many more interest-charging months, so the total interest climbs steeply. Shortening the tenure does the reverse: a heavier monthly payment, far less interest overall. When comparing two offers, line up the total interest figures side by side rather than choosing the lower EMI by reflex. A useful habit is to test the shortest tenure whose EMI still leaves room in the monthly budget after essential expenses.",
      "Indian loans come in fixed and floating rate variants. A fixed rate locks the EMI for the tenure, which makes budgeting predictable but usually starts slightly higher. A floating rate moves with the lender's benchmark, so the EMI or the tenure can change when rates move. This calculator assumes the rate you enter stays constant for the whole tenure. If your loan is floating, treat the result as a snapshot at today's rate and re-run it when the rate changes. Ask the lender whether a rate change adjusts your EMI, your tenure, or both.",
      "A common lender guideline is to keep total monthly loan payments within roughly 40 to 50 percent of monthly income, though policies differ. Before signing, list every existing EMI alongside the new one. The mistakes that cost borrowers the most are comparing EMIs instead of total interest, ignoring processing fees and insurance bundled into the loan, choosing the longest tenure by default, and skipping the prepayment clause in the fine print. Run the numbers here first, write down two or three scenarios, and carry them into the conversation with the lender.",
    ],
    guides: [
      { label: "How to Calculate EMI by Hand", href: "/guides/how-to-calculate-emi/" },
      { label: "How to Choose an EMI Calculator", href: "/guides/how-to-choose-emi-calculator/" },
      { label: "EMI Calculator vs Mortgage Calculator: Which One to Use", href: "/guides/emi-vs-mortgage-calculator/" },
    ],
    faq: faq([
      { question: "What does EMI mean?", answer: "EMI means equated monthly instalment: the fixed amount you pay every month until a reducing-balance loan is repaid. Each payment covers that month's interest plus part of the principal, so the interest portion shrinks over time while the EMI itself stays the same for a fixed-rate loan." },
      { question: "What happens at zero interest?", answer: "The calculator divides the principal by the number of months and shows zero interest." },
      { question: "Are fees included?", answer: "No. The result covers principal and interest only." },
      { question: "Can I enter tenure in years?", answer: "Yes. Choose years and the calculator converts the value to months." },
      { question: "Is the result financial advice?", answer: "No. It is an informational estimate and a lender's figure may differ." },
      { question: "How is EMI calculated?", answer: "EMI uses the reducing-balance formula: EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments. Each payment covers that month's interest plus part of the principal." },
      { question: "Does making a prepayment really save interest?", answer: "Yes. Extra payments go straight to the principal, which shrinks every future interest calculation. For example, a one-time Rs.1,00,000 prepayment after 12 months on a Rs.50,00,000 home loan at 8.5% for 20 years saves about Rs.3,82,265 in interest and finishes the loan about 11 months early. Check your lender's prepayment charges first." },
      { question: "Why is my loan balance falling so slowly at first?", answer: "Because of amortisation: each EMI first covers that month's interest on the full outstanding balance, and only the remainder reduces principal. On a Rs.10,00,000 loan at 9%, the first EMI of about Rs.20,758 includes Rs.7,500 of interest and only about Rs.13,258 of principal. The principal portion grows every month as the balance shrinks." },
      { question: "Should I choose a longer tenure for a lower EMI?", answer: "Only if the monthly budget needs it. A longer tenure lowers each EMI but adds many more months of interest, raising the total cost substantially. Compare total interest across tenures on this page, then pick the shortest tenure whose EMI fits comfortably after essential expenses." },
      { question: "What is the difference between fixed and floating interest rates?", answer: "A fixed rate keeps your EMI constant for the tenure. A floating rate moves with the lender's benchmark, so your EMI or tenure can change. This calculator assumes a constant rate — re-run it with the new rate if yours changes, and ask your lender whether adjustments hit the EMI, the tenure, or both." },
      { question: "Do EMIs affect my credit score?", answer: "Yes. Lenders report repayment behaviour to credit bureaus such as CIBIL, so on-time EMIs build history while missed or late payments hurt the score and stay on record. This calculator does not check or affect your score; it only estimates payments." },
    ]),
  },
  "sip-calculator": {
    definition: "A Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly into mutual funds to benefit from compounding and rupee cost averaging.",
    intro: "Calculate expected returns, invested amount, and total maturity value of your mutual fund SIP investments in Indian Rupees.",
    howTo: [
      "Enter your monthly investment amount in ₹.",
      "Enter your expected annual return rate (CAGR %).",
      "Enter your investment duration in years.",
      "Review your invested capital, wealth gain, and estimated maturity value.",
    ],
    content: [
      "A Systematic Investment Plan (SIP) calculator helps individual investors project the future maturity value of regular monthly investments in mutual funds or index funds. Instead of attempting to time the market with lump sums, a disciplined monthly contribution allows you to benefit from compounding and rupee-cost averaging across market cycles.",
      "The calculator applies the standard monthly compounding formula: M = P × [((1 + i)^n − 1) / i] × (1 + i), where P is the periodic monthly deposit, i is the monthly return rate (annual expected return divided by 12 and then divided by 100), and n is the total number of monthly payments (years multiplied by 12). If zero return is specified, the maturity value strictly equals the principal invested.",
      "Mutual fund investments are subject to market risks. Historical returns from equity funds or indices do not guarantee identical future results. This calculation represents a mathematical projection assuming a constant rate of return, whereas actual equity markets experience volatility and sequence-of-returns variance.",
      "All calculations are performed entirely in your browser using client-side JavaScript. No personal details, portfolio amounts, or financial inputs are transmitted across any network or stored on any server. You can freely model aggressive, moderate, or conservative scenarios with complete privacy.",
      "For long-term financial planning, disciplined consistency typically outweighs short-term market timing. Increasing your monthly SIP by a small percentage each year or extending your investment horizon can drastically accelerate total wealth generation due to the exponential nature of compound interest.",
    ],
    guides: [
      { label: "How to Calculate EMI by Hand", href: "/guides/how-to-calculate-emi/" },
      { label: "EMI vs Mortgage Calculator Comparison", href: "/guides/emi-vs-mortgage-calculator/" },
    ],
    faq: faq([
      { question: "What is an SIP?", answer: "An SIP (Systematic Investment Plan) is a convenient vehicle where an investor contributes a fixed sum periodically (usually monthly) into a designated mutual fund scheme rather than investing a lump sum all at once." },
      { question: "What is the formula used in this SIP calculator?", answer: "The calculator uses the compound interest future value annuity formula: Future Value = P × [((1 + i)^n - 1) / i] × (1 + i), where P is the monthly investment amount, i is the periodic monthly return (Annual Rate / 12 / 100), and n is total months." },
      { question: "Are SIP returns guaranteed?", answer: "No. Mutual funds and equity markets do not offer guaranteed returns. Returns fluctuate with market conditions. The percentage entered in the calculator is an expected annual growth estimate for planning purposes." },
      { question: "What is the benefit of rupee-cost averaging in an SIP?", answer: "Rupee-cost averaging ensures that you automatically purchase more mutual fund units when market prices are low and fewer units when prices are high, lowering your average cost per unit over long time horizons without needing to time market peaks and troughs." },
      { question: "Is there any minimum or maximum lock-in period for SIPs?", answer: "Standard open-ended mutual fund SIPs have no lock-in period; you can stop investing or redeem units at any time. However, tax-saving ELSS mutual funds carry a mandatory 3-year lock-in period for each individual instalment." },
    ]),
  },
  "attendance-calculator": {
    definition: "An Attendance Calculator helps students check whether their current lecture attendance meets college criteria (typically 75%) and calculates exactly how many classes they can bunk or need to attend.",
    intro: "Calculate your current attendance percentage, find out safe bunkable classes, or plan how many consecutive lectures to attend to clear attendance shortage.",
    howTo: [
      "Enter the total number of classes held so far.",
      "Enter the number of classes you attended.",
      "Set your minimum required attendance percentage (defaults to 75%).",
      "Instantly see whether you can safely bunk classes or how many you must attend consecutively.",
    ],
    content: [
      "Most Indian universities, engineering colleges, and professional institutions mandate a strict 75% minimum attendance requirement to appear in semester examinations. Falling below this threshold often leads to debarment, penalty assignments, or grade reductions.",
      "This calculator provides two crucial metrics: If your attendance is currently above 75%, it calculates your 'Bunk Buffer'—the maximum consecutive lectures you can miss without dropping below the threshold. If your attendance is below 75%, it solves for the exact number of consecutive upcoming classes you must attend to restore your percentage.",
      "The formula for bunkable lectures: Bunks = floor(Attended / TargetRate − Total). The formula for attendance recovery: Required = ceil((TargetRate × Total − Attended) / (1 − TargetRate)). All math runs in real-time.",
      "Your attendance records and calculations remain completely private. All calculations occur inside your browser without logging in or sending data to third-party tracking services.",
    ],
    guides: [
      { label: "CGPA to Percentage: The CBSE ×9.5 Rule, Explained", href: "/guides/cgpa-to-percentage-cbse-9-5-rule/" },
    ],
    faq: faq([
      { question: "How does the 75% attendance rule work?", answer: "Under university guidelines (such as AICTE, UGC, or VTU), students must attend at least 75 out of every 100 scheduled classes in each course. Failing this may lead to detention from sitting in final semester exams." },
      { question: "How many classes can I bunk if my attendance is 80%?", answer: "It depends on total classes conducted. If 80 out of 100 classes were attended, you can bunk 6 consecutive classes. At that point, 80/106 = 75.47%, keeping you safe." },
      { question: "Can medical certificates compensate for low attendance?", answer: "Most colleges allow a relaxation of 5% to 10% (down to 65%) upon submitting verified medical certificates, subject to the approval of the head of department." },
    ]),
  },
  "ppf-calculator": {
    definition: "A Public Provident Fund (PPF) calculator estimates maturity value and compounded interest earned under India's government-backed 15-year tax-exempt savings scheme.",
    intro: "Plan your long-term wealth creation, annual interest accrual, and tax-free maturity amount under Section 80C with our PPF calculator.",
    howTo: [
      "Enter your planned annual deposit (between ₹500 and ₹1,50,000).",
      "Select your investment tenure (15 years default, extendable in 5-year blocks up to 50 years).",
      "The calculator applies the current government PPF interest rate (7.1% p.a.).",
      "Review your total deposit, accumulated tax-free interest, and maturity balance.",
    ],
    content: [
      "The Public Provident Fund (PPF) is an EEE (Exempt-Exempt-Exempt) sovereign savings vehicle backed by the Government of India. The investment amount qualifies for tax deductions under Section 80C, the interest accrued is completely tax-free, and the maturity proceeds carry zero capital gains tax.",
      "PPF operates on a 15-year lock-in cycle with annual compounding. To maximize interest income, deposits should ideally be credited on or before the 5th of each calendar month, as interest is calculated on the lowest balance between the close of the 5th day and the end of the month.",
      "After the mandatory 15-year completion, an account holder can extend the PPF facility in blocks of 5 years indefinitely, either with continuing contributions or without additional deposits while earning compounded returns.",
      "All projections are processed strictly client-side. No financial figures are stored or transmitted.",
    ],
    guides: [
      { label: "How to Calculate EMI by Hand", href: "/guides/how-to-calculate-emi/" },
    ],
    faq: faq([
      { question: "What is the maximum amount I can deposit in PPF per financial year?", answer: "The maximum limit is ₹1,50,000 per financial year across all PPF accounts held by an individual (including minor accounts). Any excess deposit does not earn interest or qualify for tax benefits." },
      { question: "Is PPF interest completely tax-free?", answer: "Yes. PPF enjoys EEE (Exempt-Exempt-Exempt) tax status under the Indian Income Tax Act. The investment, the accrued interest, and the final maturity amount are all 100% tax-exempt." },
      { question: "Can I extend my PPF account after 15 years?", answer: "Yes, you can extend your PPF account in 5-year blocks indefinitely by submitting Form H within one year of maturity." },
    ]),
  },
  "sgpa-to-cgpa": {
    definition: "An SGPA to CGPA Calculator converts individual semester grade point averages into cumulative CGPA and equivalent percentage according to university academic rules.",
    intro: "Calculate your cumulative grade point average (CGPA) and convert it into marks percentage across all completed college semesters.",
    howTo: [
      "Add your semester SGPA scores (up to 8 semesters).",
      "Optionally enter semester credits if your university uses credit-weighted grading.",
      "View your cumulative CGPA instantly.",
      "Check equivalent percentage under standard (×10) and CBSE/AICTE (×9.5) formulas.",
    ],
    content: [
      "In semester-based university degree programs (engineering, commerce, sciences, arts), individual semester performance is measured in SGPA (Semester Grade Point Average), while overall graduation standing is reported in CGPA (Cumulative Grade Point Average).",
      "When semester credits are equal, CGPA is simply the arithmetic average of all semester SGPAs. However, in credit-based choice systems (CBCS), CGPA is computed as the credit-weighted sum: Σ(SGPA × Credits) / Σ(Credits). This tool seamlessly supports both equal-weighted and credit-weighted formats.",
      "For job applications, campus placements, and government competitive exams, students must frequently convert CGPA into percentage. The calculator displays conversion using the standard multiplier (×10) as well as the standard AICTE/CBSE convention (×9.5).",
      "Entirely private and local calculation. Ideal for quick placement form filling on mobile or desktop.",
    ],
    guides: [
      { label: "CGPA to Percentage: The CBSE ×9.5 Rule, Explained", href: "/guides/cgpa-to-percentage-cbse-9-5-rule/" },
    ],
    faq: faq([
      { question: "What is the difference between SGPA and CGPA?", answer: "SGPA reflects your academic grade point for a single semester, whereas CGPA is the cumulative weighted average of all semesters completed to date." },
      { question: "How do I convert SGPA to Percentage directly?", answer: "First combine your SGPAs into a cumulative CGPA. Then multiply by your university's formula (typically CGPA × 9.5 or CGPA × 10)." },
      { question: "Does this calculator support credit-weighted CBCS systems?", answer: "Yes. You can optionally specify the credit count for each semester to get an exact credit-weighted CGPA matching your official university transcript." },
    ]),
  },
  "remove-background": {
    definition: "An online background remover isolates the foreground subject and makes the background transparent or replaces it with solid colors for e-commerce, IDs, or design work.",
    intro: "Remove image background 100% automatically and free in your browser. Features 1-click sample images, real-time before/after comparison slider, customizable backdrops (transparent, white, black, or custom colors), and instant HD download with zero server uploads.",
    howTo: [
      "Upload or drop an image (or click any of our 1-click sample images).",
      "The tool auto-detects background color and generates a transparent cutout instantly.",
      "Drag the interactive Before / After slider to inspect cutout accuracy.",
      "Select your backdrop (Transparent, Clean White, Jet Black, or Custom Color) and fine-tune edge tolerance if needed.",
      "Click 'Download HD Cutout' to save your high-resolution image instantly.",
    ],
    content: [
      "100% Automatic & Free: Upload an image or select one of the built-in sample images (sneaker, portrait, camera) to test edge detection in real time.",
      "Interactive Before/After Slider: Like professional photo editing tools, drag across the image to inspect precision cutouts around hair, edges, and product contours.",
      "Custom Backdrops: Need a white background for Amazon, eBay, or passport photos? Switch seamlessly between Transparent, Pure White, Solid Black, and custom colors.",
      "100% Client-Side Privacy: Tulyro processes everything locally via HTML5 Canvas API in your browser. Your images are never uploaded to any remote server or third-party cloud.",
    ],
    guides: [
      { label: "Photo and Signature Size Guide for Govt Exams", href: "/guides/photo-and-signature-size-guide-for-govt-exams/" },
    ],
    faq: faq([
      {
        question: "Is this background remover free without watermark?",
        answer: "Yes, 100% free with zero watermarks. Your exported cutout has no logos, branding stamps, or quality restrictions.",
      },
      {
        question: "Can I replace the background with white or custom colors?",
        answer: "Yes. Simply switch the backdrop selector between Transparent, White (ideal for Amazon/e-commerce), Black, or choose any custom hex color.",
      },
      {
        question: "Are my photos uploaded to any external server?",
        answer: "No. All pixel rendering happens client-side in your device's browser memory via Canvas API. No image data ever touches an external server.",
      },
      {
        question: "What image formats are supported?",
        answer: "You can upload PNG, JPG, JPEG, and WEBP images. The output is downloaded as a high-definition PNG.",
      },
    ]),
  },
  "gst-calculator": {
    intro:
      "Calculate GST on any product or service instantly. Switch between GST Inclusive (reverse tax extraction) and GST Exclusive (adding tax) with automatic CGST, SGST, and IGST breakdowns for Indian tax slabs.",
    definition:
      "Goods and Services Tax (GST) in India is a comprehensive, multi-stage, destination-based indirect tax levied on the supply of goods and services with standardized 5%, 12%, 18%, and 28% slabs.",
    howTo: [
      "Enter the base net amount or total invoice value.",
      "Select the applicable GST slab (5%, 12%, 18%, or 28%) or enter a custom rate.",
      "Choose 'GST Exclusive' to add tax, or 'GST Inclusive' to extract pre-tax base cost and tax component.",
      "View the exact CGST, SGST, total tax, and gross invoice value.",
    ],
    content: [
      "GST Exclusive Formula: GST Amount = (Base Amount × GST%) / 100. Total Value = Base Amount + GST Amount.",
      "GST Inclusive Formula: Base Amount = (Total Value × 100) / (100 + GST%). GST Amount = Total Value − Base Amount.",
      "For intrastate sales within the same state, GST is split 50/50 into CGST (Central) and SGST (State). For interstate sales, the full amount is levied as IGST (Integrated).",
    ],
    faq: faq([
      {
        question: "What is the difference between GST inclusive and exclusive?",
        answer:
          "GST Exclusive means the advertised price does not include tax; tax is added on top of the base amount. GST Inclusive means the advertised price already includes tax, and the base price plus tax component must be reverse calculated.",
      },
      {
        question: "How are CGST and SGST divided?",
        answer:
          "On intrastate transactions within India, the total applicable GST rate is divided equally 50-50 between the Central Government (CGST) and State Government (SGST). For example, an 18% GST rate consists of 9% CGST and 9% SGST.",
      },
      {
        question: "What items fall under the 18% GST slab?",
        answer:
          "The 18% slab is standard for most IT services, software, capital goods, restaurants, and various industrial supplies in India.",
      },
    ]),
    sources: [
      { label: "CBIC GST Portal", href: "https://cbic-gst.gov.in/" },
      { label: "GST Council India", href: "https://gstcouncil.gov.in/" },
    ],
    guides: [
      { label: "How to Create a GST-Compliant Invoice in India", href: "/guides/how-to-create-gst-compliant-invoice-india/" },
    ],
  },
  "swp-calculator": {
    definition: "An SWP (Systematic Withdrawal Plan) Calculator calculates scheduled periodic withdrawals from a mutual fund corpus while the remaining balance continues earning compounded market returns.",
    intro: "Calculate monthly income, total withdrawals, and residual corpus from your mutual fund systematic withdrawal plan.",
    howTo: [
      "Enter your initial total investment corpus in ₹.",
      "Specify your intended monthly withdrawal payout amount.",
      "Input expected annual return rate (%) of your mutual fund scheme.",
      "Select planned withdrawal duration in years.",
    ],
    content: [
      "A Systematic Withdrawal Plan (SWP) allows mutual fund investors to redeem a fixed sum on a monthly or quarterly basis while leaving the remaining balance invested to generate compounding returns. It is one of the most tax-efficient post-retirement cash flow solutions available in India.",
      "Unlike traditional bank fixed deposit interest which is fully taxable at slab rates upon receipt, equity SWP withdrawals only attract capital gains tax on the proportional gain portion of each redeemed unit, saving substantial tax for retirees.",
      "If your monthly withdrawal rate is kept below or equal to the portfolio's annualized growth rate, your core capital remains intact or even grows over time, creating a perpetual monthly pension.",
      "This calculator runs the complete compound interest and monthly redemption amortization in your browser with zero latency.",
    ],
    guides: [
      { label: "SWP vs Fixed Deposit: Which is Better for Regular Monthly Income?", href: "/guides/swp-vs-fd-for-retirement-income/" },
      { label: "SIP vs Lumpsum Investment Comparison", href: "/guides/sip-vs-lumpsum/" },
    ],
    faq: faq([
      { question: "What is SWP in mutual funds?", answer: "SWP stands for Systematic Withdrawal Plan. It lets you withdraw a predetermined fixed sum from your mutual fund at regular intervals while the remaining money stays invested." },
      { question: "Is SWP better than Fixed Deposit for monthly income?", answer: "Yes, for many investors SWP offers superior tax efficiency compared to FD interest because only the capital gains component of the withdrawn units is taxed rather than the entire payout." },
      { question: "What happens if my withdrawal exceeds fund growth?", answer: "If your monthly withdrawal exceeds your monthly gains, your principal capital will gradually decrease until the corpus is eventually depleted." },
    ]),
  },
  "lumpsum-calculator": {
    definition: "A Lumpsum Calculator computes the maturity value and total compound wealth created from a one-time lump sum mutual fund or stock investment over time.",
    intro: "Determine future returns and wealth creation on a one-time mutual fund investment.",
    howTo: [
      "Enter your one-time lumpsum investment amount.",
      "Enter expected annual rate of return (%).",
      "Choose investment time period in years.",
      "Review total maturity value and wealth gained.",
    ],
    content: [
      "Investing a single lump sum in equity mutual funds, index funds, or sovereign gold bonds allows your money to harness compounding across the entire principal from day one.",
      "While SIP (Systematic Investment Plan) averages out volatility across market ups and downs, lumpsum investing mathematically outperforms SIP during prolonged bull markets because 100% of the funds compound over the full duration.",
      "The compound interest formula A = P(1 + r)^t powers this tool. For long horizons (10-20 years), even modest initial investments multiply several times over.",
      "Fast, private calculation with zero tracking.",
    ],
    guides: [
      { label: "SIP vs Lumpsum: Which Delivers Higher Returns?", href: "/guides/sip-vs-lumpsum/" },
    ],
    faq: faq([
      { question: "What is a lumpsum investment?", answer: "A lumpsum investment is a single, one-time investment in a mutual fund or financial asset, rather than periodic contributions like an SIP." },
      { question: "When should I invest lumpsum instead of SIP?", answer: "Lumpsum investing is favorable after significant market corrections or when you have bonus/surplus funds with a long investment horizon (5-10+ years)." },
      { question: "How are lumpsum mutual fund returns taxed in India?", answer: "Equity mutual funds held for more than 12 months are subject to Long Term Capital Gains (LTCG) tax of 12.5% on gains exceeding ₹1.25 lakh per financial year." },
    ]),
  },
  "cagr-calculator": {
    definition: "A CAGR (Compound Annual Growth Rate) Calculator determines the constant geometric annual rate of return required for an investment to grow from its initial value to its final value over multiple years.",
    intro: "Calculate the exact Compound Annual Growth Rate and absolute return of any investment.",
    howTo: [
      "Enter initial investment value (beginning balance).",
      "Enter final value (ending balance).",
      "Enter the duration in years.",
      "View annualized CAGR %, total growth %, and absolute gains.",
    ],
    content: [
      "Simple average returns can be highly misleading when evaluating mutual funds, stocks, real estate, or business revenues because market returns fluctuate wildly each year. A fund that gains 50% in Year 1 and drops 50% in Year 2 actually loses 25% of its value, yet has an arithmetic average of 0%.",
      "CAGR solves this by calculating the constant annual smoothed growth rate using the geometric formula: CAGR = (End Value / Start Value)^(1 / Years) - 1. It is the global gold standard metric for benchmarking multi-year portfolio performance.",
      "Use this calculator to verify fund manager claims, compare real estate returns against the Nifty 50 index, or analyze multi-year revenue growth.",
    ],
    guides: [
      { label: "CAGR vs XIRR: Differences, Formulas, and When to Use Which", href: "/guides/cagr-vs-xirr-in-mutual-funds/" },
      { label: "SIP vs Lumpsum Returns Explained", href: "/guides/sip-vs-lumpsum/" },
    ],
    faq: faq([
      { question: "What is CAGR?", answer: "CAGR stands for Compound Annual Growth Rate. It represents the mean annual growth rate of an investment over a specified period longer than one year." },
      { question: "Why is CAGR better than absolute return?", answer: "Absolute return ignores the time value of money. Earning 50% in 1 year is extraordinary, while earning 50% over 15 years is below inflation. CAGR normalizes returns to an annual basis." },
      { question: "What is a good CAGR for investments in India?", answer: "Historically, broad market indices like the Nifty 50 have delivered roughly 11% to 14% long-term CAGR in India." },
    ]),
  },
  "percentage-calculator": {
    definition: "A Percentage Calculator solves everyday percentage problems including finding X% of a number, percentage increase or decrease, and calculating what percent one number is of another.",
    intro: "Fast, accurate multi-mode percentage calculator with instant step-by-step breakdown.",
    howTo: [
      "Choose calculation mode: % of Value, What % is X of Y, or % Increase/Decrease.",
      "Enter your numbers.",
      "Get instant calculated results with step formula.",
    ],
    content: [
      "Calculating percentages is an indispensable everyday task in business markups, retail discounts, sales tax/GST verification, academic exams, and profit margin analysis.",
      "This utility provides 3 distinct calculation modes in one screen: direct percentage calculation (e.g. 18% GST on ₹4,500), proportion analysis (e.g. scored 485 out of 600 in exam), and percentage change (e.g. stock price moved from ₹120 to ₹155).",
      "Calculations update on every keystroke with complete mathematical accuracy and privacy.",
    ],
    guides: [
      { label: "CGPA to Percentage Conversion Rule", href: "/guides/cgpa-to-percentage-cbse-9-5-rule/" },
    ],
    faq: faq([
      { question: "How do I calculate percentage increase?", answer: "Subtract the original value from the new value, divide the difference by the original value, and multiply by 100." },
      { question: "How do I find 18% GST on an amount?", answer: "Multiply the base amount by 0.18. For example, 18% of ₹1,000 is 1,000 × 0.18 = ₹180." },
      { question: "How do I calculate my exam percentage?", answer: "Divide your obtained total marks by the maximum possible marks, then multiply the result by 100." },
    ]),
  },
  "image-resizer": {
    definition: "An Image Resizer in KB is a browser-based utility that compresses and resizes photos and signatures to match exact file size thresholds (20KB, 50KB, 100KB) required by online application portals.",
    intro: "Resize and compress images to specific KB limits online. 100% private, free, and no watermark.",
    howTo: [
      "Upload your photo or signature (JPG, PNG, WEBP).",
      "Select your target max file size preset (20KB, 50KB, 100KB, 200KB) or specify custom dimensions.",
      "Adjust the quality slider to match required file limits.",
      "Download your perfectly resized image ready for submission.",
    ],
    content: [
      "Every candidate filling government recruitment forms in India (SSC CGL, CHSL, UPSC Civil Services, IBPS Bank PO, State PSC, NEET, JEE) faces strict photo upload restrictions: typically passport photo must be between 20KB to 50KB, and signature between 10KB to 20KB.",
      "Most commercial online compressors either blur images beyond recognition, add watermarks, or upload your sensitive personal ID photographs to third-party overseas servers.",
      "Tulyro Image Resizer processes your image entirely inside your browser's local memory using HTML5 Canvas with bilinear downsampling. Your photos never leave your device, ensuring total privacy for sensitive ID documents.",
      "Instantly export JPEG or WEBP files with exact byte size verification before downloading.",
    ],
    guides: [
      { label: "How Browser Image Processing Protects Privacy", href: "/about/" },
    ],
    faq: faq([
      { question: "How can I reduce image size to 20KB or 50KB?", answer: "Upload your image, choose the 20KB or 50KB preset, and our client-side canvas engine automatically scales dimensions and adjusts compression quality to fit under the limit." },
      { question: "Is it safe to upload personal ID photos?", answer: "Yes. Processing is 100% client-side inside your browser. No files are uploaded to any server or cloud database." },
      { question: "Will my resized image have watermarks?", answer: "No. All downloads are clean, unbranded, and high resolution." },
    ]),
  },
  "mortgage-calculator": {
    definition: "A mortgage payment is the fixed monthly amount of principal and interest that repays a home loan in full over its term.",
    intro: "Estimate a US mortgage payment, total interest, and total payment in dollars.",
    howTo: ["Enter the loan amount and annual interest rate.", "Enter the loan term in years or months.", "Review the dollar estimate and interest total."],
    content: [
      "A mortgage calculator gives a quick estimate of the principal-and-interest payment for a fixed-rate home loan. Enter the loan amount, annual interest rate, and loan term. The default term unit is years because US mortgage examples are commonly described as 15-year or 30-year loans, but months are available for a precise term. The output includes the estimated monthly payment, total payment over the term, and total interest paid.",
      "The same standard reducing-balance formula powers the linked EMI page and this mortgage page. The annual percentage is converted to a monthly decimal rate. The number of monthly payments is the term in months. For a positive rate, the formula calculates a level payment; for zero interest, it simply divides principal by the number of payments. Total payment is based on the unrounded monthly result, then values are rounded to two decimal places only when displayed.",
      "The estimate does not include property tax, homeowners insurance, private mortgage insurance, closing costs, points, escrow, down payment, or adjustable-rate changes. A lender's disclosure can differ because of its compounding, rounding, payment date, and fees. Treat this page as a planning aid rather than financial advice. Use the amount and rate from a real loan quote when comparing scenarios, and confirm the full cost with the lender before applying.",
      "Input validation keeps the page useful when a value is missing or outside a practical limit. Amount must be positive and no more than 1,000,000,000,000. Rate is limited to 0 through 100 percent and accepts up to two decimals. Tenure must be a whole number from one through 600 months. The page formats amounts with en-US grouping and the dollar sign. No loan data leaves the browser, and refresh clears the form.",
      "Use the calculator for a first-pass comparison between a shorter and longer term, or between two interest-rate assumptions. The monthly principal-and-interest number is only one part of home affordability. Include the other costs supplied by your lender and consider whether the payment remains comfortable if circumstances change. A saved screenshot or printed result should be labelled as an estimate because it does not become an offer or a rate lock. The browser-only design lets you test scenarios privately before discussing them with a lender or housing professional.",
      "You can repeat a scenario with a different term to understand the trade-off between cash flow and total cost. Keep the currency and grouping in mind when comparing this page with a lender's statement, and do not mix a monthly rate with an annual rate. The input labels describe the assumptions used by the formula so a second calculation can be checked consistently.",
    ],
    sources: [{ label: "US Consumer Financial Protection Bureau — How does paying down a mortgage work?", href: "https://consumerfinance.gov:443/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/" }],
    guides: [
      { label: "How Mortgage Amortization Works: Principal vs. Interest Explained", href: "/guides/how-mortgage-amortization-works/" },
      { label: "EMI Calculator vs Mortgage Calculator: Which One to Use", href: "/guides/emi-vs-mortgage-calculator/" },
    ],
    faq: faq([
      { question: "Does this include property taxes?", answer: "No. It estimates principal and interest only." },
      { question: "Why is the payment an estimate?", answer: "The payment is an estimate because it covers principal and interest only, using the amount, rate and term you entered. A lender's figure can differ through property tax, insurance, mortgage insurance, fees, closing costs, rounding, payment dates or an adjustable rate. Always confirm the full monthly cost with the lender before applying." },
      { question: "Can I use a 30-year term?", answer: "Yes. Enter 30 with years selected, which converts to 360 months." },
      { question: "Does this page use EMI terminology?", answer: "No. It is the US mortgage page with dollar formatting and mortgage language." },
      { question: "Is my information saved?", answer: "No. Inputs remain in browser memory and clear on refresh." },
      { question: "How is a monthly mortgage payment calculated?", answer: "A fixed-rate mortgage payment uses the same reducing-balance formula as an EMI: monthly payment = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments. This page estimates principal and interest only — property tax, insurance, and fees are not included." },
    ]),
  },
  "bmi-calculator": {
    definition: "Body mass index (BMI) is a screening number calculated as weight in kilograms divided by height in metres squared.",
    intro: "Calculate adult BMI with WHO or Indian/Asian ICMR cutoffs, from metric or imperial height and weight.",
    howTo: ["Choose Metric or Imperial units.", "Choose the WHO global or Indian/Asian ICMR scale.", "Enter height and weight.", "Read the BMI value and screening category."],
    content: [
      "Body mass index, or BMI, is a screening measure based on height and weight. This calculator supports metric centimetres and kilograms as well as imperial feet, inches, and pounds. It converts imperial values using exact unit factors, calculates weight in kilograms divided by height in metres squared, and displays the result to one decimal place. The category is based on that displayed value so boundary results are easy to understand.",
      "For adults, the screening ranges used here are under 18.5 for Underweight, 18.5 through 24.9 for Normal, 25.0 through 29.9 for Overweight, and 30.0 or above for Obese. These cutoffs match the WHO's adult definitions: overweight is a BMI of 25 or more, and obesity is a BMI of 30 or more. These categories are commonly used adult ranges, but BMI cannot distinguish muscle, bone, fat distribution, age, pregnancy, or many health conditions. It is not a diagnosis. Children and teenagers need age- and sex-specific charts, so this page is intended for adults aged 18 and over.",
      "Switching between Metric and Imperial clears the input fields so a value from one unit system is never silently interpreted as another. Height is checked against a practical range of 50 to 250 centimetres after conversion, and weight is checked from 10 to 500 kilograms. Empty fields show a placeholder instead of an error. Values outside the range receive an inline message that explains which field needs attention.",
      "Use the result as a prompt for a broader conversation with a qualified health professional, especially if you have a medical condition or a rapid change in weight. The calculator makes no diagnosis and stores nothing. It performs the conversion locally in your browser and does not send height or weight to a server. A clear, labelled form and keyboard-friendly unit control make it usable on mobile screens as well as desktop displays.",
      "For consistent results, measure height without shoes and use the same unit system for the entire entry. Rounding is applied to the displayed BMI before the category is selected, which makes the boundary behavior visible. A value of 24.95, for example, is displayed to one decimal place and classified from that displayed number. This is a deliberate presentation rule, not a claim about clinical precision. If you need a health assessment, share the underlying measurements and your context with a qualified professional rather than relying on a single screening number.",
      "BMI can be useful for a population-level screening conversation, but a single number does not describe fitness, nutrition, or health on its own. Record the units beside any value you share, because a pound and a kilogram are not interchangeable. The page keeps the conversion factors visible in its implementation and gives an error rather than producing a misleading result for an impossible height or weight.",
      "Two quick examples show the arithmetic. A person weighing 70 kg at 1.75 m has a BMI of 70 divided by (1.75 times 1.75), which is 22.9 — inside the normal range. A person weighing 85 kg at 1.70 m has a BMI of 85 divided by (1.70 times 1.70), which is 29.4 — in the overweight range, near the obesity cutoff. Small changes move the number more than people expect: at 1.70 m, each kilogram of weight shifts BMI by about 0.35. Try the calculator with your own numbers rather than trusting a remembered figure.",
      "BMI's biggest blind spot is composition. A strength athlete with heavy muscle can score above 25 while carrying little body fat; an older adult can score normal while having lost significant muscle. The formula also ignores where fat sits — abdominal fat is more closely linked to health risk than fat elsewhere — and it says nothing about fitness, diet quality, sleep, or blood markers. Two people with the same BMI of 27 can have very different health profiles. Treat the number as one input among many, not a verdict.",
      "Cutoffs are debated for Asian populations. The WHO has noted that health risks in Asian populations tend to rise at lower BMI values than in European populations, and some countries publish lower action thresholds. The Indian/Asian ICMR cutoffs used by many Indian clinicians set overweight at 23.0 and obesity at 25.0. This page lets you switch between the WHO global standard and the Indian/Asian ICMR scale above the calculator, so you can see both readings. If you are of Asian descent, mention it when discussing the result with a health professional rather than reinterpreting the category yourself.",
      "Two cheap companions make BMI more informative. Waist circumference reflects the abdominal fat that BMI misses; a tape measure around the waist at navel level takes seconds. Body-fat percentage, estimated by calipers, bioimpedance scales, or a DEXA scan, separates fat from lean mass directly. None of these replaces clinical judgement either. The practical move is to track the same measurements the same way over time — trends beat single readings.",
      "A result outside the normal range is a prompt, not a prescription. General, low-risk steps include re-measuring in a week to rule out error, reviewing sleep, activity, and eating patterns honestly, and booking a check-up if the number stays high or weight changed quickly. Avoid crash diets and unregulated supplements; rapid weight loss can cost muscle and rebound. This page gives general information only and is not medical advice — a qualified professional who knows your history should interpret the number.",
      "For children and teenagers, adult cutoffs do not apply because healthy BMI changes with growth. Paediatricians use BMI-for-age percentiles plotted on sex-specific growth charts: a percentile, not the raw number, decides the category. Online adult calculators will misclassify a growing child, so do not use this page for anyone under 18. If you are checking a child's growth, ask the paediatrician which chart they use and bring the raw height and weight, not just a BMI value.",
    ],
    faq: faq([
      { question: "What is BMI?", answer: "BMI, or body mass index, is a screening number calculated from weight and height: weight in kilograms divided by height in metres squared. It gives a rough weight category for adults — underweight, normal, overweight or obese — but it cannot distinguish muscle from fat, so it is not a diagnosis." },
      { question: "Can I use feet and pounds?", answer: "Yes. Choose Imperial and enter feet, inches, and pounds." },
      { question: "Is BMI a diagnosis?", answer: "No. BMI is a screening measure for adults, not a diagnosis." },
      { question: "Why did switching units clear my values?", answer: "Clearing prevents values from being misread under a different unit system." },
      { question: "Are children covered?", answer: "No. This calculator is intended for adults aged 18 and over." },
      { question: "Is BMI accurate?", answer: "BMI is a useful screening number, but it is not a precise measure of health on its own. It cannot tell muscle from fat, so a muscular person can score as overweight, and it says nothing about where fat is carried. Treat the result as a starting point for a conversation with a health professional, not a diagnosis." },
      { question: "How does a BMI calculator work?", answer: "It divides your weight in kilograms by your height in metres squared. For example, 70 kg at 1.75 m gives 70 ÷ (1.75 × 1.75) = 22.9. If you enter imperial units, it first converts pounds to kilograms and feet and inches to metres using exact conversion factors, then applies the same formula." },
      { question: "Is BMI different for Indians or Asians?", answer: "The WHO notes that health risks in Asian populations can rise at lower BMI values, and some countries use lower thresholds. The Indian/Asian ICMR cutoffs — overweight at 23.0, obese at 25.0 — are offered on this page alongside the WHO standard; switch scales above the calculator to compare. Mention your background to your doctor when discussing the result." },
      { question: "Is BMI different for men and women?", answer: "No. The formula and the cutoffs are the same for adult men and women aged 20 and over. Average body composition differs between men and women, but that does not change the BMI bands — it is one more reason the number is a screening flag, not a diagnosis." },
      { question: "Can a muscular person have an overweight BMI?", answer: "Yes. BMI cannot tell muscle from fat, so strength athletes often score above 25 while lean. If you train heavily, pair BMI with a waist measurement or body-fat estimate instead of reading the category alone." },
      { question: "What is more accurate than BMI?", answer: "Body-fat percentage (calipers, bioimpedance scales, DEXA scans) separates fat from lean mass, and waist circumference captures the abdominal fat that BMI misses. Each has error margins too — tracking trends in the same measurements over time is more useful than any single reading." },
      { question: "How often should I check my BMI?", answer: "Monthly is plenty for most adults; weight fluctuates daily with water, food, and timing. Measure under consistent conditions — same time of day, similar clothing — and watch the trend rather than reacting to one reading." },
      { question: "Does BMI work for children?", answer: "No. Children need BMI-for-age percentiles on sex-specific growth charts, because healthy BMI shifts as they grow. This calculator is for adults aged 18 and over only." },
    ]),
    sources: [{ label: "WHO — Obesity and overweight (adult BMI ≥ 25 overweight, ≥ 30 obesity)", href: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" }],
    guides: [
      { label: "Is BMI Accurate? What the Number Can't Tell You", href: "/guides/is-bmi-accurate/" },
      { label: "How to Calculate BMI by Hand: Formula, Examples, Metric and Imperial", href: "/guides/how-to-calculate-bmi/" },
    ],
  },
  "cgpa-to-percentage": {
    definition: "CGPA to percentage conversion estimates a percentage from a 10-point Cumulative Grade Point Average, commonly by multiplying the CGPA by 9.5 under the CBSE convention.",
    intro: "Convert a 10-point CGPA to an estimated percentage — CBSE ×9.5, UGC ×10, VTU, GTU/BPUT, and Mumbai University formulas.",
    howTo: ["Choose your university's conversion formula.", "Enter a CGPA from 0 to 10.", "Use the displayed percentage as an estimate."],
    content: [
      "This CGPA to percentage calculator applies the commonly published CBSE convention of multiplying a 10-point CGPA by 9.5. Enter a value from 0 to 10 and the page displays the percentage to two decimal places. For example, 8.00 becomes 76.00 percent and 7.50 becomes 71.25 percent. The multiplier is shown next to the result so the method is transparent rather than hidden behind a single answer. Use the formula selector above the input to switch between the CBSE ×9.5 rule, the UGC ×10 scale, and the VTU, GTU/BPUT, and Mumbai University formulas — each is labelled with its rule, and the result always states which formula was used.",
      "Institutions do not all convert grades in the same way. Some universities publish their own formula, transcript rule, or conversion table. The 9.5 multiplier is therefore an estimated convention for this page, not a universal academic law. Check your school, university, employer, or application instructions before submitting the result. The page does not provide a US GPA mode; that mode is intentionally blocked until its formula and source are decided.",
      "The input accepts numeric values with up to two decimal places. Negative values, values above 10, non-numeric text, and malformed input show a plain-language error. An empty field keeps the result area in its placeholder state. The calculation is a pure multiplication, so it is immediate and deterministic. No mark, name, or academic information is stored, and the entered value remains only in the current browser page.",
      "A percentage estimate can help with a quick comparison, but it does not change the official grade on a transcript. If an application asks for both CGPA and percentage, provide the original CGPA as well as the conversion rule used. This tool is informational and does not replace an institution's official document. Use the linked tools for other everyday calculations, but keep each result tied to the assumptions stated on its page.",
      "Keep the original transcript or marksheet with any converted value. Admissions offices may ask for the scale, the issuing institution, and the exact convention rather than accepting an informal calculation. The result is deliberately labelled as an estimate because the source and status of the multiplier still need confirmation in the project specification. Entering 8, 8.0, and 8.00 represents the same numeric CGPA, while text that is not a number is rejected. A clear formula makes it easier to explain the result when a reviewer uses a different institutional rule.",
      "The page intentionally keeps the calculation small and visible: there are no hidden grade bands, subject weights, or extra adjustments. If your institution supplies a different multiplier, use that official source and do not assume this result is interchangeable. The displayed two decimal places describe the conversion output, not additional precision in the underlying academic record.",
    ],
    faq: faq([
      { question: "What formula is used?", answer: "Percentage equals CGPA multiplied by 9.5, the commonly published CBSE convention for a 10-point scale. For example, a CGPA of 8.0 becomes 76.00 percent. The result is an estimate, because institutions may publish their own conversion rule — always confirm the rule your institution requires." },
      { question: "Is the 9.5 multiplier universal?", answer: "No. Institutions differ, so confirm the rule required by your institution." },
      { question: "What range is accepted?", answer: "The calculator accepts a CGPA from 0 through 10." },
      { question: "Does it include GPA conversion?", answer: "No. US GPA mode is not shipped until its formula and source are decided." },
      { question: "How many decimals are shown?", answer: "The percentage is displayed to two decimal places." },
      { question: "Is multiplying by 9.5 always correct?", answer: "No. Multiplying by 9.5 is the commonly published CBSE convention for a 10-point CGPA, and this page labels its result an estimate for that reason. Other institutions publish their own conversion rules or tables. Always check the rule your university, employer, or application requires before submitting a converted percentage." },
      { question: "Why does a 10 CGPA give 95% and not 100%?", answer: "Because the CBSE ×9.5 convention maps the top of the 10-point scale to 95%. A student scoring 99% also gets a CGPA of 10, so the formula can never produce 96–100%. The CGPA is the fact; the percentage is an interpretation of it." },
      { question: "How do I convert a VTU CGPA to a percentage?", answer: "VTU uses (CGPA − 0.75) × 10 under its CBCS scheme, so 8.0 CGPA is 72.5%. AKTU and JNTU use the same formula. Always check your transcript or university circular — if it already prints a percentage, use that." },
    ]),
    guides: [
      { label: "CGPA to Percentage: The CBSE ×9.5 Rule, Explained", href: "/guides/cgpa-to-percentage-cbse-9-5-rule/" },
      { label: "How Many Words Fit on a Page? — Single vs Double-Spaced Counts", href: "/guides/how-many-words-per-page/" },
    ],
  },
  "word-counter": {
    definition: "A word counter measures a piece of text by counting its words, characters, sentences, and estimated reading time.",
    intro: "See live word, character, sentence, and reading-time counts as you type.",
    howTo: ["Type or paste text into the editor.", "Review the live statistics.", "Use Clear to reset all counts."],
    content: [
      "A word counter helps writers check the size and shape of a draft without sending it to a server. Paste or type text into the editor and the page updates words, characters with spaces, characters without spaces, approximate sentences, and reading time. Words are whitespace-separated tokens, so leading, trailing, repeated spaces, tabs, and newlines do not create extra words. Empty text keeps every count at zero and shows a helpful placeholder.",
      "Characters are counted as user-perceived characters when the browser provides Intl.Segmenter, with a code-point fallback. That means an emoji is treated as one visible character rather than several UTF-16 units. The without-spaces count removes all whitespace, including line breaks and tabs. Sentence counting is approximate: a sentence ends at a period, exclamation mark, or question mark followed by whitespace or the end of the text, while a decimal point inside a number such as 3.14 is ignored.",
      "Reading time uses an assumption of 200 words per minute. Under one minute the result is shown in seconds; longer estimates show minutes and remaining seconds. Two hundred words therefore reads as 1 min, while 250 words reads as 1 min 15 sec. This is a planning estimate, not a prediction of every reader's pace. Reading aloud, technical writing, and a second language can change the real time.",
      "The editor is designed for long pastes and avoids unnecessary work when a value changes. A 100,000-character input is a performance target for a mid-range phone. Clear resets the text and every statistic without a reload. The page has no account, autosave, cookies, or analytics event containing typed content. Use the output for essays, applications, social posts, scripts, or any draft where a quick count is useful.",
      "Different editors can count words differently because they make different choices about punctuation, hyphenated terms, symbols, and scripts. This page documents its whitespace rule so you can use the same method consistently across drafts. Sentence counts are intentionally approximate and should not be treated as a grammar analysis. If an application specifies a counting method, follow that instruction instead of assuming every counter agrees. For ordinary writing checks, the live statistics make it easy to shorten a draft, compare versions, or estimate how long a reader may need.",
      "The clear action is intentionally separate from the editor so it is easy to reset after copying a draft. Counts update as text changes and are not submitted with a form. If you are comparing revisions, keep both drafts in your own editor and use this page as a temporary measuring surface rather than an archive.",
    ],
    faq: faq([
      { question: "How are words counted?", answer: "Words are whitespace-separated tokens: any run of spaces, tabs or line breaks counts as a single separator, so repeated whitespace never creates extra words. Punctuation attached to a word stays part of that word, and an empty editor counts as zero words. Other editors may count hyphenated terms differently." },
      { question: "Does an emoji count as one character?", answer: "The counter uses grapheme clusters where available, so an emoji counts as one user-perceived character." },
      { question: "Is sentence counting exact?", answer: "No. Sentence count is an approximate punctuation-based count." },
      { question: "What reading speed is used?", answer: "The estimate assumes 200 words per minute." },
      { question: "Can I clear the draft?", answer: "Yes. Clear removes the current text and resets all counts." },
      { question: "How many words are in one page?", answer: "As a rough guide, one typed page holds about 500 words single-spaced or about 250 words double-spaced, using a 12-point font and 1-inch margins. Font, margins, headings, and paragraph breaks all move the real number. When a limit matters, trust the word count rather than the page count." },
    ]),
    guides: [{ label: "How Many Words Fit on a Page? — Single vs Double-Spaced Counts", href: "/guides/how-many-words-per-page/" }],
  },
  "text-to-speech": {
    definition: "Text to speech converts written text into spoken audio using voices provided by the reader's own browser.",
    intro: "Listen to text with speech voices provided by your browser, with no audio download.",
    howTo: ["Enter up to 10,000 characters.", "Choose a voice and speed.", "Play, pause, resume, or stop speech."],
    content: [
      "This text-to-speech tool uses the browser's built-in speechSynthesis API. Enter text, select a voice when the browser finishes loading its voice list, choose a speed from 0.5× to 2×, and use Play. Pause and Resume control the current utterance, while Stop cancels playback and resets the sequence. The tool does not create an audio file and does not provide an audio download in v1.",
      "Voices load asynchronously, so the page shows Loading voices until the voiceschanged event is delivered. Some voices are local to the device; others are marked online by the browser. Online voices may send text to the browser vendor's servers. That behavior belongs to the browser and its selected voice service, not to this site, so avoid entering private or sensitive text when you are unsure how a voice is provided.",
      "Long passages are split into chunks of no more than 200 characters, preferably at sentence boundaries and then at spaces. The tool speaks each chunk in order to reduce the chance that a browser cuts off a long utterance. The text area limits input to 10,000 characters and shows a counter. Empty text disables Play and gives a hint rather than attempting an empty utterance.",
      "Support varies between browsers and devices. If speechSynthesis is missing or no voices are available after loading, the page explains that the browser does not support text to speech and suggests Chrome, Edge, or Safari. The tool state is held in React memory only. Using it causes no request from our code, and refreshing clears the text, voice choice, and playback state.",
      "Speech controls are deliberately explicit so audio never starts unexpectedly. A paused utterance can resume, while Stop cancels the queue and returns control to the visitor. If a browser changes its voice list after the page loads, the selector updates with the newly available choices. The best voice depends on the device language settings, installed voices, and browser implementation. For accessibility or proofreading, listen to a short sample first and adjust the speed before starting a long passage. The visible character limit keeps the interaction manageable on mobile devices.",
      "If a long sentence sounds unnatural, add punctuation or split it into shorter sentences before playing it again. Chunking protects against browser cut-offs but does not rewrite the words or correct pronunciation. Playback is tied to the current page, so closing or refreshing the tab ends the session and removes the text from this tool's React state.",
    ],
    sources: [{ label: "MDN — SpeechSynthesis (Web Speech API)", href: "https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" }],
    faq: faq([
      { question: "Where does speech run?", answer: "Speech runs through your browser's built-in speechSynthesis API, using voices installed on your device or supplied by your browser. Our code sends no audio anywhere, but some browser voices are provided online and may send text to the browser vendor's servers — avoid sensitive text when you are unsure how a voice is provided." },
      { question: "Can I download the audio?", answer: "No. Audio download is outside the v1 scope." },
      { question: "Why does it say Loading voices?", answer: "Browsers provide voices asynchronously through the voiceschanged event." },
      { question: "Are online voices private?", answer: "Some browser voices may send text to the browser vendor's servers." },
      { question: "What is the text limit?", answer: "The text area accepts up to 10,000 characters." },
      { question: "How do I make my computer read text aloud?", answer: "Paste your text into the box on this page, pick a voice and speed, then press Play. Your browser's built-in voices read the text aloud — nothing needs installing and no audio file is created. If no voices appear, the page explains that your browser does not support text to speech." },
    ]),
    guides: [
      { label: "How Browser Text-to-Speech Works (Web Speech API Guide & Pacing)", href: "/guides/how-browser-text-to-speech-web-speech-api-works/" },
      { label: "How Many Words Fit on a Page? — Single vs Double-Spaced Counts", href: "/guides/how-many-words-per-page/" },
    ],
  },
  "fancy-text-generator": {
    definition: "A fancy text generator replaces ordinary Latin letters with visually styled Unicode characters that can be copied and pasted.",
    intro: "Generate copyable Unicode styles while keeping punctuation, accents, and emoji intact.",
    howTo: ["Enter text in the input.", "Choose a style row to review the output.", "Copy the style you want to use."],
    content: [
      "A fancy text generator maps ordinary Latin letters to characters from Unicode's Mathematical Alphanumeric Symbols and related blocks. Enter a phrase and the page shows several styles, including Bold, Italic, Script, Fraktur, Double-struck, Monospace, Circled, and Small Caps. Each row has its own Copy button. Characters without a mapping, such as punctuation, most accents, digits, and emoji, pass through unchanged so the result remains readable.",
      "Unicode styles are text characters, not a font file. A social app, game, browser, or screen reader may display them differently or substitute a missing glyph. Styled text can also be read poorly by screen readers because a bold mathematical letter is not always announced as the ordinary letter a reader expects. Use these outputs for casual decoration, profiles, and headings, not for essential instructions, accessible labels, or anything where exact pronunciation matters.",
      "The mapping iterates over Unicode code points rather than UTF-16 code units, so a surrogate pair such as an emoji is never split. Known gaps in the mathematical blocks are handled explicitly: italic h uses U+210E, Script B uses U+212C, and Double-struck R uses U+211D. The result is produced locally and the clipboard receives exactly the styled string when permission is available.",
      "After a successful copy, the button reports Copied for two seconds and announces the change through a polite live region. If the clipboard is blocked, the page explains how to select the text and use Ctrl+C or Cmd+C. Empty input leaves a clear placeholder in every row. Nothing is stored, and no text is sent to a server while styles are generated or copied.",
      "Unicode styling is best treated as a visual experiment. Some platforms normalise, filter, or replace unusual characters, and search tools may not match the styled version of a word. Keep an ordinary-text version of anything important before copying a decorative version. The output can be pasted into a message, profile, or design mockup, but the receiving service decides whether it accepts the characters. Because the transformation is deterministic, entering the same text and style again produces the same output without a network connection or a remote font service.",
      "The available styles are presented as separate rows so you can compare them before copying. A row that looks attractive in one browser may use a fallback glyph elsewhere. Use the copy feedback as confirmation that the clipboard operation completed, and use the fallback selection instructions when browser permissions prevent direct clipboard access.",
    ],
    sources: [{ label: "The Unicode Standard — Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF)", href: "https://www.unicode.org/charts/PDF/Unicode-18.0/U180-1D400.pdf" }],
    faq: faq([
      { question: "Is this a real font?", answer: "No. The generator replaces ordinary Latin letters with characters from Unicode's Mathematical Alphanumeric Symbols and related blocks, so the result is styled text rather than a font. It works anywhere Unicode text is accepted, but display depends on the device's font support and screen readers may read it poorly." },
      { question: "Why did punctuation stay unchanged?", answer: "Only characters with a style mapping change; unsupported characters pass through." },
      { question: "Will every device display the result?", answer: "No. Display depends on the device's Unicode font support." },
      { question: "Can screen readers read it normally?", answer: "Styled Unicode may be read poorly, so use ordinary text for accessible content." },
      { question: "What if copying is blocked?", answer: "Select the output and press Ctrl+C on Windows or Cmd+C on Mac." },
      { question: "How do I make fancy text for Instagram?", answer: "Type your text here, pick one of the style rows, and copy it. Then open Instagram, go to Edit Profile, and paste the styled text into your bio. The styles are Unicode characters rather than a font, so they paste anywhere plain text is accepted — but keep important details in ordinary text, since styled characters can read poorly in screen readers." },
    ]),
    guides: [{ label: "How Unicode Fancy Text Fonts Work on Instagram, LinkedIn & X", href: "/guides/how-unicode-fancy-text-fonts-work-on-social-media/" }],
  },
  "base64-encoder-decoder": {
    definition: "Base64 is a reversible encoding that represents binary data using letters, digits, plus, slash, and padding. It is not encryption.",
    intro: "Encode UTF-8 text to Base64 or decode valid Base64 back into text locally.",
    howTo: ["Choose Encode or Decode.", "Enter text in the input area.", "Copy the output if you need it elsewhere."],
    content: [
      "Base64 represents bytes as a short alphabet of letters, digits, plus, slash, and optional padding. This developer tool supports text only. In Encode mode it first converts the input to UTF-8 bytes, so accented text and emoji work correctly, then creates the Base64 representation. In Decode mode it ignores whitespace and line breaks, accepts missing padding, validates the alphabet, and converts the decoded bytes back to UTF-8 text.",
      "The browser's bare btoa function is not sufficient for arbitrary Unicode because it expects a binary string. This page uses TextEncoder for UTF-8 encoding and TextDecoder with a fatal validation mode for decoding. A value with invalid Base64 characters, an impossible length, or one stray character after whitespace and padding are removed shows This is not valid Base64. Bytes that are structurally valid Base64 but not valid UTF-8 show a separate, clearer message.",
      "Base64 is an encoding, not encryption. Anyone who receives the output can decode it, so do not treat it as a way to protect passwords, tokens, personal data, or confidential messages. The tool does not encode files, does not support a URL-safe alphabet, and does not add application-specific headers. For web protocols, use the exact alphabet and padding expected by the system receiving your text.",
      "Empty input produces an empty output placeholder without an error. Copy is explicit, and the conversion happens as the input changes without a network request. Nothing is persisted to localStorage, cookies, or a database. Because the logic is pure and uses standard browser APIs, it can handle non-Latin scripts and emoji without breaking surrogate pairs or silently replacing invalid text.",
      "When moving Base64 between systems, preserve the output exactly and check whether the receiving system expects padding, line breaks, or a URL-safe alphabet. This page accepts normal Base64 whitespace and missing padding for convenience, but it intentionally does not transform the URL-safe variant. A successful decode only means the bytes form valid UTF-8 text; it does not prove that the text belongs to the expected application. Treat tokens and credentials as secrets even when they look like ordinary Base64, and clear the page when you finish experimenting.",
      "Encoding changes the size and appearance of text but does not make it smaller in the usual case. If an API expects JSON, a header, or a binary payload, follow that API's exact documentation instead of copying assumptions from another Base64 tool. The plain-language errors are designed to distinguish malformed input from bytes that cannot be read as UTF-8.",
    ],
    sources: [{ label: "IETF RFC 4648 — The Base16, Base32, and Base64 Data Encodings", href: "https://datatracker.ietf.org/doc/rfc4648/" }],
    faq: faq([
      { question: "Does Base64 encrypt text?", answer: "No. Base64 is a reversible encoding that represents bytes with letters, digits, plus, slash and padding — anyone who receives the output can decode it instantly. It hides nothing, so never use it to protect passwords, tokens, personal data or confidential messages. Use real encryption for anything secret." },
      { question: "Does Unicode work?", answer: "Yes. Encoding uses UTF-8, so non-Latin text and emoji are supported." },
      { question: "Can I decode without padding?", answer: "Yes. Missing padding is accepted when the remaining input is valid." },
      { question: "Can it encode a file?", answer: "No. This v1 tool accepts text only." },
      { question: "What happens with invalid UTF-8?", answer: "The decoder reports that the decoded data is not valid UTF-8 text." },
      { question: "What is Base64 used for?", answer: "Base64 carries binary data through systems that only handle text. Common uses include email attachments (MIME), embedding small images in HTML or CSS as data URLs, sending binary payloads inside JSON APIs, and HTTP Basic Authentication headers. It changes the format of data — it does not encrypt or compress it." },
    ]),
    guides: [{ label: "What Is Base64 Encoding, Why Does It Add 33% Size & When to Use It", href: "/guides/what-is-base64-encoding-and-when-to-use-it/" }],
  },
  "invoice-generator": {
    definition: "An invoice is a document a seller gives a buyer that lists goods or services, quantities, prices, tax, and the total amount owed.",
    intro: "Build a simple invoice in your browser and print it without a watermark.",
    howTo: ["Fill in the sender, recipient, and invoice details.", "Add line items and an optional tax rate.", "Print or save the browser print dialog as PDF."],
    content: [
      "This invoice generator creates a clean, printable invoice without signup or a watermark. Fill in the From and To details, invoice number, issue date, optional due date, currency, notes, tax label, and tax rate. Add up to 50 line items with a description, quantity, and unit price. The preview updates in the browser while you work, making it easy to check the description, quantities, subtotal, tax, and total before printing.",
      "Money calculations use integer minor units such as paise or cents rather than relying on floating-point display values. Each line amount is quantity multiplied by unit price and rounded half up to the nearest minor unit. The subtotal sums used rows, tax is the subtotal multiplied by the percentage and rounded half up, and total is subtotal plus tax. Rows where every field is empty are ignored, while a partially filled row receives a direct validation message.",
      "The currency selector supports rupees and dollars. Dates print in a readable day, short month, year format such as 13 Oct 2026. The browser's print dialog handles Print or Save as PDF. A print stylesheet hides the site header, footer, navigation, and controls so only the invoice appears on paper or in the saved PDF. There is no logo upload, saved template, payment integration, or backend submission.",
      "Refreshing clears this form. Nothing is stored in localStorage, cookies, or a server, so download or print the invoice before leaving if you need a copy. Check legal and tax requirements for your location; this is a general document tool, not accounting or legal advice. Validate the recipient, dates, invoice number, currency, and tax rules yourself before sending the finished invoice to a customer.",
      "Before printing, confirm that every used row has a description, a positive quantity, and a unit price with no more than two decimal places. A zero unit price can be valid for a free line item, while a zero quantity is not. Check whether your jurisdiction requires a tax identification number, a specific invoice number sequence, payment instructions, or additional disclosures; this generator does not make those decisions for you. The preview is meant to make a simple document convenient, not to replace an accounting system or an official invoice policy.",
      "The form separates editable fields from the calculated result so a typo can be corrected before printing. Use the due-date field only when a due date applies, and keep notes short enough to read in the printed layout. If you need recurring invoices, customer history, payment reminders, or audit records, use a dedicated accounting system rather than expecting this temporary browser form to retain them.",
    ],
    faq: faq([
      { question: "Can I add multiple items?", answer: "Yes. Add up to 50 line-item rows; empty rows are ignored." },
      { question: "How is tax rounded?", answer: "Tax is calculated in integer minor units — paise or cents — to avoid floating-point errors. Each line amount is quantity times unit price rounded half up, the subtotal sums the lines, and tax is the subtotal times the percentage, rounded half up to the nearest paise or cent. The total is subtotal plus tax." },
      { question: "Can I save as a PDF?", answer: "Yes. Use the browser print dialog and choose its Save as PDF option." },
      { question: "Is there a watermark?", answer: "No. The printed invoice has no site watermark or branding." },
      { question: "Is the form saved?", answer: "No. Refreshing clears the form, so print or save it before leaving." },
      { question: "What should an invoice include?", answer: "A complete invoice usually lists the word 'Invoice', the seller's and buyer's details, a unique invoice number, the issue date, itemised lines with quantity and unit price, subtotal, tax, and total, plus payment terms or a due date. This generator covers those core fields. Check your local tax rules for extras your jurisdiction requires, such as a tax identification number." },
    ]),
    guides: [{ label: "How to Create a GST-Compliant Invoice in India (Rule 46 Checklist)", href: "/guides/how-to-create-gst-compliant-invoice-india/" }],
  },
  "fake-text-generator": {
    definition: "A fake text generator creates a fictional chat mockup for sketches, presentations, and entertainment. It is not connected to any messaging app.",
    intro: "Create a generic chat mockup for presentations, jokes, wireframes, and entertainment.",
    howTo: ["Enter a contact name and add messages.", "Choose Sent or Received for each message.", "Review the preview and export a PNG."],
    content: [
      "The fake text generator makes a generic chat-style mockup for a presentation, wireframe, joke, or entertainment project. Enter a contact name and add messages in the order they should appear. Each message can be Sent or Received and can include an optional time label. The preview updates as you edit, wraps long words, and keeps sent and received bubbles visually distinct without copying the logo, name, or trade dress of a real messaging application.",
      "The tool supports up to 30 messages, with a maximum of 500 characters per message. A message must contain text before it can be included in the preview. If there are no usable messages, the preview shows a placeholder and Export is disabled. These limits keep the browser-side canvas export predictable and help the mockup remain readable on small screens.",
      "Export PNG runs entirely in the browser and downloads a file named fake-chat.png. The image contains only the chat mockup, with no watermark. Emoji are included in the preview and canvas when the device font supports them. Because browser fonts can differ, the exported appearance may vary slightly between devices. Check the image before sharing it, especially when using uncommon scripts or emoji.",
      "Use this page responsibly. Label fictional conversations clearly when context could be misunderstood, and do not present a mockup as evidence of a real exchange. The tool is for mockups, humour, entertainment, and design exploration. It does not connect to contacts, send messages, save drafts, or access an account. Refreshing clears the current form, and no message text leaves the page through our code.",
      "A good mockup usually has a short contact label, a small number of readable messages, and a clear visual difference between the two sides. Use the optional time label to explain a sequence without imitating a real service's exact interface. The generic design is intentional: it keeps the result useful for wireframes while avoiding logos and trade dress. Review the exported image at its final size, especially when a message contains a long unbroken word, mixed scripts, or emoji. The PNG is generated locally from the visible message data.",
      "The preview and export are separate surfaces: the preview is responsive HTML, while the download is a canvas image with a fixed working width. Keep important text near the beginning of a message if you need it visible in a compact mockup. The export button stays disabled until at least one valid message exists, preventing an empty file from being mistaken for a completed conversation.",
    ],
    faq: faq([
      { question: "Is this connected to a messaging app?", answer: "No. It is a generic browser-only mockup tool." },
      { question: "How many messages can I add?", answer: "The preview supports up to 30 messages." },
      { question: "Can I export an image?", answer: "Yes. Export downloads a PNG named fake-chat.png when messages exist." },
      { question: "Does it add a watermark?", answer: "No. The exported chat contains no watermark." },
      { question: "What is it for?", answer: "Use it for mockups, humour, entertainment and design exploration — for example, a chat wireframe, a presentation example or a joke screenshot. It is a generic browser-only mockup, not a real messaging app, so label fictional conversations clearly and never present one as evidence of a real exchange." },
      { question: "Is it legal to make a fake text message?", answer: "Making a chat mockup for jokes, presentations, wireframes, education, or entertainment is generally fine. It crosses the line when a mockup is presented as a real conversation — to deceive someone, defraud, impersonate, harass, or serve as fake evidence. Label fictional conversations clearly and never pass one off as real. This is general information, not legal advice." },
    ]),
    guides: [{ label: "How to Create Realistic Chat Mockups for Videos, UI & Decks (No Watermark)", href: "/guides/how-to-create-chat-mockups-for-presentations-and-ui/" }],
  },
};

export function getContent(id: string): ToolContent {
  const entry = content[id];
  if (!entry) {
    throw new Error(`Missing content for ${id}`);
  }
  return entry;
}
