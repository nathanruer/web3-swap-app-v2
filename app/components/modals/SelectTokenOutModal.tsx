'use client';

import { useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import useSelectTokenOutModal from '@/app/hooks/useSelectTokenOutModal';

import { coins } from "@/app/constants/coins";

const SelectTokenOutModal = () => {
  const selectTokenOutModal = useSelectTokenOutModal();

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
    selectTokenOutModal.onClose();
  }, [router, params, selectTokenOutModal]);

  const bodyContent = (
    <div>
      {coins.map((coin, index) => (
        <div key={index}>
          <button onClick={() => handleClick('to', coin.address)}
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
      isOpen={selectTokenOutModal.isOpen}
      onClose={selectTokenOutModal.onClose}
      title="Select token"
      body={bodyContent}
    />
  );
};

export default SelectTokenOutModal;
