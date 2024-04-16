"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import PriceView from "./components/price";

function Page() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <PriceView />
    </div>
  );
}

export default Page;
