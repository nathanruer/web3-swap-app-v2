'use client';

import { useMemo } from "react";

import { coins } from "../constants/coins";

import { useProvider } from "wagmi";
import TokenSymbol from "./server_components/TokenSymbol";
import { Suspense } from "react";
import Loading from "./Loading";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TokenSelectProps {
  tokenAddress: string | null | undefined;
  modal: any;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  tokenAddress,
  modal,
}) => {
  const provider = useProvider();

  const tokenSymbol = useMemo(() => {
    if (tokenAddress) {
      const coinInDatabase = coins.find((coin) => coin.address === tokenAddress);
      if (coinInDatabase) {
        return coinInDatabase.symbol;
      } else {
        return (
          <Suspense fallback={<Loading width="w-[75px]" height="h-[24px]" />}>
            {/* @ts-expect-error Async Server Component */}
            <TokenSymbol tokenAddress={tokenAddress} provider={provider} />
          </Suspense>
        );
      }
    } else {
      return (
        <p>Select Token</p>
      );
    }
  }, [tokenAddress, provider]);
  

  return (
    <button className="flex w-full text-white text-base
    py-2 px-4 transition rounded-xl bg-[#222429] hover:bg-[#2e3138]"
    onClick={modal.onOpen}>
      <div className="flex w-full items-center justify-between">
        {tokenSymbol}
        <MdOutlineKeyboardArrowDown />
      </div>
    </button>
  )
}

export default TokenSelect