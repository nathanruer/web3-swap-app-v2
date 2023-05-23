import { Provider } from '@wagmi/core';
import { ethers } from 'ethers';

export async function getTokenSymbol(tokenAddress: string, provider: Provider): Promise<string> {
  const contract = new ethers.Contract(tokenAddress, ['function symbol() view returns (string)'], provider);
  try {
    const symbol = await contract.symbol();
    return symbol;
  } catch (error) {
    console.error('Failed to fetch token symbol:', error);
    return '';
  }
}
