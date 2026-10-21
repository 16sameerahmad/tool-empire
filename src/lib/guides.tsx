import type { ReactNode } from "react";
import Link from "next/link";

export type GuideSection = { heading: string; body: ReactNode[] };
export type GuideFaq = { question: string; answer: string };

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  href: string;
  intro: ReactNode[];
  cta: { label: string; href: string };
  sections: GuideSection[];
  faq: GuideFaq[];
  related: string[];
  pillar: { label: string; href: string };
};

export const guides: Guide[] = [
  {
    slug: "how-to-calculate-emi",
    title: "How to Calculate EMI by Hand",
    seoTitle: "How to Calculate EMI by Hand — Formula & Example | Tulyro",
    seoDescription:
      "Learn the EMI formula with a worked example: ₹1,00,000 at 12% for 12 months is ₹8,884.88 a month. See each step, plus the zero-interest case.",
    href: "/guides/how-to-calculate-emi/",
    intro: [
      <>
        EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1). P is what you borrow, r is the
        monthly interest rate, and n is the number of monthly payments. That is the whole formula. The
        rest of this guide is arithmetic, plus one worked example you can check against any calculator.
      </>,
    ],
    cta: { label: "Try the EMI Calculator", href: "/calculators/emi-calculator/" },
    sections: [
      {
        heading: "What the formula actually does",
        body: [
          <>
            Most people meet EMI as a number on a bank page. The formula looks worse than it is. It
            answers one question: what fixed monthly payment clears this loan, with interest, in exactly
            n months?
          </>,
          <>
            Here is the one thing worth remembering. Interest is charged on what you still owe, not on
            the original amount. That is called a reducing balance. It explains why your early payments
            are mostly interest and barely touch the principal, while your later payments are mostly
            principal. If a lender ever quotes you a flat rate instead, that rule does not apply, and the
            loan costs more than it first appears. I will come back to that below.
          </>,
          <>
            To get r, take the annual rate, divide by 12, then divide by 100. A 12% annual rate becomes
            0.01 per month. A 10% rate becomes 0.008333. Small numbers, big consequences. A single
            percentage point on a large loan moves the monthly payment by hundreds of rupees.
          </>,
        ],
      },
      {
        heading: "Worked example: ₹1,00,000 at 12% for 12 months",
        body: [
          <>
            Let us run the numbers. P = ₹1,00,000. Annual rate 12%, so r = 0.01. Tenure n = 12 months.
            First, (1.01)<sup>12</sup> = 1.126825. Then the numerator: 1,00,000 × 0.01 × 1.126825 =
            ₹1,126.83. The denominator: 1.126825 − 1 = 0.126825. Divide: 1,126.83 ÷ 0.126825 =
            ₹8,884.88 per month.
          </>,
          <>
            Over 12 months you pay ₹1,06,618.55 in total, so the interest is ₹6,618.55. I ran this exact
            example through our{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>
            . Same number. Good. The hand math and the tool agree, which is the whole point of doing it
            once by hand: after that, you trust the tool because you know what it is doing.
          </>,
        ],
      },
      {
        heading: "A second example: ₹5,00,000 at 10% for 24 months",
        body: [
          <>
            Same steps, bigger loan. P = ₹5,00,000. Annual rate 10%, so r = 0.008333. Tenure n = 24
            months. The formula gives ₹23,072.46 per month. Total paid: ₹5,53,739.12. Interest:
            ₹53,739.12.
          </>,
          <>
            Notice the trade. Stretching a loan from 12 to 24 months shrinks the monthly payment, but you
            pay far more interest in total. Banks like long tenures. Your wallet usually does not. When
            you compare two offers, look at total interest, not just the monthly figure. The smaller EMI
            is not always the cheaper loan.
          </>,
        ],
      },
      {
        heading: "The zero-interest case",
        body: [
          <>
            At 0% interest the formula breaks. It divides by zero, which is maths telling you the formula
            has nothing to do here. Just split the principal: ₹1,20,000 over 12 months is ₹10,000 a
            month. Done.
          </>,
          <>
            Zero-interest offers still deserve a second look. The EMI is simple, but processing fees and
            compulsory add-ons often quietly replace the interest. If the total you pay is more than the
            price of the thing you bought, the loan was not free.
          </>,
        ],
      },
      {
        heading: "What the formula leaves out",
        body: [
          <>
            Your hand calculation is the pure loan maths. A lender quote adds the rest: processing fees,
            insurance, GST on charges, part-payment rules, and floating rates that can change mid-tenure.
            If your calculation and the lender&apos;s figure differ, ask which of these explains the gap
            before you assume anyone made an error.
          </>,
          <>
            So treat your result as an estimate, not a lender quote. It tells you whether an offer is
            sane. It does not replace the lender&apos;s disclosure.
          </>,
        ],
      },
      {
        heading: "When to skip the hand math",
        body: [
          <>
            Once you have done it by hand, use a calculator for the rest. Comparing five offers, checking
            a lender&apos;s figure, or asking what happens if the rate rises by 1% are all jobs for a tool,
            not a notebook. Run them through the{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>
            , and use the{" "}
            <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
              Mortgage Calculator
            </Link>{" "}
            if the loan is a US-dollar home loan instead. And if you are still deciding which
            calculator to trust in the first place, read{" "}
            <Link href="/guides/how-to-choose-emi-calculator/" className="text-primary underline">
              How to Choose an EMI Calculator
            </Link>
            .
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "What is the EMI formula?",
        answer:
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments.",
      },
      {
        question: "Why does my EMI differ from the lender's figure?",
        answer:
          "Fees, insurance, GST on charges, rounding, and floating rates all sit outside the pure formula. Ask the lender which of these explains the gap before assuming an error.",
      },
      {
        question: "Does a longer tenure always mean a lower EMI?",
        answer:
          "Yes, the monthly payment drops, but total interest rises. A ₹5,00,000 loan at 10% costs ₹53,739.12 in interest over 24 months. Compare total interest, not just the monthly figure.",
      },
      {
        question: "How is EMI different from flat-rate interest?",
        answer:
          "EMI uses a reducing balance: interest is charged on what you still owe. Flat-rate interest is charged on the full original principal for the whole tenure, so a flat-rate quote can look cheaper than it is.",
      },
      {
        question: "Can I calculate EMI without a calculator?",
        answer:
          "Yes. The worked examples on this page show each step. For comparing offers, a calculator is faster and less error-prone.",
      },
    ],
    related: ["emi-calculator", "mortgage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-to-calculate-age-in-days",
    title: "How to Calculate Your Age in Days",
    seoTitle: "How to Calculate Your Age in Days — Exact Method | Tulyro",
    seoDescription:
      "Subtract your date of birth from today's date, counting leap days exactly. Example: 1 Jan 2000 to 1 Jan 2025 is 9,132 days. See the 29 Feb rule.",
    href: "/guides/how-to-calculate-age-in-days/",
    intro: [
      <>
        Take today&apos;s date, subtract your date of birth on a real calendar, and count every leap day
        in between. That is your exact age in days. No averages, no 365.25 shortcuts.
      </>,
    ],
    cta: { label: "Try the Age Calculator", href: "/calculators/age-calculator/" },
    sections: [
      {
        heading: "The method, honestly",
        body: [
          <>
            You can do this with a calendar and patience. Count full years first, then the leftover days.
            The only part that needs care is leap days: a year has a 29 February if it divides by 4,
            except century years, which need to divide by 400.
          </>,
          <>
            2000 was a leap year. 1900 was not. 2100 will not be. People get this wrong all the time,
            and it is the most common reason two age calculations disagree by a day.
          </>,
        ],
      },
      {
        heading: "Worked example: 1 January 2000 to 1 January 2025",
        body: [
          <>
            Twenty-five years is 25 × 365 = 9,125 ordinary days. Then add the leap days in that span:
            29 February in 2000, 2004, 2008, 2012, 2016, 2020, and 2024. That is 7 leap days. Total:
            9,132 days.
          </>,
          <>
            I checked this against our{" "}
            <Link href="/calculators/age-calculator/" className="text-primary underline">
              Age Calculator
            </Link>
            . Same answer. If your hand count lands one day off, you almost certainly missed a leap day
            or counted both endpoints. Count the days between the dates, not the dates themselves.
          </>,
        ],
      },
      {
        heading: "A second example: 15 June 1990 to 1 January 2025",
        body: [
          <>
            Thirty-four full years, from 15 June 1990 to 15 June 2024, come to 12,419 days. That is
            34 × 365 = 12,410 ordinary days plus 9 leap days: 29 February in 1992, 1996, 2000, 2004,
            2008, 2012, 2016, 2020, and 2024.
          </>,
          <>
            Then the leftover stretch, 15 June 2024 to 1 January 2025, is 200 days. Add them: 12,419 +
            200 = 12,619 days. The 200 days at the end are where most people slip. Count them month by
            month instead of guessing. June gives 15, July 31, August 31, September 30, October 31,
            November 30, December 31, and the step into 1 January adds the last one.
          </>,
        ],
      },
      {
        heading: "Why dividing by 365.25 fails",
        body: [
          <>
            The shortcut everyone tries is 9,132 ÷ 365.25. It gives 25.0021, not 25. Close, but wrong.
            The average smears leap days across years that never had them, so it cannot recover exact
            calendar dates, and it drifts near birthdays.
          </>,
          <>
            Averages are fine for trivia. They are useless for exact dates. If the number has to be
            right, count real days on a real calendar.
          </>,
        ],
      },
      {
        heading: "The 29 February problem",
        body: [
          <>
            Born on 29 February? In non-leap years there is no birthday to count to. Our calculator
            rolls the date to 1 March and says so openly. There is no universal law here. Some families
            celebrate on 28 February. Either choice is a convention, and the honest move is to state
            which one you used.
          </>,
        ],
      },
      {
        heading: "A milestone worth knowing: 10,000 days",
        body: [
          <>
            People love round numbers, and 10,000 days is a good one. If you were born on 1 January
            2000, your 10,000th day lands on 19 May 2027. If you were born on 15 June 1990, it already
            passed, on 31 October 2017. Milestones like this are the one place where the exact count
            feels fun instead of bureaucratic. The Age Calculator will tell you how close you are.
          </>,
        ],
      },
      {
        heading: "When days actually matter",
        body: [
          <>
            Most of the time, years and months are enough. Days matter when a form asks for them, when
            you are tracking a baby&apos;s age week by week, or when you are settling an age-difference
            argument properly. For all of those, run the dates through the{" "}
            <Link href="/calculators/age-calculator/" className="text-primary underline">
              Age Calculator
            </Link>{" "}
            instead of trusting a rough division.
          </>,
          <>
            There is one more everyday use: streaks. People tracking a habit, a fitness run, or days
            since an event usually want the exact count, not an average. A streak of 100 days means 100
            real days. The same counting discipline applies: real calendar, real leap days, no
            shortcuts. And if your ages live in a spreadsheet rather than on paper,{" "}
            <Link href="/guides/calculate-age-in-excel/" className="text-primary underline">
              Calculate Age in Excel
            </Link>{" "}
            shows the three formulas that do this counting for you.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate my age in days?",
        answer:
          "Subtract your date of birth from today's date on a real calendar, counting every leap day in between. Count the days between the dates, not the dates themselves.",
      },
      {
        question: "How many days are in 25 years?",
        answer:
          "It depends on which 25 years, because leap days differ. The span 1 January 2000 to 1 January 2025 is 9,132 days. A 25-year span with 6 leap days would be 9,131.",
      },
      {
        question: "What if I was born on 29 February?",
        answer:
          "In non-leap years there is no 29 February. Our calculator counts to 1 March and states that choice openly. Some families use 28 February instead; either is a convention.",
      },
      {
        question: "Why does another calculator give a different number?",
        answer:
          "Usually leap-day handling, timezone or date conventions, or off-by-one counting (inclusive vs exclusive). The method on this page counts days between dates on a real calendar.",
      },
      {
        question: "Is age in days the same as total days lived?",
        answer:
          "Yes. Both mean the number of days from your date of birth to today, leap days included.",
      },
    ],
    related: ["age-calculator", "bmi-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "cgpa-to-percentage-cbse-9-5-rule",
    title: "CGPA to Percentage: The CBSE ×9.5 Rule, Explained",
    seoTitle: "CGPA to Percentage — The CBSE ×9.5 Rule Explained | Tulyro",
    seoDescription:
      "CGPA × 9.5 gives an estimated percentage under the CBSE convention: 8.0 CGPA is about 76%. Learn why it is an estimate, and when your own rule differs.",
    href: "/guides/cgpa-to-percentage-cbse-9-5-rule/",
    intro: [
      <>
        Multiply your CGPA by 9.5. An 8.0 CGPA gives about 76%. That is an estimate, not an official
        conversion. The ×9.5 rule is a CBSE convention, and your institution&apos;s rule wins over any
        calculator.
      </>,
    ],
    cta: { label: "Try the CGPA Calculator", href: "/calculators/cgpa-to-percentage/" },
    sections: [
      {
        heading: "The formula",
        body: [
          <>
            Percentage = CGPA × 9.5. One multiplication. It applies to the 10-point CGPA scale, and it
            gives you an estimated percentage, not a marksheet figure. Keep that word, estimated, in
            mind. It does a lot of work in this guide.
          </>,
        ],
      },
      {
        heading: "Worked examples",
        body: [
          <>
            8.0 × 9.5 = 76.00%. 9.2 × 9.5 = 87.40%. 7.5 × 9.5 = 71.25%. I ran these through our{" "}
            <Link href="/calculators/cgpa-to-percentage/" className="text-primary underline">
              CGPA Calculator
            </Link>
            . Same numbers. The arithmetic is the easy part. Knowing when to trust the answer is the
            actual skill.
          </>,
        ],
      },
      {
        heading: "Quick conversion table",
        body: [
          <>
            Every value below is CGPA × 9.5, computed with the same formula as our{" "}
            <Link href="/calculators/cgpa-to-percentage/" className="text-primary underline">
              CGPA Calculator
            </Link>
            . Find your CGPA in the left column and read across. Remember: each value is an
            estimate, not a marksheet figure.
          </>,
          <div key="cgpa-conversion-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">CGPA</th>
                <th className="border border-outline-variant/60 p-3">Percentage (× 9.5, estimated)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">5.0</td><td className="border border-outline-variant/60 p-3">47.50%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">5.5</td><td className="border border-outline-variant/60 p-3">52.25%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">6.0</td><td className="border border-outline-variant/60 p-3">57.00%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">6.5</td><td className="border border-outline-variant/60 p-3">61.75%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">7.0</td><td className="border border-outline-variant/60 p-3">66.50%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">7.5</td><td className="border border-outline-variant/60 p-3">71.25%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">8.0</td><td className="border border-outline-variant/60 p-3">76.00%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">8.5</td><td className="border border-outline-variant/60 p-3">80.75%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">9.0</td><td className="border border-outline-variant/60 p-3">85.50%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">9.5</td><td className="border border-outline-variant/60 p-3">90.25%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">10.0</td><td className="border border-outline-variant/60 p-3">95.00%</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Where 9.5 came from",
        body: [
          <>
            CBSE used ×9.5 to map CGPA to an indicative percentage for its grading system. It was a
            practical shortcut, not a law of physics. Boards change grading schemes over the years, and
            a convention from one scheme does not automatically carry over to another. Treat ×9.5 the
            way it was meant: a rough bridge between two ways of reporting the same performance.
          </>,
        ],
      },
      {
        heading: "Why it is only an estimate",
        body: [
          <>
            A CGPA hides detail by design. A grade point covers a band of marks, not one exact score.
            Two students with the same CGPA can have different exact percentages, and no multiplication
            can recover the detail the grading threw away. Any conversion inherits that blur.
          </>,
          <>
            Universities and employers know this, which is why some use their own conversion tables
            instead. If your result will go on an application, the table that matters is theirs, not
            this page&apos;s.
          </>,
        ],
      },
      {
        heading: "When your institution disagrees",
        body: [
          <>
            Some institutions use ×10. Some use (CGPA − 0.5) × 10. Some publish their own table. None
            of these is wrong in the abstract. Each is a local rule for its own students. Check the
            official rule before you write a percentage on an application. A wrong conversion on a form
            is worse than leaving the CGPA as it is.
          </>,
        ],
      },
      {
        heading: "What 9.5 gets wrong at the edges",
        body: [
          <>
            Run the formula at the top of the scale and something odd appears. A CGPA of 10 gives 95%.
            But a student who scored 99% also gets a CGPA of 10. The formula can never produce 96 to
            100%. That is not a bug in the arithmetic. It is the price of compressing a hundred marks
            into ten grade points: the top of the scale gets flattened.
          </>,
          <>
            The same flattening happens everywhere else, just less visibly. A CGPA of 8.0 could come
            from marks anywhere in a band around the low-to-mid 70s to low 80s. The formula returns
            76%, which sits inside that band, but it is nobody&apos;s exact score. Read it as the middle
            of a range, not a measurement.
          </>,
        ],
      },
      {
        heading: "One more worked check: 8.5 CGPA",
        body: [
          <>
            8.5 × 9.5 = 80.75%. Same rule, same caveats. If your institution uses a different
            multiplier, the same CGPA gives a different percentage, and both answers are just
            conventions. The CGPA is the fact. The percentage is an interpretation.
          </>,
        ],
      },
      {
        heading: "What to submit with an application",
        body: [
          <>
            Give the original CGPA, the conversion rule you used, and the word estimated where the form
            allows it. Never present an estimate as a marksheet figure. If a form asks for a percentage
            and your institution has no official conversion, say so rather than inventing precision
            you do not have.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Is multiplying by 9.5 always correct?",
        answer:
          "No. It is a CBSE convention that gives an estimate. Your institution may use ×10, its own formula, or its own table. The institution's rule wins.",
      },
      {
        question: "What is 8.5 CGPA in percentage?",
        answer: "8.5 × 9.5 = 80.75%, estimated under the CBSE ×9.5 convention.",
      },
      {
        question: "Does ×9.5 work for a 4.0 GPA?",
        answer:
          "No. A 4.0 GPA is a different, US scale with its own conversion. Do not apply ×9.5 to it.",
      },
      {
        question: "Which is better to report, CGPA or percentage?",
        answer:
          "Report what the form asks for. If it accepts both, report the CGPA plus the estimated percentage with the rule you used.",
      },
      {
        question: "Why do different sites give different percentages?",
        answer:
          "Different conventions: ×9.5, ×10, or a custom table. The underlying CGPA is the same; the mapping differs. Check which convention your institution uses.",
      },
    ],
    related: ["cgpa-to-percentage", "age-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "emi-vs-mortgage-calculator",
    title: "EMI Calculator vs Mortgage Calculator: Which One to Use",
    seoTitle: "EMI vs Mortgage Calculator — Which One to Use? | Tulyro",
    seoDescription:
      "Same formula, different presentation: the EMI page uses ₹ and Indian loan language; the Mortgage page uses $ and US mortgage language. Pick by currency.",
    href: "/guides/emi-vs-mortgage-calculator/",
    intro: [
      <>
        Both calculators run the same reducing-balance formula. Pick the EMI page for Indian loans in ₹,
        and the Mortgage page for US home loans in $. The difference is currency, language, and number
        formatting. Not maths.
      </>,
    ],
    cta: { label: "Try the EMI Calculator", href: "/calculators/emi-calculator/" },
    sections: [
      {
        heading: "One formula, two pages",
        body: [
          <>
            EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1). Monthly rate is the annual
            rate divided by 12. Both pages run this. If you have ever wondered whether the two pages
            disagree, they do not. Same inputs, same answer, different clothes. If you want to see the
            maths worked out step by step,{" "}
            <Link href="/guides/how-to-calculate-emi/" className="text-primary underline">
              How to Calculate EMI by Hand
            </Link>{" "}
            runs the full formula with real numbers.
          </>,
        ],
      },
      {
        heading: "The EMI page",
        body: [
          <>
            The EMI page speaks Indian loan language: ₹, Indian digit grouping, EMI, tenure, principal.
            Example: ₹1,00,000 at 12% for 12 months gives ₹8,884.88 a month, ₹1,06,618.55 in total.
            This is the page I would send to someone comparing personal loans in India.
          </>,
          <>
            Run it yourself on the{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "The Mortgage page",
        body: [
          <>
            The Mortgage page speaks US mortgage language: $, US digit grouping, term, monthly payment.
            Example: $200,000 at 6% over 30 years gives $1,199.10 a month. Total paid: $431,676.38.
            Interest alone: $231,676.38.
          </>,
          <>
            Look at that interest figure. Over 30 years you pay back more in interest than you borrowed.
            That is normal for a long mortgage, and it is exactly why the total matters more than the
            monthly figure. A payment that feels affordable can still be an expensive loan.
          </>,
          <>
            Run it yourself on the{" "}
            <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
              Mortgage Calculator
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "A trap: comparing monthly payments across currencies",
        body: [
          <>
            ₹8,884.88 a month and $1,199.10 a month look comparable on a page. They are not. Different
            currencies, different loan sizes, different tenures. Never line up the two monthly figures
            and conclude one loan is cheaper. Compare each loan against its own alternatives: total
            paid and total interest, in its own currency.
          </>,
        ],
      },
      {
        heading: "What both leave out",
        body: [
          <>
            Neither page includes property tax, insurance, processing fees, prepayment, or floating-rate
            changes. Both are pure loan maths. Neither is a lender quote. If your lender&apos;s number
            is higher, one of those missing pieces is usually the reason.
          </>,
          <>
            A concrete example, using round illustrative numbers: say property tax adds $150 a month and
            insurance adds $100. Your real monthly outgo on the $200,000 mortgage is then about $1,449,
            not $1,199. The calculator did not lie. It just did not include the parts it never claimed
            to include.
          </>,
        ],
      },
      {
        heading: "The decision rule",
        body: [
          <>
            If the loan is in rupees, use the EMI calculator. If it is a US-dollar mortgage, use the
            Mortgage calculator. That is the whole rule.
          </>,
          <>
            If you just need the maths, either page works. Read the ₹ as $ yourself and ignore the
            Indian digit grouping. The answer will be right. The Mortgage page is simply clearer for a
            US loan, and the EMI page is clearer for an Indian one.
          </>,
          <>
            One real-world mix-up: someone earning in ₹ with a US mortgage, or vice versa. Use each
            calculator for its own loan. Do not convert one loan into the other&apos;s currency inside
            your head and compare the monthly figures. That is how the trap in the previous section
            starts.
          </>,
          <>
            And if you are judging calculators in general, not just these two, the five checks in{" "}
            <Link href="/guides/how-to-choose-emi-calculator/" className="text-primary underline">
              How to Choose an EMI Calculator
            </Link>{" "}
            show what separates an honest calculator from a misleading one.
          </>,
        ],
      },
      {
        heading: "The two examples side by side",
        body: [
          <>
            Here are the worked examples from this guide in one place, so you can see how the same
            formula behaves across currencies and tenures.
          </>,
          <div key="comparison-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Loan</th>
                <th className="border border-outline-variant/60 p-3">Monthly payment</th>
                <th className="border border-outline-variant/60 p-3">Total paid</th>
                <th className="border border-outline-variant/60 p-3">Interest</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-outline-variant/60 p-3">₹1,00,000 at 12%, 12 months</td>
                <td className="border border-outline-variant/60 p-3">₹8,884.88</td>
                <td className="border border-outline-variant/60 p-3">₹1,06,618.55</td>
                <td className="border border-outline-variant/60 p-3">₹6,618.55</td>
              </tr>
              <tr>
                <td className="border border-outline-variant/60 p-3">$200,000 at 6%, 30 years</td>
                <td className="border border-outline-variant/60 p-3">$1,199.10</td>
                <td className="border border-outline-variant/60 p-3">$431,676.38</td>
                <td className="border border-outline-variant/60 p-3">$231,676.38</td>
              </tr>
            </tbody>
            </table>
          </div>,
        ],
      },
    ],
    faq: [
      {
        question: "Are EMI and mortgage calculators the same?",
        answer:
          "Same reducing-balance formula, different presentation: currency, language, and number formatting. The EMI page uses ₹ and Indian grouping; the Mortgage page uses $ and US grouping.",
      },
      {
        question: "Can I use the EMI calculator for a US loan?",
        answer:
          "The maths works. You must read ₹ as $ yourself and ignore the Indian digit grouping. The Mortgage page is clearer for a US loan.",
      },
      {
        question: "Why is my mortgage total so much bigger than the loan?",
        answer:
          "Thirty years of interest. A $200,000 loan at 6% costs $231,676.38 in interest alone. Long tenures make the monthly payment affordable and the total expensive.",
      },
      {
        question: "Do these calculators include taxes and insurance?",
        answer:
          "No. Both exclude property tax, insurance, fees, prepayment, and floating-rate changes. Neither is a lender quote.",
      },
      {
        question: "Which calculator should I use for a car loan in India?",
        answer:
          "The EMI calculator. It uses ₹ and Indian loan language, which fits a car loan in India.",
      },
    ],
    related: ["emi-calculator", "mortgage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-to-choose-emi-calculator",
    title: "How to Choose an EMI Calculator",
    seoTitle: "Which EMI Calculator Is Best? 5 Checks Before You Trust One | Tulyro",
    seoDescription:
      "Every EMI calculator runs the same formula. What differs: total interest display, amortization view, prepayment, currency. Five checks that separate honest tools from traps.",
    href: "/guides/how-to-choose-emi-calculator/",
    intro: [
      <>
        Here is the uncomfortable truth first: every EMI calculator on the internet runs the same
        formula. EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1). There is no secret
        maths. So when people ask which EMI calculator is best, the answer is never about the
        formula. It is about everything around it: what the tool shows you, what it hides, and
        whether it helps you compare loans honestly.
      </>,
    ],
    cta: { label: "Try the EMI Calculator", href: "/calculators/emi-calculator/" },
    sections: [
      {
        heading: "Check 1: Does it show total interest?",
        body: [
          <>
            The monthly EMI is the least important number on the page. The number that decides whether
            a loan is cheap or expensive is total interest paid over the whole tenure. A ₹5,00,000 loan
            at 10% for 24 months costs ₹53,739.12 in interest. If a calculator shows you the EMI but
            hides that figure, or buries it three scrolls down, it is not helping you compare loans.
            It is helping you feel good about a monthly number.
          </>,
          <>
            Any calculator worth using puts total interest next to the EMI, on the same screen, without
            you asking.
          </>,
        ],
      },
      {
        heading: "Check 2: Does it show an amortization schedule?",
        body: [
          <>
            An amortization schedule is the month-by-month split of each payment into principal and
            interest. It is where you learn the thing banks never advertise: your early payments are
            mostly interest. On that ₹5,00,000 loan, the first EMI of ₹23,072.46 contains about
            ₹4,166.67 of interest and only ₹18,905.79 of principal. By the final payment, those
            proportions have flipped.
          </>,
          <>
            A calculator without this view is a black box. A calculator with it teaches you how loans
            actually work. Guess which one I would trust.
          </>,
        ],
      },
      {
        heading: "Check 3: Can it handle prepayment?",
        body: [
          <>
            Real loans get prepaid. Bonuses arrive, salaries rise, and people throw lump sums at their
            debt. An honest calculator lets you test that: what happens if I pay ₹50,000 extra in month
            12? How many months do I save, and how much interest disappears?
          </>,
          <>
            Tools that cannot model prepayment are toys. The prepayment question is where the biggest
            savings hide, and a calculator that cannot answer it is not finished.
          </>,
        ],
      },
      {
        heading: "Check 4: Currency and language that match your loan",
        body: [
          <>
            This sounds trivial until you have seen someone compare a ₹ EMI with a $ mortgage payment
            and conclude one loan is cheaper. An Indian loan deserves ₹, Indian digit grouping, and
            words like tenure and principal. A US mortgage deserves $ and US grouping. I wrote a whole
            guide about this mix-up:{" "}
            <Link href="/guides/emi-vs-mortgage-calculator/" className="text-primary underline">
              EMI Calculator vs Mortgage Calculator
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "Check 5: Does it say what it leaves out?",
        body: [
          <>
            No EMI calculator includes processing fees, insurance, GST on charges, or floating-rate
            changes. That is fine. What is not fine is pretending the number on screen is the final
            word. An honest tool says, somewhere visible, that its result is pure loan maths and not a
            lender quote. If a calculator never mentions its limits, assume it has more of them.
          </>,
        ],
      },
      {
        heading: "Red flags",
        body: [
          <>
            Walk away from any calculator that quotes a flat rate as if it were an EMI. Flat-rate
            interest is charged on the full original principal for the whole tenure, which makes the
            loan look cheaper than it is. Real EMI uses a reducing balance. I explain the difference
            in{" "}
            <Link href="/guides/how-to-calculate-emi/" className="text-primary underline">
              How to Calculate EMI by Hand
            </Link>
            .
          </>,
          <>
            Other red flags: no total interest anywhere, pop-ups pushing &ldquo;instant
            approval&rdquo; before you have even typed a number, and results that change when you
            refresh the page. A calculator whose maths is not stable is not a calculator.
          </>,
        ],
      },
      {
        heading: "The 30-second verification",
        body: [
          <>
            You do not need my opinion. Take any calculator, run ₹1,00,000 at 12% for 12 months, and
            check it against the hand calculation: ₹8,884.88 a month. If it matches, the maths is
            right, and you can judge everything else by the five checks above. If it does not match,
            close the tab.
          </>,
          <>
            Run the check on our{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>
            . It passes. Then judge it on the other five checks like you would any other tool. That is
            the honest way to use this guide, including against us.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Which EMI calculator is the best?",
        answer:
          "There is no single best one. Every calculator runs the same reducing-balance formula. Judge them by the five checks on this page: total interest shown, amortization schedule, prepayment support, matching currency, and honest limits.",
      },
      {
        question: "Are online EMI calculators accurate?",
        answer:
          "The pure maths is accurate on any honest calculator. What they exclude — processing fees, insurance, GST on charges, floating rates — is where lender figures differ. Treat results as estimates, not quotes.",
      },
      {
        question: "Why do two calculators give different EMIs for the same loan?",
        answer:
          "Usually rounding, different handling of the monthly rate (annual ÷ 12 vs a daily equivalent), or one of them quietly using flat-rate maths. Verify with the hand formula: ₹1,00,000 at 12% for 12 months is ₹8,884.88.",
      },
      {
        question: "Should I trust my bank's EMI calculator?",
        answer:
          "For the maths, yes. For the comparison, remember the bank's calculator exists to sell the bank's loan. It will not volunteer that a shorter tenure saves you tens of thousands in interest.",
      },
      {
        question: "Is it safe to use a free EMI calculator?",
        answer:
          "Yes, if it runs in your browser without asking for personal details. Never enter your PAN, account number, or OTP into a calculator. Ours asks for nothing and stores nothing.",
      },
    ],
    related: ["emi-calculator", "mortgage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "calculate-age-in-excel",
    title: "Calculate Age in Excel: 3 Formulas That Work",
    seoTitle: "Calculate Age in Excel — DATEDIF, YEARFRAC & Quick Method | Tulyro",
    seoDescription:
      "DATEDIF gives exact years, months and days: =DATEDIF(A2,TODAY(),\"Y\"). YEARFRAC gives decimals. Plus the 30-second rough method and the errors everyone hits.",
    href: "/guides/calculate-age-in-excel/",
    intro: [
      <>
        Put the date of birth in A2. Then pick your formula. =DATEDIF(A2,TODAY(),&quot;Y&quot;) gives
        exact years. =YEARFRAC(A2,TODAY(),1) gives a decimal like 36.33. And =INT((TODAY()-A2)/365.25)
        gives a rough answer in five seconds. The rest of this guide is worked examples and the three
        errors everyone hits the first time.
      </>,
    ],
    cta: { label: "Try the Age Calculator", href: "/calculators/age-calculator/" },
    sections: [
      {
        heading: "Formula 1: DATEDIF — the exact one",
        body: [
          <>
            DATEDIF is Excel&apos;s worst-kept secret. It does not appear in the function list, but it
            has worked in every modern Excel and in Google Sheets for years. It counts complete units
            between two dates:
          </>,
          <>
            =DATEDIF(A2,TODAY(),&quot;Y&quot;) gives full years. =DATEDIF(A2,TODAY(),&quot;YM&quot;)
            gives leftover months after those years. =DATEDIF(A2,TODAY(),&quot;MD&quot;) gives leftover
            days after those months. Three calls, one exact age.
          </>,
          <>
            Worked example. A2 holds 15 June 1990, and today is 15 October 2026.
            =DATEDIF(A2,TODAY(),&quot;Y&quot;) returns 36. =DATEDIF(A2,TODAY(),&quot;YM&quot;) returns
            4. =DATEDIF(A2,TODAY(),&quot;MD&quot;) returns 0. Thirty-six years, four months, zero days.
            Exact, leap days handled, no drama.
          </>,
        ],
      },
      {
        heading: "Formula 2: YEARFRAC — the decimal one",
        body: [
          <>
            =YEARFRAC(A2,TODAY(),1) returns the age as a decimal number of years. For the same dates it
            gives about 36.33. The third argument, 1, tells Excel to count actual days, which keeps
            leap years honest.
          </>,
          <>
            Use this when you need a fraction, not a birthday-style answer: pro-rata calculations,
            precise tenure math, anything where &quot;36 years and 4 months&quot; is not granular
            enough. For anything a human will read, DATEDIF&apos;s years-months-days reads better.
          </>,
        ],
      },
      {
        heading: "Formula 3: the 30-second rough one",
        body: [
          <>
            =INT((TODAY()-A2)/365.25). Subtract the dates to get days, divide by the average year
            length, chop the decimal. For our example it gives 36. Fast, memorable, and wrong near
            birthdays: the average smears leap days across years that never had them, so it can land a
            day off right when accuracy matters most.
          </>,
          <>
            Fine for trivia. Not fine for forms, payroll, or anything official. I explain why the
            average fails in{" "}
            <Link href="/guides/how-to-calculate-age-in-days/" className="text-primary underline">
              How to Calculate Your Age in Days
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "Combine them: one cell, full answer",
        body: [
          <>
            String the three DATEDIF calls together and one cell reads like a person:
          </>,
          <>
            =DATEDIF(A2,TODAY(),&quot;Y&quot;)&amp;&quot; years, &quot;&amp;DATEDIF(A2,TODAY(),&quot;YM&quot;)&amp;&quot;
            months, &quot;&amp;DATEDIF(A2,TODAY(),&quot;MD&quot;)&amp;&quot; days&quot;
          </>,
          <>
            For 15 June 1990 that cell shows &ldquo;36 years, 4 months, 0 days&rdquo;. Copy it down a
            column of birth dates and you have an age list in seconds.
          </>,
        ],
      },
      {
        heading: "Three errors everyone hits",
        body: [
          <>
            #NUM! means the start date is after the end date. Usually the &quot;date of birth&quot;
            cell holds a future date, or the arguments are backwards. DATEDIF(A2,TODAY(),...) needs
            the birth date first.
          </>,
          <>
            The second error is dates stored as text. If A2 looks like a date but formulas ignore it,
            Excel is seeing text, not a date. Select the column, use Text to Columns, and finish as a
            date. Or wrap it: =DATEDIF(DATEVALUE(A2),TODAY(),&quot;Y&quot;).
          </>,
          <>
            The third is the American-versus-rest-of-world date order. 06/07/1990 is June 7 in the US
            and July 6 almost everywhere else. If ages come out a month off, check how Excel parsed the
            date, not the formula.
          </>,
        ],
      },
      {
        heading: "As of a specific date, not today",
        body: [
          <>
            Replace TODAY() with the date you care about. =DATEDIF(A2,&quot;2026-01-01&quot;,&quot;Y&quot;)
            gives the age on 1 January 2026. Put that target date in its own cell, say B2, and write
            =DATEDIF(A2,B2,&quot;Y&quot;). Now changing B2 recalculates every age in the sheet. This is
            how HR sheets answer &ldquo;how old was everyone on the policy start date&rdquo; without
            touching a single formula.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why doesn't DATEDIF appear in Excel's function list?",
        answer:
          "Microsoft never documented it, but it works in all modern Excel versions and Google Sheets. Type it manually; autocomplete may not suggest it.",
      },
      {
        question: "Which formula is the most accurate?",
        answer:
          "DATEDIF with Y, YM and MD units. It counts real calendar units including leap days. YEARFRAC is precise as a decimal but less readable. The /365.25 shortcut can drift by a day near birthdays.",
      },
      {
        question: "How do I calculate age as of a past date?",
        answer:
          "Replace TODAY() with that date: =DATEDIF(A2,\"2026-01-01\",\"Y\"). Better, put the target date in a cell like B2 and use =DATEDIF(A2,B2,\"Y\").",
      },
      {
        question: "Why do I get a #NUM! error?",
        answer:
          "The start date is after the end date. Check that the birth date comes first and is not in the future, and that Excel parsed it as a real date, not text.",
      },
      {
        question: "Do these formulas work in Google Sheets?",
        answer:
          "Yes. DATEDIF, YEARFRAC and TODAY() all work in Google Sheets exactly as shown here.",
      },
    ],
    related: ["age-calculator", "bmi-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "is-bmi-accurate",
    title: "Is BMI Accurate? What the Number Can't Tell You",
    seoTitle: "Is BMI Accurate? Limitations & What Doctors Use Instead | Tulyro",
    seoDescription:
      "BMI is a screening tool, not a diagnosis. It misreads athletes, older adults, and muscular builds. What it gets right, where it fails, and what doctors check instead.",
    href: "/guides/is-bmi-accurate/",
    intro: [
      <>
        BMI is weight in kilograms divided by height in metres squared. One division, one number, and
        an entire industry of arguments. Here is the honest version: BMI is a decent screening tool
        and a bad diagnosis. It is right often enough to be useful and wrong often enough that no
        doctor should use it alone. This guide shows where it fails, with numbers, and what gets
        checked instead.
      </>,
    ],
    cta: { label: "Try the BMI Calculator", href: "/calculators/bmi-calculator/" },
    sections: [
      {
        heading: "What the number means",
        body: [
          <>
            BMI = weight (kg) ÷ height (m)². A person who weighs 70 kg at 1.75 m: 1.75² = 3.0625, and
            70 ÷ 3.0625 = 22.9. To run the maths yourself, see{" "}
            <Link href="/guides/how-to-calculate-bmi/" className="text-primary underline">
              How to Calculate BMI by Hand
            </Link>
            , which works through metric and imperial examples step by step. The standard bands, from
            the World Health Organization: below 18.5 is underweight, 18.5 to 24.9 is the normal
            range, 25 to 29.9 is overweight, 30 and above is obesity. So 22.9 sits comfortably in the
            normal band.
          </>,
          <>
            Those bands were drawn from population data, which matters more than it sounds. They
            describe where risk rises across large groups, not where your personal danger starts. Keep
            that distinction. It explains nearly every argument about BMI.
          </>,
        ],
      },
      {
        heading: "What BMI gets right",
        body: [
          <>
            It is cheap, instant, and needs nothing but a scale and a tape measure. Across populations,
            higher BMI tracks with higher risk of the diseases everyone worries about. As a first
            filter, a way to flag who deserves a closer look, it does its job. Public health runs on
            tools like this because the perfect measurement, applied to nobody, helps nobody.
          </>,
        ],
      },
      {
        heading: "Where it fails: muscle",
        body: [
          <>
            BMI cannot see the difference between a kilogram of muscle and a kilogram of fat. Take an
            athlete: 90 kg at 1.80 m. 1.80² = 3.24, and 90 ÷ 3.24 = 27.8. The bands call that
            overweight, bordering on obesity. Look at the person and the label is absurd. This is the
            most common way BMI is &ldquo;wrong&rdquo;, and it is not a rare edge case. Anyone who
            lifts seriously, plays a power sport, or does physical labour can land here.
          </>,
          <>
            The reverse happens too. Someone with little muscle and a soft middle can sit at 23, inside
            the normal band, while carrying the exact belly fat the bands are supposed to warn about.
            The number said fine. The mirror disagrees. Researchers call this normal-weight obesity,
            and it is the quiet failure mode nobody posts about.
          </>,
        ],
      },
      {
        heading: "Where it fails: age and build",
        body: [
          <>
            Muscle melts with age. Two people can share a BMI of 26 while one is a fit 30-year-old and
            the other is a 70-year-old who has lost a third of their muscle. Same number, very
            different bodies, very different risk. BMI has no age dial.
          </>,
          <>
            Build matters across populations as well. Research, including World Health Organization
            consultations on Asian populations, has suggested that health risks can rise at lower BMI
            values for some groups, with lower trigger points discussed than the standard 25 and 30.
            One global formula was never going to fit every body. Treat the bands as a starting point
            calibrated on averages, not a personal verdict.
          </>,
        ],
      },
      {
        heading: "What doctors actually check",
        body: [
          <>
            When a doctor looks past BMI, the next measurement is usually the waist. Belly fat is the
            risky kind, and a tape measure finds it directly. A widely used rule of thumb: keep your
            waist under half your height. At 175 cm tall, that means a waist under 87.5 cm. It is not
            official WHO gospel, but many clinicians use it because it catches the normal-weight
            obesity case that BMI misses.
          </>,
          <>
            After that come the measurements BMI was always a proxy for: blood pressure, blood sugar,
            cholesterol and triglycerides, and sometimes a body-fat percentage via calipers or a scan.
            Notice what happened. The single number became five numbers. That is the real answer to
            &ldquo;is BMI accurate&rdquo;: it was never supposed to be the whole checkup.
          </>,
        ],
      },
      {
        heading: "So should you ignore your BMI?",
        body: [
          <>
            No. Use it as a flag, not a verdict. If your BMI is 22.9, the flag is down; carry on. If it
            is 31, the flag is up; the correct response is a checkup, not an argument with the
            formula. And if you are the athlete at 27.8 who trains five days a week, you already know
            the number is misreading you. The failure mode to actually worry about is the quiet one:
            a &ldquo;normal&rdquo; BMI with a growing waistline.
          </>,
          <>
            Run your own numbers on our{" "}
            <Link href="/calculators/bmi-calculator/" className="text-primary underline">
              BMI Calculator
            </Link>
            , then read the result the way this guide suggests: as the start of a question, not the
            end of one.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can a BMI calculator be wrong?",
        answer:
          "It can mislead. BMI cannot distinguish muscle from fat, so athletes and muscular builds score too high, and older adults losing muscle can score normal while carrying risky belly fat. It is a screening flag, not a diagnosis.",
      },
      {
        question: "Why do athletes have high BMI?",
        answer:
          "Muscle is dense. A 90 kg athlete at 1.80 m has a BMI of 27.8, labelled overweight, despite low body fat. The formula sees weight, not composition.",
      },
      {
        question: "What is a good BMI?",
        answer:
          "The WHO normal band is 18.5 to 24.9. But pair it with a waist check: keep your waist under half your height. A normal BMI with a large waist still deserves attention.",
      },
      {
        question: "What should I use instead of BMI?",
        answer:
          "Waist circumference and waist-to-height ratio catch what BMI misses. For a full picture, doctors add blood pressure, blood sugar, and cholesterol. No single number replaces that set.",
      },
      {
        question: "Do doctors still use BMI?",
        answer:
          "Yes, as a first screen. It is fast and cheap. A good doctor treats an out-of-range BMI as a reason to investigate, never as the final word.",
      },
    ],
    related: ["bmi-calculator", "age-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI by Hand: Formula, Examples, Metric and Imperial",
    seoTitle: "How to Calculate BMI Manually (kg/m² & lb/in) With Examples | Tulyro",
    seoDescription:
      "BMI = weight ÷ height². Worked examples in kilograms and pounds, the WHO bands explained, and the mistakes that give wrong numbers.",
    href: "/guides/how-to-calculate-bmi/",
    intro: [
      <>
        Body Mass Index is one division problem. Weight divided by height squared. This guide shows
        the formula in both metric and imperial units, works through real numbers step by step, and
        flags the small mistakes — wrong units, rounding too early — that silently give the wrong
        answer.
      </>,
    ],
    cta: { label: "Try the BMI Calculator", href: "/calculators/bmi-calculator/" },
    sections: [
      {
        heading: "The formula",
        body: [
          <>
            In metric: BMI = weight in kilograms ÷ (height in metres)². In imperial: BMI = 703 ×
            weight in pounds ÷ (height in inches)². The 703 is a conversion constant, not a magic
            number — it folds the kg-to-lb and m-to-in conversions into one step.
          </>,
          <>
            One rule before you start: never mix units. Kilograms with centimetres, or pounds with
            feet, will give a confident-looking wrong answer. Convert first, then divide.
          </>,
        ],
      },
      {
        heading: "Worked example: metric",
        body: [
          <>
            A person weighs 70 kg and is 1.75 m tall. Step one, square the height: 1.75 × 1.75 =
            3.0625. Step two, divide: 70 ÷ 3.0625 = 22.857…, which rounds to 22.9. That sits in
            the normal band.
          </>,
          <>
            If your height is in centimetres, convert first: 175 cm = 1.75 m. Squaring 175 directly
            and dividing 70 by it gives 0.0023 — the classic unit-mix mistake.
          </>,
        ],
      },
      {
        heading: "Worked example: imperial",
        body: [
          <>
            A person weighs 154 lb and is 5 ft 9 in tall. Step one, height in inches: 5 × 12 + 9 =
            69 in. Step two, square it: 69 × 69 = 4,761. Step three: 703 × 154 = 108,262. Step
            four: 108,262 ÷ 4,761 = 22.74…, about 22.7. Same person, same answer as the metric
            version — as it should be.
          </>,
        ],
      },
      {
        heading: "Reading the result",
        body: [
          <>
            The World Health Organization bands: below 18.5 is underweight, 18.5–24.9 is normal,
            25–29.9 is overweight, 30 and above is obesity. These describe population-level risk,
            not a personal diagnosis — muscle, age, and build all shift what a number means for
            you specifically. For the full honest version, read{" "}
            <Link href="/guides/is-bmi-accurate/" className="text-primary underline">
              Is BMI Accurate? What the Number Can&apos;t Tell You
            </Link>
            .
          </>,
          <>
            Common mistakes that skew the number: weighing yourself after a meal or in heavy
            clothes (adds 1–2 kg), measuring height in shoes (adds 2–3 cm), and rounding height
            before squaring, which compounds the error. Measure morning, barefoot, light clothes.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "What is the BMI formula?",
        answer:
          "BMI = weight (kg) ÷ height (m)². In imperial units: BMI = 703 × weight (lb) ÷ height (in)². Both give the same result when the units are consistent.",
      },
      {
        question: "How do I calculate BMI with feet and inches?",
        answer:
          "Convert height fully to inches first (feet × 12 + inches), square that number, then compute 703 × weight in pounds ÷ height-in-inches². For 5 ft 9 in at 154 lb: 703 × 154 ÷ 69² ≈ 22.7.",
      },
      {
        question: "What is a normal BMI?",
        answer:
          "The WHO normal band is 18.5 to 24.9. It is a screening range, not a health certificate — pair it with a waist check (keep waist under half your height) for a fuller picture.",
      },
      {
        question: "Why is my hand calculation different from an online calculator?",
        answer:
          "Almost always a unit mix (cm instead of m, feet instead of inches) or rounding height before squaring. Redo it converting to metres or inches first, and round only the final answer.",
      },
      {
        question: "Is the 703 in the imperial formula exact?",
        answer:
          "It is exact enough: 703 comes from converting kg/m² to lb/in² (453.592 g per lb and 0.0254 m per inch). Using it gives results matching the metric formula to one decimal place.",
      },
    ],
    related: ["bmi-calculator", "age-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-many-words-per-page",
    title: "How Many Words Fit on a Page?",
    seoTitle: "How Many Words Fit on a Page? — Single vs Double-Spaced Counts | Tulyro",
    seoDescription:
      "About 500 words on a single-spaced page, about 250 double-spaced (12pt type, 1-inch margins). See the line-by-line math, font differences, and the manuscript standard.",
    href: "/guides/how-many-words-per-page/",
    intro: [
      <>
        About 500 words on a single-spaced page, about 250 on a double-spaced one, assuming 12-point
        type and 1-inch margins. Those two numbers answer most people&apos;s question. The rest of
        this guide shows where they come from, when they break down, and how to convert any word count
        into a page count without guessing.
      </>,
    ],
    cta: { label: "Try the Word Counter", href: "/text/word-counter/" },
    sections: [
      {
        heading: "The short answer",
        body: [
          <>
            These are standard estimates for 12-point type with 1-inch margins on all sides. They are
            rounded on purpose; real documents vary, and the next sections explain exactly why.
          </>,
          <div key="words-per-page-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Format</th>
                <th className="border border-outline-variant/60 p-3">Words per page (approx.)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Single-spaced (12pt)</td><td className="border border-outline-variant/60 p-3">500</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Double-spaced (12pt)</td><td className="border border-outline-variant/60 p-3">250</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">1.5-spaced (12pt)</td><td className="border border-outline-variant/60 p-3">320</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Manuscript: Courier 12pt, double-spaced</td><td className="border border-outline-variant/60 p-3">250</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Printed trade paperback page</td><td className="border border-outline-variant/60 p-3">300&ndash;350</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Handwritten page</td><td className="border border-outline-variant/60 p-3">250</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Where 500 and 250 come from",
        body: [
          <>
            Take a US Letter page with 1-inch margins. The printable area is 6.5 inches wide by 9
            inches tall. Twelve-point Times New Roman set single-spaced has a line height of about
            14.4 points, so the page fits 9 × 72 ÷ 14.4 = 45 lines. A full line holds roughly 65
            characters, and the average English word is about 5 characters plus a space, so each line
            carries around 10.6 words. Multiply: 45 × 10.6 ≈ 480, which everyone rounds to 500.
          </>,
          <>
            Double-spacing halves the line count to about 22.5, and the same arithmetic lands near
            240, rounded to 250. A4 paper is a little taller, so the same setup fits about 48 lines
            and comes out near 516 words single-spaced &mdash; close enough that nobody uses a
            separate rule for it. The two headline numbers are not decreed by any authority. They are
            just what the geometry works out to, which is why they have survived for decades.
          </>,
        ],
      },
      {
        heading: "What moves the number",
        body: [
          <>
            Font matters more than most people expect. A narrow font like Times New Roman packs about
            65 characters per line; a wider font like Arial fits noticeably fewer, so a page of Arial
            holds fewer words at the same size. Courier New is the predictable one: 12-point Courier
            is exactly 10 characters per inch, so 6.5 inches of line width is exactly 65 characters
            every line. Double-spaced, that is 22.5 × 10.6 ≈ 240 words &mdash; which is where the
            manuscript world&apos;s 250-word page comes from, as you will see below.
          </>,
          <>
            Margins move it too. Shrink the margins from 1 inch to half an inch on a Letter page and
            the text block becomes 7.5 by 10 inches: 50 lines × about 12.3 words per line ≈ 615
            words, roughly 30% more than the standard page. Line spacing does the opposite by
            definition: 1.5-spacing gives 45 ÷ 1.5 = 30 lines, or about 320 words a page. And font
            size multiplies everything &mdash; 10-point type fits roughly 20% more words than 12-point
            in the same block.
          </>,
          <>
            The honest takeaway: any words-per-page figure is an estimate tied to its assumptions. If
            someone quotes you a number, ask what font, size, margins, and spacing it assumed. Two
            people can both be right about different numbers for exactly this reason.
          </>,
          <>
            One more thing eats space without adding words: whitespace. Paragraph breaks, subheadings,
            and bullet lists all consume lines that carry no words. A page of short paragraphs with
            frequent subheadings can hold a fifth fewer words than the table above claims, and
            dialogue-heavy fiction runs lighter than narration for the same reason. Dense,
            paragraph-style prose is the best case for the headline numbers; anything with visible
            structure lands below them.
          </>,
        ],
      },
      {
        heading: "Manuscripts and books: the 250-word page",
        body: [
          <>
            The publishing industry standardised this long ago. A manuscript page means 12-point
            Courier New, double-spaced, 1-inch margins, and it is counted as 250 words. Editors,
            agents, and word processors use this page to estimate a book&apos;s length before it is
            typeset, because it does not depend on anyone&apos;s particular word choice. A 100,000-word
            novel is 400 manuscript pages. An 80,000-word novel is 320.
          </>,
          <>
            The printed book page is denser. A trade paperback page typically holds 300 to 350 words,
            so that 80,000-word novel comes out at roughly 230 to 270 printed pages before front
            matter. If you ever wondered how a manuscript becomes a bookstore book, this is most of
            the conversion: 250 words a page going in, 300-plus coming out.
          </>,
        ],
      },
      {
        heading: "Word counts to page counts, in practice",
        body: [
          <>
            With the math above, common conversions are straightforward. A 1,000-word essay is about
            2 single-spaced pages, or about 4 double-spaced. Five thousand words is roughly 10
            single-spaced pages or 21 double-spaced. Ten thousand words is about 21 single-spaced
            pages, or 42 double-spaced &mdash; which is also exactly 40 manuscript pages at the
            standard 250 words a page.
          </>,
          <>
            If you are working from a word count rather than toward one, stop guessing and measure.
            Paste the text into our{" "}
            <Link href="/text/word-counter/" className="text-primary underline">
              free word counter
            </Link>
            , get the exact count, and divide by the words-per-page figure that matches your
            formatting. It takes ten seconds and beats every rule of thumb on this page.
          </>,
        ],
      },
      {
        heading: "When the page stops mattering",
        body: [
          <>
            Some formats have no fixed pages at all. E-books reflow to the screen, which is why
            e-readers report &ldquo;locations&rdquo; instead of pages. Web articles are measured in
            scroll depth or reading time, not pages. A useful yardstick: adults read about 200 to
            250 words per minute, so 1,000 words is roughly four and a half minutes of reading. That
            often answers the real question behind &ldquo;how many pages&rdquo; &mdash; the writer
            wants to know whether the piece feels long or short.
          </>,
          <>
            For that, listening beats counting. Paste the draft into a{" "}
            <Link href="/text/text-to-speech/" className="text-primary underline">
              text-to-speech tool
            </Link>{" "}
            and hear it read back. If a section drags at four minutes of listening, it will drag on
            the page too, whatever the page count says.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do teachers say 500 words equals one page?",
        answer:
          "They mean a single-spaced page in 12-point type with 1-inch margins, which holds about 480 words by the line-by-line math (45 lines × ~10.6 words). It is a fair rule of thumb for that exact setup.",
      },
      {
        question: "How many words are on a double-spaced page?",
        answer:
          "About 250. Double-spacing halves the line count from roughly 45 to 22.5 lines per page, so the word count halves too. This is also the publishing industry's standard manuscript page (Courier New 12pt, double-spaced).",
      },
      {
        question: "How many pages is 2,000 words?",
        answer:
          "About 4 pages single-spaced, or about 8 pages double-spaced, at 12pt with 1-inch margins. As manuscript pages (250 words each), 2,000 words is exactly 8 pages.",
      },
      {
        question: "Does the font really change the word count per page?",
        answer:
          "Yes. Narrow fonts like Times New Roman fit more words per line than wider fonts like Arial at the same size. Courier New 12pt is exactly 10 characters per inch, which is why manuscript pages are so predictable.",
      },
      {
        question: "How many handwritten pages is 500 words?",
        answer:
          "Roughly two handwritten pages. Handwriting varies a lot, but around 250 words per page is a reasonable estimate for medium-sized handwriting on lined paper.",
      },
      {
        question: "Do e-books have a fixed number of words per page?",
        answer:
          "No. E-books reflow to fit the screen and font size the reader chooses, so page counts change. E-readers use 'locations' instead of fixed pages for this reason.",
      },
    ],
    related: ["word-counter", "text-to-speech"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
];

export function getGuide(slug: string): Guide {
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) {
    throw new Error(`Unknown guide: ${slug}`);
  }
  return guide;
}
