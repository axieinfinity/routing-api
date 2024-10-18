import { ChainId } from "./testNets"

// block -1 means it's never deployed
export const NEW_QUOTER_DEPLOY_BLOCK: { [chainId in ChainId]: number } = {
  // tdb
  [ChainId.mainnet]: -1,
  [ChainId.testnet]: 28543776,
}

// 0 threshold means it's not deployed yet
export const LIKELY_OUT_OF_GAS_THRESHOLD: { [chainId in ChainId]: number } = {
  // tbd
  [ChainId.mainnet]: 17540 * 2, // 17540 is the single tick.cross cost on zkSync. We multiply by 2 to be safe
  [ChainId.testnet]: 17540 * 2, // 17540 is the single tick.cross cost on zkSync. We multiply by 2 to be safe
}

