/** Approximate list pricing (USD per 1M tokens) for cost estimates on the Lab dashboard. */

const USD_PER_MILLION: Record<string, { input: number; output: number }> = {
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-sonnet-4-20250514": { input: 3, output: 15 },
};

const DEFAULT_RATES = USD_PER_MILLION["claude-sonnet-4-6"]!;

export function estimateNarrationCostUsd(
  model: string,
  input_tokens: number,
  output_tokens: number,
): number {
  const rates = USD_PER_MILLION[model] ?? DEFAULT_RATES;
  const usd =
    (input_tokens / 1_000_000) * rates.input + (output_tokens / 1_000_000) * rates.output;
  return Math.round(usd * 1_000_000) / 1_000_000;
}

export function charsPerInputToken(prompt_chars: number, input_tokens: number): number | undefined {
  if (input_tokens <= 0 || prompt_chars <= 0) return undefined;
  return Math.round((prompt_chars / input_tokens) * 100) / 100;
}
