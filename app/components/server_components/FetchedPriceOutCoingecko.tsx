import { Provider } from "@wagmi/core";
import { quoteAmount_1Inch } from "../../actions/quoteAmount_1Inch";
import { coins } from "@/app/constants/coins";
import { fetchPriceCoingecko } from "@/app/actions/fetchPriceCoingecko";

interface FetchedPriceOutCoingeckoProps {
  tokenInAddress?: string;
  tokenOutAddress?: string;
  amountIn: string;
  provider: Provider;
}

const FetchedPriceOutCoingecko = async ({ tokenInAddress, tokenOutAddress, amountIn, provider }: FetchedPriceOutCoingeckoProps) => {
  let amountOut = "";
  let fetchedPriceOutCoingecko: string | null = "";

  if (tokenInAddress && tokenOutAddress && amountIn) {
    amountOut = await quoteAmount_1Inch(tokenInAddress, tokenOutAddress, amountIn, provider);
    const selectedCoin = coins.find((coin) => coin.address === tokenOutAddress);
    if (selectedCoin) {
      fetchedPriceOutCoingecko = await fetchPriceCoingecko(selectedCoin.coingeckoId, amountOut);
    }
  }

  return (
    <div>
      {fetchedPriceOutCoingecko || "Price not available"}
    </div>
  )
};

export default FetchedPriceOutCoingecko;
