import Joi from '@hapi/joi'
import { MethodParameters } from '@sky-mavis/smart-order-router'
import { RoutingApiSimulationStatus } from './quote/util/simulation'

export type TokenInRoute = {
  address: string
  chainId: number
  symbol: string
  decimals: string
  buyFeeBps?: string
  sellFeeBps?: string
}

export type V3PoolInRoute = {
  type: 'v3-pool'
  address: string
  tokenIn: TokenInRoute
  tokenOut: TokenInRoute
  sqrtRatioX96: string
  liquidity: string
  tickCurrent: string
  fee: string
  amountIn?: string
  amountOut?: string
}

export type V2Reserve = {
  token: TokenInRoute
  quotient: string
}

export type V2PoolInRoute = {
  type: 'v2-pool'
  address: string
  tokenIn: TokenInRoute
  tokenOut: TokenInRoute
  reserve0: V2Reserve
  reserve1: V2Reserve
  amountIn?: string
  amountOut?: string
}

export const QuoteResponseSchemaJoi = Joi.object().keys({
  quoteId: Joi.string().required(),
  amount: Joi.string().required(),
  amountDecimals: Joi.string().required(),
  quote: Joi.string().required(),
  quoteDecimals: Joi.string().required(),
  quoteGasAdjusted: Joi.string().required(),
  quoteGasAdjustedDecimals: Joi.string().required(),
  gasUseEstimateQuote: Joi.string().required(),
  gasUseEstimateQuoteDecimals: Joi.string().required(),
  gasUseEstimateGasToken: Joi.string().optional(),
  gasUseEstimateGasTokenDecimals: Joi.string().optional(),
  quoteGasAndPortionAdjusted: Joi.string().optional(),
  quoteGasAndPortionAdjustedDecimals: Joi.string().optional(),
  gasUseEstimate: Joi.string().required(),
  gasUseEstimateUSD: Joi.string().required(),
  simulationError: Joi.boolean().optional(),
  simulationStatus: Joi.string().required(),
  gasPriceWei: Joi.string().required(),
  blockNumber: Joi.string().required(),
  route: Joi.array().items(Joi.any()).required(),
  routeString: Joi.string().required(),
  methodParameters: Joi.object({
    calldata: Joi.string().required(),
    value: Joi.string().required(),
    to: Joi.string().required(),
  }).optional(),
  hitsCachedRoutes: Joi.boolean().optional(),
  portionBips: Joi.number().optional(),
  portionRecipient: Joi.string().optional(),
  portionAmount: Joi.string().optional(),
  portionAmountDecimals: Joi.string().optional(),
})

export type QuoteResponse = {
  quoteId: string
  amount: string
  amountDecimals: string
  quote: string
  quoteDecimals: string
  quoteGasAdjusted: string
  quoteGasAdjustedDecimals: string
  quoteGasAndPortionAdjusted?: string
  quoteGasAndPortionAdjustedDecimals?: string
  gasUseEstimate: string
  gasUseEstimateQuote: string
  gasUseEstimateQuoteDecimals: string
  gasUseEstimateGasToken?: string
  gasUseEstimateGasTokenDecimals?: string
  gasUseEstimateUSD: string
  simulationError?: boolean
  simulationStatus: RoutingApiSimulationStatus
  gasPriceWei: string
  blockNumber: string
  route: Array<(V3PoolInRoute | V2PoolInRoute)[]>
  routeString: string
  methodParameters?: MethodParameters
  hitsCachedRoutes?: boolean
  portionBips?: number
  portionRecipient?: string
  portionAmount?: string
  portionAmountDecimals?: string
}
