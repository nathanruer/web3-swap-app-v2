import { ethers } from 'ethers';
import { Provider } from '@wagmi/core';

import { getTokenDecimals } from './getTokenDecimals';

export async function getTokenBalance(tokenAddress: string, userAddress: `0x${string}` | undefined, provider: Provider): Promise<string> {
  const abi = ['function balanceOf(address) view returns (uint256)'];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

  const balance = await tokenContract.balanceOf(userAddress);
  const decimals = await getTokenDecimals(tokenAddress, provider);

  const balanceString = ethers.utils.formatUnits(balance, decimals);

  return balanceString;
}
