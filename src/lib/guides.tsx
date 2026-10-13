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
            if the loan is a US-dollar home loan instead.
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
            shortcuts.
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
            disagree, they do not. Same inputs, same answer, different clothes.
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
];

export function getGuide(slug: string): Guide {
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) {
    throw new Error(`Unknown guide: ${slug}`);
  }
  return guide;
}
