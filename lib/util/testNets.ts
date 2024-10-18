
export enum ChainId {
  testnet = 2021
}

export const TESTNETS: ChainId[] = [
  ChainId.testnet
]

export const SUPPORTED_CHAINS = [ChainId.testnet] as const
