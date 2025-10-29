"use client";

import { OnchainKitProvider as OnchainKitProviderBase } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";

export function OnchainKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnchainKitProviderBase
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: "PetPortrait Pro",
          mode: "light",
        },
        wallet: {
          display: "modal",
        },
      }}
    >
      {children}
    </OnchainKitProviderBase>
  );
}

