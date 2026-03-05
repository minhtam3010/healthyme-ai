// Shared constants and types for the Health dashboard components

export const MACRO_COLORS = ["#2563eb", "#f59e0b", "#ef4444", "#22c55e"];

export const ACTIVITY_COLORS = [
  "#6366f1",
  "#84cc16",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

/** Derives BMI risk color: Underweight🟡 Normal🟢 Overweight🟠 Obese🔴 */
export function getBmiColor(bmi: number): string {
  if (bmi < 18.5) return "#f59e0b";
  if (bmi < 25) return "#22c55e";
  if (bmi < 30) return "#f97316";
  return "#ef4444";
}

/** Derives BMI category label */
export function getBmiLabel(bmi: number): string {
  if (bmi < 18.5) return "Under";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Over";
  return "Obese";
}
