import { Currency, CurrencyAmount, Percent } from '@uniswap/sdk-core'
import {
  AlphaRouterConfig,
  CacheMode,
  ProtocolPoolSelection,
} from '@sky-mavis/smart-order-router'
import { FeeOptions } from '@uniswap/v3-sdk'
import { FlatFeeOptions } from '@uniswap/universal-router-sdk'
import { ChainId } from '@sky-mavis/katana-core'

export const DEFAULT_ROUTING_CONFIG_BY_CHAIN = (chainId: ChainId): AlphaRouterConfig => {
  switch (chainId) {
    default:
      return {
        v2PoolSelection: {
          topN: 3,
          topNDirectSwaps: 1,
          topNTokenInOut: 5,
          topNSecondHop: 2,
          topNWithEachBaseToken: 2,
          topNWithBaseToken: 6,
        },
        v3PoolSelection: {
          topN: 2,
          topNDirectSwaps: 2,
          topNTokenInOut: 3,
          topNSecondHop: 1,
          topNWithEachBaseToken: 3,
          topNWithBaseToken: 5,
        },
        maxSwapsPerPath: 3,
        minSplits: 1,
        maxSplits: 7,
        distributionPercent: 5,
        forceCrossProtocol: false,
      }
  }
}

export type QuoteSpeedConfig = {
  v2PoolSelection?: ProtocolPoolSelection
  v3PoolSelection?: ProtocolPoolSelection
  maxSwapsPerPath?: number
  maxSplits?: number
  distributionPercent?: number
  writeToCachedRoutes?: boolean
}

export const QUOTE_SPEED_CONFIG: { [key: string]: QuoteSpeedConfig } = {
  standard: {},
  fast: {
    v2PoolSelection: {
      topN: 1,
      topNDirectSwaps: 1,
      topNTokenInOut: 1,
      topNSecondHop: 0,
      topNWithEachBaseToken: 1,
      topNWithBaseToken: 1,
    },
    v3PoolSelection: {
      topN: 1,
      topNDirectSwaps: 1,
      topNTokenInOut: 1,
      topNSecondHop: 0,
      topNWithEachBaseToken: 1,
      topNWithBaseToken: 1,
    },
    maxSwapsPerPath: 2,
    maxSplits: 1,
    distributionPercent: 100,
    writeToCachedRoutes: false,
  },
}

export type IntentSpecificConfig = {
  useCachedRoutes?: boolean
  overwriteCacheMode?: CacheMode
  optimisticCachedRoutes?: boolean
}

export const INTENT_SPECIFIC_CONFIG: { [key: string]: IntentSpecificConfig } = {
  caching: {
    // When the intent is to create a cache entry, we will use cachedRoutes with Tapcompare to track accuracy
    useCachedRoutes: true,
    overwriteCacheMode: CacheMode.Tapcompare,
    // This optimistic=false is *super* important to avoid an infinite loop of caching quotes calling themselves
    optimisticCachedRoutes: false,
  },
  quote: {
    // When the intent is to get a quote, we should use the cache and optimistic cached routes
    useCachedRoutes: true,
    optimisticCachedRoutes: true,
  },
  swap: {
    // When the intent is to prepare the swap, we can use cache, but it should not be optimistic
    useCachedRoutes: true,
    optimisticCachedRoutes: false,
  },
  pricing: {
    // When the intent is to get pricing, we should use the cache and optimistic cached routes
    useCachedRoutes: true,
    optimisticCachedRoutes: true,
  },
}

export type FeeOnTransferSpecificConfig = {
  enableFeeOnTransferFeeFetching?: boolean
}

export const FEE_ON_TRANSFER_SPECIFIC_CONFIG = (
  enableFeeOnTransferFeeFetching?: boolean
): FeeOnTransferSpecificConfig => {
  return {
    enableFeeOnTransferFeeFetching: enableFeeOnTransferFeeFetching,
  } as FeeOnTransferSpecificConfig
}

export function parseSlippageTolerance(slippageTolerance: string): Percent {
  // e.g. Inputs of form "1.25%" with 2dp max. Convert to fractional representation => 1.25 => 125 / 10000
  const slippagePer10k = Math.round(parseFloat(slippageTolerance) * 100)
  return new Percent(slippagePer10k, 10_000)
}

export function parseDeadline(deadline: string): number {
  return Math.floor(Date.now() / 1000) + parseInt(deadline)
}

export function parsePortionPercent(portionBips: number): Percent {
  return new Percent(portionBips, 10_000)
}

export function parseFeeOptions(portionBips?: number, portionRecipient?: string): FeeOptions | undefined {
  if (!portionBips || !portionRecipient) {
    return undefined
  }

  return { fee: parsePortionPercent(portionBips), recipient: portionRecipient } as FeeOptions
}

export function parseFlatFeeOptions(portionAmount?: string, portionRecipient?: string): FlatFeeOptions | undefined {
  if (!portionAmount || !portionRecipient) {
    return undefined
  }

  return { amount: portionAmount, recipient: portionRecipient } as FlatFeeOptions
}

export type AllFeeOptions = {
  fee?: FeeOptions
  flatFee?: FlatFeeOptions
}

export function populateFeeOptions(
  type: string,
  portionBips?: number,
  portionRecipient?: string,
  portionAmount?: string
): AllFeeOptions | undefined {
  switch (type) {
    case 'exactIn':
      const feeOptions = parseFeeOptions(portionBips, portionRecipient)
      return { fee: feeOptions }
    case 'exactOut':
      const flatFeeOptions = parseFlatFeeOptions(portionAmount, portionRecipient)
      return { flatFee: flatFeeOptions }
    default:
      return undefined
  }
}

export function computePortionAmount(currencyOut: CurrencyAmount<Currency>, portionBips?: number): string | undefined {
  if (!portionBips) {
    return undefined
  }

  return currencyOut.multiply(parsePortionPercent(portionBips)).quotient.toString()
}

export const DEFAULT_DEADLINE = 600 // 10 minutes
export const UNISWAP_DOT_ETH_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'
