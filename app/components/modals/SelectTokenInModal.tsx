'use client';

import { useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import useSelectTokenInModal from '@/app/hooks/useSelectTokenInModal';

import { coins } from "@/app/constants/coins";

const SelectTokenInModal = () => {
  const selectTokenInModal = useSelectTokenInModal();

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

  const bodyContent = (
    <div>
      {coins.map((coin, index) => (
        <div key={index}>
          <button onClick={() => handleClick('from', coin.address)}
          className='py-1.5 text-md'>
            {coin.symbol} ({coin.name})
          </button>
          <hr className='border-[#31343d]' />
        </div>
      ))}
  </div>
  )

  return (
    <Modal
      isOpen={selectTokenInModal.isOpen}
      onClose={selectTokenInModal.onClose}
      title="Select token"
      body={bodyContent}
    />
  );
};

export default SelectTokenInModal;
