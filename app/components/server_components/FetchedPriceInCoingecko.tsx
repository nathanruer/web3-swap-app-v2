import { fetchPriceCoingecko } from "@/app/actions/fetchPriceCoingecko";

interface FetchedPriceInCoingeckoProps {
  coingeckoId?: string;
  amount: any;
}

const FetchedPriceInCoingecko = async ({ coingeckoId, amount }: FetchedPriceInCoingeckoProps) => {
  let fetchedPriceInCoingecko: string | null = "";

  if (coingeckoId && amount) {
    fetchedPriceInCoingecko = await fetchPriceCoingecko(coingeckoId, amount);
  }

  return (
    <div>
      {fetchedPriceInCoingecko || "Price not available"}
    </div>
  );
};

export default FetchedPriceInCoingecko;
