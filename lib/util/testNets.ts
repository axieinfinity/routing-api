import { ChainId } from '@uniswap/sdk-core'
import { IChainID, RoninChainId } from '../../common/override-sdk-core'

export const TESTNETS: IChainID[] = [
  ChainId.ARBITRUM_GOERLI,
  ChainId.POLYGON_MUMBAI,
  ChainId.GOERLI,
  ChainId.SEPOLIA,
  ChainId.CELO_ALFAJORES,
  ChainId.BASE_GOERLI,
  ChainId.OPTIMISM_SEPOLIA,
  ChainId.OPTIMISM_GOERLI,
  ChainId.ARBITRUM_SEPOLIA,
  ChainId.ARBITRUM_GOERLI,
  RoninChainId.SAIGON_TESTNET
]
