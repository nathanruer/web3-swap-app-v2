import { getTokenSymbol } from "../actions/getTokenSymbol";
import { Provider } from "@wagmi/core";

const TokenSymbol = async ({ tokenAddress, provider }: { tokenAddress: string | null, provider: Provider }) => {
  const symbol = await getTokenSymbol(tokenAddress || '', provider);
  return (
    <div>{symbol}</div>
  );
};

export default TokenSymbol;
