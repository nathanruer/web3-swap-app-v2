import { Provider } from "@wagmi/core";
import { quoteAmount_1Inch } from "../../actions/quoteAmount_1Inch";
import { tokenTable } from "@/app/constants/tokenTable";
import { fetchPriceCoingecko } from "@/app/actions/fetchPriceCoingecko";

interface FetchedPriceOutCoingeckoProps {
  tokenInAddress?: string;
  tokenOutAddress?: string;
  amountIn: string;
  provider: Provider;
  chain?: string | null | undefined,
}

const FetchedPriceOutCoingecko = async ({ 
  tokenInAddress, 
  tokenOutAddress, 
  amountIn, 
  provider,
  chain 
} : FetchedPriceOutCoingeckoProps) => {
  let amountOut = "";
  let fetchedPriceOutCoingecko: string | null = "";

  if (tokenInAddress && tokenOutAddress && amountIn && chain) {
    const selectedToken = tokenTable[chain]?.find((token) => token.address === tokenOutAddress);
    if (selectedToken) {
      amountOut = await quoteAmount_1Inch(tokenInAddress, tokenOutAddress, amountIn, provider);
      fetchedPriceOutCoingecko = await fetchPriceCoingecko(selectedToken.coingeckoId, amountOut);
    }
  }

  return (
    <div>
      {fetchedPriceOutCoingecko ? `~$ ${fetchedPriceOutCoingecko}` : "Price not available"}
    </div>
  )
};

export default FetchedPriceOutCoingecko;
