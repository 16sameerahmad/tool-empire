export type InvoiceItem = { description: string; quantity: number; unitPrice: number };
export type InvoiceTotals = { subtotal: number; tax: number; total: number };

function roundHalfUp(value: number): number { return Math.floor(value + 0.5); }

export function validateInvoice(items: InvoiceItem[], taxRatePct: number): string | null {
  if (!Number.isFinite(taxRatePct) || taxRatePct < 0 || taxRatePct > 100 || !/^\d+(\.\d{1,2})?$/.test(String(taxRatePct))) return "Tax rate must be from 0 to 100 with up to 2 decimals.";
  for (const item of items.filter((entry) => entry.description.trim() || entry.quantity || entry.unitPrice)) {
    if (!item.description.trim()) return "Each used row needs a description.";
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) return "Quantity must be greater than 0.";
    if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0 || !/^\d+(\.\d{1,2})?$/.test(String(item.unitPrice))) return "Unit price must be 0 or more with up to 2 decimals.";
  }
  return null;
}

export function invoiceTotals(items: InvoiceItem[], taxRatePct: number): InvoiceTotals | { error: string } {
  const error = validateInvoice(items, taxRatePct);
  if (error) return { error };
  const subtotal = items.filter((item) => item.description.trim()).reduce((sum, item) => sum + roundHalfUp(item.quantity * Math.round(item.unitPrice * 100)), 0);
  const tax = roundHalfUp(subtotal * taxRatePct / 100);
  return { subtotal, tax, total: subtotal + tax };
}
