import { wrapFetchWithPayment } from "x402-fetch";
import type { WalletClient } from "viem";

/**
 * Wraps fetch with x402 payment handling
 * Automatically handles 402 responses and payment processing
 */
export function createFetchWithPayment(walletClient: WalletClient) {
  return wrapFetchWithPayment(fetch, walletClient);
}

