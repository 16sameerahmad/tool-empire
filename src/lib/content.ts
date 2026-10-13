export type FAQItem = { question: string; answer: string };

export type ToolContent = {
  intro: string;
  howTo: string[];
  content: string[];
  faq: FAQItem[];
};

const faq = (items: FAQItem[]): FAQItem[] => items;

export const content: Record<string, ToolContent> = {
  "age-calculator": {
    intro: "Find an exact calendar age from a date of birth without creating an account.",
    howTo: ["Choose a date of birth.", "Read the exact age and days lived.", "Check the next birthday countdown."],
    content: [
      "An age calculator answers a simple question with calendar precision: how old is someone on a particular day? Enter a date of birth and this browser-only calculator compares it with today on your device. The result separates completed years, remaining months, and remaining days, so it is more useful than subtracting birth years. It also shows total calendar days lived and the date of the next birthday. No date is sent to a server, and refreshing the page clears the input.",
      "Calendar age is different from dividing a number of days by 365.25. Months have different lengths, and a birthday is reached only when the month and day arrive. The calculator therefore advances the birth date one month at a time while keeping the local calendar date. This makes the result readable for birthdays near the end of a month and avoids a UTC shift that can make a date appear one day early or late. The result uses the local date on the visitor's device.",
      "Leap years need one explicit rule. For a person born on 29 February, the birthday is treated as 1 March in a non-leap year. Age therefore increases on 1 March in those years. On a leap year, 29 February remains the birthday. If the date of birth is today, the result is zero years, zero months, and zero days, while the next birthday is one year ahead. If today is the birthday for someone at least one year old, the next birthday is shown as Today with zero days remaining.",
      "The result is informational and should not be used as legal proof of age. Official processes may use documents, local rules, or a different definition of an age threshold. For school, work, insurance, or travel paperwork, follow the organisation's stated method. The calculator accepts dates from 1 January 1900 through today. Future dates and dates before that minimum receive a plain-language message instead of a blank result. The method is deterministic in the underlying logic, which also makes it straightforward to check against a known as-of date.",
      "For a reliable comparison, write down the as-of date before entering a birthday and make sure the device date is correct. The calculator describes elapsed calendar time, so it is useful for planning a celebration, checking an application draft, or explaining the difference between a birthday and a total-day count. It intentionally avoids pretending that every month has the same number of days. When a result looks surprising, check the day before and after the birthday, especially around February and the end of a month. The explanation below the result states the assumptions so another person can reproduce the calculation.",
    ],
    faq: faq([
      { question: "How is exact age calculated?", answer: "The calculator compares local calendar dates and reports completed years, months, and days." },
      { question: "Does it use my device's local date?", answer: "Yes. Date calculations use the local date on your device rather than UTC." },
      { question: "How is a 29 February birthday handled?", answer: "In a non-leap year, the birthday is treated as 1 March." },
      { question: "Can I enter a future date?", answer: "No. A future date shows an inline validation message." },
      { question: "Is my date stored?", answer: "No. The value stays in browser memory and refreshing clears it." },
    ]),
  },
  "emi-calculator": {
    intro: "Estimate an Indian loan's monthly EMI, total interest, and total payment.",
    howTo: ["Enter the loan amount and annual rate.", "Choose years or months and enter the tenure.", "Review the estimate formatted in rupees."],
    content: [
      "An EMI calculator estimates the equal monthly instalment for a reducing-balance loan. Enter the principal, annual interest rate, and tenure, then choose whether the tenure is in years or months. The calculator converts years to months and applies the standard fixed-payment formula. It returns the monthly EMI, the total amount paid across the full term, and the total interest. Values are formatted with Indian grouping so large numbers are easier to read in lakh and crore style.",
      "The calculation uses r = annual rate divided by 12 and then divided by 100, n as the number of monthly payments, and EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1). When the interest rate is zero, the result uses principal divided by n rather than attempting the formula's zero denominator. Total payment uses the unrounded EMI multiplied by the number of months. Total interest is total payment minus principal; rounding happens only for display.",
      "This is an estimate, not a lender quote. A bank or finance company may use daily accrual, a different rounding policy, fees, insurance, taxes, a changing rate, or a different repayment schedule. The calculator does not include processing fees, late charges, prepayments, amortisation tables, or other extras. Compare the result with the lender's disclosure before making a financial decision. The page is designed for Indian readers, uses the rupee symbol, and does not target mortgage terminology.",
      "All checks happen in the browser. The amount must be greater than zero and no more than 1,000,000,000,000. The rate can be from 0 to 100 percent with up to two decimal places, and tenure must be a whole number from one to 600 months. Invalid or incomplete input keeps the result area in its placeholder state. No loan details are stored, and a refresh clears the form. For a US-oriented page with dollar formatting and mortgage language, use the linked Mortgage Calculator.",
      "Try comparing two rates while leaving the amount and tenure unchanged to see how interest changes the total. A longer tenure can lower the monthly payment while increasing the total interest, so a single monthly figure does not describe the full cost. The calculation does not know your income, credit profile, lender policy, or eligibility. Use it to prepare questions and rough scenarios, then check the official schedule and disclosures supplied by the lender. Because the form is local, you can explore scenarios without an account or a saved history.",
    ],
    faq: faq([
      { question: "What does EMI mean?", answer: "EMI means equated monthly instalment, the regular payment on a fixed-payment loan." },
      { question: "What happens at zero interest?", answer: "The calculator divides the principal by the number of months and shows zero interest." },
      { question: "Are fees included?", answer: "No. The result covers principal and interest only." },
      { question: "Can I enter tenure in years?", answer: "Yes. Choose years and the calculator converts the value to months." },
      { question: "Is the result financial advice?", answer: "No. It is an informational estimate and a lender's figure may differ." },
    ]),
  },
  "mortgage-calculator": {
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
    faq: faq([
      { question: "Does this include property taxes?", answer: "No. It estimates principal and interest only." },
      { question: "Why is the payment an estimate?", answer: "Lenders can apply different fees, rounding, and repayment details." },
      { question: "Can I use a 30-year term?", answer: "Yes. Enter 30 with years selected, which converts to 360 months." },
      { question: "Does this page use EMI terminology?", answer: "No. It is the US mortgage page with dollar formatting and mortgage language." },
      { question: "Is my information saved?", answer: "No. Inputs remain in browser memory and clear on refresh." },
    ]),
  },
  "bmi-calculator": {
    intro: "Calculate adult BMI from metric or imperial height and weight inputs.",
    howTo: ["Choose Metric or Imperial units.", "Enter height and weight.", "Read the BMI value and screening category."],
    content: [
      "Body mass index, or BMI, is a screening measure based on height and weight. This calculator supports metric centimetres and kilograms as well as imperial feet, inches, and pounds. It converts imperial values using exact unit factors, calculates weight in kilograms divided by height in metres squared, and displays the result to one decimal place. The category is based on that displayed value so boundary results are easy to understand.",
      "For adults, the screening ranges used here are under 18.5 for Underweight, 18.5 through 24.9 for Normal, 25.0 through 29.9 for Overweight, and 30.0 or above for Obese. These categories are commonly used adult ranges, but BMI cannot distinguish muscle, bone, fat distribution, age, pregnancy, or many health conditions. It is not a diagnosis. Children and teenagers need age- and sex-specific charts, so this page is intended for adults aged 18 and over.",
      "Switching between Metric and Imperial clears the input fields so a value from one unit system is never silently interpreted as another. Height is checked against a practical range of 50 to 250 centimetres after conversion, and weight is checked from 10 to 500 kilograms. Empty fields show a placeholder instead of an error. Values outside the range receive an inline message that explains which field needs attention.",
      "Use the result as a prompt for a broader conversation with a qualified health professional, especially if you have a medical condition or a rapid change in weight. The calculator makes no diagnosis and stores nothing. It performs the conversion locally in your browser and does not send height or weight to a server. A clear, labelled form and keyboard-friendly unit control make it usable on mobile screens as well as desktop displays.",
      "For consistent results, measure height without shoes and use the same unit system for the entire entry. Rounding is applied to the displayed BMI before the category is selected, which makes the boundary behavior visible. A value of 24.95, for example, is displayed to one decimal place and classified from that displayed number. This is a deliberate presentation rule, not a claim about clinical precision. If you need a health assessment, share the underlying measurements and your context with a qualified professional rather than relying on a single screening number.",
      "BMI can be useful for a population-level screening conversation, but a single number does not describe fitness, nutrition, or health on its own. Record the units beside any value you share, because a pound and a kilogram are not interchangeable. The page keeps the conversion factors visible in its implementation and gives an error rather than producing a misleading result for an impossible height or weight.",
    ],
    faq: faq([
      { question: "What is BMI?", answer: "BMI is a screening number based on weight and height." },
      { question: "Can I use feet and pounds?", answer: "Yes. Choose Imperial and enter feet, inches, and pounds." },
      { question: "Is BMI a diagnosis?", answer: "No. BMI is a screening measure for adults, not a diagnosis." },
      { question: "Why did switching units clear my values?", answer: "Clearing prevents values from being misread under a different unit system." },
      { question: "Are children covered?", answer: "No. This calculator is intended for adults aged 18 and over." },
    ]),
  },
  "cgpa-to-percentage": {
    intro: "Convert a 10-point CGPA to an estimated percentage using ×9.5.",
    howTo: ["Enter a CGPA from 0 to 10.", "Review the multiplier shown on the page.", "Use the displayed percentage as an estimate."],
    content: [
      "This CGPA to percentage calculator applies the commonly published CBSE convention of multiplying a 10-point CGPA by 9.5. Enter a value from 0 to 10 and the page displays the percentage to two decimal places. For example, 8.00 becomes 76.00 percent and 7.50 becomes 71.25 percent. The multiplier is shown next to the result so the method is transparent rather than hidden behind a single answer.",
      "Institutions do not all convert grades in the same way. Some universities publish their own formula, transcript rule, or conversion table. The 9.5 multiplier is therefore an estimated convention for this page, not a universal academic law. Check your school, university, employer, or application instructions before submitting the result. The page does not provide a US GPA mode; that mode is intentionally blocked until its formula and source are decided.",
      "The input accepts numeric values with up to two decimal places. Negative values, values above 10, non-numeric text, and malformed input show a plain-language error. An empty field keeps the result area in its placeholder state. The calculation is a pure multiplication, so it is immediate and deterministic. No mark, name, or academic information is stored, and the entered value remains only in the current browser page.",
      "A percentage estimate can help with a quick comparison, but it does not change the official grade on a transcript. If an application asks for both CGPA and percentage, provide the original CGPA as well as the conversion rule used. This tool is informational and does not replace an institution's official document. Use the linked tools for other everyday calculations, but keep each result tied to the assumptions stated on its page.",
      "Keep the original transcript or marksheet with any converted value. Admissions offices may ask for the scale, the issuing institution, and the exact convention rather than accepting an informal calculation. The result is deliberately labelled as an estimate because the source and status of the multiplier still need confirmation in the project specification. Entering 8, 8.0, and 8.00 represents the same numeric CGPA, while text that is not a number is rejected. A clear formula makes it easier to explain the result when a reviewer uses a different institutional rule.",
      "The page intentionally keeps the calculation small and visible: there are no hidden grade bands, subject weights, or extra adjustments. If your institution supplies a different multiplier, use that official source and do not assume this result is interchangeable. The displayed two decimal places describe the conversion output, not additional precision in the underlying academic record.",
    ],
    faq: faq([
      { question: "What formula is used?", answer: "Percentage equals CGPA multiplied by 9.5." },
      { question: "Is the 9.5 multiplier universal?", answer: "No. Institutions differ, so confirm the rule required by your institution." },
      { question: "What range is accepted?", answer: "The calculator accepts a CGPA from 0 through 10." },
      { question: "Does it include GPA conversion?", answer: "No. US GPA mode is not shipped until its formula and source are decided." },
      { question: "How many decimals are shown?", answer: "The percentage is displayed to two decimal places." },
    ]),
  },
  "word-counter": {
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
      { question: "How are words counted?", answer: "Words are whitespace-separated tokens, with repeated whitespace ignored." },
      { question: "Does an emoji count as one character?", answer: "The counter uses grapheme clusters where available, so an emoji counts as one user-perceived character." },
      { question: "Is sentence counting exact?", answer: "No. Sentence count is an approximate punctuation-based count." },
      { question: "What reading speed is used?", answer: "The estimate assumes 200 words per minute." },
      { question: "Can I clear the draft?", answer: "Yes. Clear removes the current text and resets all counts." },
    ]),
  },
  "text-to-speech": {
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
    faq: faq([
      { question: "Where does speech run?", answer: "Speech uses the browser's built-in speechSynthesis API." },
      { question: "Can I download the audio?", answer: "No. Audio download is outside the v1 scope." },
      { question: "Why does it say Loading voices?", answer: "Browsers provide voices asynchronously through the voiceschanged event." },
      { question: "Are online voices private?", answer: "Some browser voices may send text to the browser vendor's servers." },
      { question: "What is the text limit?", answer: "The text area accepts up to 10,000 characters." },
    ]),
  },
  "fancy-text-generator": {
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
    faq: faq([
      { question: "Is this a real font?", answer: "No. The generator uses Unicode characters that may look like styled text." },
      { question: "Why did punctuation stay unchanged?", answer: "Only characters with a style mapping change; unsupported characters pass through." },
      { question: "Will every device display the result?", answer: "No. Display depends on the device's Unicode font support." },
      { question: "Can screen readers read it normally?", answer: "Styled Unicode may be read poorly, so use ordinary text for accessible content." },
      { question: "What if copying is blocked?", answer: "Select the output and press Ctrl+C on Windows or Cmd+C on Mac." },
    ]),
  },
  "base64-encoder-decoder": {
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
    faq: faq([
      { question: "Does Base64 encrypt text?", answer: "No. Base64 is reversible encoding, not encryption." },
      { question: "Does Unicode work?", answer: "Yes. Encoding uses UTF-8, so non-Latin text and emoji are supported." },
      { question: "Can I decode without padding?", answer: "Yes. Missing padding is accepted when the remaining input is valid." },
      { question: "Can it encode a file?", answer: "No. This v1 tool accepts text only." },
      { question: "What happens with invalid UTF-8?", answer: "The decoder reports that the decoded data is not valid UTF-8 text." },
    ]),
  },
  "invoice-generator": {
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
      { question: "How is tax rounded?", answer: "Tax uses integer minor units and is rounded half up to the nearest cent or paise." },
      { question: "Can I save as a PDF?", answer: "Yes. Use the browser print dialog and choose its Save as PDF option." },
      { question: "Is there a watermark?", answer: "No. The printed invoice has no site watermark or branding." },
      { question: "Is the form saved?", answer: "No. Refreshing clears the form, so print or save it before leaving." },
    ]),
  },
  "fake-text-generator": {
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
      { question: "What is it for?", answer: "Use it for mockups, humour, entertainment, and design exploration." },
    ]),
  },
};

export function getContent(id: string): ToolContent {
  const entry = content[id];
  if (!entry) {
    throw new Error(`Missing content for ${id}`);
  }
  return entry;
}
