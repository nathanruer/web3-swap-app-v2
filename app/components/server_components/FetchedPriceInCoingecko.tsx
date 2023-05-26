import { fetchPriceCoingecko } from "@/app/actions/fetchPriceCoingecko";
import { coins } from "@/app/constants/coins";

interface FetchedPriceInCoingeckoProps {
  tokenAddress?: string;
  amount: any;
}

const FetchedPriceInCoingecko = async ({ tokenAddress, amount }: FetchedPriceInCoingeckoProps) => {
  let fetchedPriceInCoingecko: string | null = "";

  if (tokenAddress && amount) {
    const selectedCoin = coins.find((coin) => coin.address === tokenAddress);
    if (selectedCoin) {
      fetchedPriceInCoingecko = await fetchPriceCoingecko(selectedCoin.coingeckoId, amount);
    }
  }

  return (
    <div>
      {fetchedPriceInCoingecko ? `~$ ${fetchedPriceInCoingecko}` : "Price not available"}
    </div>
  );
};

export default FetchedPriceInCoingecko;
