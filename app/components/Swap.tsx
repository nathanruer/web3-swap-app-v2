'use client';

import { useState, useMemo, useEffect } from 'react'

import { coins } from '../constants/coins';

import useSelectTokenInModal from '@/app/hooks/useSelectTokenInModal';
import SelectTokenInModal from "./modals/SelectTokenInModal";
import TokenSelect from "./TokenSelect";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
import SelectTokenOutModal from "./modals/SelectTokenOutModal";

import { Suspense } from "react";
import Loading from "./Loading";
import FetchedAmountOut from './server_components/FetchedAmountOut';
import { useProvider } from 'wagmi';
import FetchedPriceInCoingecko from './server_components/FetchedPriceInCoingecko';
import FetchedPriceOutCoingecko from './server_components/FetchedPriceOutCoingecko';

interface SwapProps {
  tokenInAddress?: string | null;
  tokenOutAddress?: string | null;
}

const Swap: React.FC<SwapProps> = ({
  tokenInAddress,
  tokenOutAddress,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const provider = useProvider();
  const selectTokenInModal = useSelectTokenInModal();
  const selectTokenOutModal = useSelectTokenOutModal();

  const [amountIn, setAmountIn] = useState("");
  const handleInputInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountIn(value);
  };
  const fetchedPriceInCoingecko = useMemo(() => {
    if (amountIn && tokenInAddress) {
      const selectedCoin = coins.find((coin) => coin.address === tokenInAddress);
      if (selectedCoin) {
        return (
          <Suspense fallback={<Loading width="w-[75px]" height="h-[16px]" />}>
            <div className='flex gap-0.5'>~$
            {/* @ts-expect-error Async Server Component */}
            <FetchedPriceInCoingecko 
              coingeckoId={selectedCoin.coingeckoId} 
              amount={amountIn}
            />
            </div>
          </Suspense>
        );
      }
    }
  }, [amountIn, tokenInAddress]);

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
  }, [amountIn, tokenInAddress, tokenOutAddress, provider]);  
  const fetchedPriceOutCoingecko = useMemo(() => {
    if (amountIn && tokenInAddress && tokenOutAddress)  {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[16px]"/>}>
          <div className='flex gap-0.5'>~$
            {/* @ts-expect-error Async Server Component */}
            <FetchedPriceOutCoingecko 
              tokenInAddress={tokenInAddress} 
              tokenOutAddress={tokenOutAddress}
              amountIn={amountIn}
              provider={provider} 
            />
          </div>
        </Suspense>
      )
    } else {
      return (
        null
      )
    }
  }, [amountIn, tokenInAddress, tokenOutAddress, provider]); 

  return (
    <div className="p-10">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto rounded-3xl 
      bg-neutral-700/10 shadow-2xl shadow-[#141619] p-10">
        
        <div className={`p-3 rounded-xl mb-1 bg-[#141619] gap-1
        justify-center items-center
        ${isFocus ? "border border-violet-500" : ""}`}>
          <div className='flex'>
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
          <div className='px-2'>
            <p className='text-xs text-gray-400 font-semibold'>{fetchedPriceInCoingecko}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl mb-1 bg-[#141619] gap-3
        justify-center items-center">
          <div className='flex'>
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
          <div className='px-2'>
              <p className='text-xs text-gray-400 font-semibold'>{fetchedPriceOutCoingecko}</p>
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