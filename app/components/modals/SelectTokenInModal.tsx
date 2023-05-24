'use client';

import { useCallback, useState, useMemo } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";
import TokenSymbol from "../server_components/TokenSymbol";
import TokenName from "../server_components/TokenName";

import Modal from "./Modal";
import useSelectTokenInModal from '@/app/hooks/useSelectTokenInModal';
import Loading from "../Loading";

import { coins } from "@/app/constants/coins";
import { useProvider } from "wagmi";

const SelectTokenInModal = () => {
  const provider = useProvider();
  const selectTokenInModal = useSelectTokenInModal();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback((query: string, tokenAddress: string) => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      [query]: tokenAddress
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });
    router.push(url);
    selectTokenInModal.onClose();
  }, [router, params, selectTokenInModal]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
      coin.address.toLowerCase() === searchValue.toLowerCase()
  );  

  const headContent = (
    <div className={`bg-[#141619] rounded-xl border hover:border-violet-500 transition
    ${isInputFocused ? 'border-violet-500' : 'border-[#31343d]'}`}>
      <input
        type="text"
        placeholder="Search... (Symbol or Address)"
        className="p-1.5 w-full"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
    </div>
  );

  const tokenSymbol = useMemo(() => {
    if (searchValue) {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[24px]" />}>
          <div className='flex'>
            (
            {/* @ts-expect-error Async Server Component */}
            <TokenSymbol tokenAddress={searchValue} provider={provider} />
            )
          </div>
        </Suspense>
      );
    }
  }, [searchValue, provider]);
  const tokenName = useMemo(() => {
    if (searchValue) {
      return (
        <Suspense fallback={<Loading width="w-[75px]" height="h-[24px]" />}>
          {/* @ts-expect-error Async Server Component */}
          <TokenName tokenAddress={searchValue} provider={provider} />
        </Suspense>
      );
    }
  }, [searchValue, provider]);

  const bodyContent = (
    <div>
      {filteredCoins.length > 0 ? (
        filteredCoins.map((coin, index) => (
          <div key={index}>
            <button onClick={() => handleClick('from', coin.address)}
            className="py-1.5 text-md">
              {coin.name} ({coin.symbol})
            </button>
            <hr className="border-[#31343d]" />
          </div>
        )
      )
    ) : (
      <button onClick={() => handleClick('from', searchValue)}
      className="py-1.5 text-md">
        <div className="flex gap-1">
          {tokenName} {tokenSymbol}
        </div>
      </button>
      )}
    </div>
  );
  

  return (
    <Modal
      isOpen={selectTokenInModal.isOpen}
      onClose={selectTokenInModal.onClose}
      title="Select token"
      head={headContent}
      body={bodyContent}
    />
  );
};

export default SelectTokenInModal;
