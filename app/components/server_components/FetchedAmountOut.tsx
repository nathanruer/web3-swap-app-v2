import { Provider } from "@wagmi/core";
import { quoteAmount_1Inch } from "../../actions/quoteAmount_1Inch";

interface FetchedAmountOutProps {
  tokenInAddress?: string;
  tokenOutAddress?: string;
  amountIn: string;
  provider: Provider;
}

const FetchedAmountOut = async ({ tokenInAddress, tokenOutAddress, amountIn, provider }: FetchedAmountOutProps) => {
  let amountOut = "";

  if (tokenInAddress && tokenOutAddress) {
    amountOut = await quoteAmount_1Inch(tokenInAddress, tokenOutAddress, amountIn, provider);
  }

  return (
    <div>
      {amountOut}
    </div>
  );
};

export default FetchedAmountOut;
