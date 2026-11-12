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
        heading: "How does the EMI formula work?",
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
        heading: "Month by month: where each ₹8,884.88 goes",
        body: [
          <>
            Same loan, split open. Each month the interest is 1% of what you still owe, the rest of
            the EMI repays principal, and the balance falls. Watch the two middle columns trade
            places: month 1 is mostly interest, month 12 is almost all principal.
          </>,
          <div key="emi-amortization-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Month</th>
                <th className="border border-outline-variant/60 p-3">Interest</th>
                <th className="border border-outline-variant/60 p-3">Principal repaid</th>
                <th className="border border-outline-variant/60 p-3">Balance left</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">1</td><td className="border border-outline-variant/60 p-3">₹1,000.00</td><td className="border border-outline-variant/60 p-3">₹7,884.88</td><td className="border border-outline-variant/60 p-3">₹92,115.12</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">2</td><td className="border border-outline-variant/60 p-3">₹921.15</td><td className="border border-outline-variant/60 p-3">₹7,963.73</td><td className="border border-outline-variant/60 p-3">₹84,151.39</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">3</td><td className="border border-outline-variant/60 p-3">₹841.51</td><td className="border border-outline-variant/60 p-3">₹8,043.36</td><td className="border border-outline-variant/60 p-3">₹76,108.03</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">4</td><td className="border border-outline-variant/60 p-3">₹761.08</td><td className="border border-outline-variant/60 p-3">₹8,123.80</td><td className="border border-outline-variant/60 p-3">₹67,984.23</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">5</td><td className="border border-outline-variant/60 p-3">₹679.84</td><td className="border border-outline-variant/60 p-3">₹8,205.04</td><td className="border border-outline-variant/60 p-3">₹59,779.19</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">6</td><td className="border border-outline-variant/60 p-3">₹597.79</td><td className="border border-outline-variant/60 p-3">₹8,287.09</td><td className="border border-outline-variant/60 p-3">₹51,492.11</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">7</td><td className="border border-outline-variant/60 p-3">₹514.92</td><td className="border border-outline-variant/60 p-3">₹8,369.96</td><td className="border border-outline-variant/60 p-3">₹43,122.15</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">8</td><td className="border border-outline-variant/60 p-3">₹431.22</td><td className="border border-outline-variant/60 p-3">₹8,453.66</td><td className="border border-outline-variant/60 p-3">₹34,668.49</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">9</td><td className="border border-outline-variant/60 p-3">₹346.68</td><td className="border border-outline-variant/60 p-3">₹8,538.19</td><td className="border border-outline-variant/60 p-3">₹26,130.30</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">10</td><td className="border border-outline-variant/60 p-3">₹261.30</td><td className="border border-outline-variant/60 p-3">₹8,623.58</td><td className="border border-outline-variant/60 p-3">₹17,506.72</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">11</td><td className="border border-outline-variant/60 p-3">₹175.07</td><td className="border border-outline-variant/60 p-3">₹8,709.81</td><td className="border border-outline-variant/60 p-3">₹8,796.91</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">12</td><td className="border border-outline-variant/60 p-3">₹87.97</td><td className="border border-outline-variant/60 p-3">₹8,796.91</td><td className="border border-outline-variant/60 p-3">₹0.00</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The columns add up: total interest ₹6,618.55, total paid ₹1,06,618.55, balance zero at the
            end. This is the schedule your lender calls an amortisation table, computed here from the
            same example above — the version from a real lender can differ by a few paise from rounding, and
            by more once fees or a floating rate enter the picture.
          </>,
          <>
            Over 12 months the shift is gentle: month 1 is ₹1,000 of interest, month 12 is ₹87.97.
            Stretch the same maths over a 30-year home loan and the shift turns extreme — most early
            payments go to interest and barely touch the principal. See{" "}
            <Link href="/guides/how-mortgage-amortization-works/" className="text-primary underline">
              how mortgage amortization works
            </Link>
            .
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
        heading: "What if the interest rate is zero?",
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
        heading: "What does the formula leave out?",
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
        heading: "When should you skip the hand math?",
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
        heading: "Why does dividing by 365.25 give the wrong age?",
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
        heading: "What if you were born on 29 February?",
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
        calculator. Try the numbers on our{" "}
        <Link href="/calculators/cgpa-to-percentage/" className="text-primary underline">
          free CGPA to Percentage Calculator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the CGPA Calculator", href: "/calculators/cgpa-to-percentage/" },
    sections: [
      {
        heading: "What is the CGPA to percentage formula?",
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
        heading: "Where did 9.5 come from?",
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
        heading: "Why is it only an estimate?",
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
        heading: "What if your institution disagrees?",
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
        heading: "What does 9.5 get wrong at the edges?",
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
        heading: "What should you submit with an application?",
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
            monthly figure. A payment that feels affordable can still be an expensive loan. Early
            payments go mostly to interest and only later ones cut the principal — see{" "}
            <Link href="/guides/how-mortgage-amortization-works/" className="text-primary underline">
              how mortgage amortization works
            </Link>
            .
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
        heading: "What do both leave out?",
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
        heading: "Which calculator should you use?",
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
    seoTitle: "EMI Calculator Checks — 5 Tests Before Trusting One | Tulyro",
    seoDescription:
      "Same formula everywhere — what differs is total interest, amortization view and prepayment. Five checks that separate honest EMI calculators from traps.",
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
    seoTitle: "Calculate Age in Excel — DATEDIF & YEARFRAC | Tulyro",
    seoDescription:
      "DATEDIF gives exact years, months and days: =DATEDIF(A2,TODAY(),\"Y\"). YEARFRAC gives decimals. Plus the 30-second rough method and common errors.",
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
    seoTitle: "Is BMI Accurate? Limits & Better Checks | Tulyro",
    seoDescription:
      "BMI is a screening tool, not a diagnosis. It misreads athletes, older adults and muscular builds. What it gets right, where it fails, and better checks.",
    href: "/guides/is-bmi-accurate/",
    intro: [
      <>
        BMI is weight in kilograms divided by height in metres squared. One division, one number, and
        an entire industry of arguments. Here is the honest version: BMI is a decent screening tool
        and a bad diagnosis. It is right often enough to be useful and wrong often enough that no
        doctor should use it alone. This guide shows where it fails, with numbers, and what gets
        checked instead. You can check your own number on our{" "}
        <Link href="/calculators/bmi-calculator/" className="text-primary underline">
          Indian &amp; WHO BMI Calculator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the BMI Calculator", href: "/calculators/bmi-calculator/" },
    sections: [
      {
        heading: "What does the number mean?",
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
        heading: "What does BMI get right?",
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
        heading: "What do doctors actually check?",
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
    seoTitle: "How to Calculate BMI — Metric & Imperial | Tulyro",
    seoDescription:
      "BMI = weight ÷ height². Worked examples in kilograms and pounds, the WHO bands explained, and the mistakes that give wrong numbers.",
    href: "/guides/how-to-calculate-bmi/",
    intro: [
      <>
        Body Mass Index is one division problem. Weight divided by height squared. This guide shows
        the formula in both metric and imperial units, works through real numbers step by step, and
        flags the small mistakes — wrong units, rounding too early — that silently give the wrong
        answer. Run your numbers on our{" "}
        <Link href="/calculators/bmi-calculator/" className="text-primary underline">
          Indian &amp; WHO BMI Calculator
        </Link>{" "}
        as you follow along.
      </>,
    ],
    cta: { label: "Try the BMI Calculator", href: "/calculators/bmi-calculator/" },
    sections: [
      {
        heading: "What is the BMI formula?",
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
        heading: "How do I read the result?",
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
          <div key="bmi-bands-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Category</th>
                <th className="border border-outline-variant/60 p-3">WHO global bands</th>
                <th className="border border-outline-variant/60 p-3">Indian / Asian (ICMR) bands</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Underweight</td><td className="border border-outline-variant/60 p-3">Below 18.5</td><td className="border border-outline-variant/60 p-3">Below 18.5</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Normal</td><td className="border border-outline-variant/60 p-3">18.5–24.9</td><td className="border border-outline-variant/60 p-3">18.5–22.9</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Overweight</td><td className="border border-outline-variant/60 p-3">25.0–29.9</td><td className="border border-outline-variant/60 p-3">23.0–24.9</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Obese</td><td className="border border-outline-variant/60 p-3">30.0 and above</td><td className="border border-outline-variant/60 p-3">25.0 and above</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The Indian/Asian scale exists because health risks in Asian populations tend to rise at
            lower BMI values than in European populations, so the action thresholds sit lower. The
            worked examples above — 22.9 and 22.7 — are normal on both scales, but a BMI of 24
            would be normal on the WHO scale and overweight on the Indian/Asian scale. The{" "}
            <Link href="/calculators/bmi-calculator/" className="text-primary underline">
              BMI Calculator
            </Link>{" "}
            lets you switch scales to see both readings. Whichever scale you use, mention it when
            discussing the result with a health professional rather than reinterpreting the
            category yourself.
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
    seoTitle: "How Many Words Per Page? Spacing Counts | Tulyro",
    seoDescription:
      "About 500 words fill a single-spaced page, about 250 double-spaced (12pt, 1-inch margins). Line-by-line math, font differences and the manuscript standard.",
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
        heading: "Where do 500 and 250 come from?",
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
        heading: "What moves the number?",
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
  {
    slug: "how-to-create-gst-compliant-invoice-india",
    title: "How to Create a GST-Compliant Invoice in India (Mandatory Fields & Format)",
    seoTitle: "GST Invoice in India — Rule 46 Checklist | Tulyro",
    seoDescription:
      "All 16 mandatory fields under CGST Rule 46 for a valid GST tax invoice, how to split CGST/SGST vs IGST, and a worked ₹50,000 invoice example.",
    href: "/guides/how-to-create-gst-compliant-invoice-india/",
    intro: [
      <>
        A GST tax invoice is not a receipt with a logo. Under Rule 46 of the CGST Rules 2017, a valid
        tax invoice must carry 16 specific fields — miss one, and your buyer cannot claim input tax
        credit on their GSTR-3B. This guide lists every field, shows how CGST/SGST and IGST split,
        and works through a real ₹50,000 example. Then build the invoice itself in under a minute
        with our{" "}
        <Link href="/tools/invoice-generator/" className="text-primary underline">
          free browser-based Invoice Generator
        </Link>
        , which runs entirely on your device with no signup.
      </>,
    ],
    cta: { label: "Try the Invoice Generator", href: "/tools/invoice-generator/" },
    sections: [
      {
        heading: "The 16 Mandatory Fields Under CGST Rule 46",
        body: [
          <>
            Rule 46 of the CGST Rules 2017 lists what a tax invoice must contain. The table below is
            the checklist — run your invoice against it before sending.
          </>,
          <div key="rule-46-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">#</th>
                <th className="border border-outline-variant/60 p-3">Field</th>
                <th className="border border-outline-variant/60 p-3">What goes on the invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">1</td><td className="border border-outline-variant/60 p-3">Supplier details</td><td className="border border-outline-variant/60 p-3">Legal name, trade name, registered billing address</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">2</td><td className="border border-outline-variant/60 p-3">Supplier GSTIN</td><td className="border border-outline-variant/60 p-3">15-character alphanumeric GSTIN</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">3</td><td className="border border-outline-variant/60 p-3">Invoice serial number</td><td className="border border-outline-variant/60 p-3">Consecutive, max 16 characters, letters/digits/hyphen/slash only, unique per financial year</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">4</td><td className="border border-outline-variant/60 p-3">Date of issue</td><td className="border border-outline-variant/60 p-3">The date the invoice is issued</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">5</td><td className="border border-outline-variant/60 p-3">Recipient details</td><td className="border border-outline-variant/60 p-3">Name, billing address, and delivery address</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">6</td><td className="border border-outline-variant/60 p-3">Recipient GSTIN / UIN</td><td className="border border-outline-variant/60 p-3">Mandatory for B2B supplies — the buyer needs it to claim input tax credit</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">7</td><td className="border border-outline-variant/60 p-3">Place of supply</td><td className="border border-outline-variant/60 p-3">State name + 2-digit state code, e.g. 07 Delhi, 27 Maharashtra</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">8</td><td className="border border-outline-variant/60 p-3">HSN / SAC code</td><td className="border border-outline-variant/60 p-3">4 digits when turnover is up to ₹5 crore (B2B; optional for B2C), 6 digits above ₹5 crore — Notification 78/2020</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">9</td><td className="border border-outline-variant/60 p-3">Item description &amp; quantity</td><td className="border border-outline-variant/60 p-3">Description plus quantity with its Unique Quantity Code (UQC) for goods</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">10</td><td className="border border-outline-variant/60 p-3">Total &amp; taxable value</td><td className="border border-outline-variant/60 p-3">Gross value and net taxable value after discounts</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">11</td><td className="border border-outline-variant/60 p-3">GST rate</td><td className="border border-outline-variant/60 p-3">Rate % — 0%, 5%, 18% or 40% since 22 September 2025 (GST 2.0); IT, design and consulting services are typically 18%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">12</td><td className="border border-outline-variant/60 p-3">Tax split CGST / SGST vs IGST</td><td className="border border-outline-variant/60 p-3">Exact rupee amounts for each tax head (see the split below)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">13</td><td className="border border-outline-variant/60 p-3">Reverse charge indicator</td><td className="border border-outline-variant/60 p-3">Yes/No — whether tax is payable under reverse charge (RCM)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">14</td><td className="border border-outline-variant/60 p-3">Shipping address</td><td className="border border-outline-variant/60 p-3">If different from the billing address</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">15</td><td className="border border-outline-variant/60 p-3">Invoice total in figures &amp; words</td><td className="border border-outline-variant/60 p-3">Total in ₹, written out in words, rounded per Section 170 of the CGST Act</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">16</td><td className="border border-outline-variant/60 p-3">Authorised signature</td><td className="border border-outline-variant/60 p-3">Physical signature or digital signature (DSC) of the supplier or authorised representative</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Should I charge CGST + SGST or IGST?",
        body: [
          <>
            The split depends on where the buyer is. Intra-state supply — same state on both sides,
            say Delhi (07) to Delhi (07) — splits the tax: 18% becomes 9% CGST + 9% SGST. Inter-state
            supply — Delhi (07) to Karnataka (29) or Maharashtra (27) — charges a single 18% IGST
            instead. The rate is the same; only the heads change, and the place of supply (field 7)
            decides which one applies.
          </>,
          <>
            Export of services is zero-rated: 0% IGST with a Letter of Undertaking (LUT), and the
            invoice carries the endorsement &ldquo;Supply meant for export under Letter of Undertaking
            without payment of integrated tax.&rdquo;
          </>,
        ],
      },
      {
        heading: "Worked Example: ₹50,000 Consulting/Software Invoice at 18% GST",
        body: [
          <>
            A freelancer bills ₹50,000 for software work (SAC 998314) at 18% GST. Here is how the
            same invoice looks in three situations:
          </>,
          <div key="gst-example-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Line</th>
                <th className="border border-outline-variant/60 p-3">Intra-state (Delhi → Delhi)</th>
                <th className="border border-outline-variant/60 p-3">Inter-state (Delhi → Karnataka)</th>
                <th className="border border-outline-variant/60 p-3">Unregistered freelancer (below ₹20 lakh)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Taxable value</td><td className="border border-outline-variant/60 p-3">₹50,000</td><td className="border border-outline-variant/60 p-3">₹50,000</td><td className="border border-outline-variant/60 p-3">₹50,000</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">CGST 9%</td><td className="border border-outline-variant/60 p-3">₹4,500</td><td className="border border-outline-variant/60 p-3">—</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">SGST 9%</td><td className="border border-outline-variant/60 p-3">₹4,500</td><td className="border border-outline-variant/60 p-3">—</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">IGST 18%</td><td className="border border-outline-variant/60 p-3">—</td><td className="border border-outline-variant/60 p-3">₹9,000</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Total</td><td className="border border-outline-variant/60 p-3">₹59,000</td><td className="border border-outline-variant/60 p-3">₹59,000</td><td className="border border-outline-variant/60 p-3">₹50,000</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The unregistered freelancer charges no GST at all — the invoice is a commercial invoice
            for ₹50,000 with no tax line. Never print a GST line on an invoice when you are not
            registered: charging tax you are not allowed to collect is a compliance problem, not a
            discount.
          </>,
        ],
      },
      {
        heading: "Tax Invoice vs. Bill of Supply",
        body: [
          <>
            Registered regular taxpayers issue a Tax Invoice and charge GST. Composition-scheme dealers
            and sellers of exempt goods or services issue a Bill of Supply instead — and a Bill of
            Supply cannot charge GST. Unregistered sellers below the ₹20 lakh services threshold issue
            a plain commercial invoice at 0% tax. The document name matters: a buyer who needs input
            tax credit cannot claim it from a Bill of Supply or a commercial invoice, however
            professional it looks.
          </>,
          <>
            Once the format is clear, the arithmetic is the easy part. If you are weighing a loan
            against the invoice you are about to raise, run the numbers on our{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>{" "}
            or the{" "}
            <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
              Mortgage Calculator
            </Link>
            . And remember: only businesses with turnover above ₹5 crore need IRN/QR e-invoices
            generated on the Invoice Registration Portal — everyone else issues the invoice directly.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can I generate a GST invoice without accounting software?",
        answer:
          "Yes. A valid GST invoice needs the 16 Rule 46 fields and a serial number of at most 16 characters. Only businesses with turnover above ₹5 crore need IRN/QR e-invoices generated on the Invoice Registration Portal; everyone else can issue the invoice directly.",
      },
      {
        question: "What is the character limit for a GST invoice number?",
        answer:
          "16 characters maximum, under Rule 46(b): letters, numerals, hyphen and slash only — for example INV/2026-27/0042. The number must be consecutive and unique for the financial year.",
      },
      {
        question: "Is it safe to create client invoices on online generator websites?",
        answer:
          "Server-based tools can store your client data. Tulyro's Invoice Generator is 100% client-side: the invoice is built in your browser and nothing is uploaded or stored.",
      },
      {
        question: "When do I charge CGST + SGST instead of IGST?",
        answer:
          "When supplier and buyer are in the same state, split the tax: 18% becomes 9% CGST + 9% SGST. When they are in different states, charge a single 18% IGST instead. The place of supply on the invoice decides which applies; the rate itself is the same either way.",
      },
    ],
    related: ["invoice-generator", "emi-calculator", "mortgage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-mortgage-amortization-works",
    title: "How Mortgage Amortization Works: Why Your Loan Balance Falls So Slowly at First",
    seoTitle: "Mortgage Amortization — Principal vs Interest | Tulyro",
    seoDescription:
      "Why most early mortgage payments go to interest: the two-step monthly formula, a worked $300,000 example, and a 15-year vs 30-year comparison.",
    href: "/guides/how-mortgage-amortization-works/",
    intro: [
      <>
        Thirty-six payments in, and the balance has barely moved. That is not a bank trick — it is
        reducing-balance amortization, the same maths behind every EMI. This guide shows why most of
        your early payments go to interest, works through a $300,000 example month by month, and
        compares a 15-year loan with a 30-year one. Model your own loan on our{" "}
        <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
          free Mortgage Calculator
        </Link>
        , or use the{" "}
        <Link href="/calculators/emi-calculator/" className="text-primary underline">
          Indian Loan EMI Calculator
        </Link>{" "}
        for rupee loans.
      </>,
    ],
    cta: { label: "Try the Mortgage Calculator", href: "/calculators/mortgage-calculator/" },
    sections: [
      {
        heading: "What Does Amortization Mean in a Home Loan?",
        body: [
          <>
            Amortization is the schedule that repays a loan in fixed monthly payments. Every payment
            has two components: the interest that accrued that month on the current unpaid balance,
            and the principal reduction — whatever is left of the payment after interest. Early on,
            the balance is large, so the interest component is large and the principal component is
            small. As the balance shrinks, the interest shrinks with it, and more of each payment
            goes to principal.
          </>,
        ],
      },
      {
        heading: "The Two-Step Monthly Amortization Formula",
        body: [
          <>
            Each month, two calculations happen in order. First, r = Annual Rate ÷ 12, and Interest
            = Current Balance × r. Second, Principal Paid = Monthly Payment − Interest. In month 1,
            the balance is 100% of the loan, so the payment is mostly interest. By month 300, the
            balance is small, so the same payment is mostly principal. Nothing about the payment
            changes — only the split does.
          </>,
        ],
      },
      {
        heading: "Worked Example: $300,000 Mortgage at 6.5% (30-Year)",
        body: [
          <>
            A $300,000 loan at 6.5% over 30 years costs $1,896.20 a month. Here is what the split
            looks like at milestones — every figure computed with the reducing-balance formula:
          </>,
          <div key="mortgage-milestones-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Milestone</th>
                <th className="border border-outline-variant/60 p-3">Starting balance</th>
                <th className="border border-outline-variant/60 p-3">Interest</th>
                <th className="border border-outline-variant/60 p-3">Principal</th>
                <th className="border border-outline-variant/60 p-3">% interest</th>
                <th className="border border-outline-variant/60 p-3">Ending balance</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Month 1</td><td className="border border-outline-variant/60 p-3">$300,000.00</td><td className="border border-outline-variant/60 p-3">$1,625.00</td><td className="border border-outline-variant/60 p-3">$271.20</td><td className="border border-outline-variant/60 p-3">85.7%</td><td className="border border-outline-variant/60 p-3">$299,728.80</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 60</td><td className="border border-outline-variant/60 p-3">$281,205.94</td><td className="border border-outline-variant/60 p-3">$1,523.20</td><td className="border border-outline-variant/60 p-3">$373.01</td><td className="border border-outline-variant/60 p-3">80.3%</td><td className="border border-outline-variant/60 p-3">$280,832.93</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 120</td><td className="border border-outline-variant/60 p-3">$254,844.18</td><td className="border border-outline-variant/60 p-3">$1,380.41</td><td className="border border-outline-variant/60 p-3">$515.80</td><td className="border border-outline-variant/60 p-3">72.8%</td><td className="border border-outline-variant/60 p-3">$254,328.38</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 233 (tipping point)</td><td className="border border-outline-variant/60 p-3">$174,739.06</td><td className="border border-outline-variant/60 p-3">$946.50</td><td className="border border-outline-variant/60 p-3">$949.70</td><td className="border border-outline-variant/60 p-3">49.9%</td><td className="border border-outline-variant/60 p-3">$173,789.36</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 300</td><td className="border border-outline-variant/60 p-3">$98,276.36</td><td className="border border-outline-variant/60 p-3">$532.33</td><td className="border border-outline-variant/60 p-3">$1,363.87</td><td className="border border-outline-variant/60 p-3">28.1%</td><td className="border border-outline-variant/60 p-3">$96,912.49</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 360</td><td className="border border-outline-variant/60 p-3">$1,885.99</td><td className="border border-outline-variant/60 p-3">$10.22</td><td className="border border-outline-variant/60 p-3">$1,885.99</td><td className="border border-outline-variant/60 p-3">0.5%</td><td className="border border-outline-variant/60 p-3">$0.00</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The tipping point is month 233 — year 19, month 5. It takes nearly 20 years before more
            than half of each payment finally pays down the principal. After five years of payments,
            the balance has fallen by less than $20,000 of the original $300,000.
          </>,
        ],
      },
      {
        heading: "15-Year vs. 30-Year Mortgage",
        body: [
          <>
            Same $300,000 loan at 6.5%, two very different outcomes:
          </>,
          <div key="mortgage-15v30-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3"></th>
                <th className="border border-outline-variant/60 p-3">15-year</th>
                <th className="border border-outline-variant/60 p-3">30-year</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Installments</td><td className="border border-outline-variant/60 p-3">180</td><td className="border border-outline-variant/60 p-3">360 (+180)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Monthly payment</td><td className="border border-outline-variant/60 p-3">$2,613.32</td><td className="border border-outline-variant/60 p-3">$1,896.20 (−$717.12)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Month 1 principal share</td><td className="border border-outline-variant/60 p-3">37.8% ($988.32)</td><td className="border border-outline-variant/60 p-3">14.3% ($271.20)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Total interest</td><td className="border border-outline-variant/60 p-3">$170,397.98</td><td className="border border-outline-variant/60 p-3">$382,633.47 (+$212,235.49)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Total cost</td><td className="border border-outline-variant/60 p-3">$470,397.98</td><td className="border border-outline-variant/60 p-3">$682,633.47 (+45.1%)</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The 30-year loan lowers the monthly payment by about 27%, but more than doubles the
            interest. The 15-year loan builds equity 2.6 times faster from the very first payment.
            Which one is right depends on your cash flow — but the price of the lower payment should
            be a conscious choice, not a surprise at year 20. Before choosing a term, check what
            payment your income actually supports in our guide to{" "}
            <Link href="/guides/how-much-house-can-you-afford/" className="text-primary underline">
              How Much House Can You Afford? The 28/36 Rule, Worked With Real Numbers
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "How do extra principal payments change the schedule?",
        body: [
          <>
            An extra payment goes 100% to principal, and it kills all the future compound interest
            that principal would have generated. That is why a lump sum early in the loan saves far
            more than the same amount paid near the end. Even one extra payment a year — the
            bi-weekly trick of 26 half-payments, which adds up to 13 full payments a year — typically
            shaves 4–5 years off a 30-year mortgage. The curve bends fastest where the balance is
            biggest, which is at the start.
          </>,
          <>
            The same maths runs in rupees on the Indian side. Our{" "}
            <Link href="/guides/emi-vs-mortgage-calculator/" className="text-primary underline">
              EMI vs. Mortgage Calculator
            </Link>{" "}
            guide explains when to use which calculator, and the prepayment arithmetic in detail.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do banks front-load interest?",
        answer:
          "They do not front-load it artificially. Interest each month is proportional to what you still owe, and the balance is at its maximum in year 1 — so the interest portion is at its maximum too. The split flips naturally as the balance falls.",
      },
      {
        question: "Does paying bi-weekly speed up amortization?",
        answer:
          "Yes. Twenty-six half-payments a year add up to 13 full monthly payments instead of 12, and the extra payment goes straight to principal. On a typical 30-year mortgage that shaves roughly 4–5 years off the term.",
      },
      {
        question: "When does the principal portion overtake the interest portion?",
        answer:
          "On the $300,000, 6.5%, 30-year example in this guide, month 233 — year 19, month 5. Before that, every payment is majority interest. Shorter terms and lower rates move the tipping point much earlier: on a 15-year loan at the same rate, principal is 37.8% of the very first payment.",
      },
      {
        question: "Does refinancing restart the amortization schedule?",
        answer:
          "Yes. A refinance pays off the old loan and starts a new one, so the new schedule begins again with interest-heavy early payments. That is worth weighing against the rate saving: refinancing late in a loan's life can mean paying mostly interest all over again, even at a lower rate.",
      },
    ],
    related: ["mortgage-calculator", "emi-calculator", "invoice-generator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "what-is-base64-encoding-and-when-to-use-it",
    title: "What Is Base64 Encoding, Why Does It Increase Size by 33%, and When Should You Use It?",
    seoTitle: "What Is Base64 Encoding? Size & Uses | Tulyro",
    seoDescription:
      "Base64 turns 3 bytes into 4 ASCII characters — a 33% size increase. How the 24-bit math works, what = padding means, and when to use it.",
    href: "/guides/what-is-base64-encoding-and-when-to-use-it/",
    intro: [
      <>
        Base64 is a binary-to-text encoding (RFC 4648) that turns arbitrary binary data into safe,
        printable ASCII characters. You meet it in email attachments, data URLs, API payloads, and
        auth headers — usually without noticing. This guide explains why it exists, why it always
        adds about 33% to the size, and when you should and should not use it. Try it yourself with
        our{" "}
        <Link href="/dev/base64-encoder-decoder/" className="text-primary underline">
          client-side Base64 Encoder &amp; Decoder
        </Link>
        , which runs 100% locally in your browser.
      </>,
    ],
    cta: { label: "Try the Base64 Encoder & Decoder", href: "/dev/base64-encoder-decoder/" },
    sections: [
      {
        heading: "Why does Base64 exist?",
        body: [
          <>
            SMTP, HTTP headers, XML, and JSON are text protocols. Raw binary bytes — a 0x00 null, a
            0x0A line feed — get misread as control commands by those systems. Base64 solves this by
            representing any bytes using only 64 safe characters: A–Z (values 0–25), a–z (26–51),
            0–9 (52–61), + and / (62–63, or - and _ in the Base64URL variant), plus = as padding.
          </>,
        ],
      },
      {
        heading: "How does the 24-bit math work?",
        body: [
          <>
            64 equals 2<sup>6</sup>, so each Base64 character carries 6 bits, while a byte carries 8
            bits. The least common multiple of 6 and 8 is 24: three bytes (24 bits) are regrouped
            into four chunks of 6 bits, and each chunk becomes one character. Three bytes in, four
            characters out — a 33.33% size increase, every time. You can verify the expansion
            yourself: encode a paragraph, then count the characters before and after in our{" "}
            <Link href="/text/word-counter/" className="text-primary underline">
              Word Counter
            </Link>
            .
          </>,
          <>
            The 33% figure scales exactly: 300 bytes become 400 characters, and 1 MiB (1,048,576
            bytes) becomes 1,398,101 characters before any line wrapping. That is why Base64 is a
            transport compromise, not a storage format — you pay a third more space for the
            privilege of travelling through text-only systems.
          </>,
        ],
      },
      {
        heading: "Worked Bit-Level Example: 'Man' vs Padding",
        body: [
          <>
            Padding appears when the input length is not a multiple of three bytes. The encoder pads
            the final group with zero bits and marks the missing characters with =:
          </>,
          <div key="base64-example-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Input</th>
                <th className="border border-outline-variant/60 p-3">Bits</th>
                <th className="border border-outline-variant/60 p-3">6-bit groups</th>
                <th className="border border-outline-variant/60 p-3">Indices</th>
                <th className="border border-outline-variant/60 p-3">Base64</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">&ldquo;Man&rdquo; (3 bytes)</td><td className="border border-outline-variant/60 p-3">01001101 01100001 01101110</td><td className="border border-outline-variant/60 p-3">010011 010110 000101 101110</td><td className="border border-outline-variant/60 p-3">19, 22, 5, 46</td><td className="border border-outline-variant/60 p-3">TWFu (no padding)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">&ldquo;Ma&rdquo; (2 bytes)</td><td className="border border-outline-variant/60 p-3">01001101 01100001</td><td className="border border-outline-variant/60 p-3">010011 010110 000100 + pad</td><td className="border border-outline-variant/60 p-3">19, 22, 4, pad</td><td className="border border-outline-variant/60 p-3">TWE= (one =)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">&ldquo;M&rdquo; (1 byte)</td><td className="border border-outline-variant/60 p-3">01001101</td><td className="border border-outline-variant/60 p-3">010011 010000 + pad + pad</td><td className="border border-outline-variant/60 p-3">19, 16, pad, pad</td><td className="border border-outline-variant/60 p-3">TQ== (two ==)</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Security Warning: Base64 Is Encoding, NOT Encryption",
        body: [
          <>
            Base64 provides zero confidentiality. There is no secret key, and anyone can reverse it
            in milliseconds — never store passwords as Base64, and never assume an encoded string is
            hidden. Worse, never paste production secrets into server-side Base64 tools: Basic Auth
            headers, Kubernetes secrets, and JWT payloads get logged server-side. For anything
            sensitive, use the 100% browser-only Base64 tool on this site, and use real encryption
            for anything that must stay secret.
          </>,
        ],
      },
      {
        heading: "When should I use Base64 — and when not?",
        body: [
          <>
            Base64 is the right tool when the channel only carries text. When the channel can carry
            bytes, sending bytes is smaller and faster. The table is the decision in one place.
          </>,
          <div key="base64-use-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Situation</th>
                <th className="border border-outline-variant/60 p-3">Use Base64?</th>
                <th className="border border-outline-variant/60 p-3">Better alternative</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Email attachment (MIME)</td><td className="border border-outline-variant/60 p-3">Yes — the standard</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Small image in a data URL</td><td className="border border-outline-variant/60 p-3">Yes, under ~2 KB</td><td className="border border-outline-variant/60 p-3">Separate file for larger images</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Binary field inside JSON</td><td className="border border-outline-variant/60 p-3">Yes</td><td className="border border-outline-variant/60 p-3">Multipart upload for large files</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">JWT header / payload</td><td className="border border-outline-variant/60 p-3">Yes — Base64URL variant</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">File upload from a form</td><td className="border border-outline-variant/60 p-3">No</td><td className="border border-outline-variant/60 p-3">multipart/form-data sends raw bytes</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Storing files in a database</td><td className="border border-outline-variant/60 p-3">No</td><td className="border border-outline-variant/60 p-3">Binary column or object storage</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Hiding a password or secret</td><td className="border border-outline-variant/60 p-3">Never</td><td className="border border-outline-variant/60 p-3">Hashing for passwords, encryption for secrets</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            One variant deserves its own paragraph. Base64URL replaces <code>+</code> with{" "}
            <code>-</code> and <code>/</code> with <code>_</code>, and usually drops the{" "}
            <code>=</code> padding, so the output is safe inside URLs and filenames without
            percent-encoding. JWTs use Base64URL for all three of their segments. Standard and URL
            variants are not interchangeable: feeding a Base64URL string to a standard decoder
            fails on the <code>-</code> and <code>_</code> characters, so check which alphabet your
            input uses before decoding.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do some Base64 strings end with = or ==?",
        answer:
          "Padding marks an incomplete final group: one = means the final group had 2 input bytes, and == means it had 1 input byte. A complete group of 3 bytes needs no padding.",
      },
      {
        question: "When should I inline images as Base64 Data URLs?",
        answer:
          "For tiny icons under about 2 KB, inlining saves an HTTP request. Avoid it for large photos — the 33% size bloat plus no independent caching makes the page slower, not faster.",
      },
      {
        question: "What is Base64URL and how is it different?",
        answer:
          "Base64URL is the URL-safe variant: it replaces + with - and / with _, and usually omits the = padding, so the output can sit in a URL or filename without percent-encoding. JWTs use it. Standard and URL variants are not interchangeable — decode with the matching alphabet.",
      },
      {
        question: "Can Base64 encode Unicode text like Hindi or emoji?",
        answer:
          "Yes, but encode the text to UTF-8 bytes first, then Base64-encode the bytes. JavaScript's btoa() only handles Latin-1 characters and throws on characters outside that range, so convert with TextEncoder (or encodeURIComponent) before calling btoa, and reverse the steps when decoding.",
      },
    ],
    related: ["base64-encoder-decoder", "word-counter", "invoice-generator"],
    pillar: { label: "All Tools", href: "/tools/" },
  },
  {
    slug: "how-browser-text-to-speech-web-speech-api-works",
    title: "How Browser Text-to-Speech Works: Unlimited Reading Without Cloud Paywalls",
    seoTitle: "Browser Text-to-Speech — How It Works | Tulyro",
    seoDescription:
      "Discover how native browser text-to-speech reads unlimited words offline without cloud paywalls, optimal WPM listening speeds, and how to proofread by ear.",
    href: "/guides/how-browser-text-to-speech-web-speech-api-works/",
    intro: [
      <>
        Commercial text-to-speech services cap free users at around 500 characters and upload your
        documents to the cloud. Browsers solve this natively through the W3C Web Speech API
        (window.speechSynthesis): your device reads text aloud with no character fees, no latency,
        and full privacy. This guide explains how it works under the hood, the best listening
        speeds, and why hearing your own writing catches errors your eyes miss. Try it now with our{" "}
        <Link href="/text/text-to-speech/" className="text-primary underline">
          free Browser Text-to-Speech Reader
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Text-to-Speech Reader", href: "/text/text-to-speech/" },
    sections: [
      {
        heading: "How does client-side speech synthesis work?",
        body: [
          <>
            The browser invokes the operating system&apos;s speech engine locally. Windows 10 and 11
            use Microsoft SAPI/OneCore voices (David, Zira, Heera, and Ravi for Indian English);
            macOS and iOS use AVSpeechSynthesizer (Samantha, Daniel, Rishi); Android and ChromeOS use
            Google Speech Services. The text never leaves your device for local voices, there is no
            character count to pay for, and playback starts instantly.
          </>,
          <>
            In code, the moving parts are small. The page creates a <code>SpeechSynthesisUtterance</code>
            holding the text plus three controls — <code>rate</code>, <code>pitch</code>, and{" "}
            <code>volume</code> — picks a voice from <code>speechSynthesis.getVoices()</code>, and
            calls <code>speechSynthesis.speak()</code>. The voice list loads asynchronously in some
            browsers, so reliable code waits for the <code>voiceschanged</code> event before
            choosing a voice; reading the list too early returns an empty array in Chrome. Long
            documents work best split into paragraph-sized utterances queued in order: a single
            giant utterance is more likely to stall or stop partway through in some browsers, and
            paragraph chunks make pause, resume, and &ldquo;start from here&rdquo; straightforward.
          </>,
        ],
      },
      {
        heading: "Speaking Rate & Listening Speed Reference Table (WPM)",
        body: [
          <>
            The Web Speech API accepts rates from 0.5× to 2.0×. Here is what that means in practice:
          </>,
          <div key="tts-wpm-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Rate</th>
                <th className="border border-outline-variant/60 p-3">Speed (WPM)</th>
                <th className="border border-outline-variant/60 p-3">Time per 1,000 words</th>
                <th className="border border-outline-variant/60 p-3">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">0.75× Slow</td><td className="border border-outline-variant/60 p-3">110–120 WPM</td><td className="border border-outline-variant/60 p-3">~8m 40s</td><td className="border border-outline-variant/60 p-3">Language learning, dictation, technical text</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">1.0× Default</td><td className="border border-outline-variant/60 p-3">150–160 WPM</td><td className="border border-outline-variant/60 p-3">~6m 30s</td><td className="border border-outline-variant/60 p-3">Standard narration</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">1.25× Brisk</td><td className="border border-outline-variant/60 p-3">190–200 WPM</td><td className="border border-outline-variant/60 p-3">~5m 10s</td><td className="border border-outline-variant/60 p-3">Proofreading — catches awkward phrasing and typos</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">1.5× Fast</td><td className="border border-outline-variant/60 p-3">225–240 WPM</td><td className="border border-outline-variant/60 p-3">~4m 15s</td><td className="border border-outline-variant/60 p-3">Long articles, study notes</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">2.0× Speed listen</td><td className="border border-outline-variant/60 p-3">300+ WPM</td><td className="border border-outline-variant/60 p-3">~3m 20s</td><td className="border border-outline-variant/60 p-3">Rapid skimming</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Why does proofreading with TTS catch more errors?",
        body: [
          <>
            Silent reading is predictive: your brain auto-corrects and shows you the words you
            intended to write. A synthesizer reads literally, so it pronounces doubled words
            (&ldquo;the the&rdquo;), dropped prepositions, and run-on sentences exactly as written.
            Listening at 1.25× is the sweet spot for proofreading — fast enough to stay focused,
            slow enough to hear every stumble. For formatting and page-length planning, pair it with
            our{" "}
            <Link href="/guides/how-many-words-per-page/" className="text-primary underline">
              How Many Words Fit on a Page?
            </Link>{" "}
            guide and the{" "}
            <Link href="/text/word-counter/" className="text-primary underline">
              Word Counter &amp; Reading Time Estimator
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "How long will my text take to listen to?",
        body: [
          <>
            Divide the word count by the listening speed: minutes = words ÷ WPM. An 800-word article
            at the default 160 WPM takes exactly 5 minutes. A 1,500-word essay takes 10 minutes at
            150 WPM, 8 minutes 20 seconds at 180 WPM, 7 minutes 30 seconds at 200 WPM, and 6 minutes
            at 250 WPM. Numbers, abbreviations, and code slow the effective rate down — a voice
            spells out or expands them — so treat the result as a floor for technical text, not a
            promise.
          </>,
          <>
            Speed is a comprehension trade-off, not a free win. Most listeners follow familiar
            material comfortably up to about 1.5×, but dense or unfamiliar material needs the
            default rate or slower. If you find yourself rewinding, you are past your speed, not
            behind on the material. For study notes, a useful pattern is one pass at 1.5× to find
            the structure, then a second pass at 1.0× on the sections that matter.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do voices differ between my phone and my laptop?",
        answer:
          "Voices come from the device operating system: an iPhone uses Apple voices, a Windows PC uses Microsoft voices, and desktop Chrome adds Google voices. The same text can sound different on each device.",
      },
      {
        question: "Does browser text-to-speech work offline?",
        answer:
          "Yes. OS-native local voices work fully offline once the page is open. Some browser voices are provided online and need a connection — the tool tells you which voices are local.",
      },
      {
        question: "How do I change the voice?",
        answer:
          "Voices come from your operating system, so the list depends on your device. In the reader, open the voice picker and try each voice on a sentence or two — names differ between Windows, macOS, Android, and Chrome. If a voice you want is missing, install it in your OS language settings; the browser picks up newly installed voices after a restart.",
      },
      {
        question: "Why does playback stop in the middle of a long document?",
        answer:
          "Some browsers pause or drop very long utterances, and mobile browsers may stop speech when the tab goes to background or the screen locks. The reliable fix is to split the text into paragraph-sized chunks and queue them, and to keep the tab in the foreground while listening. Shorter chunks also make it easy to resume from where you stopped.",
      },
    ],
    related: ["text-to-speech", "word-counter", "fancy-text-generator"],
    pillar: { label: "All Text Tools", href: "/text/" },
  },
  {
    slug: "how-unicode-fancy-text-fonts-work-on-social-media",
    title: "How Unicode Fancy Text Works: Why You Can Copy-Paste Bold & Cursive into Plain Text",
    seoTitle: "Unicode Fancy Text — How Copy-Paste Fonts Work | Tulyro",
    seoDescription:
      "Learn why copy-paste fancy text fonts work in plain-text social media bios using Unicode Mathematical Alphanumeric Symbols, plus key accessibility rules.",
    href: "/guides/how-unicode-fancy-text-fonts-work-on-social-media/",
    intro: [
      <>
        Instagram, LinkedIn, X, and YouTube comments have no rich-text toolbar — yet you see bold,
        cursive, and monospace text in bios everywhere. Those are not fonts. They are Unicode
        Mathematical Alphanumeric Symbols: distinct characters that look like styled letters and
        travel inside plain text like emoji. This guide explains how they work, which styles are
        safe to use, and where they break accessibility. Try it with our{" "}
        <Link href="/text/fancy-text-generator/" className="text-primary underline">
          Fancy Text Font Generator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Fancy Text Generator", href: "/text/fancy-text-generator/" },
    sections: [
      {
        heading: "Are fancy fonts actually fonts?",
        body: [
          <>
            In Word or Google Docs, bold is the ASCII letter A (U+0041) plus a &lt;strong&gt; tag.
            Paste that into a bio and the tag is stripped, leaving a plain A. A fancy-text generator
            instead substitutes each ASCII letter with a distinct character from the Unicode
            Mathematical Alphanumeric Symbols block (U+1D400–U+1D7FF), which was added so
            mathematicians could distinguish a scalar A, a vector A, and a set A in plain text. The
            styled symbols travel inside the string itself — no CSS, no font file, no formatting to
            lose.
          </>,
          <>
            The substitution is one character for one character: A becomes 𝐀 (bold), 𝐴 (italic),
            𝒜 (script), 𝔄 (fraktur), or 𝔸 (double-struck), depending on the style. Digits and
            Greek letters have styled variants in the same block, and some styles also exist in
            other blocks — circled letters, full-width forms, and small caps come from elsewhere in
            Unicode. Because each styled letter is a different code point from the plain letter, a
            search for &ldquo;Tulyro&rdquo; does not match &ldquo;𝐓𝐮𝐥𝐲𝐫𝐨&rdquo; unless the
            platform normalises the text first. That single fact drives most of the rules in this
            guide.
          </>,
        ],
      },
      {
        heading: "Unicode Block Reference Table",
        body: [
          <div key="unicode-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Style</th>
                <th className="border border-outline-variant/60 p-3">Sample</th>
                <th className="border border-outline-variant/60 p-3">Unicode range</th>
                <th className="border border-outline-variant/60 p-3">UTF-8 bytes</th>
                <th className="border border-outline-variant/60 p-3">Screen reader &amp; search</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Standard ASCII</td><td className="border border-outline-variant/60 p-3">Tulyro Tools</td><td className="border border-outline-variant/60 p-3">U+0041–U+007A</td><td className="border border-outline-variant/60 p-3">1 byte/char</td><td className="border border-outline-variant/60 p-3">100% accessible &amp; searchable</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Sans-Serif Bold</td><td className="border border-outline-variant/60 p-3">𝗧𝘂𝗹𝘆𝗿𝗼 𝗧𝗼𝗼𝗹𝘀</td><td className="border border-outline-variant/60 p-3">U+1D5D4–U+1D607</td><td className="border border-outline-variant/60 p-3">4 bytes/char</td><td className="border border-outline-variant/60 p-3">Good for 2–4 word headers (some readers announce &ldquo;mathematical bold&rdquo;)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Serif Bold Italic</td><td className="border border-outline-variant/60 p-3">𝑻𝒖𝒍𝒚𝒓𝒐 𝑻𝒐𝒐𝒍𝒔</td><td className="border border-outline-variant/60 p-3">U+1D468–U+1D49B</td><td className="border border-outline-variant/60 p-3">4 bytes</td><td className="border border-outline-variant/60 p-3">Best for short subheadings</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Mathematical Script (Cursive)</td><td className="border border-outline-variant/60 p-3">𝒯𝓊𝓁𝓎𝓇𝑜 𝒯𝑜𝑜𝓁𝓈</td><td className="border border-outline-variant/60 p-3">U+1D49C–U+1D4CF</td><td className="border border-outline-variant/60 p-3">4 bytes</td><td className="border border-outline-variant/60 p-3">Decorative only — readers read letter-by-letter or skip</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Monospace</td><td className="border border-outline-variant/60 p-3">𝚃𝚞𝚕𝚢𝚛𝚘 𝚃𝚘𝚘𝚕𝚜</td><td className="border border-outline-variant/60 p-3">U+1D670–U+1D6A3</td><td className="border border-outline-variant/60 p-3">4 bytes</td><td className="border border-outline-variant/60 p-3">Great for code snippets and numeric alignment</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Double-Struck / Blackboard</td><td className="border border-outline-variant/60 p-3">𝕋𝕦𝕝𝕪𝕣𝕠 𝕋𝕠𝕠𝕝𝕤</td><td className="border border-outline-variant/60 p-3">U+1D538–U+1D56B</td><td className="border border-outline-variant/60 p-3">4 bytes</td><td className="border border-outline-variant/60 p-3">Decorative badges and display names only</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "3 Rules for Using Unicode Text Without Hurting Accessibility or Reach",
        body: [
          <>
            (1) Short hooks only — 2 to 5 words. A 200-word cursive paragraph is unreadable for
            screen-reader users. (2) Never put Unicode in hashtags or primary keywords: search
            matches ASCII unless the platform applies NFKD normalization, so keep your #WebDevelopment
            tag, handle, and job title in plain text. (3) Watch character counters: characters above
            U+FFFF count as 2 UTF-16 code units on X, so check the exact length in our{" "}
            <Link href="/text/word-counter/" className="text-primary underline">
              Word Counter
            </Link>{" "}
            before posting.
          </>,
        ],
      },
      {
        heading: "Where does fancy text break?",
        body: [
          <>
            <strong>In links and addresses.</strong> A styled character in a URL, email address, or
            username is a different character from the plain one, so the link breaks or points
            nowhere. Keep every functional string — URLs, handles, hashtags, email addresses — in
            plain ASCII, and style only the display text around it.
          </>,
          <>
            <strong>In search.</strong> Platform search indexes the literal code points. A bio that
            says only &ldquo;𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐌𝐚𝐫𝐤𝐞𝐭𝐞𝐫&rdquo; may not surface for a search
            for &ldquo;Digital Marketer&rdquo;. The safe pattern is one styled hook line plus the
            same keywords in plain text elsewhere in the bio.
          </>,
          <>
            <strong>In screen readers.</strong> Some readers announce each styled letter by its
            Unicode name — &ldquo;mathematical bold capital T&rdquo; — which turns a styled
            sentence into an unusable stream. Others skip the characters entirely. Either way, a
            long styled paragraph is inaccessible. Short hooks (a name, a headline) are the
            compromise most accessibility-conscious creators settle on.
          </>,
          <>
            <strong>On old devices.</strong> A device whose fonts lack the U+1D400 block shows
            empty boxes (&ldquo;tofu&rdquo;) instead of letters. Modern phones and computers cover
            the block, but older TVs, some e-readers, and stripped-down embedded displays do not.
            If your audience skews older hardware, test the bio on a second device before
            publishing.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do some fancy letters show as empty boxes (tofu)?",
        answer:
          "The device lacks a font covering U+1D400 and above, so it renders a □ placeholder. Modern iOS, Android, Windows 10/11, and macOS render these characters natively; older devices and some TVs do not.",
      },
      {
        question: "Does bold Unicode hurt LinkedIn or Instagram reach?",
        answer:
          "No — one to three short styled headers can improve dwell time. But putting core keywords only in Unicode can block exact-keyword search, so keep searchable terms in plain ASCII.",
      },
      {
        question: "Can I use fancy text in a URL, email address or username?",
        answer:
          "No. Styled letters are different Unicode code points from plain letters, so a styled URL does not resolve and a styled username is a different username. Keep all functional strings in plain ASCII and style only display text.",
      },
      {
        question: "Why does fancy text use more of my character limit?",
        answer:
          "Characters above U+FFFF are stored as two UTF-16 code units (a surrogate pair), so platforms that count UTF-16 units — including X — charge two characters for one visible fancy letter. They also take 4 bytes each in UTF-8 versus 1 byte for ASCII. Check the exact count in a word counter before posting.",
      },
    ],
    related: ["fancy-text-generator", "fake-text-generator", "word-counter"],
    pillar: { label: "All Text Tools", href: "/text/" },
  },
  {
    slug: "how-to-create-chat-mockups-for-presentations-and-ui",
    title: "How to Create Clean Chat Mockups for Video Editing, Presentations & UI Design",
    seoTitle: "Chat Mockups — Realistic Screenshots, No Watermark | Tulyro",
    seoDescription:
      "Crisp, watermark-free chat screenshots for Reels, Shorts and slide decks. Design specs, authentic dialogue tips and the ethics of fake chats.",
    href: "/guides/how-to-create-chat-mockups-for-presentations-and-ui/",
    intro: [
      <>
        Staging a real two-phone SMS conversation is slow, and the screenshots come out
        inconsistent. Most mockup sites watermark the result unless you pay. This guide shows how
        video editors, educators, and UI designers build crisp, realistic chat mockups for Reels,
        Shorts, pitch decks, and documentation — free, with no watermark, 100% locally in the
        browser, using our{" "}
        <Link href="/fun/fake-text-generator/" className="text-primary underline">
          no-watermark Fake Text Generator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Fake Text Generator", href: "/fun/fake-text-generator/" },
    sections: [
      {
        heading: "4 Legitimate Creative & Professional Use Cases",
        body: [
          <>
            (1) Short-form video hooks (Reels, Shorts, TikTok): a 2-message exchange over B-roll
            grabs attention in the first seconds — pair it with the{" "}
            <Link href="/text/text-to-speech/" className="text-primary underline">
              Text-to-Speech Reader
            </Link>{" "}
            to keep the hook under 3 seconds. (2) Cybersecurity and anti-smishing training: realistic
            fake delivery links, bank OTP alerts, and CEO-impersonation texts, without using real
            phone numbers. (3) Marketing case studies and pitch decks: client praise (with
            permission, anonymized) presented as a chat layout beats a block quote. (4)
            Fiction and epistolary storytelling: web novels and classroom prompts told through
            text-message dialogue.
          </>,
        ],
      },
      {
        heading: "Design Specifications for Crisp, Readable Chat Graphics",
        body: [
          <div key="mockup-specs-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Format</th>
                <th className="border border-outline-variant/60 p-3">Aspect / size</th>
                <th className="border border-outline-variant/60 p-3">Max messages</th>
                <th className="border border-outline-variant/60 p-3">Max words per bubble</th>
                <th className="border border-outline-variant/60 p-3">Pacing</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Vertical Video (Reels / Shorts / TikTok)</td><td className="border border-outline-variant/60 p-3">9:16, 1080×1920</td><td className="border border-outline-variant/60 p-3">2–4 bubbles</td><td className="border border-outline-variant/60 p-3">8–15 words</td><td className="border border-outline-variant/60 p-3">1.8–2.5s per bubble</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">YouTube Long-Form / 16:9</td><td className="border border-outline-variant/60 p-3">1920×1080</td><td className="border border-outline-variant/60 p-3">3–5 bubbles</td><td className="border border-outline-variant/60 p-3">12–25 words</td><td className="border border-outline-variant/60 p-3">Center-cropped card at 125% zoom</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">IG Carousel / LinkedIn Slide</td><td className="border border-outline-variant/60 p-3">4:5, 1080×1350</td><td className="border border-outline-variant/60 p-3">4–6 bubbles</td><td className="border border-outline-variant/60 p-3">15–30 words</td><td className="border border-outline-variant/60 p-3">1 exchange per slide</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">UI / Documentation</td><td className="border border-outline-variant/60 p-3">Natural device width</td><td className="border border-outline-variant/60 p-3">2–4 bubbles</td><td className="border border-outline-variant/60 p-3">10–20 words</td><td className="border border-outline-variant/60 p-3">Annotate the key action button</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "How to Make Mockup Dialogue Look Authentic",
        body: [
          <>
            (1) Short conversational bubbles: break a long thought into two bubbles — a 4-word
            opener, then the main point. Real people do not send 80-word SMS paragraphs. (2)
            Chronological timestamps: a 10:41 AM reply sitting below a 10:44 AM message breaks
            immersion instantly, and so does a battery at 0%. (3) Custom contact names and Unicode
            styling, sparingly: generate styled text in the{" "}
            <Link href="/text/fancy-text-generator/" className="text-primary underline">
              Fancy Text Generator
            </Link>{" "}
            first, then paste it into the mockup builder.
          </>,
          <>
            Two more details sell realism. First, typing indicators and read receipts: a
            &ldquo;typing…&rdquo; bubble before a reply, or a read time under the last message,
            signals a live conversation rather than a static graphic. Use them once per exchange —
            every bubble with a receipt looks staged. Second, message length rhythm: real chats
            alternate short reactions (&ldquo;haha&rdquo;, &ldquo;wait really?&rdquo;) with longer
            explanations. A mockup where every bubble is the same length reads as written copy, not
            conversation, even when the words are natural.
          </>,
        ],
      },
      {
        heading: "How do I export a mockup for video?",
        body: [
          <>
            Export the mockup as a transparent PNG at the size your timeline needs, then animate it
            in your editor rather than baking motion into the image. The usual pattern: the chat
            card slides or pops in bubble by bubble, each bubble appearing on a beat, with the
            previous bubbles staying visible. Keep the card large enough to read on a phone — text
            that is legible at full screen on a laptop is often unreadable at phone width, which is
            why the spec table caps words per bubble by format.
          </>,
          <>
            If the mockup sits over B-roll, add a subtle shadow or a darkened backing panel so the
            bubbles separate from the footage behind them. And export one frame longer than you
            think you need: viewers read slower than editors expect, and a bubble that vanishes
            after 1.5 seconds will be rewatched or missed entirely. The pacing column in the spec
            table (about 2 seconds per bubble for vertical video) is a floor, not a target — add
            time for longer bubbles.
          </>,
        ],
      },
      {
        heading: "Ethical & Legal Best Practices",
        body: [
          <>
            Chat mockups are for creative storytelling, UI design, education, and parody only. Never
            fabricate defamatory statements about real people, forge payment receipts, or present a
            mockup as evidence. Label fictional conversations clearly whenever the context could be
            misunderstood.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Does Tulyro add a watermark?",
        answer:
          "No. The Fake Text Generator is 100% free with zero watermarks or branding on the exported image.",
      },
      {
        question: "Are my messages saved on a server?",
        answer:
          "No. Messages are rendered in browser local memory only; refreshing the page clears the session.",
      },
      {
        question: "Can I use a chat mockup in a commercial video or ad?",
        answer:
          "Yes, for fictional dialogue you wrote yourself. The restriction is about deception, not commerce: do not present a fabricated conversation as a real customer testimonial, a real chat with a real person, or evidence of anything. Label fictional conversations when the context could mislead viewers.",
      },
      {
        question: "Why does my mockup look blurry in the exported video?",
        answer:
          "Usually the mockup was exported smaller than the timeline resolution and scaled up, or compressed twice (once on export, once by the platform). Export at or above your timeline size — 1080 pixels wide for vertical video — as PNG, and let the platform do the only lossy compression step.",
      },
    ],
    related: ["fake-text-generator", "fancy-text-generator", "text-to-speech"],
    pillar: { label: "All Tools", href: "/tools/" },
  },
  {
    slug: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum Investment: Which Generates Better Returns?",
    seoTitle: "SIP vs Lumpsum — Which Is Better? Math Inside | Tulyro",
    seoDescription:
      "Compare SIP vs Lumpsum investing with exact math, rupee cost averaging breakdowns, market cycle risks, and tax implications. Includes worked examples.",
    href: "/guides/sip-vs-lumpsum/",
    intro: [
      <>
        Choosing between a Systematic Investment Plan (SIP) and a lump-sum mutual fund deposit comes down to market volatility and cash availability. While a lump sum capitalizes on maximum compounding time in sustained bull runs, an SIP mitigates downside risk through rupee cost averaging in fluctuating markets.
      </>,
    ],
    cta: { label: "Calculate SIP Returns", href: "/calculators/sip-calculator/" },
    sections: [
      {
        heading: "The Core Difference: Cash Timing vs Rupee Cost Averaging",
        body: [
          <>
            In a <strong>lump-sum investment</strong>, your entire capital is deployed on day one. Every rupee participates in market compounding from the very first minute. If the market climbs steadily upward, a lump sum historically beats recurring installments because your money spends more total time working in the market.
          </>,
          <>
            In a <strong>Systematic Investment Plan (SIP)</strong>, your capital is broken into fixed periodic intervals (usually monthly). By investing the same rupee amount every month regardless of index movements, you purchase fewer mutual fund units when Net Asset Values (NAVs) are high and more units when NAVs plummet. This mechanism—known as <em>rupee cost averaging</em>—neutralizes emotional panic and eliminates the impossible chore of market timing.
          </>,
          <>
            Rupee cost averaging in numbers: invest ₹10,000 at three NAVs — ₹100, ₹80, and ₹125.
            You get 100 + 125 + 80 = 305 units for ₹30,000, an average cost of ₹98.36 per unit,
            below the average NAV of ₹101.67. The averaging works because the same rupees buy more
            units when prices fall. It lowers your average cost in volatile markets; it does not
            guarantee a profit — if the NAV ends below your average cost, the investment still
            loses money.
          </>,
          <div key="sip-lumpsum-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Feature</th>
                <th className="border border-outline-variant/60 p-3">SIP</th>
                <th className="border border-outline-variant/60 p-3">Lumpsum</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Capital needed upfront</td><td className="border border-outline-variant/60 p-3">One instalment</td><td className="border border-outline-variant/60 p-3">Full amount on day one</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Time in the market</td><td className="border border-outline-variant/60 p-3">Staggered; later instalments compound less</td><td className="border border-outline-variant/60 p-3">Maximum; all money compounds from day one</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Timing risk</td><td className="border border-outline-variant/60 p-3">Spread across many entry points</td><td className="border border-outline-variant/60 p-3">Concentrated on one entry date</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Rupee cost averaging</td><td className="border border-outline-variant/60 p-3">Yes, automatic</td><td className="border border-outline-variant/60 p-3">No</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Best for</td><td className="border border-outline-variant/60 p-3">Monthly salary, volatile markets</td><td className="border border-outline-variant/60 p-3">Windfalls, long horizons, rising markets</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Return measure</td><td className="border border-outline-variant/60 p-3">XIRR (dated cash flows)</td><td className="border border-outline-variant/60 p-3">CAGR (two cash flows)</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Tax holding period</td><td className="border border-outline-variant/60 p-3">Per instalment; each needs 12 months for LTCG</td><td className="border border-outline-variant/60 p-3">One holding period for the whole amount</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Mathematical Worked Example: 10-Year Timeline",
        body: [
          <>
            Let us compare deploying a total capital of <strong>₹6,00,000</strong> over a 10-year horizon at an annualized expected return rate of <strong>12%</strong>:
          </>,
          <>
            <strong>Lump-Sum Investment:</strong> Depositing ₹6,00,000 all at once at 12% annual compounding for 10 years yields an estimated maturity corpus of approximately <strong>₹18,63,509</strong> (Total profit: ₹12,63,509).
          </>,
          <>
            <strong>SIP Route:</strong> Depositing ₹5,000 every month for 120 months (total deposited = ₹6,00,000) at 12% compounding yields an estimated maturity corpus of approximately <strong>₹11,61,695</strong> (Total profit: ₹5,61,695).
          </>,
          <>
            On purely static compound math, the lump sum appears substantially higher. However, this assumes you possess ₹6,00,000 in liquid capital upfront on day one and that the market does not immediately suffer a 30% crash right after your entry. For salaried earners building wealth from monthly paychecks, SIP is mathematically the only practical gateway to continuous market equity.
          </>,
        ],
      },
      {
        heading: "Market Scenario Comparison",
        body: [
          <>
            <strong>Sustained Bull Market:</strong> Lump sum wins cleanly. Deploying money early captures maximum upward trajectory.
          </>,
          <>
            <strong>Bear or Choppy Market:</strong> SIP wins decisively. An investor entering a falling market with a lump sum experiences immediate capital drawdown. An SIP investor buys heavily discounted units each month, accelerating recovery once the cycle reverses.
          </>,
          <>
            <strong>Stagflation / Range-Bound:</strong> SIP outperforms due to lower average unit procurement cost over time.
          </>,
        ],
      },
      {
        heading: "Taxation Considerations in India",
        body: [
          <>
            For Indian equity mutual funds, capital gains are taxed identically regardless of whether units were acquired via SIP or lump sum, but holding periods are computed per batch:
          </>,
          <>
            <strong>Short-Term Capital Gains (STCG):</strong> Units held for 12 months or less are taxed at 20%.
          </>,
          <>
            <strong>Long-Term Capital Gains (LTCG):</strong> Units held longer than 12 months are taxed at 12.5% on gains exceeding ₹1.25 Lakh per fiscal year.
          </>,
          <>
            <em>Crucial SIP rule:</em> Because each monthly installment buys distinct mutual fund units with a unique purchase date, each individual installment must complete a full 365 days of holding to qualify for LTCG treatment.
          </>,
        ],
      },
      {
        heading: "Verdict: When Should You Pick Each?",
        body: [
          <>
            Choose a <strong>Lump Sum</strong> if you have received a windfall (annual bonus, property sale, inheritance) and your investment horizon exceeds 7 to 10 years, or route it via a Systematic Transfer Plan (STP) into equity over 6 to 12 months. Choose an <strong>SIP</strong> for monthly salary discipline, emergency liquidity protection, and volatile market peace of mind.
          </>,
          <>
            A fair comparison also needs the right yardstick: XIRR is the accurate way to measure staggered SIP returns, while CAGR suits a single lumpsum deposit. See <Link href="/guides/cagr-vs-xirr-in-mutual-funds/" className="text-primary underline">CAGR vs XIRR: when to use each metric for mutual fund returns</Link>.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can I stop an SIP midway without penalty?",
        answer:
          "Yes. Mutual fund SIPs in India can be paused, modified, or stopped at any time without any exit penalty on future contributions.",
      },
      {
        question: "Is SIP completely risk-free compared to lump sum?",
        answer:
          "No. Mutual fund investments remain subject to market risk. While an SIP reduces timing risk through averaging, market fluctuations still affect the portfolio valuation.",
      },
      {
        question: "Can I increase my SIP amount every year?",
        answer:
          "Yes. Most asset management companies offer a 'Step-Up SIP' feature allowing you to automatically increase your monthly investment by a fixed percentage or rupee amount annually.",
      },
      {
        question: "Should I stop my SIP when markets fall?",
        answer:
          "A falling market is when rupee cost averaging does its work: the same instalment buys more units. Stopping an SIP during a fall locks in the higher average cost of earlier instalments and misses the cheaper units. The exception is a genuine cash emergency — never invest money you need within the next year or two.",
      },
    ],
    related: ["sip-calculator", "ppf-calculator", "emi-calculator"],
    pillar: { label: "Calculators", href: "/calculators/" },
  },
  {
    slug: "college-75-percent-attendance-rule-explained",
    title: "The 75% College Attendance Rule: Criteria, Bunk Limits & Medical Condonation",
    seoTitle: "75% Attendance Rule — How Many Classes to Bunk? | Tulyro",
    seoDescription:
      "75% means you can miss 1 class in 4 — with the exact bunk formula, worked examples, medical condonation rules and how to recover a shortage.",
    href: "/guides/college-75-percent-attendance-rule-explained/",
    intro: [
      <>
        Most Indian universities and technical institutes governed by UGC and AICTE mandate a minimum of 75% classroom attendance to appear for semester examinations. Falling below this threshold risks course repetition, grade deductions, or exam hall ticket debarment.
      </>,
    ],
    cta: { label: "Check Your Bunk Limit", href: "/calculators/attendance-calculator/" },
    sections: [
      {
        heading: "Why do universities require 75% attendance?",
        body: [
          <>
            Regulatory bodies such as the University Grants Commission (UGC) and All India Council for Technical Education (AICTE) prescribe 75% minimum physical presence to ensure continuous academic engagement, lab practical competency, and standardized evaluation integrity.
          </>,
          <>
            Many engineering, medical, law, and degree universities enforce this threshold strictly via biometric punch logs or ERP software portals. Students failing to meet the requirement are classified under &quot;shortage of attendance&quot; and face examination debarment.
          </>,
        ],
      },
      {
        heading: "How many classes can I bunk?",
        body: [
          <>
            Students often make the costly mistake of assuming that having an 85% attendance rate means they can skip 10 consecutive lectures. Attendance percentages do not subtract linearly because the total class count increases with each skipped lecture.
          </>,
          <>
            To calculate how many upcoming lectures you can safely skip while remaining at or above a 75% threshold (0.75):
          </>,
          <pre key="bunk-formula" className="overflow-x-auto rounded-lg bg-surface-container-low p-4 font-code text-sm">
            Bunkable Classes = Math.floor((Attended Classes / 0.75) - Total Classes Held)
          </pre>,
          <>
            For instance, if 60 lectures have been conducted so far and you attended 54: Attended = 54, Target ratio = 54 / 0.75 = 72, Bunkable buffer = 72 - 60 = <strong>12 classes</strong>. If you skip the next 12 lectures, total classes reach 72 while attended remains 54, landing you at exactly 75.0%.
          </>,
          <>
            For a whole semester, the arithmetic is simpler: you must attend three quarters of all
            classes, so you can miss one quarter. The table gives the exact split for common
            semester lengths — but check whether your university counts attendance overall or per
            subject, because a comfortable overall percentage can hide a shortage in one subject.
          </>,
          <div key="attendance-bunk-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Classes in the semester</th>
                <th className="border border-outline-variant/60 p-3">Must attend (75%)</th>
                <th className="border border-outline-variant/60 p-3">Can miss</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">40</td><td className="border border-outline-variant/60 p-3">30</td><td className="border border-outline-variant/60 p-3">10</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">60</td><td className="border border-outline-variant/60 p-3">45</td><td className="border border-outline-variant/60 p-3">15</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">80</td><td className="border border-outline-variant/60 p-3">60</td><td className="border border-outline-variant/60 p-3">20</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">100</td><td className="border border-outline-variant/60 p-3">75</td><td className="border border-outline-variant/60 p-3">25</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">120</td><td className="border border-outline-variant/60 p-3">90</td><td className="border border-outline-variant/60 p-3">30</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "How do I recover from an attendance shortage?",
        body: [
          <>
            If your current attendance has fallen below 75%, how many consecutive classes must you attend without missing a single period to restore compliance?
          </>,
          <pre key="attend-formula" className="overflow-x-auto rounded-lg bg-surface-container-low p-4 font-code text-sm">
            Classes to Attend = Math.ceil((0.75 * Total Classes - Attended Classes) / (1 - 0.75))
          </pre>,
          <>
            If 50 lectures were held and you attended only 30 (current rate: 60%): Deficit = (0.75 × 50) - 30 = 7.5. Required consecutive attendance = 7.5 / 0.25 = <strong>30 classes</strong>. You must attend the next 30 scheduled classes consecutively without missing one just to lift your average back to 75%.
          </>,
        ],
      },
      {
        heading: "Medical Condonation and Duty Leave Exemptions",
        body: [
          <>
            <strong>Medical Condonation:</strong> If attendance falls between 65% and 74%, students can submit government hospital medical certificates, discharge summaries, and parent consent forms to the Dean of Academic Affairs. Many institutes permit condonation of up to 10% on genuine medical grounds, often accompanied by a prescribed institutional condonation fee.
          </>,
          <>
            <strong>On-Duty (OD) Leave:</strong> Official representations for college sports teams, cultural fests, hackathons, or NCC/NSS training camps are credited back into total attendance upon HOD endorsement.
          </>,
          <>
            <strong>Zero Condonation Below 65%:</strong> In virtually all statutory university regulations (including Bar Council of India, Medical Council, and AICTE), students below 65% are strictly barred from exams without exception.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can an attendance shortage below 65% be condoned?",
        answer:
          "Generally no. Most university academic councils have strict regulatory ceilings where condonation cannot be granted below 65% even with valid medical records.",
      },
      {
        question: "Do lab practicals have separate attendance requirements?",
        answer:
          "Yes. Many professional degree programs treat theory classes and laboratory sessions as distinct attendance tracks, requiring 75% independently in both.",
      },
      {
        question: "Does bunking a 2-hour lecture count as one or two absences?",
        answer:
          "If the university ERP logs attendance by lecture period, a 2-hour continuous class usually logs as 2 distinct absences.",
      },
      {
        question: "Is attendance calculated overall or per subject?",
        answer:
          "It varies by university. Some require 75% overall, others require 75% in each subject — and many professional programmes track theory and labs separately. Check your university's academic regulations or your ERP portal: a comfortable overall percentage can hide a shortage in a single subject.",
      },
    ],
    related: ["attendance-calculator", "sgpa-to-cgpa"],
    pillar: { label: "Calculators", href: "/calculators/" },
  },
  {
    slug: "emi-vs-flat-rate-interest",
    title: "EMI vs Flat Rate Interest: How Lenders Hide Real Loan Costs",
    seoTitle: "EMI vs Flat Rate — The Real Cost Compared | Tulyro",
    seoDescription:
      "An 8% flat rate costs ₹11,667 a month on ₹5 lakh; a 12% reducing loan costs ₹11,122. The flat quote is really about 14% reducing. See the math.",
    href: "/guides/emi-vs-flat-rate-interest/",
    intro: [
      <>
        A lender offering an &quot;8% flat interest rate&quot; often sounds far cheaper than a bank quoting a &quot;12% reducing EMI rate&quot;. In reality, the flat rate loan is significantly more expensive. Here is the mathematical reason why, with exact side-by-side repayment calculations.
      </>,
    ],
    cta: { label: "Calculate Reducing EMI", href: "/calculators/emi-calculator/" },
    sections: [
      {
        heading: "Reducing Balance EMI vs Flat Rate: The Core Difference",
        body: [
          <>
            In a <strong>Reducing Balance Loan</strong> (the standard banking method used by major commercial banks), interest is charged strictly on the <em>outstanding principal balance</em> remaining at the end of each month. As you make monthly repayments, your principal reduces, meaning each month&apos;s interest component decreases while more of your EMI repays the principal.
          </>,
          <>
            In a <strong>Flat Rate Loan</strong> (frequently marketed by consumer electronics NBFCs and auto dealerships), interest is calculated on the <em>entire original borrowed amount</em> for the entire loan tenure—even when you are in your final month and have already paid back 95% of what you borrowed.
          </>,
        ],
      },
      {
        heading: "Worked Math: ₹5,00,000 for 5 Years (60 Months)",
        body: [
          <>
            Let us compare borrowing <strong>₹5,00,000</strong> over 5 years under both schemes:
          </>,
          <>
            <strong>Option A: 8% Flat Rate Quote:</strong> Total Interest = ₹5,00,000 × 8% × 5 years = ₹2,00,000. Total Repayment = ₹7,00,000. Monthly Installment = ₹7,00,000 ÷ 60 = <strong>₹11,667 / month</strong>.
          </>,
          <>
            <strong>Option B: 12% Reducing Balance Quote:</strong> Using the standard reducing balance amortisation formula, a ₹5,00,000 loan at 12% annual interest for 60 months produces an EMI of <strong>₹11,122 / month</strong>. Total Interest = ₹1,67,333. Total Repayment = ₹6,67,333.
          </>,
          <>
            Notice the catch: The &quot;8% flat rate&quot; costs you ₹11,667 per month (Total ₹7,00,000), while the &quot;12% reducing balance&quot; costs you only ₹11,122 per month (Total ₹6,67,333). You pay ₹32,667 more interest on the supposedly lower 8% quote!
          </>,
          <div key="flat-vs-reducing-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">₹5,00,000 over 5 years</th>
                <th className="border border-outline-variant/60 p-3">8% flat rate</th>
                <th className="border border-outline-variant/60 p-3">12% reducing balance</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Monthly payment</td><td className="border border-outline-variant/60 p-3">₹11,667</td><td className="border border-outline-variant/60 p-3">₹11,122</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Total interest</td><td className="border border-outline-variant/60 p-3">₹2,00,000</td><td className="border border-outline-variant/60 p-3">₹1,67,333</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Total repaid</td><td className="border border-outline-variant/60 p-3">₹7,00,000</td><td className="border border-outline-variant/60 p-3">₹6,67,333</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Interest charged on</td><td className="border border-outline-variant/60 p-3">Full ₹5,00,000, all 5 years</td><td className="border border-outline-variant/60 p-3">Outstanding balance, falling monthly</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">True reducing rate</td><td className="border border-outline-variant/60 p-3">About 14.1%</td><td className="border border-outline-variant/60 p-3">12% as quoted</td></tr>
            </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "The Rule of Thumb for Flat-to-Reducing Conversion",
        body: [
          <>
            To approximate the true effective reducing interest rate of any advertised flat rate quote, multiply the flat rate by approximately <strong>1.75 to 1.9</strong> depending on the tenure:
          </>,
          <>
            Effective Reducing Rate ≈ Flat Rate × 1.85.
          </>,
          <>
            Therefore, an advertised <strong>8% flat rate</strong> translates to roughly <strong>14% to 15%</strong> on the reducing-balance basis by the rule of thumb (8 × 1.85 = 14.8%). Solving the actual cash flows exactly — finding the reducing rate whose EMI equals the flat-rate instalment of ₹11,667 — gives about <strong>14.1%</strong> for this 5-year loan. The rule of thumb is a quick check, not the exact rate: it runs a little high here because it ignores the exact tenure. Always ask the lender for the Annual Percentage Rate (APR) or Reducing Balance Rate before signing loan documents.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Why do lenders advertise flat interest rates?",
        answer:
          "Flat rates produce an artificially small single-digit percentage number (e.g. 7% or 8%), making high-interest personal and vehicle loans appear deceptively inexpensive to borrowers who don't know the mathematical difference.",
      },
      {
        question: "Can I convert flat rate to reducing EMI manually?",
        answer:
          "Yes. Calculate your total annual interest payment divided by the average outstanding balance over the loan term, or use an EMI calculator with the exact monthly cash flow.",
      },
      {
        question: "Does RBI permit flat rate loans in India?",
        answer:
          "RBI guidelines mandate that banks and NBFCs disclose the true Annual Percentage Rate (APR) and Key Fact Statement (KFS) to the borrower before loan disbursement.",
      },
      {
        question: "How do I find the true rate of a flat-rate quote?",
        answer:
          "Compute the flat instalment first: (principal + total flat interest) ÷ months. Then find the reducing-balance rate whose EMI equals that instalment — for the ₹5 lakh, 5-year, 8% flat example it is about 14.1%. An EMI calculator with the same principal and tenure gives you the comparison in seconds; the 1.85× rule of thumb is only a rough check.",
      },
    ],
    related: ["emi-calculator", "mortgage-calculator", "sip-calculator"],
    pillar: { label: "Calculators", href: "/calculators/" },
  },
  {
    slug: "swp-vs-fd-for-retirement-income",
    title: "SWP vs Fixed Deposit: Which is Better for Regular Monthly Income?",
    seoTitle: "SWP vs FD — Monthly Income Compared | Tulyro",
    seoDescription:
      "₹50 lakh at 7% pays ₹29,167 a month from an FD. See what an SWP pays, what tax each route faces, and when guaranteed income wins.",
    href: "/guides/swp-vs-fd-for-retirement-income/",
    intro: [
      <>
        For retirees and individuals seeking monthly cash flow, the two primary options are a Bank Fixed
        Deposit (FD) paying monthly interest and a Mutual Fund Systematic Withdrawal Plan (SWP). An FD
        pays a fixed, known amount and returns your principal at maturity. An SWP sells fund units each
        month, so the income can rise or fall with the market — and the tax treatment is different
        because only the gains portion of each withdrawal is taxed. Neither option wins in every
        situation: this guide works both options on the same ₹50 lakh corpus so you can see the
        trade-off in rupees, not slogans.
      </>,
    ],
    cta: { label: "Calculate SWP Returns", href: "/calculators/swp-calculator/" },
    sections: [
      {
        heading: "How much income does each option pay?",
        body: [
          <>
            Same starting point for both: a corpus of ₹50,00,000. The FD rate below is an assumed 7%
            per year — use the rate your bank actually quotes, because the monthly figure moves
            directly with it. The SWP figures are illustrations at steady assumed growth rates, not
            promises: fund returns vary, and a bad year early on changes the outcome (see the
            sequence-risk note below).
          </>,
          <>
            <strong>FD at 7% with monthly interest payout:</strong> ₹50,00,000 × 7% ÷ 12 =
            ₹29,167 a month, or ₹3,50,000 a year. The principal stays intact and is returned at
            maturity. That is the whole calculation — there is no market variable.
          </>,
          <>
            <strong>SWP withdrawing ₹30,000 a month:</strong> that is ₹3,60,000 a year, a 7.2%
            withdrawal rate on ₹50,00,000. If the fund grew at a steady illustrative 8% a year, the
            balance after one year would be about ₹50,41,500 and after five years about ₹52,44,923,
            after withdrawing ₹18,00,000 in total. At a steady illustrative 6%, the balance after
            one year would be about ₹49,38,322. And with no growth at all, withdrawing ₹30,000 a
            month for a year leaves ₹46,40,000. The SWP balance is whatever the market leaves
            behind — it can end higher or lower than where it started.
          </>,
          <>
            The honest comparison is not ₹29,167 versus ₹30,000. The FD figure is fixed for the
            deposit tenure; the SWP figure is a chosen withdrawal amount that you can raise, lower,
            or stop, and the corpus behind it moves with the market. A withdrawal rate above what
            the fund earns will shrink the corpus year by year, which is why the rate you choose
            matters more than the product you choose. Try different rates in our{" "}
            <Link href="/calculators/swp-calculator/" className="text-primary underline">
              SWP Calculator
            </Link>{" "}
            before committing to a monthly figure.
          </>,
        ],
      },
      {
        heading: "How is each option taxed?",
        body: [
          <>
            Fixed Deposit interest is fully taxable according to your income tax slab rate (up to 30% plus
            surcharge and cess). Banks deduct TDS at 10% on interest exceeding ₹40,000 in a year
            (₹50,000 for senior citizens) when your PAN is on record — TDS is advance tax, credited
            against your final liability, not an extra tax. On the example above, ₹3,50,000 of annual
            interest taxed at a 30% slab rate means ₹1,05,000 of tax before cess and surcharge, leaving
            about ₹20,417 a month after tax. At a 20% slab rate the same interest leaves about
            ₹23,333 a month; at 5%, about ₹27,708.
          </>,
          <>
            In contrast, an SWP withdrawal is treated as a redemption of mutual fund units. Only the
            capital gain component of each withdrawal is taxed, not the principal amount. For
            equity-oriented funds held over 12 months, long-term capital gains (LTCG) above ₹1.25 lakh
            per financial year are taxed at 12.5% (before cess and surcharge). Illustrative example: if
            40% of each ₹30,000 withdrawal were gains, the year&apos;s gains would be ₹1,44,000, of
            which ₹19,000 sits above the ₹1.25 lakh exemption, giving tax of ₹2,375 for the year. If
            the gains portion were smaller, the tax could be zero. That is where the SWP tax
            advantage comes from — but it is conditional, not automatic.
          </>,
          <>
            The condition is the fund type. The 12.5% LTCG treatment above applies to equity-oriented
            funds. Gains from debt-oriented funds bought on or after 1 April 2023 are generally taxed
            at your slab rate regardless of how long you hold them, so an SWP from such a fund gets no
            special rate — only the part-gains, part-principal split still helps. Units redeemed
            within 12 months of purchase face short-term rates instead. Tax rules change between
            budgets, so check the current rules for your fund category before relying on any
            illustration here.
          </>,
        ],
      },
      {
        heading: "When does the FD win?",
        body: [
          <>
            <strong>Guaranteed returns.</strong> The rate is fixed when you book the deposit, and the
            payout does not depend on any market. For money that must cover rent, medicine, and
            groceries, that certainty has real value — an SWP cannot promise next month&apos;s
            withdrawal will leave the corpus intact.
          </>,
          <>
            <strong>DICGC cover.</strong> Bank deposits are insured by the Deposit Insurance and Credit
            Guarantee Corporation up to ₹5 lakh per depositor, per bank, counting principal and
            interest together. Amounts above ₹5 lakh at one bank, and deposits with NBFCs, are not
            covered — spreading large sums across banks is how depositors stay within the cover.
            Mutual fund units have no equivalent insurance.
          </>,
          <>
            <strong>Simplicity.</strong> There is no fund to choose, no NAV to watch, no withdrawal
            rate to manage, and no decision to make when markets fall. You book the deposit, the
            interest arrives monthly, and the principal returns at maturity. For someone who does not
            want to monitor investments, that is a genuine advantage, not a consolation prize.
          </>,
          <>
            The FD&apos;s weakness is the mirror image: the income is fixed in nominal rupees while
            prices rise, so if inflation runs above your post-tax return, the same ₹29,167 buys less
            each year. And at maturity you reinvest at whatever rate then prevails, which may be lower
            than today&apos;s. An SWP&apos;s corpus <em>can</em> grow enough to raise withdrawals over
            time — &ldquo;can&rdquo;, not &ldquo;will&rdquo;. Past fund returns do not guarantee future
            returns, and no return figure in this guide should be read as one.
          </>,
        ],
      },
      {
        heading: "SWP vs FD at a glance",
        body: [
          <>
            The table summarises the worked example above: ₹50,00,000 corpus, FD at an assumed 7%,
            SWP withdrawing ₹30,000 a month. Tax figures exclude cess and surcharge.
          </>,
          <div key="swp-fd-comparison-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Feature</th>
                <th className="border border-outline-variant/60 p-3">Fixed Deposit</th>
                <th className="border border-outline-variant/60 p-3">SWP (equity-oriented fund)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Monthly income (example)</td><td className="border border-outline-variant/60 p-3">₹29,167 fixed</td><td className="border border-outline-variant/60 p-3">₹30,000 chosen withdrawal</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Corpus after 1 year</td><td className="border border-outline-variant/60 p-3">₹50,00,000 intact</td><td className="border border-outline-variant/60 p-3">₹50,41,500 at steady 8% illustration; ₹46,40,000 at 0%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Income certainty</td><td className="border border-outline-variant/60 p-3">Fixed for the tenure</td><td className="border border-outline-variant/60 p-3">Withdrawal fixed; corpus value varies</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">What is taxed</td><td className="border border-outline-variant/60 p-3">Full interest at slab rate</td><td className="border border-outline-variant/60 p-3">Gains portion only; 12.5% LTCG above ₹1.25 lakh/year</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Tax on the example</td><td className="border border-outline-variant/60 p-3">₹1,05,000/year at 30% slab</td><td className="border border-outline-variant/60 p-3">₹2,375/year in the 40%-gains illustration</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Capital protection</td><td className="border border-outline-variant/60 p-3">DICGC cover up to ₹5 lakh per bank</td><td className="border border-outline-variant/60 p-3">None; market risk throughout</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Inflation</td><td className="border border-outline-variant/60 p-3">Fixed income loses purchasing power if inflation exceeds the post-tax return</td><td className="border border-outline-variant/60 p-3">Corpus may grow, allowing higher withdrawals — not guaranteed</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Flexibility</td><td className="border border-outline-variant/60 p-3">Breaking early usually costs a penalty</td><td className="border border-outline-variant/60 p-3">Raise, lower, pause or stop withdrawals anytime</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Effort</td><td className="border border-outline-variant/60 p-3">Book once; nothing to monitor</td><td className="border border-outline-variant/60 p-3">Choose a fund, set a rate, review periodically</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Many retirees split the difference: FDs (or other guaranteed income) for essential monthly
            expenses, and an SWP for the discretionary part, where a variable corpus is acceptable.
            That split is a budgeting choice, not a recommendation — the right mix depends on your
            expenses, other income, and how much variability you can live with.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Is SWP safe for senior citizens?",
        answer:
          "An SWP is not guaranteed income: the corpus rises and falls with the market, and withdrawals continue whether the fund is up or down. Senior citizens often use SWPs from conservative or balanced funds for part of their income, while keeping essential expenses covered by guaranteed income such as FDs or pensions. Safety here means matching the withdrawal rate to what the fund can plausibly sustain — not assuming it.",
      },
      {
        question: "Can an SWP deplete my initial capital?",
        answer:
          "Yes. If your monthly withdrawal rate exceeds the portfolio's annual rate of return over prolonged market downturns, the principal balance will gradually decrease. Use our SWP Calculator to plan safe withdrawal rates.",
      },
      {
        question: "Does SWP have TDS deduction?",
        answer:
          "For resident Indian individuals, mutual funds do not deduct TDS on capital gains from domestic mutual fund redemptions.",
      },
      {
        question: "What happens if markets fall in the first years of an SWP?",
        answer:
          "Withdrawing a fixed rupee amount while unit prices are low redeems more units for the same money, so the corpus shrinks faster and has fewer units left to recover when markets rebound. This is sequence risk: the same average return produces a worse outcome if the bad years come first. Lowering the withdrawal temporarily during a fall, or holding a cash buffer for essential expenses, reduces the damage.",
      },
      {
        question: "Can I use both an FD and an SWP?",
        answer:
          "Yes, and many retirees do: FD interest covers fixed monthly bills, while an SWP covers flexible spending. The FD portion gives certainty for essentials, the SWP portion gives flexibility and the chance of growth. The split depends on your monthly essential expenses and how much income variability you can tolerate.",
      },
    ],
    related: ["swp-calculator", "sip-calculator", "lumpsum-calculator"],
    pillar: { label: "Calculators", href: "/calculators/" },
  },
  {
    slug: "cagr-vs-xirr-in-mutual-funds",
    title: "CAGR vs XIRR: Differences, Formulas, and When to Use Which",
    seoTitle: "CAGR vs XIRR — Which Return Measure to Use | Tulyro",
    seoDescription:
      "Understand the difference between CAGR and XIRR. Learn when to use CAGR for lumpsum investments and XIRR for SIPs, with formulas and mathematical examples.",
    href: "/guides/cagr-vs-xirr-in-mutual-funds/",
    intro: [
      <>
        When evaluating mutual fund returns, investors frequently encounter two acronyms: CAGR (Compound
        Annual Growth Rate) and XIRR (Extended Internal Rate of Return). Using the wrong metric can give
        a misleading picture of your actual portfolio performance.
      </>,
    ],
    cta: { label: "Compute Your CAGR", href: "/calculators/cagr-calculator/" },
    sections: [
      {
        heading: "What is CAGR and When Should You Use It?",
        body: [
          <>
            CAGR measures the geometric mean annualized return of an investment over a multi-year period,
            assuming the profits are reinvested every year. The formula is:
            <br />
            <strong>CAGR = (End Value / Beginning Value)<sup>(1 / Years)</sup> − 1</strong>
          </>,
          <>
            CAGR works accurately <em>only</em> when there are exactly two cash flows: a single initial
            investment and a final redemption value (lumpsum investing). It completely ignores intermediate
            deposits or withdrawals.
          </>,
          <>
            <strong>Worked example.</strong> You invest ₹1,00,000 once and it is worth ₹1,61,051 after
            5 years. CAGR = (1,61,051 ÷ 1,00,000)<sup>(1/5)</sup> − 1 = 1.10 − 1 = 10% per year.
            That does not mean the fund earned 10% every year — it may have earned 20% one year and
            lost money the next. CAGR is the steady yearly rate that would take ₹1,00,000 to
            ₹1,61,051 in 5 years. It smooths the journey into one number, which is exactly why it is
            useful for comparing two lumpsum investments over the same period, and exactly why it
            misleads when money went in at different times.
          </>,
        ],
      },
      {
        heading: "What is XIRR and Why is it Necessary for SIPs?",
        body: [
          <>
            When you invest through a monthly SIP or make multiple staggered deposits and withdrawals, each
            installment stays invested for a different duration. For example, your first SIP installment
            compounds for 36 months, but your 36th installment compounds for only 1 month.
          </>,
          <>
            XIRR accounts for the exact transaction date of every individual cash inflow and outflow. It
            calculates the annualized internal rate of return across the entire series of cash flows using
            polynomial root-finding algorithms.
          </>,
          <>
            <strong>Worked example.</strong> You invest ₹1,00,000 on 1 January 2023, add ₹50,000 on
            1 January 2024, and the portfolio is worth ₹1,80,000 on 1 January 2026. Total invested:
            ₹1,50,000. Absolute return: (₹1,80,000 − ₹1,50,000) ÷ ₹1,50,000 = 20%. XIRR — the
            annualised rate that discounts every dated cash flow to zero — is 7.05%. Now watch what
            CAGR does with the same numbers: (₹1,80,000 ÷ ₹1,50,000)<sup>(1/3)</sup> − 1 = 6.27%.
            CAGR understates the return because it pretends all ₹1,50,000 was invested for the full
            three years, when ₹50,000 of it was only invested for two. The gap between 7.05% and
            6.27% is the timing error CAGR makes on staggered investments.
          </>,
          <>
            The same error is larger for SIPs, where every instalment has a different start date. That
            is why fund statements and portfolio apps report XIRR for SIP portfolios: it is the only
            one of the two that knows when each rupee went in.
          </>,
          <>
            If you are still deciding between SIP and lumpsum as the investment route itself, see <Link href="/guides/sip-vs-lumpsum/" className="text-primary underline">SIP vs Lumpsum: which generates better returns</Link> for a worked 10-year comparison.
          </>,
        ],
      },
      {
        heading: "Which measure should you use?",
        body: [
          <>
            The decision is about the shape of your cash flows, not about which number looks better.
            Use the table to pick, then check the result with the matching calculator.
          </>,
          <div key="cagr-xirr-decision-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Situation</th>
                <th className="border border-outline-variant/60 p-3">Use</th>
                <th className="border border-outline-variant/60 p-3">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">One lumpsum, one final value</td><td className="border border-outline-variant/60 p-3">CAGR</td><td className="border border-outline-variant/60 p-3">Only two cash flows; CAGR is exact</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Monthly SIP</td><td className="border border-outline-variant/60 p-3">XIRR</td><td className="border border-outline-variant/60 p-3">Each instalment has a different duration</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Irregular deposits or withdrawals</td><td className="border border-outline-variant/60 p-3">XIRR</td><td className="border border-outline-variant/60 p-3">Only XIRR uses exact dates and amounts</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Comparing two funds over the same dates</td><td className="border border-outline-variant/60 p-3">CAGR</td><td className="border border-outline-variant/60 p-3">Same start and end points make CAGR comparable</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Your whole portfolio&apos;s personal return</td><td className="border border-outline-variant/60 p-3">XIRR</td><td className="border border-outline-variant/60 p-3">Your deposits and withdrawals are part of the return</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Holding period under 1 year</td><td className="border border-outline-variant/60 p-3">Absolute return</td><td className="border border-outline-variant/60 p-3">Annualising a short period exaggerates the rate</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            One warning applies to both measures: neither knows about risk. A fund with a 12% CAGR
            that fell 30% in one year and a fund with a 12% CAGR that rose steadily look identical
            on this metric alone. Return measures answer &ldquo;how much?&rdquo;, never &ldquo;how
            bumpy was the ride?&rdquo;
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Which is better: CAGR or XIRR?",
        answer:
          "Neither is inherently 'better'—they serve different purposes. For one-time lumpsum investments, CAGR is the exact benchmark. For SIPs and portfolios with multiple cash flows, XIRR is the only accurate measure.",
      },
      {
        question: "Can CAGR be calculated for periods under 1 year?",
        answer:
          "CAGR is not recommended for time horizons shorter than 12 months because annualizing short-term volatility produces misleading and exaggerated rates of return. Use absolute return instead.",
      },
      {
        question: "Why does my broker show both CAGR and XIRR?",
        answer:
          "Brokerages display CAGR for individual stock holdings or point-to-point index comparisons, and XIRR for your overall mutual fund portfolio or SIP performance.",
      },
      {
        question: "Why is my XIRR different from the fund's published CAGR?",
        answer:
          "The fund's CAGR measures the fund's NAV growth between two dates, as if one lumpsum was invested throughout. Your XIRR measures your own dated cash flows — when you actually bought and sold. If you invested more before a rise, your XIRR beats the fund's CAGR; if you invested more before a fall, it trails it. Both numbers can be correct at the same time.",
      },
      {
        question: "Can XIRR be negative?",
        answer:
          "Yes. If the current value of your investments is less than what you put in, XIRR is negative — it is the annualised rate of loss on your dated cash flows. A negative XIRR on a young SIP is common during a market fall and says nothing by itself about the long-term outcome.",
      },
    ],
    related: ["cagr-calculator", "sip-calculator", "lumpsum-calculator"],
    pillar: { label: "Calculators", href: "/calculators/" },
  },
  {
    slug: "photo-and-signature-size-guide-for-govt-exams",
    title: "Govt Exam Photo & Signature Size Guide: SSC, UPSC, IBPS, NTA",
    seoTitle: "Govt Exam Photo Size — SSC, UPSC, IBPS, NTA | Tulyro",
    seoDescription:
      "Complete dimensions, DPI, and file size specifications (20KB to 50KB) for passport photos and signatures required by SSC, UPSC, IBPS, and NEET/JEE portals.",
    href: "/guides/photo-and-signature-size-guide-for-govt-exams/",
    intro: [
      <>
        Online applications for Indian government recruitment and entrance examinations (SSC CGL/CHSL,
        UPSC Civil Services, IBPS Bank PO, NTA NEET/JEE) have stringent image upload rules. Submitting a
        photo or signature that exceeds file size limits (usually 20KB to 50KB) or incorrect pixel
        dimensions results in automatic form rejection.
      </>,
    ],
    cta: { label: "Resize Photo to Exact KB", href: "/tools/image-resizer/" },
    sections: [
      {
        heading: "Standard Photo & Signature Specifications by Exam Board",
        body: [
          <>
            The table below collects the usual specifications. Treat it as a starting point, not a
            guarantee: every exam&apos;s notice is the final word, and specifications change between
            cycles. If the table and your notice disagree, follow the notice.
          </>,
          <div key="exam-photo-size-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Exam / Portal</th>
                <th className="border border-outline-variant/60 p-3">Photo</th>
                <th className="border border-outline-variant/60 p-3">Signature</th>
                <th className="border border-outline-variant/60 p-3">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">SSC (CGL, CHSL, MTS, GD)</td><td className="border border-outline-variant/60 p-3">20–50 KB, 3.5 × 4.5 cm</td><td className="border border-outline-variant/60 p-3">10–20 KB, 4.0 × 2.0 cm</td><td className="border border-outline-variant/60 p-3">JPEG / JPG</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">UPSC (Civil Services, NDA, CDS)</td><td className="border border-outline-variant/60 p-3">20–300 KB, 350 × 350 px min, 1000 × 1000 px max</td><td className="border border-outline-variant/60 p-3">20–300 KB, same resolution range</td><td className="border border-outline-variant/60 p-3">JPEG / JPG</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">IBPS &amp; SBI</td><td className="border border-outline-variant/60 p-3">20–50 KB, 200 × 230 px</td><td className="border border-outline-variant/60 p-3">10–20 KB, 140 × 60 px</td><td className="border border-outline-variant/60 p-3">JPEG / JPG</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">NTA (NEET, JEE, CUET)</td><td className="border border-outline-variant/60 p-3">10–200 KB, 3.5 × 4.5 cm</td><td className="border border-outline-variant/60 p-3">Check your bulletin — many notices state 4–30 KB; recent bulletins vary</td><td className="border border-outline-variant/60 p-3">JPEG / JPG</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Two things in the table need explaining. First, recent SSC cycles capture the photograph
            live through a webcam or phone camera during registration instead of accepting an
            uploaded file — if your notice works that way, the file you prepare is the signature.
            Second, UPSC notices have not all used the same ceiling: some cap the photograph lower
            than 300 KB, so read the resolution and size lines of your own notice rather than
            trusting any summary table, including this one.
          </>,
          <>
            <strong>1. SSC (Staff Selection Commission):</strong>
            <br />
            • Photo: 20 KB to 50 KB, JPEG format, 3.5 cm width × 4.5 cm height (approx 132 × 170 pixels).
            <br />
            • Signature: 10 KB to 20 KB, JPEG format, 4.0 cm width × 2.0 cm height.
          </>,
          <>
            <strong>2. UPSC (Union Public Service Commission):</strong>
            <br />
            • Photo: 20 KB to 300 KB, minimum resolution 350 × 350 pixels, maximum 1000 × 1000 pixels.
            <br />
            • Signature: 20 KB to 300 KB, same resolution requirements.
          </>,
          <>
            <strong>3. IBPS & State Bank of India:</strong>
            <br />
            • Photo: 20 KB to 50 KB, 200 × 230 pixels, white background preferred.
            <br />
            • Signature: 10 KB to 20 KB, 140 × 60 pixels on white paper with black ink.
          </>,
        ],
      },
      {
        heading: "What causes an application to be rejected?",
        body: [
          <>
            • <strong>File size mismatch:</strong> An image of 20.4 KB is rejected if the upper ceiling is
            strictly 20 KB. Always target 18–19 KB.
            <br />
            • <strong>Aspect ratio distortion:</strong> Stretches or squishes face features when resizing
            without maintaining aspect ratio.
            <br />
            • <strong>Background clutter:</strong> Most portals explicitly mandate a plain white or
            off-white background without shadows, hats, or dark glasses.
          </>,
        ],
      },
      {
        heading: "How do I get a photo into the required size?",
        body: [
          <>
            Work in this order: crop first, resize second, compress last. Cropping sets the shape
            (3.5 × 4.5 cm is a portrait ratio of 7:9). Resizing sets the pixel dimensions. Compressing
            sets the file size. Reversing the last two steps costs quality twice, because compressing
            and then resizing re-encodes an already-compressed image.
          </>,
          <>
            Aim for the middle of the allowed KB range, not the edge. A file at 49 KB passes a
            20–50 KB check, but re-saving it once — in a different editor, or after adding a name
            strip — can push it over 50 KB. A file at 30–35 KB has room for one more save. The same
            logic applies at the bottom: a signature that compresses to 7 KB fails a 10 KB minimum,
            and the fix is a larger pixel size or higher quality, not a smaller file.
          </>,
          <>
            Pixel numbers for the same centimetre size differ between sources because pixels depend
            on resolution (DPI). The same 3.5 × 4.5 cm photograph is 132 × 170 pixels at 96 DPI,
            about 350 × 450 pixels at 254 DPI, and 413 × 531 pixels at 300 DPI — the arithmetic is
            centimetres ÷ 2.54 × DPI. That is why one guide quotes 132 × 170 and another quotes
            350 × 450 for the same SSC photo: both describe the same physical size at different
            resolutions. When a notice states pixels, match the pixels; when it states centimetres,
            match the centimetres and the KB range, and do not worry that another site quotes
            different pixels.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "How do I compress my image under 20KB without blurriness?",
        answer:
          "Use our browser-based Image Resizer in KB. It automatically computes optimal dimensions and quality balancing to hit sub-20KB limits without server-side pixel degradation.",
      },
      {
        question: "Can I take a mobile photo of my signature?",
        answer:
          "Yes, provided you sign on crisp white paper with a dark black or blue pen in bright light, crop closely, and compress to the required 10–20KB range.",
      },
      {
        question: "Is it safe to upload government ID photos to online compressors?",
        answer:
          "Most online compressors upload your sensitive photos to remote servers. Tulyro processes images 100% locally in your browser canvas with zero server uploads.",
      },
      {
        question: "Why do different websites quote different pixel sizes for the same photo?",
        answer:
          "Because pixels depend on resolution. A 3.5 × 4.5 cm photo is 132 × 170 pixels at 96 DPI but 413 × 531 pixels at 300 DPI — same physical size, different pixel counts. Follow whichever unit your exam notice states: pixels if it states pixels, centimetres and KB if it states those.",
      },
      {
        question: "What if my signature file is too small in KB?",
        answer:
          "A signature under the minimum (for example 7 KB against a 10 KB floor) is rejected just like an oversized one. Increase the pixel dimensions — for example from 140 × 60 to 280 × 120, the same shape at double size — or raise the JPEG quality, then re-check the file size. Do not add padding bytes or blank borders to inflate the size; portals check the image, not just the byte count.",
      },
    ],
    related: ["image-resizer", "remove-background"],
    pillar: { label: "Tools", href: "/tools/" },
  },
  {
    slug: "emi-prepayment-explained",
    title: "EMI Prepayment Explained: How Paying Extra Early Saves Lakhs in Interest",
    seoTitle: "EMI Prepayment — How Extra Payments Save Interest | Tulyro",
    seoDescription:
      "Paying ₹5,00,000 extra in year 1 of a ₹50 lakh loan saves ₹17,69,951 interest and cuts 50 months. Worked math, the no-penalty rule, and when not to prepay.",
    href: "/guides/emi-prepayment-explained/",
    intro: [
      <>
        A prepayment is any extra money you pay on a loan beyond your monthly EMI. It goes straight
        against the principal, and because interest is charged on the balance that remains, every rupee
        you prepay stops earning interest for the lender from that day on. A single extra payment early
        in a loan can save lakhs. The same payment made near the end saves almost nothing. This guide
        shows the arithmetic, the choice every lender asks you to make, and the RBI rule that says
        prepaying a floating-rate loan costs you no penalty.
      </>,
    ],
    cta: { label: "Try the EMI Calculator", href: "/calculators/emi-calculator/" },
    sections: [
      {
        heading: "What does a prepayment actually do?",
        body: [
          <>
            Your EMI has two parts: interest on what you still owe, and principal that shrinks the
            balance. Early in a loan the interest part is large, because the balance is large. A
            prepayment cuts the balance directly, so every EMI after it carries less interest and more
            principal. That is the whole mechanism. Nothing else about the loan changes: the rate stays
            the same, and the EMI stays the same unless you ask for it to change.
          </>,
          <>
            There are two kinds. A part prepayment is an extra lump sum — a bonus, a tax refund, a
            matured deposit — paid on top of your EMIs. A full prepayment, also called foreclosure,
            pays off the entire outstanding balance and closes the loan. The maths is the same for
            both; only the size differs.
          </>,
          <>
            After a part prepayment, the lender will ask you to choose one of two things: keep the EMI
            the same and finish early, or keep the tenure the same and pay a smaller EMI. This choice
            matters more than most borrowers realise. The numbers below show why.
          </>,
        ],
      },
      {
        heading: "Worked example: a ₹50,00,000 home loan at 9% for 20 years",
        body: [
          <>
            Take a home loan of ₹50,00,000 at 9% annual interest for 20 years (240 months). The EMI is
            ₹44,986.30 a month. Over 240 months you pay ₹1,07,96,711.47 in total, so the interest alone
            is ₹57,96,711.47 — more than the amount borrowed. This is the baseline. Everything that
            follows is measured against it.
          </>,
          <>
            After 12 monthly payments the balance is ₹49,06,364.48. You have paid ₹4,46,200.06 in
            interest in that first year and barely dented the principal. That is normal for a long
            loan, and it is exactly why an early prepayment is so powerful: the balance is still
            almost the full loan, so cutting it now removes interest from nearly every payment that
            follows. I verified these figures with the reducing-balance formula — the same maths
            behind our{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>
            . If you want to check the formula itself first, read{" "}
            <Link href="/guides/how-to-calculate-emi/" className="text-primary underline">
              How to Calculate EMI by Hand
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "Option A: prepay ₹5,00,000, keep the EMI, finish 50 months early",
        body: [
          <>
            Suppose a bonus arrives after the first year and you prepay ₹5,00,000. The balance falls
            from ₹49,06,364.48 to ₹44,06,364.48 in one stroke. If you keep paying the same EMI of
            ₹44,986.30, the loan ends in month 190 instead of month 240. Total interest falls to
            ₹40,26,760.21. You save ₹17,69,951.26 in interest and finish 50 months — just over four
            years — early.
          </>,
          <>
            Notice what happened. The prepayment was 10% of the loan, but the interest saved is about
            31% of the total interest. That is the leverage of paying early: the ₹5,00,000 you paid in
            month 12 would otherwise have sat in the balance generating interest for the next 19 years.
          </>,
        ],
      },
      {
        heading: "Option B: prepay the same ₹5,00,000, but take a smaller EMI",
        body: [
          <>
            The same ₹5,00,000 prepayment, but this time you ask the lender to keep the 240-month
            tenure and reduce the EMI instead. The new EMI is ₹40,401.81 a month — about ₹4,584 less
            than before. Total interest comes to ₹52,51,449.15, a saving of ₹5,45,262.33 over the
            life of the loan.
          </>,
          <>
            Compare the two options side by side:
          </>,
          <div key="prepayment-options-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Choice after ₹5,00,000 prepayment</th>
                <th className="border border-outline-variant/60 p-3">Monthly EMI</th>
                <th className="border border-outline-variant/60 p-3">Loan ends</th>
                <th className="border border-outline-variant/60 p-3">Interest saved</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">No prepayment</td><td className="border border-outline-variant/60 p-3">₹44,986.30</td><td className="border border-outline-variant/60 p-3">Month 240</td><td className="border border-outline-variant/60 p-3">—</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Keep EMI, cut tenure</td><td className="border border-outline-variant/60 p-3">₹44,986.30</td><td className="border border-outline-variant/60 p-3">Month 190</td><td className="border border-outline-variant/60 p-3">₹17,69,951.26</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Keep tenure, cut EMI</td><td className="border border-outline-variant/60 p-3">₹40,401.81</td><td className="border border-outline-variant/60 p-3">Month 240</td><td className="border border-outline-variant/60 p-3">₹5,45,262.33</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Keeping the EMI saves more than three times as much interest as cutting it. That is the
            default advice: if you can afford the current EMI, keep it and take the shorter tenure.
            Take the smaller EMI only if the monthly relief is what you actually need — a lower
            income, a new expense — because it costs you over ₹12 lakh in lost savings here.
          </>,
          <>
            One warning: many lenders default to reducing the EMI unless you say otherwise. When you
            prepay, tell the lender in writing that you want the tenure reduced. Check the revised
            schedule they send you. If the EMI dropped and the tenure did not, the choice was made
            for you.
          </>,
        ],
      },
      {
        heading: "Why early beats late: the same ₹1,00,000, two different years",
        body: [
          <>
            Timing matters as much as size. Take a personal loan of ₹10,00,000 at 12% for 5 years (60
            months). The EMI is ₹22,244.45, and the total interest is ₹3,34,666.86. Prepay ₹1,00,000
            after 12 months, keeping the EMI, and the loan ends in 53 months with interest of
            ₹2,78,245.46 — a saving of ₹56,421.40 and 7 months early.
          </>,
          <>
            Prepay that same ₹1,00,000 after 48 months instead, and the saving is only ₹10,466.39. The
            amount is identical. The difference is that by month 48 most of the interest has already
            been paid, and there are only 12 payments left for the prepayment to work on. The rule is
            simple: the earlier the prepayment, the more interest it kills. A bonus in year one is
            worth far more than the same bonus in year four.
          </>,
          <>
            Small prepayments still count. On the ₹50 lakh home loan above, prepaying just ₹50,000
            after 12 months — 1% of the loan — saves ₹2,19,590.39 in interest and finishes the loan 5
            months early. You do not need a windfall. Regular small top-ups, even one a year, compound
            into real savings.
          </>,
        ],
      },
      {
        heading: "The RBI rule: no penalty on floating-rate loans",
        body: [
          <>
            The most common reason people do not prepay is the fear of a penalty. For most borrowers
            that fear is now out of date. Under the RBI (Pre-payment Charges on Loans) Directions,
            2025, issued on 2 July 2025, lenders may not levy any prepayment or foreclosure charge on
            floating-rate loans taken by individuals for purposes other than business. The rule applies
            to loans sanctioned or renewed on or after 1 January 2026, with no minimum lock-in period,
            and it does not matter where the prepayment money comes from — your savings, a bonus, or
            another lender&apos;s loan.
          </>,
          <>
            Two exceptions matter. First, fixed-rate loans can still carry prepayment charges, because
            the lender&apos;s cost of funds is locked in. If your loan is fixed-rate, or fixed for an
            initial period and floating after, check whether the fixed window still applies. Second, a
            loan sanctioned before 1 January 2026 is governed by the terms in its own agreement and the
            earlier circulars — read your sanction letter and the Key Facts Statement, and ask the
            lender in writing what, if anything, it charges. Do not take a branch official&apos;s word
            for it; get it in writing before you pay.
          </>,
        ],
      },
      {
        heading: "Prepay or invest the money instead?",
        body: [
          <>
            Prepaying a 9% loan is a guaranteed 9% return: every rupee prepaid saves 9% a year in
            interest you will never pay, with zero market risk. For an investment to beat that, it must
            earn more than 9% after tax. Equity gains above ₹1.25 lakh a year are taxed at 12.5% as
            long-term capital gains, so an equity investment would need roughly 10.3% before tax
            (9 ÷ 0.875) just to match the prepayment — and it carries the risk of earning far less.
            That is the honest comparison: a guaranteed 9% against a hoped-for 10% plus.
          </>,
          <>
            The maths favours prepaying when the loan rate is high — a personal loan at 12% or a credit
            card at 36% beats almost any investment. It is less clear-cut for a cheap home loan at 8%
            if you have a long horizon and a high risk appetite. Either way, never prepay with money
            you will need soon. Keep an emergency fund of three to six months of expenses first, and
            clear higher-interest debt before cheaper debt. A prepayment is not reversible: once the
            money is in the loan, you cannot withdraw it.
          </>,
          <>
            If you claim a home-loan interest deduction under the old income tax regime, note that less
            interest also means a smaller deduction. Run the numbers for your own slab, or ask your tax
            adviser, before prepaying a large amount purely for the interest saving.
          </>,
        ],
      },
      {
        heading: "How to prepay, step by step",
        body: [
          <>
            First, confirm the loan type. Floating-rate means no penalty under the RBI rule above;
            fixed-rate means check the charges in your agreement first. Second, decide the option you
            want — reduce the tenure, not the EMI — and put it in writing to the lender. Third, make
            the payment through the lender&apos;s own channel, online banking or a branch visit, and
            keep the acknowledgement. Fourth, collect the revised amortisation schedule and verify two
            numbers: the new balance and the new end date. If either looks wrong, raise it before the
            next EMI is due.
          </>,
          <>
            Before paying, run the numbers for your own loan. The{" "}
            <Link href="/calculators/emi-calculator/" className="text-primary underline">
              EMI Calculator
            </Link>{" "}
            shows your total interest, and{" "}
            <Link href="/guides/how-mortgage-amortization-works/" className="text-primary underline">
              how mortgage amortization works
            </Link>{" "}
            explains why the early years are mostly interest. If your loan is a US-dollar mortgage
            rather than an Indian loan, the same prepayment maths applies — check it against the{" "}
            <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
              Mortgage Calculator
            </Link>
            .
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Does prepayment reduce my EMI or my loan tenure?",
        answer:
          "Your choice. Keeping the EMI the same and cutting the tenure saves far more interest: on a ₹50,00,000 loan at 9% for 20 years, a ₹5,00,000 prepayment in year 1 saves ₹17,69,951.26 with a shorter tenure, but only ₹5,45,262.33 with a smaller EMI. Tell the lender in writing that you want the tenure reduced.",
      },
      {
        question: "Is there a penalty for prepaying a home loan in India?",
        answer:
          "Not on a floating-rate loan sanctioned or renewed on or after 1 January 2026: the RBI (Pre-payment Charges on Loans) Directions, 2025 prohibit prepayment and foreclosure charges for individuals, with no lock-in period. Fixed-rate loans can still carry charges, and older loans follow their own agreement — check your sanction letter and Key Facts Statement.",
      },
      {
        question: "How much can I save by prepaying ₹1,00,000?",
        answer:
          "It depends on the rate, the balance, and when you pay. On a ₹10,00,000 personal loan at 12% for 5 years, prepaying ₹1,00,000 after 12 months saves ₹56,421.40 in interest and finishes the loan 7 months early. The same amount after 48 months saves only ₹10,466.39.",
      },
      {
        question: "Should I prepay my loan or invest the money?",
        answer:
          "Prepaying is a guaranteed return equal to your loan rate — 9% on a 9% loan — with no market risk. An investment must earn more than that after tax to win; at 12.5% long-term capital gains tax, equities need roughly 10.3% before tax to match a 9% prepayment. Keep an emergency fund first and clear higher-interest debt before cheaper debt.",
      },
      {
        question: "Can I prepay a personal loan or car loan the same way?",
        answer:
          "Yes, the maths is identical: extra principal cuts future interest. The same RBI no-penalty rule covers floating-rate personal and car loans to individuals. Check whether your loan is fixed or floating first, and confirm any charges in writing.",
      },
      {
        question: "Does prepaying hurt my credit score?",
        answer:
          "No. Prepaying lowers your outstanding debt, and a loan closed with a clean repayment history stays on your credit report as a positive record. It does not count as a default or a missed payment.",
      },
    ],
    related: ["emi-calculator", "mortgage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "password-entropy-and-security-guide",
    title: "Password Entropy & Strength Guide: What Actually Makes a Password Secure",
    seoTitle: "Password Entropy — What Makes Passwords Strong | Tulyro",
    seoDescription:
      "Entropy is counted in bits: a 12-character password can hold 56 or 79 bits depending on the charset. How to measure strength, and why length wins.",
    href: "/guides/password-entropy-and-security-guide/",
    intro: [
      <>
        Password security is not a guessing game. It is pure combinatorics and information theory.
        Most people assume replacing an &apos;e&apos; with a &apos;3&apos; or adding an exclamation mark stops attackers, but
        modern hash-cracking rigs compute tens of billions of SHA-256 and bcrypt hashes per second.
      </>,
      <>
        This guide explains how entropy is calculated, why length dominates complexity, and how to create
        passwords that are mathematically impossible to brute-force in human lifespans.
      </>,
    ],
    cta: { label: "Generate Secure Password", href: "/tools/password-generator/" },
    sections: [
      {
        heading: "How is password entropy calculated?",
        body: [
          <>
            Entropy is measured in bits (H = L × log<sub>2</sub>(R)), where <strong>L</strong> is the password
            length and <strong>R</strong> is the pool size of unique available characters (radix).
          </>,
          <>
            If you choose characters from lowercase letters alone (R = 26), an 8-character password provides
            only 8 × log<sub>2</sub>(26) ≈ 37.6 bits of entropy. A commodity GPU cluster running Hashcat can crack
            37 bits of entropy in seconds.
          </>,
          <>
            By expanding the character set to uppercase, numbers, and symbols (R = 94) and increasing length to
            16 characters, entropy explodes to 16 × log<sub>2</sub>(94) ≈ 104.8 bits. Overcoming 104 bits would require
            billions of years of compute even on global supercomputers.
          </>,
          <>
            The table shows what the formula gives for the combinations people actually use. Read
            across a row to see length winning; read down a column to see charset helping less.
          </>,
          <div key="password-entropy-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Character set</th>
                <th className="border border-outline-variant/60 p-3">8 characters</th>
                <th className="border border-outline-variant/60 p-3">12 characters</th>
                <th className="border border-outline-variant/60 p-3">16 characters</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Lowercase only (26)</td><td className="border border-outline-variant/60 p-3">37.6 bits</td><td className="border border-outline-variant/60 p-3">56.4 bits</td><td className="border border-outline-variant/60 p-3">75.2 bits</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Letters + digits (62)</td><td className="border border-outline-variant/60 p-3">47.6 bits</td><td className="border border-outline-variant/60 p-3">71.5 bits</td><td className="border border-outline-variant/60 p-3">95.3 bits</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Letters + digits + symbols (94)</td><td className="border border-outline-variant/60 p-3">52.4 bits</td><td className="border border-outline-variant/60 p-3">78.7 bits</td><td className="border border-outline-variant/60 p-3">104.9 bits</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Diceware words (7,776-word list)</td><td className="border border-outline-variant/60 p-3">—</td><td className="border border-outline-variant/60 p-3">5 words: 64.6 bits</td><td className="border border-outline-variant/60 p-3">6 words: 77.5 bits</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            What do the bits buy in time? At a billion guesses per second, searching the whole
            50-bit space takes about 13 days; searching a 70-bit space at a trillion guesses per
            second still takes about 37 years. Real attackers do not search blindly — they try
            leaked passwords, dictionary words, and patterns first — so these times are ceilings
            for random passwords, not promises for human-chosen ones. A password from a breach list
            has effectively zero entropy no matter how long it is.
          </>,
        ],
      },
      {
        heading: "Does length beat complexity?",
        body: [
          <>
            Adding symbols slightly increases the base (R), but increasing length directly multiplies the exponent.
            An 18-character lowercase password (18 × 4.70 = 84.6 bits) is exponentially harder to crack than an 8-character
            password filled with tricky symbols (8 × 6.55 = 52.4 bits).
          </>,
          <>
            Furthermore, humans who create short &quot;complex&quot; passwords follow predictable patterns: capitalized first letter,
            followed by letters, ending with digits and an exclamation mark. Dictionary-based cracking tools exploit this
            exact bias with targeted rule files.
          </>,
          <>
            Passphrases exploit the same maths in a friendlier form. Five random words from a
            7,776-word list give 64.6 bits — more than a 12-character lowercase password — and are
            far easier to type and remember. The key word is random: five words from a favourite
            quote or song lyric are guessable in a way five dice-rolled words are not. Use a
            generator for the words, the same way you would for characters, and do not reuse the
            passphrase anywhere else.
          </>,
        ],
      },
      {
        heading: "Cryptographically Secure Random vs Math.random()",
        body: [
          <>
            Standard pseudo-random number generators like JavaScript&apos;s <code>Math.random()</code> are deterministic PRNGs
            (often Xoroshiro128+). They are designed for speed in simulations, not cryptographic security. If an attacker
            captures a sequence of generated values, future states can be reverse-engineered.
          </>,
          <>
            Tulyro&apos;s password generator uses <code>window.crypto.getRandomValues()</code>, which interfaces directly with
            the OS cryptographic seed (entropy gathered from CPU hardware noise, interrupt timings, and OS randomness).
            Values are generated locally inside your browser and never leave your device.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "How many bits of entropy make a password unbreakable?",
        answer:
          "For online accounts protected by rate limiting, 60-70 bits is typically secure. For offline hashes (where a database dump is cracked offline), 80+ bits is minimum and 100+ bits is recommended.",
      },
      {
        question: "Are symbols really necessary if the password is long enough?",
        answer:
          "If a password is 20+ characters, standard alphanumeric characters provide sufficient entropy. However, adding symbols prevents specific pattern matching and satisfies strict website policy rules.",
      },
      {
        question: "Is it safe to generate passwords in a web browser?",
        answer:
          "Yes, provided the tool operates 100% client-side with native Web Crypto APIs and sends zero payloads over the network. Tulyro generates everything locally inside your browser sandbox.",
      },
      {
        question: "Is a passphrase better than a random password?",
        answer:
          "For memorised passwords, yes: five random diceware words give about 65 bits of entropy and are much easier to type than 12 random characters. For passwords stored in a manager, random characters are fine — memorability does not matter. Either way, the words or characters must be randomly generated; human-chosen phrases are far weaker than the maths suggests.",
      },
    ],
    related: ["password-generator", "json-formatter", "base64-encoder-decoder"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "unix-epoch-timestamp-guide",
    title: "Understanding Unix Epoch Timestamps: Seconds, Milliseconds & Year 2038",
    seoTitle: "Unix Epoch Explained — Seconds, Milliseconds & 2038 | Tulyro",
    seoDescription:
      "Epoch time counts seconds since 1 Jan 1970. How to tell seconds from milliseconds, what breaks in 2038, and per-language conversion snippets.",
    href: "/guides/unix-epoch-timestamp-guide/",
    intro: [
      <>
        Unix time (also known as POSIX time or Epoch time) counts elapsed time as the number of seconds that have
        passed since 00:00:00 UTC on 1 January 1970, excluding leap seconds.
      </>,
      <>
        It is the foundational clock standard behind modern operating systems, databases, cloud APIs, and distributed
        systems because an integer timestamp eliminates timezone ambiguity and daylight saving confusion.
      </>,
    ],
    cta: { label: "Try Epoch Converter", href: "/tools/epoch-converter/" },
    sections: [
      {
        heading: "Seconds vs Milliseconds: How to Detect Which One You Have",
        body: [
          <>
            A classic source of developer bugs is mixing Unix seconds with milliseconds. Backend services like Unix utilities,
            PostgreSQL, and Python&apos;s <code>time.time()</code> traditionally return seconds (10 digits in the 2020s, e.g., <code>1700000000</code>).
          </>,
          <>
            JavaScript, Java (<code>System.currentTimeMillis()</code>), and browser DOM events count in milliseconds (13 digits,
            e.g., <code>1700000000000</code>).
          </>,
          <>
            <strong>Quick Rule:</strong> If your timestamp has 10 digits (under 10<sup>11</sup>), it is in seconds. If it has 13 digits,
            it is in milliseconds. In JavaScript, converting seconds requires multiplying by 1,000 before passing into <code>new Date(ts * 1000)</code>.
          </>,
          <>
            The same rule works by digit count in the 2020s. Count the digits first, convert second —
            guessing the unit is how dates land in 1970 or in the year 5138.
          </>,
          <div key="epoch-unit-decision-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Digits</th>
                <th className="border border-outline-variant/60 p-3">Unit</th>
                <th className="border border-outline-variant/60 p-3">Example (same moment)</th>
                <th className="border border-outline-variant/60 p-3">To get seconds</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">10</td><td className="border border-outline-variant/60 p-3">Seconds</td><td className="border border-outline-variant/60 p-3"><code>1700000000</code></td><td className="border border-outline-variant/60 p-3">Use as-is</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">13</td><td className="border border-outline-variant/60 p-3">Milliseconds</td><td className="border border-outline-variant/60 p-3"><code>1700000000000</code></td><td className="border border-outline-variant/60 p-3">Divide by 1,000</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">16</td><td className="border border-outline-variant/60 p-3">Microseconds</td><td className="border border-outline-variant/60 p-3"><code>1700000000000000</code></td><td className="border border-outline-variant/60 p-3">Divide by 1,000,000</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">19</td><td className="border border-outline-variant/60 p-3">Nanoseconds</td><td className="border border-outline-variant/60 p-3"><code>1700000000000000000</code></td><td className="border border-outline-variant/60 p-3">Divide by 1,000,000,000</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            All four rows are the same instant: 14 November 2023, 22:13:20 UTC. A defensive check in
            code is to compare magnitude instead of trusting the source: a value below 10<sup>11</sup>
            is almost certainly seconds for any date in our lifetimes, and a value above 10<sup>12</sup>
            is milliseconds or finer. If a value has 10 digits but your code treats it as
            milliseconds, <code>new Date(1700000000)</code> lands on 20 January 1970 — the classic
            symptom of this exact bug.
          </>,
        ],
      },
      {
        heading: "What is the Year 2038 problem?",
        body: [
          <>
            Many legacy systems store Unix time as a signed 32-bit integer. The maximum value of a signed 32-bit integer is
            2,147,483,647 (2<sup>31</sup> − 1).
          </>,
          <>
            On <strong>19 January 2038 at 03:14:07 UTC</strong>, this integer overflows into negative territory (-2,147,483,648),
            causing systems to interpret the date as 13 December 1901.
          </>,
          <>
            Whether 2038 bites depends entirely on the storage width. The table shows when each
            common representation runs out, counting seconds from the epoch unless stated otherwise.
          </>,
          <div key="year-2038-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Storage</th>
                <th className="border border-outline-variant/60 p-3">Maximum value</th>
                <th className="border border-outline-variant/60 p-3">Runs out</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Signed 32-bit seconds</td><td className="border border-outline-variant/60 p-3">2,147,483,647</td><td className="border border-outline-variant/60 p-3">19 Jan 2038, 03:14:07 UTC</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unsigned 32-bit seconds</td><td className="border border-outline-variant/60 p-3">4,294,967,295</td><td className="border border-outline-variant/60 p-3">7 Feb 2106, 06:28:15 UTC</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Signed 64-bit seconds</td><td className="border border-outline-variant/60 p-3">9,223,372,036,854,775,807</td><td className="border border-outline-variant/60 p-3">About 292 billion years from 1970</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Signed 64-bit milliseconds</td><td className="border border-outline-variant/60 p-3">9,223,372,036,854,775,807</td><td className="border border-outline-variant/60 p-3">About 292 million years from 1970</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Modern operating systems, 64-bit kernels, databases, and modern programming languages use 64-bit integers for timestamps,
            pushing the overflow date approximately 292 billion years into the future.
          </>,
          <>
            The remaining risk sits in places that still assume 32-bit time: old embedded firmware,
            legacy file formats, and 32-bit applications that have never been rebuilt. The fix is
            unglamorous — store timestamps in 64-bit integers, or as ISO 8601 strings where the
            format allows it — and it has to happen before 2038, not during it, because systems
            that schedule dates in advance (mortgages, certificates, long-term contracts) hit the
            wall years early whenever they compute a date past January 2038.
          </>,
        ],
      },
      {
        heading: "Timezone Conversion & ISO 8601",
        body: [
          <>
            An epoch timestamp is universal and independent of geographical timezones. When an API returns <code>1700000000</code>,
            it represents the exact same physical moment across London, New York, Tokyo, and New Delhi.
          </>,
          <>
            Timezones only come into play during rendering. Translating epoch timestamps to ISO 8601 strings (e.g. <code>2023-11-14T22:13:20.000Z</code>)
            maintains precision and clarity across international web applications.
          </>,
          <>
            Worked check: <code>1700000000</code> is 22:13:20 UTC on 14 November 2023. Rendered in
            India (UTC+5:30) that is 03:43:20 IST on 15 November 2023 — same moment, different wall
            clock. If your code and your API disagree by exactly 5 hours 30 minutes, one side is
            rendering local time and the other is rendering UTC; the timestamp itself is not wrong.
          </>,
        ],
      },
      {
        heading: "How do I convert epoch time in my language?",
        body: [
          <>
            The snippets below cover the two operations every codebase needs: getting the current
            time as an epoch value, and turning an epoch value back into a date. Watch the unit in
            each row — JavaScript and Java default to milliseconds, Python and Go default to
            seconds.
          </>,
          <div key="epoch-snippet-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Language</th>
                <th className="border border-outline-variant/60 p-3">Now (epoch)</th>
                <th className="border border-outline-variant/60 p-3">Epoch to date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">JavaScript</td><td className="border border-outline-variant/60 p-3"><code>Date.now()</code> (ms)</td><td className="border border-outline-variant/60 p-3"><code>new Date(ts * 1000)</code> from seconds</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Python</td><td className="border border-outline-variant/60 p-3"><code>int(time.time())</code> (s)</td><td className="border border-outline-variant/60 p-3"><code>datetime.fromtimestamp(ts, timezone.utc)</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Java</td><td className="border border-outline-variant/60 p-3"><code>Instant.now().getEpochSecond()</code> (s)</td><td className="border border-outline-variant/60 p-3"><code>Instant.ofEpochSecond(ts)</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Go</td><td className="border border-outline-variant/60 p-3"><code>time.Now().Unix()</code> (s)</td><td className="border border-outline-variant/60 p-3"><code>time.Unix(ts, 0).UTC()</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">SQL (PostgreSQL)</td><td className="border border-outline-variant/60 p-3"><code>EXTRACT(EPOCH FROM NOW())</code> (s)</td><td className="border border-outline-variant/60 p-3"><code>to_timestamp(1700000000)</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Shell (GNU date)</td><td className="border border-outline-variant/60 p-3"><code>date +%s</code> (s)</td><td className="border border-outline-variant/60 p-3"><code>date -d @1700000000 -u</code></td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Two traps hide in this table. First, Python&apos;s <code>time.time()</code> returns a
            float — <code>int()</code> truncates toward zero, which is fine for dates after 1970 but
            rounds the wrong way for negative (pre-1970) timestamps. Second, JavaScript&apos;s
            <code>Date</code> constructor takes milliseconds, so passing seconds without multiplying
            by 1,000 is the single most common epoch bug in frontend code. When in doubt, convert
            once with our{" "}
            <Link href="/tools/epoch-converter/" className="text-primary underline">
              Epoch Converter
            </Link>{" "}
            and compare the rendered date against the snippet&apos;s output.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Does Unix time account for leap seconds?",
        answer:
          "No. Unix time ignores leap seconds; every day is treated as having exactly 86,400 seconds. When a leap second occurs, systems either repeat the second or apply a leap smear across several hours.",
      },
      {
        question: "Can an epoch timestamp be negative?",
        answer:
          "Yes. Any date before 1 January 1970 is represented as a negative integer. For example, -315619200 corresponds to 1 January 1960 UTC.",
      },
      {
        question: "Why does my JavaScript Date show the wrong time?",
        answer:
          "If you pass a 10-digit second timestamp to `new Date(ts)`, JavaScript treats it as milliseconds from 1970, landing in January 1970. Always multiply seconds by 1,000.",
      },
      {
        question: "How do I convert milliseconds to seconds?",
        answer:
          "Divide by 1,000: 1700000000000 milliseconds is 1700000000 seconds. Use integer division if you need whole seconds, and keep the remainder (the .000 part) if you need sub-second precision. The reverse — seconds to milliseconds — is multiply by 1,000.",
      },
      {
        question: "Is an epoch timestamp the same in every timezone?",
        answer:
          "Yes. The number counts seconds since 1 January 1970 UTC and names one absolute moment. Timezones only change how that moment is displayed: 1700000000 is 22:13:20 UTC and 03:43:20 IST the next day, but both describe the same instant.",
      },
    ],
    related: ["epoch-converter", "json-formatter", "base64-encoder-decoder"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "json-formatting-and-validation-guide",
    title: "Complete JSON Formatting & Validation Guide: RFC 8259, Errors & Minification",
    seoTitle: "JSON Formatting Guide — Syntax, Errors & Fixes | Tulyro",
    seoDescription:
      "Understand RFC 8259 JSON standards, master beautification and minification, identify line-by-line syntax errors, and optimize payload sizes for web APIs.",
    href: "/guides/json-formatting-and-validation-guide/",
    intro: [
      <>
        JavaScript Object Notation (JSON) is the universal lingua franca of web communication, cloud APIs,
        configuration files, and document databases. Standardized under RFC 8259 and ECMA-404, it provides a lightweight,
        language-independent data interchange format.
      </>,
      <>
        Despite its widespread simplicity, invalid JSON breaks production deployments daily. This guide covers
        strict RFC syntax rules, common syntax errors like trailing commas, byte-size optimization via minification,
        and safe client-side processing.
      </>,
    ],
    cta: { label: "Format & Validate JSON", href: "/tools/json-formatter/" },
    sections: [
      {
        heading: "What are the strict JSON syntax rules?",
        body: [
          <>
            Unlike standard JavaScript object literals, JSON has strict syntactic constraints designed for universal parser compatibility:
          </>,
          <>
            <strong>Double Quotes Only:</strong> All string literals and object keys MUST be enclosed in double quotes (<code>&quot;key&quot;</code>). Single quotes (<code>&apos;key&apos;</code>) are strictly forbidden and throw immediate parser syntax errors.
          </>,
          <>
            <strong>No Trailing Commas:</strong> Commas must separate items in an array or properties in an object, but a trailing comma after the final element (<code>[1, 2, 3,]</code> or <code>&#123;&quot;a&quot;: 1,&#125;</code>) violates RFC specifications.
          </>,
          <>
            <strong>Valid Data Types Only:</strong> JSON supports strings, numbers, booleans (<code>true</code> / <code>false</code>), <code>null</code>, arrays, and objects. Functions, <code>undefined</code>, symbols, and <code>NaN</code> cannot be represented in valid JSON.
          </>,
        ],
      },
      {
        heading: "Beautification vs Minification: Performance Trade-offs",
        body: [
          <>
            <strong>Formatting (Pretty Printing):</strong> Adds indentation (typically 2 or 4 spaces) and newlines to produce human-readable structures. While indispensable during debugging, logging, and code reviews, whitespace adds significant payload weight.
          </>,
          <>
            <strong>Minification:</strong> Strips all non-essential whitespace, line breaks, and indentation without altering the underlying data graph. In high-throughput APIs, minified JSON reduces bandwidth by 20% to 45%, reducing latency and egress costs.
          </>,
          <>
            Worked example: the object <code>&#123;&quot;name&quot;: &quot;Asha&quot;, &quot;age&quot;: 30, &quot;city&quot;: &quot;Pune&quot;&#125;</code> is
            51 characters pretty-printed with 2-space indentation and 38 characters minified — a
            25.5% saving on this small object. The saving grows with nesting depth, because every
            nested level adds indentation to every line. Numbers are the one place minification
            cannot help: <code>1.50</code> and <code>1.5</code> are the same number to a parser,
            and most minifiers leave numeric text untouched.
          </>,
          <>
            One precision trap: JSON numbers are usually parsed as IEEE 754 double-precision
            floats, which represent integers exactly only up to 2<sup>53</sup> − 1
            (9,007,199,254,740,991). Above that, neighbouring integers collapse — 2<sup>53</sup> + 1
            parses to the same value as 2<sup>53</sup>. APIs that carry 64-bit IDs (database keys,
            snowflake IDs) should send them as strings, not numbers, or consumers in JavaScript
            will silently read the wrong ID.
          </>,
        ],
      },
      {
        heading: "How do I fix common JSON errors?",
        body: [
          <>
            Parser errors point at the character where parsing failed, which is often one token
            <em>after</em> the actual mistake. Read the error, then look backwards from the
            reported position. The table covers the errors you will see most often.
          </>,
          <div key="json-errors-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Error message</th>
                <th className="border border-outline-variant/60 p-3">Likely cause</th>
                <th className="border border-outline-variant/60 p-3">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected token &apos; in JSON</td><td className="border border-outline-variant/60 p-3">Single-quoted string or key</td><td className="border border-outline-variant/60 p-3">Use double quotes everywhere</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected token &#125; in JSON</td><td className="border border-outline-variant/60 p-3">Trailing comma before &#125; or ]</td><td className="border border-outline-variant/60 p-3">Remove the comma after the last item</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected end of JSON input</td><td className="border border-outline-variant/60 p-3">Truncated text or unclosed bracket</td><td className="border border-outline-variant/60 p-3">Close all brackets; check the response was not cut off</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected token / in JSON</td><td className="border border-outline-variant/60 p-3">Comment in the JSON</td><td className="border border-outline-variant/60 p-3">Remove comments; JSON has no comment syntax</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected string in JSON</td><td className="border border-outline-variant/60 p-3">Missing comma or colon</td><td className="border border-outline-variant/60 p-3">Add the missing separator before the string</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Unexpected token u in JSON</td><td className="border border-outline-variant/60 p-3">Literal <code>undefined</code> in the text</td><td className="border border-outline-variant/60 p-3">Use <code>null</code>, or omit the key</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            <strong>Unexpected Token / at Position:</strong> Usually indicates unquoted keys, single quotes, or invalid comments (JSON does not support double-slash or block comments).
          </>,
          <>
            <strong>Unescaped Control Characters:</strong> Newlines inside string values must be escaped as <code>\n</code> rather than literal multiline line breaks.
          </>,
          <>
            <strong>Client-Side Processing Security:</strong> Validating JSON via <code>JSON.parse()</code> inside your browser sandbox protects against data leakage. Never use <code>eval()</code> or insecure string execution on untrusted JSON strings.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Does valid JSON allow comments?",
        answer:
          "Standard RFC 8259 JSON does not permit comments. While variations like JSONC or JSON5 allow comments, standard web APIs and JSON.parse will fail if comments are present.",
      },
      {
        question: "Why does JSON reject undefined and functions?",
        answer:
          "JSON is a pure data interchange format, not an executable programming language. It is designed to be parsed safely and unambiguously across all languages, including Python, C++, Go, and Rust.",
      },
      {
        question: "Does minifying JSON change the data?",
        answer:
          "No. Minification removes only structural whitespace and line breaks outside of string literals. Keys, values, and structural hierarchies remain identical.",
      },
      {
        question: "Can JSON numbers be too large?",
        answer:
          "Yes. Most parsers read JSON numbers as 64-bit floats, which represent integers exactly only up to 2^53 − 1 (9,007,199,254,740,991). Above that, adjacent integers collapse into the same value. Send 64-bit IDs as strings to keep them exact.",
      },
    ],
    related: ["json-formatter", "epoch-converter", "base64-encoder-decoder"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "uuid-v4-vs-v7-which-should-you-use",
    title: "UUID v4 vs UUID v7: Differences, Database Index Performance & Which to Choose",
    seoTitle: "UUID v4 vs v7 — Which One Should You Use? | Tulyro",
    seoDescription:
      "Random v4 UUIDs scatter B-tree inserts; time-ordered v7 keeps them sequential. Bit layouts, the trade-offs, and which version fits your database.",
    href: "/guides/uuid-v4-vs-v7-which-should-you-use/",
    intro: [
      <>
        Universally Unique Identifiers (UUIDs) are 128-bit numbers used to identify records across
        distributed architectures without central authority coordination. While UUID v4 (purely random)
        has been the industry standard for decades, modern databases suffer severe write-amplification
        and B-Tree page splits when indexing purely random keys. RFC 9562 formalised UUID v7 — a
        timestamp-ordered variant designed specifically for database primary keys. Explore instant RFC 4122
        generation with our{" "}
        <Link href="/tools/uuid-generator/" className="text-primary underline">
          client-side UUID Generator
        </Link>
        .
      </>,
    ],
    cta: { label: "Generate Cryptographic UUIDs", href: "/tools/uuid-generator/" },
    sections: [
      {
        heading: "How UUID v4 Works (And Why B-Tree Indexes Suffer)",
        body: [
          <>
            A UUID v4 comprises 122 pseudo-random bits, 4 version bits, and 2 variant bits. Because
            values are uniformly distributed across the 128-bit space, inserting sequential rows with
            UUID v4 primary keys forces databases like PostgreSQL and MySQL InnoDB to write to random
            disk pages.
          </>,
          <>
            Once an index table grows larger than available RAM (buffer cache), every single insert
            triggers costly random I/O reads to fetch index leaves, accompanied by frequent page
            splits and severe storage fragmentation.
          </>,
        ],
      },
      {
        heading: "Enter UUID v7: Timestamp-Ordered Monotonicity",
        body: [
          <>
            UUID v7 embeds a 48-bit Unix timestamp (millisecond precision) in the leading bits,
            followed by version bits, sub-millisecond sequencing, and random entropy. Because the most
            significant bits increase monotonically over time, new rows append cleanly to the right-most
            leaf of B-Tree indexes — achieving the write speed of auto-incrementing integers while preserving
            the global uniqueness and decentralisation of UUIDs.
          </>,
          <>
            The exact layout is: 48 bits of Unix timestamp in milliseconds, a 4-bit version field
            set to 0111 (the <code>7</code> you see at the start of the third group), 12 random
            bits, a 2-bit variant field set to 10, and 62 more random bits — 74 random bits in
            total. The 48-bit timestamp covers millisecond time until the year 10889, so the
            ordering property has no practical expiry date. You can read the timestamp out of any
            v7 UUID: take the first 12 hex characters, convert from hex to decimal, and you have
            Unix milliseconds. For example, <code>018bcfe56991</code> is 1,700,000,000,401
            milliseconds — 14 November 2023, 22:13:20.401 UTC. That readability is a feature for
            debugging and a leak to consider for public IDs, as the comparison table notes.
          </>,
        ],
      },
      {
        heading: "UUID v4 vs UUID v7 Architecture Comparison",
        body: [
          <div key="uuid-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="border border-outline-variant/60 p-3">Feature</th>
                  <th className="border border-outline-variant/60 p-3">UUID v4 (RFC 4122)</th>
                  <th className="border border-outline-variant/60 p-3">UUID v7 (RFC 9562)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Primary Structure</td>
                  <td className="border border-outline-variant/60 p-3">122 random bits</td>
                  <td className="border border-outline-variant/60 p-3">48-bit timestamp + 74 random/seq bits</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Ordering</td>
                  <td className="border border-outline-variant/60 p-3">Completely random</td>
                  <td className="border border-outline-variant/60 p-3">Naturally time-ordered (k-sortable)</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Database Impact</td>
                  <td className="border border-outline-variant/60 p-3">Causes B-Tree page splits &amp; high I/O</td>
                  <td className="border border-outline-variant/60 p-3">Append-friendly, compact index pages</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Information Leakage</td>
                  <td className="border border-outline-variant/60 p-3">None (opaque)</td>
                  <td className="border border-outline-variant/60 p-3">Creation timestamp is extractable</td>
                </tr>
              </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Which version should I use?",
        body: [
          <>
            <strong>Use UUID v7 when:</strong> generating primary keys in relational databases
            (PostgreSQL, MySQL, SQLite), high-volume event streaming, and distributed logging systems
            where index locality is crucial for performance.
          </>,
          <>
            <strong>Use UUID v4 when:</strong> generating opaque tokens, session identifiers, password
            reset keys, or public identifiers where exposing the generation timestamp poses a security
            or business intelligence risk (e.g. leaking registration velocity).
          </>,
          <>
            Migrating an existing table is simpler than it sounds: keep the existing v4 rows as they
            are and generate v7 for new rows. The two versions share the same 128-bit column type,
            so no schema change is needed — but sorting will interleave the old random values among
            the new ordered ones until the old rows age out. For a table where ordered scans matter
            from day one, backfilling is rarely worth it; the index locality benefit accrues on new
            inserts, which is where the write cost was being paid anyway.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can two UUID v4 values ever collide?",
        answer:
          "The probability of collision in UUID v4 is negligible. You would need to generate approximately 2.71 quintillion UUIDs before having a one-in-a-billion chance of a duplicate.",
      },
      {
        question: "Is UUID v7 supported natively in databases?",
        answer:
          "PostgreSQL 17+, SQLite 3.46+, and modern ORMs (such as Prisma, TypeORM, and Hibernate) have added native support or extensions for RFC 9562 UUID v7.",
      },
      {
        question: "Does UUID v4 expose any sensitive machine data?",
        answer:
          "No. Unlike UUID v1 (which exposed MAC addresses) and UUID v7 (which exposes timestamps), UUID v4 contains only pseudo-random numbers with zero device or time metadata.",
      },
      {
        question: "How do I read the timestamp inside a UUID v7?",
        answer:
          "Take the first 12 hex characters (the first group plus the first 4 of the second group), convert from hexadecimal to decimal, and you have Unix time in milliseconds. For example, 018bcfe56991 is 1,700,000,000,401 ms, which is 14 November 2023, 22:13:20.401 UTC.",
      },
    ],
    related: ["uuid-generator", "epoch-converter", "json-formatter"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "code-naming-conventions-camelcase-snake-case",
    title: "Code Naming Conventions Explained: camelCase, PascalCase, snake_case & kebab-case",
    seoTitle: "Code Naming Conventions — camelCase vs snake_case | Tulyro",
    seoDescription:
      "Master programming naming styles across JavaScript, Python, Rust, Go, CSS, and SQL. Understand why different languages enforce specific casing standards.",
    href: "/guides/code-naming-conventions-camelcase-snake-case/",
    intro: [
      <>
        Naming things is one of the classic hard problems in computer science. Software ecosystems
        have evolved strict casing conventions to ensure visual consistency, prevent parser ambiguities,
        and communicate intent. For example, Python relies on snake_case (PEP 8), while JavaScript
        and TypeScript standardize on camelCase. Convert any identifiers in real time using our{" "}
        <Link href="/tools/case-converter/" className="text-primary underline">
          client-side Case Converter
        </Link>
        .
      </>,
    ],
    cta: { label: "Convert Text Cases Instantly", href: "/tools/case-converter/" },
    sections: [
      {
        heading: "The Four Core Identifier Casings",
        body: [
          <>
            Different programming languages and protocols standardize on specific separators or
            capitalization rules to delineate word boundaries in variables, types, constants, and endpoints:
          </>,
          <div key="casing-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="border border-outline-variant/60 p-3">Style</th>
                  <th className="border border-outline-variant/60 p-3">Example</th>
                  <th className="border border-outline-variant/60 p-3">Dominant Languages &amp; Contexts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">camelCase</td>
                  <td className="border border-outline-variant/60 p-3"><code>userAccountId</code></td>
                  <td className="border border-outline-variant/60 p-3">JavaScript, TypeScript, Java, Go, Swift (variables/functions)</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">PascalCase</td>
                  <td className="border border-outline-variant/60 p-3"><code>UserProfileResponse</code></td>
                  <td className="border border-outline-variant/60 p-3">C#, TypeScript classes/types, React components</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">snake_case</td>
                  <td className="border border-outline-variant/60 p-3"><code>total_order_amount</code></td>
                  <td className="border border-outline-variant/60 p-3">Python (PEP 8), Rust, Ruby, PostgreSQL columns</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">kebab-case</td>
                  <td className="border border-outline-variant/60 p-3"><code>primary-nav-button</code></td>
                  <td className="border border-outline-variant/60 p-3">CSS classes, HTML attributes, REST URL paths</td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">SCREAMING_SNAKE</td>
                  <td className="border border-outline-variant/60 p-3"><code>MAX_RETRY_LIMIT</code></td>
                  <td className="border border-outline-variant/60 p-3">Global constants, environment variables, enum variants</td>
                </tr>
              </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "Why Doesn't JavaScript or Python Support kebab-case in Code?",
        body: [
          <>
            In most programming languages, the hyphen character (<code>-</code>) is reserved as the
            subtraction operator. Writing <code>const user-id = 10;</code> causes compilers and
            interpreters to parse the statement as <code>user minus id</code>, triggering syntax errors.
            Consequently, kebab-case is strictly confined to declarative contexts like CSS selectors,
            file names, and URL slugs.
          </>,
        ],
      },
      {
        heading: "Best Practices When Bridging Polyglot Backends and Frontends",
        body: [
          <>
            A common friction point in full-stack engineering occurs when a Python or Go backend
            returns JSON with <code>snake_case</code> keys, while frontend TypeScript conventions mandate{" "}
            <code>camelCase</code>.
          </>,
          <>
            Modern API design advocates transforming keys at serialization boundaries (e.g. using
            Pydantic camel-case aliases or Axios response interceptors) to preserve language-native
            conventions across each layer.
          </>,
        ],
      },
      {
        heading: "What casing should each thing use?",
        body: [
          <>
            The table gives the default for each kind of name in the two most common ecosystems.
            A codebase that follows its language&apos;s convention reads as native; one that mixes
            styles forces every reader to translate. When your language&apos;s style guide and
            this table disagree, follow the style guide.
          </>,
          <div key="naming-decision-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Name kind</th>
                <th className="border border-outline-variant/60 p-3">JavaScript / TypeScript</th>
                <th className="border border-outline-variant/60 p-3">Python</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Variables</td><td className="border border-outline-variant/60 p-3"><code>totalAmount</code></td><td className="border border-outline-variant/60 p-3"><code>total_amount</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Functions</td><td className="border border-outline-variant/60 p-3"><code>calculateTotal()</code></td><td className="border border-outline-variant/60 p-3"><code>calculate_total()</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Classes / types</td><td className="border border-outline-variant/60 p-3"><code>OrderService</code></td><td className="border border-outline-variant/60 p-3"><code>OrderService</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Constants</td><td className="border border-outline-variant/60 p-3"><code>MAX_RETRIES</code></td><td className="border border-outline-variant/60 p-3"><code>MAX_RETRIES</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Files</td><td className="border border-outline-variant/60 p-3"><code>order-service.ts</code></td><td className="border border-outline-variant/60 p-3"><code>order_service.py</code></td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Environment variables</td><td className="border border-outline-variant/60 p-3"><code>DATABASE_URL</code></td><td className="border border-outline-variant/60 p-3"><code>DATABASE_URL</code></td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Acronyms are the one place conventions genuinely disagree: <code>userId</code> versus{" "}
            <code>userID</code>, <code>httpRequest</code> versus <code>HTTPRequest</code>. Both
            forms exist in real codebases, and neither is wrong in isolation — the mistake is using
            both in one codebase, so that a search for one form misses the other. Pick one rule,
            write it in your contributing notes, and let your linter enforce it. The same applies
            to boolean prefixes (<code>isActive</code>, <code>hasAccess</code>,{" "}
            <code>shouldRetry</code>): the prefix convention matters less than using it every time.
          </>,
          <>
            File names follow the same split as the code inside them. A React component file usually
            takes the component&apos;s PascalCase name (<code>OrderService.tsx</code>), a Python
            module takes snake_case (<code>order_service.py</code>), and a route or static asset
            takes kebab-case (<code>/user-profiles</code>, <code>hero-image.png</code>). Test files
            sit next to what they test and share its name with a suffix —{" "}
            <code>OrderService.test.ts</code>, <code>test_order_service.py</code> — so a search for
            the module finds its tests immediately. Whatever the pattern, the rule is the same as
            for identifiers: one convention per codebase, enforced by the linter or the reviewer,
            not by memory.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between camelCase and PascalCase?",
        answer:
          "camelCase starts with a lowercase letter (e.g. userName), whereas PascalCase begins with an uppercase letter (e.g. UserName). PascalCase is primarily used for types, classes, and components.",
      },
      {
        question: "Should REST API URLs use camelCase or kebab-case?",
        answer:
          "RFC 3986 and industry guidelines (Google, Microsoft API style guides) recommend kebab-case for URL paths (e.g. /api/v1/user-profiles) because URLs are often case-insensitive and hyphens serve as standard word delimiters in web search indexing.",
      },
      {
        question: "Why does Python PEP 8 mandate snake_case?",
        answer:
          "Guido van Rossum and the Python core team chose snake_case for functions and variables because word spacing with underscores maximizes readability in indentation-delimited code.",
      },
      {
        question: "Does casing affect performance?",
        answer:
          "No. Casing is a readability and tooling convention: compilers and interpreters treat userAccountId and user_account_id identically once parsed. The cost of inconsistent casing is paid in human time — failed searches, misread code, and mapping bugs at API boundaries — not in runtime speed.",
      },
    ],
    related: ["case-converter", "markdown-editor", "word-counter"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "markdown-cheatsheet-and-formatting-guide",
    title: "Complete Markdown Cheatsheet: Syntax, Formatting Rules & Safe Web Publishing",
    seoTitle: "Markdown Cheatsheet — Syntax, Tables & HTML | Tulyro",
    seoDescription:
      "CommonMark and GFM syntax for headers, code, lists, tables and links — plus how to sanitise Markdown to HTML without opening an XSS hole.",
    href: "/guides/markdown-cheatsheet-and-formatting-guide/",
    intro: [
      <>
        Created in 2004 by John Gruber and Aaron Swartz, Markdown is the universal lightweight
        markup language for technical writing, README documentation, and static site content. It allows
        writers to produce structured rich text using intuitive plain-text symbols. Explore dual-pane
        drafting with safe HTML preview in our{" "}
        <Link href="/tools/markdown-editor/" className="text-primary underline">
          client-side Markdown Editor
        </Link>
        .
      </>,
    ],
    cta: { label: "Open Markdown Live Editor", href: "/tools/markdown-editor/" },
    sections: [
      {
        heading: "Essential Syntax Reference (CommonMark)",
        body: [
          <>
            Markdown maps simple punctuation to semantic HTML elements:
          </>,
          <div key="md-syntax-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="border border-outline-variant/60 p-3">Element</th>
                  <th className="border border-outline-variant/60 p-3">Markdown Input</th>
                  <th className="border border-outline-variant/60 p-3">Generated HTML</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Heading 1</td>
                  <td className="border border-outline-variant/60 p-3"><code># Heading 1</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Heading 2</td>
                  <td className="border border-outline-variant/60 p-3"><code>## Heading 2</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;h2&gt;Heading 2&lt;/h2&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Bold</td>
                  <td className="border border-outline-variant/60 p-3"><code>**bold text**</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;strong&gt;bold text&lt;/strong&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Italic</td>
                  <td className="border border-outline-variant/60 p-3"><code>*italic text*</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;em&gt;italic text&lt;/em&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Inline Code</td>
                  <td className="border border-outline-variant/60 p-3"><code>`const x = 1;`</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;code&gt;const x = 1;&lt;/code&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Blockquote</td>
                  <td className="border border-outline-variant/60 p-3"><code>&gt; Quote text</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;blockquote&gt;Quote text&lt;/blockquote&gt;</code></td>
                </tr>
                <tr>
                  <td className="border border-outline-variant/60 p-3 font-semibold">Hyperlink</td>
                  <td className="border border-outline-variant/60 p-3"><code>[Tulyro](https://tulyro.online)</code></td>
                  <td className="border border-outline-variant/60 p-3"><code>&lt;a href=&quot;...&quot;&gt;Tulyro&lt;/a&gt;</code></td>
                </tr>
              </tbody>
            </table>
          </div>,
        ],
      },
      {
        heading: "GitHub Flavored Markdown (GFM) Enhancements",
        body: [
          <>
            While CommonMark defines baseline Markdown, GitHub Flavored Markdown (GFM) adds
            syntax for fenced code blocks with language highlighting, tables, and task list checkboxes:
          </>,
          <>
            <code>```typescript</code> creates syntax-highlighted preformatted blocks, while pipe
            characters (<code>|</code>) construct responsive HTML data tables without manual markup.
          </>,
          <>
            A GFM table needs a header row, a separator row of dashes, and one row per line. Alignment
            is set in the separator: <code>:---</code> aligns left, <code>---:</code> aligns right,
            and <code>:---:</code> centres. The most common reason a table fails to render is a
            missing separator row, or a different number of cells in one row than in the header.
            Strikethrough (<code>~~removed~~</code>), task lists (<code>- [ ] todo</code>), and
            autolinks (a bare URL becoming clickable) are the other GFM additions you will use
            daily; none of them exists in strict CommonMark.
          </>,
        ],
      },
      {
        heading: "How do lists, links and images work?",
        body: [
          <>
            <strong>Lists.</strong> Unordered lists use <code>-</code>, <code>*</code>, or{" "}
            <code>+</code> at the start of a line; ordered lists use <code>1.</code>,{" "}
            <code>2.</code>, and so on. Most renderers number ordered lists sequentially no matter
            what digits you type, so <code>1. 1. 1.</code> still renders as 1, 2, 3 — convenient
            when you reorder items, confusing when you actually want the literal numbers. Nest a
            list by indenting it (two or four spaces, depending on your renderer) under its parent
            item. A blank line between a list item and its nested content is what most renderers
            need to keep the nesting intact.
          </>,
          <>
            <strong>Links and images.</strong> A link is <code>[text](url)</code>; an image is the
            same with a leading <code>!</code>: <code>![alt text](image.png)</code>. The alt text
            is what screen readers announce and what shows when the image fails to load, so write
            what the image shows, not &ldquo;image&rdquo;. A link title goes in quotes after the
            URL: <code>[text](url &quot;title&quot;)</code>. Reference-style links
            (<code>[text][ref]</code> with <code>[ref]: url</code> defined elsewhere) keep long
            URLs out of the paragraph text — useful in documents with many links.
          </>,
          <>
            <strong>Escaping.</strong> To show a literal asterisk, backtick, or hash instead of
            triggering formatting, put a backslash before it: <code>\*</code> renders as *. Inside
            inline code spans, no escaping is needed — backticks protect their contents. Inside
            fenced code blocks, nothing is parsed at all, which is why code samples belong in
            fences rather than indented paragraphs.
          </>,
        ],
      },
      {
        heading: "Security: Sanitizing Markdown to Prevent Cross-Site Scripting (XSS)",
        body: [
          <>
            Because standard Markdown parsers permit raw HTML passthrough, rendering untrusted user
            Markdown can expose web applications to Cross-Site Scripting (XSS) via injected{" "}
            <code>&lt;script&gt;</code> tags or <code>javascript:</code> anchor schemes.
          </>,
          <>
            Always sanitize rendered output using robust DOM sanitizers (such as DOMPurify) or compile
            Markdown with strict HTML entity encoding as implemented in Tulyro&apos;s client-side parser.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "Can I use raw HTML inside Markdown documents?",
        answer:
          "Yes. CommonMark specifies that valid HTML blocks and inline tags pass through to the output, making it easy to embed elements like details/summary or iframe embeds.",
      },
      {
        question: "What is the difference between CommonMark and GFM?",
        answer:
          "CommonMark is a formal specification resolving edge-case ambiguities in original Markdown. GFM is a superset of CommonMark that adds tables, autolinks, strikethrough, and task checklists.",
      },
      {
        question: "How do I create a line break without starting a new paragraph?",
        answer:
          "End the line with two trailing spaces or use a backslash (\\) before hitting Enter.",
      },
      {
        question: "Why is my Markdown table not rendering?",
        answer:
          "The usual causes: no separator row of dashes under the header, rows with a different number of cells than the header, or a renderer that only supports CommonMark (tables are a GFM extension). Check the separator row first — it is missing in most broken tables.",
      },
    ],
    related: ["markdown-editor", "case-converter", "word-counter"],
    pillar: { label: "All Developer Tools", href: "/dev/" },
  },
  {
    slug: "text-to-speech-voices-guide",
    title: "Text-to-Speech Voices Explained: How They're Made and How to Choose One",
    seoTitle: "Text-to-Speech Voices — Types & How to Choose | Tulyro",
    seoDescription:
      "Formant, concatenative and neural voices explained, the five factors that decide quality, narration-time estimates, and a voice-selection checklist.",
    href: "/guides/text-to-speech-voices-guide/",
    intro: [
      <>
        A voice and a text-to-speech engine are not the same thing. The engine is the synthesis
        technology; the voice is the specific trained persona you hear. That distinction is why the
        same sentence can sound robotic in one app and almost human in another. This guide covers
        how voices are actually made, the five things that decide whether one sounds good, how
        long your script will take to read (with the math shown), and a checklist for picking a
        voice for your project. You can test any of this hands-on with our{" "}
        <Link href="/text/text-to-speech/" className="text-primary underline">
          free Text-to-Speech Reader
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Text-to-Speech Reader", href: "/text/text-to-speech/" },
    sections: [
      {
        heading: "The three generations of synthetic voices",
        body: [
          <>
            Every TTS voice you have ever heard comes from one of three generations of technology,
            and you can usually tell which by listening. Knowing the generation tells you what a
            voice can and cannot do.
          </>,
          <>
            <strong>Formant synthesis (1960s–1990s).</strong> No recordings at all. The voice is
            built from rules plus a mathematical model of the human vocal tract — a set of
            resonating filters excited by a buzz, roughly how your throat and mouth shape sound.
            The classic example is DECtalk, the formant-based unit Stephen Hawking used for
            decades. These voices are tiny, run on almost nothing, and sound unmistakably robotic,
            because no human throat is actually involved.
          </>,
          <>
            <strong>Concatenative / unit selection (1990s–2000s).</strong> Record a human reading
            thousands of carefully chosen sentences, chop the recordings into tiny units (phones,
            diphones, half-words), and stitch the best-matching units back together for each new
            sentence. This powered early-2000s screen readers and GPS voices. Common phrases sound
            genuinely human — they are, word for word — but rare combinations expose audible joins,
            and the databases of recorded units were enormous for their time.
          </>,
          <>
            <strong>Neural synthesis (2016 onward).</strong> Deep neural networks trained on hours
            of a single speaker&apos;s recordings. The network learns to map text to a
            spectrogram (a picture of how the sound&apos;s frequencies change over time), and a
            second network — the vocoder — turns that picture into an actual waveform. WaveNet
            (DeepMind, 2016) and Tacotron (Google, 2017) were the landmark papers. Neural voices
            get the hardest part right: prosody, the rhythm, stress, and intonation that make
            speech sound like someone means it. They also need far more compute than the older
            generations, which is why most of them run on servers instead of your device.
          </>,
        ],
      },
      {
        heading: "What does 'neural voice' on a product page actually mean?",
        body: [
          <>
            A neural voice is a model trained on recordings of one specific speaker. Its quality
            depends on three unglamorous things: how much clean, well-directed training audio
            existed for that speaker, how diverse the training sentences were, and how good the
            vocoder is. A voice trained on two hours of audiobook narration will read bedtime
            stories beautifully and struggle with a heated argument.
          </>,
          <>
            One warning worth internalising: voice labels on product pages are marketing. A
            service can call anything &ldquo;AI voice&rdquo; or &ldquo;neural&rdquo;, and some
            labels are applied to older concatenative voices with a fresh coat of paint. Judge the
            voice, not the label — section six below gives you a ten-minute test that exposes
            the difference fast.
          </>,
        ],
      },
      {
        heading: "What decides whether a voice sounds good?",
        body: [
          <>
            <strong>1. Prosody.</strong> This is the big one. Getting every phoneme right is easy;
            getting the rise and fall of a sentence right is hard. Listen for questions that
            actually rise at the end, emphasis landing on the right word, and pauses that feel
            like breathing rather than buffering. Prosody is what separates a voice you can
            listen to for an hour from one you abandon in ninety seconds.
          </>,
          <>
            <strong>2. Language and accent coverage.</strong> A voice trained mostly on American
            English narration will read French names, Hindi words, or even British place names
            with confident wrongness. Neural voices are only as multilingual as their training
            data. If your content mixes languages, test the exact words you will actually use —
            not the demo sentence on the product page.
          </>,
          <>
            <strong>3. Pronunciation control.</strong> Good platforms let you correct the voice:
            custom pronunciation dictionaries, or SSML (Speech Synthesis Markup Language, a W3C
            recommendation) tags like <code>&lt;phoneme&gt;</code> for exact sounds,{" "}
            <code>&lt;say-as&gt;</code> for dates and numbers, and <code>&lt;break&gt;</code> for
            precise pauses. If a voice cannot be corrected, every mispronunciation in your
            project is permanent.
          </>,
          <>
            <strong>4. Consistency over long text.</strong> Some voices drift: energy fades by
            paragraph three, or the emotional tone quietly changes chapter to chapter. Short
            demos hide this. The ten-minute test below catches it.
          </>,
          <>
            <strong>5. Latency versus quality.</strong> On-device voices (the ones in your
            browser via the W3C Web Speech API, per MDN&apos;s SpeechSynthesis docs) start
            instantly and work offline, but they are usually the smaller, older-generation
            models. Cloud neural voices sound better and arrive after a server round-trip. For
            interactive uses like screen readers, latency wins. For a finished video narration,
            quality wins. For how that browser engine works under the hood, see our{" "}
            <Link href="/guides/how-browser-text-to-speech-web-speech-api-works/" className="text-primary underline">
              How Browser Text-to-Speech Works
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "How long will your script take to read?",
        body: [
          <>
            Most English narration lands between 130 and 180 words per minute; a comfortable
            default is around 150 WPM. The table below is computed from those rates, so you can
            plan recording time or check a quoted turnaround. (For page-length planning, pair
            this with our{" "}
            <Link href="/text/word-counter/" className="text-primary underline">
              Word Counter &amp; Reading Time Estimator
            </Link>
            .)
          </>,
          <div key="tts-script-time-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Script length</th>
                <th className="border border-outline-variant/60 p-3">130 WPM (slow)</th>
                <th className="border border-outline-variant/60 p-3">150 WPM (default)</th>
                <th className="border border-outline-variant/60 p-3">180 WPM (brisk)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">500 words</td><td className="border border-outline-variant/60 p-3">3m 51s</td><td className="border border-outline-variant/60 p-3">3m 20s</td><td className="border border-outline-variant/60 p-3">2m 47s</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">1,000 words</td><td className="border border-outline-variant/60 p-3">7m 42s</td><td className="border border-outline-variant/60 p-3">6m 40s</td><td className="border border-outline-variant/60 p-3">5m 33s</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">2,000 words</td><td className="border border-outline-variant/60 p-3">15m 23s</td><td className="border border-outline-variant/60 p-3">13m 20s</td><td className="border border-outline-variant/60 p-3">11m 7s</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">5,000 words</td><td className="border border-outline-variant/60 p-3">38m 28s</td><td className="border border-outline-variant/60 p-3">33m 20s</td><td className="border border-outline-variant/60 p-3">27m 47s</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            One more number worth having: a minute of finished audio is about 5 MB as
            uncompressed 44.1 kHz 16-bit mono WAV, or roughly 0.9 MB as 128 kbps MP3. So a
            33-minute narration of a 5,000-word script is on the order of 30 MB of MP3 — small
            enough to host anywhere, which is part of why TTS narration took off for video
            creators.
          </>,
        ],
      },
      {
        heading: "How do I choose a voice for my project?",
        body: [
          <>
            Start from the use case, not the voice. Different jobs punish different weaknesses:
          </>,
          <>
            <strong>Proofreading your own writing.</strong> Any clear voice works — you are
            listening for errors, not enjoying a performance. Slightly faster than normal
            (around 1.25×) keeps you focused, and a literal reader exposes doubled words and
            dropped prepositions your eyes skip.
          </>,
          <>
            <strong>Video or podcast narration.</strong> This is where neural voices earn their
            keep, and where the license matters most. Check the terms before you publish:
            many free voices are licensed for personal use only, and commercial use needs a
            paid tier. Never assume a voice you can hear for free is a voice you can monetise.
          </>,
          <>
            <strong>Phone menus and IVR.</strong> Clarity beats warmth. Telephone audio has
            historically been narrowband (8 kHz sampling, the old G.711 standard), which strips
            the high frequencies that make voices sound rich — test your voice through that
            bottleneck, not on studio headphones.
          </>,
          <>
            <strong>Language learning.</strong> You need the correct accent and a voice that
            stays intelligible at slow speeds. Slowing a concatenative voice down often
            exposes its seams; neural voices usually degrade more gracefully.
          </>,
          <>
            The short checklist, in order: does it pronounce the numbers, dates, names, and
            abbreviations in <em>my</em> content correctly? Does the license cover my use?
            Can I fix mispronunciations? Does it stay consistent for ten minutes straight?
            And what does it cost per million characters at my volume?
          </>,
        ],
      },
      {
        heading: "Test any voice in ten minutes",
        body: [
          <>
            Demos are curated; your content is not. Paste this gauntlet into any TTS tool and
            listen for the failure modes in brackets:
          </>,
          <>
            &ldquo;Are you coming with us?&rdquo; [questions must rise, not fall].{" "}
            &ldquo;The meeting is on 12/03/2024 and the budget is $1,234,567.&rdquo; [dates and
            numbers: is 12/03 March or December?]. &ldquo;NASA launched the satellite, but the
            N.A.S.A. budget was cut.&rdquo; [acronyms versus spelled-out letters].{" "}
            &ldquo;I read the report yesterday, and I will read the update tomorrow.&rdquo;
            [homographs: &ldquo;read&rdquo; changes sound with tense]. Then a URL, an
            exclamation, and one long paragraph to check consistency. A voice that survives
            this list will survive your project.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a TTS engine and a voice?",
        answer:
          "The engine is the synthesis technology — the browser's speechSynthesis API, a cloud service, an on-device framework. The voice is the specific trained persona running on that engine. The same engine can host many voices that sound nothing alike, and the same voice name on different platforms can be a different recording or model entirely.",
      },
      {
        question: "Why do voices misread numbers, dates, and abbreviations?",
        answer:
          "Before synthesis, the engine runs text normalization: it guesses how to expand symbols into speakable words. Many expansions are ambiguous without context — 12/03 is March 12th in most of the world and December 3rd in the US, and St. can be Saint or Street. The fix is to spell things out yourself, or use SSML say-as tags on platforms that support them.",
      },
      {
        question: "Can I use a free text-to-speech voice in a YouTube video or podcast?",
        answer:
          "It depends entirely on the license, not the price. Many free voices are licensed for personal or evaluation use only, and commercial use — including monetized videos — requires a paid plan or a separate license. Operating-system voices have their own terms that vary by vendor. Read the terms for the specific voice before you publish.",
      },
      {
        question: "Why does a voice sound great in English but robotic in my language?",
        answer:
          "Neural voices are only as good as their training data, and vendors collect far more high-quality recordings for major languages than for smaller ones. A less-supported language may get an older-generation voice, a smaller model, or a voice trained on less diverse material. Test the exact language you need; English demos prove nothing about it.",
      },
      {
        question: "How do I make a voice pause in the right places?",
        answer:
          "Punctuation does most of the work: periods, commas, and paragraph breaks map to pauses of different lengths. For exact control — a dramatic beat before a reveal, say — SSML break tags let you specify pause duration in seconds or milliseconds on platforms that support SSML.",
      },
      {
        question: "Do neural voices work offline?",
        answer:
          "Usually not. Most neural voices run on the vendor's servers because the models are large and compute-hungry. On-device neural voices are appearing on newer phones and laptops, but availability varies by device. The voices built into your operating system and browser generally work fully offline once the page or app is open.",
      },
    ],
    related: ["text-to-speech", "word-counter", "fancy-text-generator"],
    pillar: { label: "All Text Tools", href: "/text/" },
  },
  {
    slug: "how-much-house-can-you-afford",
    title: "How Much House Can You Afford? The 28/36 Rule, Worked With Real Numbers",
    seoTitle: "How Much House Can You Afford? 28/36 Rule | Tulyro",
    seoDescription:
      "Work out how much house you can afford with the 28/36 rule: real numbers for a $120,000 income, salary tables, and what lenders actually allow.",
    href: "/guides/how-much-house-can-you-afford/",
    intro: [
      <>
        Lenders will approve you for more house than you should buy. Their maths
        answers “can this person repay without defaulting”, not “can this person
        live comfortably while repaying”. The 28/36 rule is the guardrail that
        sits between those two questions: housing costs at or below 28% of gross
        monthly income, and all debts combined at or below 36%. This guide works
        the rule through a real $120,000 household, turns it into a salary table,
        and shows how the interest rate moves the answer. Check your own numbers
        on our{" "}
        <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
          free Mortgage Calculator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Mortgage Calculator", href: "/calculators/mortgage-calculator/" },
    sections: [
      {
        heading: "The 28/36 Rule in One Paragraph",
        body: [
          <>
            The rule has two ratios, and both use gross income — pay before tax.
            The front-end ratio says total housing costs (principal, interest,
            property taxes, homeowners insurance, plus HOA dues and mortgage
            insurance where they apply — together called PITI) should not exceed
            28% of gross monthly income. The back-end ratio says all monthly debt
            payments — housing plus car loans, student loans, credit-card minimums
            and any other debt — should not exceed 36% of gross monthly income.
            Whichever limit is lower is the one that binds.
          </>,
        ],
      },
      {
        heading: "Worked Example: $120,000 Income With $650 of Other Debt",
        body: [
          <>
            A household earning $120,000 a year, paying $650 a month on a car loan
            and cards, buying with a 30-year fixed mortgage at 6.5% and 20% down,
            with property tax of $350 a month and homeowners insurance of $150 a
            month. Every figure below is computed with the reducing-balance
            mortgage formula:
          </>,
          <div key="affordability-worked-example-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Step</th>
                <th className="border border-outline-variant/60 p-3">Calculation</th>
                <th className="border border-outline-variant/60 p-3">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">Gross monthly income</td><td className="border border-outline-variant/60 p-3">$120,000 ÷ 12</td><td className="border border-outline-variant/60 p-3">$10,000.00</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">28% housing cap</td><td className="border border-outline-variant/60 p-3">$10,000 × 0.28</td><td className="border border-outline-variant/60 p-3">$2,800.00</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">36% total-debt cap</td><td className="border border-outline-variant/60 p-3">$10,000 × 0.36 = $3,600, minus $650 other debt</td><td className="border border-outline-variant/60 p-3">$2,950.00</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Binding limit</td><td className="border border-outline-variant/60 p-3">Lower of $2,800 and $2,950</td><td className="border border-outline-variant/60 p-3">$2,800.00</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Left for principal + interest</td><td className="border border-outline-variant/60 p-3">$2,800 − $350 tax − $150 insurance</td><td className="border border-outline-variant/60 p-3">$2,300.00</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Maximum loan at 6.5%, 30 years</td><td className="border border-outline-variant/60 p-3">$2,300 a month supports</td><td className="border border-outline-variant/60 p-3">$363,884.88</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">Maximum home price, 20% down</td><td className="border border-outline-variant/60 p-3">$363,884.88 ÷ 0.80</td><td className="border border-outline-variant/60 p-3">$454,856.11</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            The down payment on that home is $90,971.22 — 20% of $454,856.11. Note
            which ratio bound the answer: the 28% front-end rule, not the 36%
            back-end rule. With more other debt, the 36% rule takes over — at
            $1,000 of other monthly debt, the back-end cap would fall to $2,600
            and bind instead. Check it: $10,000 × 0.36 = $3,600, and $3,600 −
            $1,000 = $2,600, below the $2,800 front-end cap.
          </>,
        ],
      },
      {
        heading: "How Much House by Income: Salary Table",
        body: [
          <>
            The same maths, run for five incomes. Assumptions for every row: 6.5%
            on a 30-year fixed mortgage, 20% down, $500 a month combined for
            property tax and homeowners insurance, and no other debt — so the 28%
            rule binds in each case. Your taxes, insurance and debts will differ;
            the table shows the shape, not your exact ceiling:
          </>,
          <div key="affordability-salary-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Annual income</th>
                <th className="border border-outline-variant/60 p-3">Monthly gross</th>
                <th className="border border-outline-variant/60 p-3">Max housing (28%)</th>
                <th className="border border-outline-variant/60 p-3">Max loan</th>
                <th className="border border-outline-variant/60 p-3">Max home price</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">$50,000</td><td className="border border-outline-variant/60 p-3">$4,167</td><td className="border border-outline-variant/60 p-3">$1,167</td><td className="border border-outline-variant/60 p-3">$105,474</td><td className="border border-outline-variant/60 p-3">$131,842</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">$75,000</td><td className="border border-outline-variant/60 p-3">$6,250</td><td className="border border-outline-variant/60 p-3">$1,750</td><td className="border border-outline-variant/60 p-3">$197,764</td><td className="border border-outline-variant/60 p-3">$247,204</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">$100,000</td><td className="border border-outline-variant/60 p-3">$8,333</td><td className="border border-outline-variant/60 p-3">$2,333</td><td className="border border-outline-variant/60 p-3">$290,053</td><td className="border border-outline-variant/60 p-3">$362,566</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">$125,000</td><td className="border border-outline-variant/60 p-3">$10,417</td><td className="border border-outline-variant/60 p-3">$2,917</td><td className="border border-outline-variant/60 p-3">$382,343</td><td className="border border-outline-variant/60 p-3">$477,929</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">$150,000</td><td className="border border-outline-variant/60 p-3">$12,500</td><td className="border border-outline-variant/60 p-3">$3,500</td><td className="border border-outline-variant/60 p-3">$474,632</td><td className="border border-outline-variant/60 p-3">$593,291</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Read the $100,000 row against the worked example above: the same
            $2,800-a-month household from the $120,000 example lands on a
            $454,856 home, while a $100,000 household lands near $363,000. A
            $25,000 pay rise moves the ceiling by roughly $115,000 of home price
            at this rate — income is the biggest lever you have.
          </>,
        ],
      },
      {
        heading: "Why does the interest rate move your budget more than the price?",
        body: [
          <>
            Hold the payment fixed at $2,300 of principal and interest and change
            only the rate. The loan the same monthly payment supports — and with
            it the home price — swings by tens of thousands:
          </>,
          <div key="affordability-rate-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Rate (30-year fixed)</th>
                <th className="border border-outline-variant/60 p-3">Max loan</th>
                <th className="border border-outline-variant/60 p-3">Max home price (20% down)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">5.5%</td><td className="border border-outline-variant/60 p-3">$405,080</td><td className="border border-outline-variant/60 p-3">$506,350</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">6.5%</td><td className="border border-outline-variant/60 p-3">$363,885</td><td className="border border-outline-variant/60 p-3">$454,856</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">7.5%</td><td className="border border-outline-variant/60 p-3">$328,941</td><td className="border border-outline-variant/60 p-3">$411,176</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            One percentage point — 6.5% to 7.5% — costs about $43,680 of home
            price on this household. That is why shopping the rate, improving the
            credit score before applying, and considering a larger down payment
            matter more than haggling over a few thousand on the asking price.
            A 15-year loan flips the trade: the payment is higher, so the same
            28% ceiling supports a smaller loan — but the total interest paid is
            far lower. Run both terms on the{" "}
            <Link href="/calculators/mortgage-calculator/" className="text-primary underline">
              Mortgage Calculator
            </Link>{" "}
            before deciding. To see why the shorter term pays so much less
            interest, read our guide to{" "}
            <Link href="/guides/how-mortgage-amortization-works/" className="text-primary underline">
              How Mortgage Amortization Works: Principal vs. Interest Explained
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "What Lenders Actually Allow — and Why Approval Is Not Affordability",
        body: [
          <>
            Lenders judge you by debt-to-income ratio (DTI): total monthly debt
            payments divided by gross monthly income, times 100. In the worked
            example, at the binding limit the household pays $2,800 housing plus
            $650 other debt on $10,000 gross — a back-end DTI of 34.5%, inside
            the 36% guideline. But conventional lenders commonly approve back-end
            DTI up to about 43–45% with automated underwriting, and FHA loans can
            go higher still. Approval is a lender risk decision, not a
            recommendation that the payment will feel comfortable.
          </>,
          <>
            Two rough cross-checks keep the rule honest. The 3–4× income rule of
            thumb says a $120,000 household can afford a $360,000–$480,000 home —
            and the 28/36 answer of $454,856 sits inside that band, so two
            independent methods agree. The stricter check is 25% of take-home pay:
            if take-home is about 75% of gross, that is $7,500 a month, and 25%
            of it is $1,875 for housing — well below the $2,800 ceiling. If the
            28% number feels tight, the take-home version is the budget to live
            by.
          </>,
        ],
      },
      {
        heading: "What costs does the 28/36 rule miss?",
        body: [
          <>
            The rule counts PITI and debts. It does not count the rest of owning a
            home. Budget 1–2% of the home value a year for maintenance and
            repairs — on a $454,856 home that is $4,549–$9,097 a year, roughly
            $379–$758 a month — plus HOA dues where they apply, utilities, and
            closing costs at purchase. A down payment below 20% adds private
            mortgage insurance to the monthly housing cost on a conventional loan,
            which shrinks the loan the 28% ceiling supports. Treat the 28/36
            answer as the outer boundary, then subtract the costs above before
            deciding what to offer.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "What is the 28/36 rule?",
        answer:
          "Housing costs at or below 28% of gross monthly income, and all monthly debts combined at or below 36% of gross monthly income. Both ratios use pay before tax, and the lower of the two limits is the one that binds.",
      },
      {
        question: "How much house can I afford on $100,000 a year?",
        answer:
          "Under the 28/36 rule with no other debt, about $2,333 a month for housing. At 6.5% on a 30-year loan with 20% down and $500 a month for tax and insurance, that supports roughly a $363,000 home. Existing debt, local taxes and the actual rate move the number.",
      },
      {
        question: "Does the 28/36 rule use gross or take-home pay?",
        answer:
          "Gross pay — before tax. That is why the ceiling can feel tight in practice: tax takes a share first. Planners who want a comfort margin use 25% of take-home pay instead.",
      },
      {
        question: "What counts as housing cost in the 28%?",
        answer:
          "Principal and interest, property taxes, homeowners insurance, and HOA dues or mortgage insurance where they apply — the PITI payment. Utilities, maintenance and commuting are not in the ratio, which is one reason the rule understates the true cost.",
      },
      {
        question: "Can I get a mortgage above the 36% back-end ratio?",
        answer:
          "Often, yes. Conventional lenders commonly approve back-end DTI up to about 43–45% with automated underwriting, and FHA loans can go higher. Approval is a lender risk decision, not a recommendation that the payment will feel comfortable.",
      },
      {
        question: "How does a bigger down payment change what I can afford?",
        answer:
          "It shrinks the loan, which shrinks the monthly payment, so the same 28% ceiling supports a more expensive home. On a conventional loan, 20% down also removes private mortgage insurance, which otherwise adds to the monthly housing cost.",
      },
    ],
    related: ["mortgage-calculator", "emi-calculator", "percentage-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  },
  {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentage: The Three Formulas That Cover Every Case",
    seoTitle: "How to Calculate Percentage — 3 Formulas | Tulyro",
    seoDescription:
      "Three formulas cover every percentage problem: find the part, the percent, or the whole. Worked examples: 25% of 200, 15% off ₹1,200, a pay rise.",
    href: "/guides/how-to-calculate-percentage/",
    intro: [
      <>
        A percentage is a number out of 100. The word gives it away: per cent means per hundred. So
        25% is 25 out of every 100, which is the same as 25 ÷ 100, which is 0.25. Everything in this
        guide follows from that one fact. There are only three percentage questions anyone ever asks —
        find the part, find the percent, find the whole — and each has one short formula. Learn the
        three, and discounts, exam marks, pay rises, tips and GST all become the same five-second
        calculation. Check your answers on our{" "}
        <Link href="/calculators/percentage-calculator/" className="text-primary underline">
          free Percentage Calculator
        </Link>
        .
      </>,
    ],
    cta: { label: "Try the Percentage Calculator", href: "/calculators/percentage-calculator/" },
    sections: [
      {
        heading: "What a percentage actually is",
        body: [
          <>
            A percentage is a fraction with 100 as the denominator, written more compactly. 25% =
            25/100 = 1/4 = 0.25. All three forms say the same thing, and switching between them is
            the whole skill. To turn a percentage into a decimal, divide by 100 — move the decimal
            point two places left. 25% becomes 0.25, 6.5% becomes 0.065, 150% becomes 1.5. To turn a
            decimal into a percentage, multiply by 100. 0.84 becomes 84%.
          </>,
          <>
            Percentages above 100% are normal, not a mistake. 150% of 200 is 300 — one and a half
            times the number. And a percentage always needs a base: 25% of 200 is 50, but 25% of 400
            is 100. The percent alone means nothing until you know what it is a percent of. Most
            percentage errors in real life are base errors, not arithmetic errors.
          </>,
        ],
      },
      {
        heading: "The three questions — and the three formulas",
        body: [
          <>
            Every percentage problem is one of three questions. Work out which one you are asking,
            and the formula is obvious.
          </>,
          <div key="percentage-three-formulas-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Question</th>
                <th className="border border-outline-variant/60 p-3">Formula</th>
                <th className="border border-outline-variant/60 p-3">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">What is X% of Y?</td><td className="border border-outline-variant/60 p-3">Y × (X ÷ 100)</td><td className="border border-outline-variant/60 p-3">25% of 200 = 50</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">What percent is A of B?</td><td className="border border-outline-variant/60 p-3">(A ÷ B) × 100</td><td className="border border-outline-variant/60 p-3">45 out of 60 = 75%</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">X is Y% of what number?</td><td className="border border-outline-variant/60 p-3">X ÷ (Y ÷ 100)</td><td className="border border-outline-variant/60 p-3">18 is 12% of 150</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            Type 1, find the part: 25% of 200. Turn 25% into 0.25, multiply: 200 × 0.25 = 50. Another:
            35% of 180 is 180 × 0.35 = 63. Type 2, find the percent: 45 marks out of 60. Divide first,
            then multiply by 100: 45 ÷ 60 = 0.75, and 0.75 × 100 = 75%. Exam marks work the same way:
            420 out of 500 is 420 ÷ 500 × 100 = 84%. Type 3, find the whole: 18 is 12% of what
            number? Divide the part by the percent as a decimal: 18 ÷ 0.12 = 150. Check it backwards:
            12% of 150 is 18. Correct. Another: 45 is 15% of 300, because 45 ÷ 0.15 = 300.
          </>,
        ],
      },
      {
        heading: "Worked example: a 15% discount on a ₹1,200 item",
        body: [
          <>
            A jacket costs ₹1,200 and the shop offers 15% off. First find the discount: 15% of ₹1,200
            is 1,200 × 0.15 = ₹180. Subtract it from the price: ₹1,200 − ₹180 = ₹1,020. That is what
            you pay.
          </>,
          <>
            There is a faster way. Paying 100% minus 15% means paying 85% of the price: ₹1,200 × 0.85
            = ₹1,020. Same answer, one step. Use whichever you find easier — the two-step version when
            you want to see the discount, the one-step version when you only care about the final
            price.
          </>,
          <>
            Tax works the same way in reverse. GST of 18% on a ₹1,000 item adds ₹180 (1,000 × 0.18),
            so the total is ₹1,180. If you are working out tax on a bill rather than a discount, run
            it through the{" "}
            <Link href="/calculators/gst-calculator/" className="text-primary underline">
              GST Calculator
            </Link>
            .
          </>,
        ],
      },
      {
        heading: "Percentage increase and decrease",
        body: [
          <>
            A pay rise, a price cut, a score improving — all the same formula. Percentage change =
            (new value − old value) ÷ old value × 100. The one rule that matters: always divide by the
            old, starting number.
          </>,
          <>
            A salary rises from ₹40,000 to ₹46,000 a month. The rise is ₹6,000. Divide by the old
            salary: 6,000 ÷ 40,000 = 0.15, so the rise is 15%. A price falls from ₹80 to ₹60. The drop
            is ₹20, and 20 ÷ 80 = 0.25, so the price fell 25%. If the result is negative, the value
            fell; if positive, it rose.
          </>,
          <>
            Going the other way is a single multiplication. A quantity of 250 increased by 12% becomes
            250 × 1.12 = 280. A quantity of 900 decreased by 20% becomes 900 × 0.80 = 720. The
            multiplier is 1 plus the percent for an increase, 1 minus the percent for a decrease.
          </>,
        ],
      },
      {
        heading: "What is the difference between percentage points and percent?",
        body: [
          <>
            This is where news headlines, bank notices and exam discussions go wrong. A rate moving
            from 8% to 10% has risen by 2 percentage points — but it has risen by 25% in relative
            terms, because 2 ÷ 8 = 0.25. Both numbers are true. They answer different questions.
          </>,
          <>
            Use percentage points when you are talking about the arithmetic difference between two
            percentages: interest rates, pass marks, vote shares. Use percent when you are talking
            about how much something changed relative to where it started. If a lender says your rate
            rose by 2%, ask whether they mean 2 percentage points or a 2% relative rise — on an 8%
            loan those are very different things.
          </>,
        ],
      },
      {
        heading: "Mental-math shortcuts for the common percentages",
        body: [
          <>
            A few percentages come up so often that they are worth doing without a calculator. 10% of
            anything is the number divided by 10. 50% is half. 25% is a quarter — divide by 4. 75% is
            three quarters: find 25% and triple it. 1% is the number divided by 100, which is the
            building block for anything else: 6% is six times 1%, 13% is thirteen times 1%.
          </>,
          <div key="percentage-shortcuts-table-wrap" className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl text-left font-body-sm text-body-sm">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="border border-outline-variant/60 p-3">Percent</th>
                <th className="border border-outline-variant/60 p-3">Shortcut</th>
                <th className="border border-outline-variant/60 p-3">Of 240</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-outline-variant/60 p-3">10%</td><td className="border border-outline-variant/60 p-3">Divide by 10</td><td className="border border-outline-variant/60 p-3">24</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">25%</td><td className="border border-outline-variant/60 p-3">Divide by 4</td><td className="border border-outline-variant/60 p-3">60</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">50%</td><td className="border border-outline-variant/60 p-3">Halve it</td><td className="border border-outline-variant/60 p-3">120</td></tr>
              <tr><td className="border border-outline-variant/60 p-3">75%</td><td className="border border-outline-variant/60 p-3">25% × 3</td><td className="border border-outline-variant/60 p-3">180</td></tr>
            </tbody>
            </table>
          </div>,
          <>
            A 20% restaurant tip is another everyday one. A bill of ₹850: 10% is ₹85, double it for
            20%, and the tip is ₹170. The same doubling trick works for any even percentage — find 10%,
            then scale.
          </>,
        ],
      },
      {
        heading: "Three mistakes that produce wrong answers",
        body: [
          <>
            First, dividing by the new number instead of the old one in a percentage change. A salary
            of ₹40,000 rising to ₹46,000 is a 15% rise (6,000 ÷ 40,000). Dividing by 46,000 instead
            gives 13%, which is wrong — the rise is measured against where you started.
          </>,
          <>
            Second, adding percentages that apply to different bases. A price cut by 10% and then
            raised by 10% does not return to the start. ₹100 cut by 10% is ₹90, and ₹90 raised by 10%
            is ₹99 — 1% below where it began. The second 10% is taken from a smaller number, so it
            is worth less.
          </>,
          <>
            Third, confusing &quot;increase by 200%&quot; with &quot;increase to 200%&quot;. An
            increase by 200% adds twice the original amount, so the result is three times the original.
            An increase to 200% means the result is twice the original. The words by and to carry the
            whole difference.
          </>,
        ],
      },
      {
        heading: "When should you use a calculator?",
        body: [
          <>
            Once the three formulas feel natural, the hand math is only worth doing when the numbers
            are round. Comparing loan offers, working out GST on a mixed bill, or checking a lender&apos;s
            figure all deserve a tool. Run them through the{" "}
            <Link href="/calculators/percentage-calculator/" className="text-primary underline">
              Percentage Calculator
            </Link>
            , and if the question is really about what a loan costs each month rather than a
            percentage, read{" "}
            <Link href="/guides/how-to-calculate-emi/" className="text-primary underline">
              How to Calculate EMI by Hand
            </Link>
            . The percentage is the input there; the EMI formula is what it feeds.
          </>,
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage divided by 100. 25% of 200 is 200 × 0.25 = 50. 35% of 180 is 180 × 0.35 = 63.",
      },
      {
        question: "How do I find what percentage one number is of another?",
        answer:
          "Divide the first number by the second, then multiply by 100. 45 out of 60 is 45 ÷ 60 × 100 = 75%. 420 out of 500 is 84%.",
      },
      {
        question: "How do you calculate percentage increase?",
        answer:
          "Subtract the old value from the new value, divide by the old value, and multiply by 100. A salary rising from ₹40,000 to ₹46,000 is (6,000 ÷ 40,000) × 100 = 15%.",
      },
      {
        question: "What is the difference between percent and percentage points?",
        answer:
          "Percentage points are the arithmetic difference between two percentages; percent is the relative change. A rate moving from 8% to 10% rises 2 percentage points, which is a 25% relative increase.",
      },
      {
        question: "How do I reverse a percentage to find the whole number?",
        answer:
          "Divide the part by the percentage as a decimal. If 18 is 12% of some number, that number is 18 ÷ 0.12 = 150.",
      },
      {
        question: "How do I calculate a discount price?",
        answer:
          "Find the discount (price × percent ÷ 100) and subtract it, or multiply the price by 1 minus the percent. A ₹1,200 item at 15% off costs ₹1,200 × 0.85 = ₹1,020.",
      },
    ],
    related: ["percentage-calculator", "gst-calculator", "emi-calculator"],
    pillar: { label: "All Calculators", href: "/calculators/" },
  }
];

export function getGuide(slug: string): Guide {
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) {
    throw new Error(`Unknown guide: ${slug}`);
  }
  return guide;
}
