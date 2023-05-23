import axios from 'axios';
import { Provider } from '@wagmi/core';
import { ethers } from 'ethers';

import { getTokenDecimals } from './getTokenDecimals';

export async function quoteAmount_1Inch(
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: string,
  provider: Provider,
): Promise<string> {
  const apiUrl = 'https://api.1inch.io/v5.0/1/quote';

  try {
    const tokenInDecimals = await getTokenDecimals(tokenInAddress, provider);
    const tokenOutDecimals = await getTokenDecimals(tokenOutAddress, provider);
    const amountInParsed = ethers.utils.parseUnits(amountIn, tokenInDecimals);

    const response = await axios.get(apiUrl, {
      params: {
        fromTokenAddress: tokenInAddress,
        toTokenAddress: tokenOutAddress,
        amount: amountInParsed.toString(),
      }
    });

    const amountOut = response.data.toTokenAmount;
    const formattedAmountOut = ethers.utils.formatUnits(amountOut, tokenOutDecimals);
    const roundedAmountOut = parseFloat(formattedAmountOut).toFixed(12);

    return roundedAmountOut;
  } catch (error) {
    console.error('Error fetching quote from 1inch API:', error);
    throw error;
  }
}
