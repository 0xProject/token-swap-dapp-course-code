import { useEffect, useState, ChangeEvent } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
  useEstimateGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import type { PriceResponse, QuoteResponse } from "../../src/utils/types";
import {
  POLYGON_TOKENS,
  POLYGON_TOKENS_BY_SYMBOL,
  POLYGON_TOKENS_BY_ADDRESS,
  POLYGON_EXCHANGE_PROXY,
  MAX_ALLOWANCE,
} from "../../src/constants";
import Image from "next/image";
import qs from "qs";

export default function QuoteView({
  takerAddress,
  price,
  quote,
  setQuote,
  chainId,
}: {
  takerAddress: Address | undefined;
  price: PriceResponse;
  quote: QuoteResponse | undefined;
  setQuote: (price: any) => void;
  chainId: number;
}) {
  const sellTokenInfo = (chainId: number) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.sellTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  const buyTokenInfo = (chainId: number) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  // Fetch quote data
  useEffect(() => {
    const params = {
      sellToken: price.sellTokenAddress,
      buyToken: price.buyTokenAddress,
      sellAmount: price.sellAmount,
      takerAddress,
    };

    async function main() {
      const response = await fetch(`/api/quote?${qs.stringify(params)}`);
      const data = await response.json();
      setQuote(data);
    }
    main();
  }, [
    price.sellTokenAddress,
    price.buyTokenAddress,
    price.sellAmount,
    takerAddress,
    setQuote,
  ]);

  const { data: estimatedGas } = useEstimateGas({
    to: quote?.to, // The address of the contract to send call data to, in this case 0x Exchange Proxy
    value: quote?.value,
    data: quote?.data, // The call data required to be sent to the to contract address.
    gasPrice: quote?.gasPrice,
  });

  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("sellAmount:", quote?.sellAmount);
  console.log("decimals:", sellTokenInfo(chainId).decimals);

  if (!quote) {
    return <div>Getting best quote...</div>;
  }

  console.log("quote", quote);

  return (
    <div className="p-3 mx-auto max-w-screen-sm ">
      <form>
        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-sm mb-3">
          <div className="text-xl mb-2 text-white">You pay</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <Image
              alt={sellTokenInfo(chainId).symbol}
              className="h-9 w-9 mr-2 rounded-md"
              src={sellTokenInfo(chainId || 137)?.logoURI}
              width={9}
              height={9}
            />
            <span>
              {formatUnits(quote.sellAmount, sellTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{sellTokenInfo(chainId).symbol}</div>
          </div>
        </div>

        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-sm mb-3">
          <div className="text-xl mb-2 text-white">You receive</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <img
              alt={
                POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                  .symbol
              }
              className="h-9 w-9 mr-2 rounded-md"
              src={
                POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                  .logoURI
              }
            />
            <span>
              {formatUnits(quote.buyAmount, buyTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{buyTokenInfo(chainId).symbol}</div>
          </div>
        </div>
      </form>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        disabled={isPending}
        onClick={() => {
          console.log("submitting quote to blockchain");
          console.log("to", quote.to);
          console.log("value", quote.value);

          sendTransaction &&
            sendTransaction({
              gas: estimatedGas,
              to: quote?.to,
              value: quote?.value, // only used for native tokens
              data: quote?.data,
              gasPrice: quote?.gasPrice,
            });
        }}
      >
        {isPending ? "Confirming..." : "Place Order"}
      </button>
      <br></br>
      <br></br>
      {hash && <div>Transaction Hash: {hash}</div>}
      <br></br>
      {isConfirming && <div>Waiting for confirmation ⏳ ...</div>}
      {isConfirmed && <div>Transaction Confirmed! 🎉</div>}
    </div>
  );
}
