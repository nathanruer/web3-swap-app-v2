import { getTokenName } from "../../actions/getTokenName";
import { Provider } from "@wagmi/core";

const TokenName = async ({ tokenAddress, provider }: { tokenAddress: string | null, provider: Provider }) => {
  const name = await getTokenName(tokenAddress || '', provider);
  return (
    <div>{name}</div>
  );
};

export default TokenName;
