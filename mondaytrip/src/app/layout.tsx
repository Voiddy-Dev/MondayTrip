"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useEnsAvatar, useEnsName } from 'wagmi'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '1faa997954218e594cdaca009f3adf6e'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
          <body>
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains}>
                <Header />
                <div>{children}</div>
              </RainbowKitProvider>
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          </body>
      </html>
  )
}
