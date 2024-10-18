
export enum ChainId {
  mainnet = 2020,
  testnet = 2021
}

export const TESTNETS: ChainId[] = [
  ChainId.testnet
]

export const SUPPORTED_CHAINS = [ChainId.testnet] as const
