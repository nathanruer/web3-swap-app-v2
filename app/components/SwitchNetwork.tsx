'use client';

import { useCallback } from 'react';

import { useRouter } from "next/navigation";
import qs from 'query-string';

interface SwitchNetworkProps {
  chain?: string | undefined | null;
}

const SwitchNetwork = ({ chain }: SwitchNetworkProps) => {
  const router = useRouter();
  const handleClick = useCallback(( chain: string) => {
    const updatedQuery: any = {'chain': chain}
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });
    router.push(url);
  }, [router]);

  const handleSwitchNetwork = (event:any) => {
    handleClick(event.target.value)
  }

  return (
    <div>
      {chain && (
        <select className="w-full bg-[#141619] p-3 rounded-xl mb-4" onChange={handleSwitchNetwork}>
          <option value="" disabled selected hidden>{chain.charAt(0).toUpperCase() + chain.slice(1)}</option>
          <option value="ethereum">Ethereum</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
      )}
    </div>
  );
  
}

export default SwitchNetwork