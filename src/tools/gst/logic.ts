export interface GstInput {
  amount: number;
  rate: number;
  type: "exclusive" | "inclusive";
}

export interface GstResult {
  netAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
}

export function calculateGst(input: GstInput): GstResult {
  const amount = Math.max(0, input.amount || 0);
  const rate = Math.max(0, input.rate || 0);

  if (input.type === "exclusive") {
    // GST added to net amount
    const gstAmount = Number(((amount * rate) / 100).toFixed(2));
    const totalAmount = Number((amount + gstAmount).toFixed(2));
    const halfGst = Number((gstAmount / 2).toFixed(2));
    return {
      netAmount: amount,
      gstAmount,
      cgst: halfGst,
      sgst: halfGst,
      totalAmount,
    };
  } else {
    // GST inclusive (extract GST from total amount)
    // Formula: GST Amount = Total - (Total * (100 / (100 + rate)))
    const netAmount = Number(((amount * 100) / (100 + rate)).toFixed(2));
    const gstAmount = Number((amount - netAmount).toFixed(2));
    const halfGst = Number((gstAmount / 2).toFixed(2));
    return {
      netAmount,
      gstAmount,
      cgst: halfGst,
      sgst: halfGst,
      totalAmount: amount,
    };
  }
}
