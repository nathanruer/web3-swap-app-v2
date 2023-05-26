import { Provider } from '@wagmi/core';
import { ethers } from 'ethers';
import { getTokenDecimals } from './getTokenDecimals';

export async function formatAmount(tokenAddress: string, amountIn: string, provider: Provider) {
  const decimals = await getTokenDecimals(tokenAddress, provider);
  const formattedAmount = ethers.utils.parseUnits(amountIn, decimals).toString();
  return formattedAmount;
}
