import { fetchPriceCoingecko } from "@/app/actions/fetchPriceCoingecko";
import { tokenTable } from "@/app/constants/tokenTable";

interface FetchedPriceInCoingeckoProps {
  tokenAddress?: string;
  amount: any;
  chain?: string | null | undefined,
}

const FetchedPriceInCoingecko = async ({ tokenAddress, amount, chain }: FetchedPriceInCoingeckoProps) => {
  let fetchedPriceInCoingecko: string | null = "";

  if (tokenAddress && amount && chain) {
    const selectedToken = tokenTable[chain]?.find((token) => token.address === tokenAddress);
    if (selectedToken) {
      fetchedPriceInCoingecko = await fetchPriceCoingecko(selectedToken.coingeckoId, amount);
    }
  }

  return (
    <div>
      {fetchedPriceInCoingecko ? `~$ ${fetchedPriceInCoingecko}` : "Price not available"}
    </div>
  );
};

export default FetchedPriceInCoingecko;
