'use client';

import { useState, useMemo } from 'react'
import { Suspense } from "react";

import { useProvider } from 'wagmi';
import { useAccount } from "wagmi";

import useSelectTokenInModal from '@/app/hooks/useSelectTokenInModal';
import SelectTokenInModal from "./modals/SelectTokenInModal";
import TokenSelect from "./TokenSelect";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
import SelectTokenOutModal from "./modals/SelectTokenOutModal";
import Loading from "./Loading";
import FetchedAmountOut from './server_components/FetchedAmountOut';
import FetchedPriceInCoingecko from './server_components/FetchedPriceInCoingecko';
import FetchedPriceOutCoingecko from './server_components/FetchedPriceOutCoingecko';
import TokenBalance from './server_components/TokenBalance';

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
  const { address: userAddress } = useAccount();
  const selectTokenInModal = useSelectTokenInModal();
  const selectTokenOutModal = useSelectTokenOutModal();

  const [amountIn, setAmountIn] = useState("");
  const handleInputInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountIn(value);
  };
  const fetchedPriceInCoingecko = useMemo(() => {
    if (amountIn && tokenInAddress) {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[16px]" />}>
          <div className='flex gap-0.5'>~$
          {/* @ts-expect-error Async Server Component */}
          <FetchedPriceInCoingecko 
            tokenAddress={tokenInAddress} 
            amount={amountIn}
          />
          </div>
        </Suspense>
      );
    }
  }, [amountIn, tokenInAddress]);
  const tokenInBalance = useMemo(() => {
    if (tokenInAddress) {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[16px]"/>}>
          {/* @ts-expect-error Async Server Component */}
          <TokenBalance 
            tokenAddress={tokenInAddress} 
            userAddress={userAddress}
            provider={provider} 
          />
        </Suspense>
      )
    } else {
      return (
        null
      )
    }
  }, [tokenInAddress, userAddress, provider]);

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
  const tokenOutBalance = useMemo(() => {
    if (tokenOutAddress) {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[16px]"/>}>
          {/* @ts-expect-error Async Server Component */}
          <TokenBalance 
            tokenAddress={tokenOutAddress} 
            userAddress={userAddress}
            provider={provider} 
          />
        </Suspense>
      )
    } else {
      return (
        null
      )
    }
  }, [tokenInAddress, userAddress, provider]);

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
          <div className='px-2 pt-1'>
            <div className='text-xs flex justify-between text-gray-400 font-semibold'>
              <div>{fetchedPriceInCoingecko}</div> 
              <div>{tokenInBalance}</div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl mb-1 bg-[#141619] gap-3
        justify-center items-center">
          <div className='flex'>
            <div className='w-3/5'>
              <div className='px-2 rounded-xl bg-transparent text-white text-2xl'>
                {fetchedAmountOut}
              </div>
            </div>
            <div className="w-2/5">
              <TokenSelect 
                tokenAddress={tokenOutAddress}
                modal={selectTokenOutModal}
              />
            </div>
          </div>
          <div className='px-2 pt-1'>
            <div className='text-xs flex justify-between text-gray-400 font-semibold'>
              <div>{fetchedPriceOutCoingecko}</div> 
              <div>{tokenOutBalance}</div>
            </div>
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