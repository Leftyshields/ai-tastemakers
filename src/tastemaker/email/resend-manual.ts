/** Manual workflow_dispatch resends use a distinct idempotency suffix; automatic recovery does not. */
export function resolveDigestResendManualRunId(): string | undefined {
  if (process.env.DIGEST_RESEND_MANUAL !== "1") return undefined;
  return (
    process.env.DIGEST_RESEND_MANUAL_RUN_ID?.trim() ||
    process.env.GITHUB_RUN_ID?.trim() ||
    "manual"
  );
}
