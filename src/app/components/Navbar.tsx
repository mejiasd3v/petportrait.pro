"use client";

import { useAccount } from "wagmi";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useGetTokenBalance } from "@coinbase/onchainkit/wallet";
import { base } from "wagmi/chains";
import type { Token } from "@coinbase/onchainkit/token";

// USDC contract address on Base Mainnet
const USDC_TOKEN: Token = {
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const,
  chainId: base.id,
  decimals: 6,
  image: null,
  name: "USD Coin",
  symbol: "USDC",
};

export default function Navbar() {
  const { address, isConnected } = useAccount();
  const {
    convertedBalance,
    roundedBalance,
    status,
  } = useGetTokenBalance(address, isConnected ? USDC_TOKEN : undefined);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0052FF] dark:text-[#0052FF]">
              PetPortrait Pro
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isConnected && address && (
              <div className="flex items-center gap-4">
                {status === "success" && convertedBalance && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      USDC:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {roundedBalance || "0.00"}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Wallet />
          </div>
        </div>
      </div>
    </nav>
  );
}

