import { ChainId } from '@sky-mavis/katana-core'
import { Protocol } from '@uniswap/router-sdk'

export const S3_POOL_CACHE_KEY = (baseKey: string, chain: ChainId, protocol: Protocol) =>
  `${baseKey}-${chain}-${protocol}`
