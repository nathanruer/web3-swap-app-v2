import { Provider } from '@wagmi/core';
import { ethers } from 'ethers';

export async function getTokenName(tokenAddress: string, provider: Provider): Promise<string> {
  const contract = new ethers.Contract(tokenAddress, ['function name() view returns (string)'], provider);
  try {
    const name = await contract.name();
    return name;
  } catch (error) {
    console.error('Failed to fetch token name:', error);
    return '';
  }
}
