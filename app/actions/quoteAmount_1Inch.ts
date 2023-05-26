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
    let amountInParsed: ethers.BigNumber;
    const isTokenInETH = tokenInAddress.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const isTokenOutETH = tokenOutAddress.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

    if (isTokenInETH) {
      amountInParsed = ethers.utils.parseEther(amountIn);
    } else {
      const tokenInDecimals = await getTokenDecimals(tokenInAddress, provider);
      amountInParsed = ethers.utils.parseUnits(amountIn, tokenInDecimals);
    }

    const tokenOutDecimals = isTokenOutETH
      ? 18 // Si le token de sortie est l'ETH natif, nous considérons qu'il a 18 décimales
      : await getTokenDecimals(tokenOutAddress, provider);

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
