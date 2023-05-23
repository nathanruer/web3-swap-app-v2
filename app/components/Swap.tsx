'use client';

import { useState, useMemo } from 'react'

import useSelectTokenInModal from '@/app/hooks/useSelectTokenInModal';
import SelectTokenInModal from "./modals/SelectTokenInModal";
import TokenSelect from "./TokenSelect";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
import SelectTokenOutModal from "./modals/SelectTokenOutModal";

import { Suspense } from "react";
import Loading from "./Loading";
import FetchedAmountOut from './FetchedAmountOut';
import { useProvider } from 'wagmi';

interface SwapProps {
  tokenInAddress?: string | null;
  tokenOutAddress?: string | null;
}

const Swap: React.FC<SwapProps> = ({
  tokenInAddress,
  tokenOutAddress,
}) => {
  const provider = useProvider();

  const selectTokenInModal = useSelectTokenInModal();
  const selectTokenOutModal = useSelectTokenOutModal();

  const [amountIn, setAmountIn] = useState("");

  const handleInputInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountIn(value);
    console.log(`input in modifié : ${value}`);
  };

  const [isFocus, setIsFocus] = useState(false);

  const fetchedAmountOut = useMemo(() => {
    if (amountIn && tokenInAddress && tokenOutAddress)  {
      return (
        <Suspense fallback={<Loading width="w-[200px]" height="h-[32px]"/>}>
          {/* @ts-expect-error Async Server Component */}
          <FetchedAmountOut 
            tokenInAddress={tokenInAddress} 
            tokenOutAddress={tokenOutAddress}
            amountIn={amountIn}
            provider={provider} 
          />
        </Suspense>
      )
    } else {
      return (
        null
      )
    }
  }, [amountIn, provider]);

  return (
    <div className="p-10">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto rounded-3xl 
      bg-neutral-700/10 shadow-2xl shadow-[#141619] p-10">
        
        <div className={`flex p-3 rounded-xl mb-1 bg-[#141619] gap-1
        justify-center items-center
        ${isFocus ? "border border-violet-500" : ""}`}>
          <div className='w-3/5'>
            <input
              type="number"
              placeholder={"Enter value"}
              className="px-2 rounded-xl bg-transparent text-white text-2xl"
              value={amountIn}
              onChange={handleInputInChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </div>
          <div className="w-2/5">
            <TokenSelect 
              tokenAddress={tokenInAddress}
              modal={selectTokenInModal}
            />
          </div>
        </div>


        <div className="flex p-3 rounded-xl mb-1 bg-[#141619] gap-3
        justify-center items-center">
          <div className='w-3/5'>
            <p className='px-2 rounded-xl bg-transparent text-white text-2xl'>
              {fetchedAmountOut}
            </p>
          </div>
          <div className="w-2/5">
            <TokenSelect 
              tokenAddress={tokenOutAddress}
              modal={selectTokenOutModal}
            />
          </div>
        </div>


        <button className="flex justify-center w-full mt-4 py-2.5 
        bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br
        rounded-xl hover:opacity-80 transition">
          Swap
        </button>
      </div>
      <SelectTokenInModal />
      <SelectTokenOutModal />
    </div>
  )
}

export default Swap;