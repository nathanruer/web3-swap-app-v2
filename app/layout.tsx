'use client';

import './globals.css'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, arbitrum, optimism, avalanche],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Web3Modal Connect Wallet',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body className="bg-[#22242a] text-white">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider 
            chains={chains}
            theme={darkTheme({
              accentColor: 'white',
              accentColorForeground: 'black',
            })}
          >
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}