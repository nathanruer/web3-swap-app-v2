export interface Token {
  name: string;
  symbol: string;
  address: string;
  coingeckoId: string;
}

type TokenList = {
  [blockchain: string]: Token[];
};

export const tokenTable: TokenList = {
  ethereum: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
    },
    {
      name: 'Wrapped Ethereum',
      symbol: 'WETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      coingeckoId: 'weth',
    },
    {
      name: 'Uniswap',
      symbol: 'UNI',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      coingeckoId: 'uniswap',
    },
    {
      name: 'USDC Coin',
      symbol: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      coingeckoId: 'usd-coin',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      coingeckoId: 'tether',
    },
    {
      name: 'Aave',
      symbol: 'AAVE',
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      coingeckoId: 'aave',
    },
    {
      name: 'Frax Share',
      symbol: 'FXS',
      address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
      coingeckoId: 'frax-share',
    },
    {
      name: 'Conic Finance',
      symbol: 'CNC',
      address: '0x9aE380F0272E2162340a5bB646c354271c0F5cFC',
      coingeckoId: 'conic-finance',
    },
    {
      name: 'Convex Finance',
      symbol: 'CVX',
      address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
      coingeckoId: 'convex-finance',
    },
    {
      name: 'yearn.finance',
      symbol: 'YFI',
      address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      coingeckoId: 'yearn-finance',
    },
    {
      name: 'Curve DAO Token',
      symbol: 'CRV',
      address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      coingeckoId: 'curve-dao-token',
    },
    {
      name: 'Compound',
      symbol: 'COMP',
      address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      coingeckoId: 'compound-governance-token',
    },
    {
      name: 'SushiToken',
      symbol: 'SUSHI',
      address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
      coingeckoId: 'sushi',
    },
    {
      name: 'Balancer',
      symbol: 'BAL',
      address: '0xba100000625a3754423978a60c9317c58a424e3D',
      coingeckoId: 'balancer',
    },
  ],
  arbitrum: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      coingeckoId: 'ethereum',
    },
    {
      name: 'Wrapped Ethereum',
      symbol: 'WETH',
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      coingeckoId: 'weth',
    },
    {
      name: "Arbitrum",
      symbol: "ARB",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      coingeckoId: "arbitrum",
    },
    {
      name: "GMX",
      symbol: "GMX",
      address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
      coingeckoId: "gmx",
    },
  ],
};