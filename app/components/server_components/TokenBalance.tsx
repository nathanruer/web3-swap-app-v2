import { getTokenBalance } from "@/app/actions/getTokenBalance";
import { Provider } from "@wagmi/core";

interface TokenBalanceProps {
  tokenAddress: string | null;
  userAddress: `0x${string}` | undefined;
  provider: Provider;
}

const TokenBalance = async ({ tokenAddress, userAddress, provider }: TokenBalanceProps) => {
  let balance: string | null = "";

  if (tokenAddress && userAddress) {
    balance = await getTokenBalance(tokenAddress, userAddress, provider);
  }

  return <div className="flex gap-0.5">Balance: {balance}</div>;
};

export default TokenBalance;
