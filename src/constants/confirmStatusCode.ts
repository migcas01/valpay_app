const PAYMENT_STATUS_CODES = {
  success: "SUCCESS",
  authorized: "AUTHORIZED",
  failed: "FAILED",
  notAuthorized: "NOT_AUTHORIZED",
  voided: "VOIDED",
  pending: "PENDING",
} as const;

export { PAYMENT_STATUS_CODES };
