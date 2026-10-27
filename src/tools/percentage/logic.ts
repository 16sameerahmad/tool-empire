export function calculatePercentOf(percent: number, total: number): number {
  return (percent / 100) * total;
}

export function calculateIsWhatPercent(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

export function calculatePercentChange(oldVal: number, newVal: number): {
  changePercent: number;
  type: "increase" | "decrease" | "neutral";
  difference: number;
} {
  if (oldVal === 0) {
    return { changePercent: 0, type: "neutral", difference: newVal - oldVal };
  }
  const diff = newVal - oldVal;
  const changePercent = (diff / Math.abs(oldVal)) * 100;
  return {
    changePercent: Math.abs(Number(changePercent.toFixed(2))),
    type: diff > 0 ? "increase" : diff < 0 ? "decrease" : "neutral",
    difference: Number(diff.toFixed(2)),
  };
}
