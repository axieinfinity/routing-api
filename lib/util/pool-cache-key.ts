import { Protocol } from '@uniswap/router-sdk'
import { IChainID } from '../../common/override-sdk-core'

export const S3_POOL_CACHE_KEY = (baseKey: string, chain: IChainID, protocol: Protocol) =>
  `${baseKey}-${chain}-${protocol}`
