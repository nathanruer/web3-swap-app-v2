import { Provider } from "@wagmi/core";
import { quoteAmount_1Inch } from "../../actions/quoteAmount_1Inch";

interface FetchedAmountOutProps {
  tokenInAddress?: string;
  tokenOutAddress?: string;
  amountIn: string;
  provider: Provider;
  chainId?: number | undefined,
}

const FetchedAmountOut = async ({ tokenInAddress, tokenOutAddress, amountIn, provider, chainId }: FetchedAmountOutProps) => {
  let amountOut = "";

  if (tokenInAddress && tokenOutAddress && chainId) {
    amountOut = await quoteAmount_1Inch(tokenInAddress, tokenOutAddress, amountIn, provider, chainId);
  }

  return (
    <div>
      {amountOut}
    </div>
  );
};

export default FetchedAmountOut;
