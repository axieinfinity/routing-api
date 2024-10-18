import {  TradeType } from '@uniswap/sdk-core'
import { ChainId } from '../../../util/testNets'

export const PAIRS_TO_TRACK: Map<ChainId, Map<TradeType, string[]>> = new Map([
  [
    ChainId.mainnet,
    new Map([
      [
        TradeType.EXACT_INPUT,
        [
          'WRON/USDC', 'USDC/WRON', 'WRON/*',
          'WETH/USDC', 'USDC/WETH', 'WETH/*', 'USDC/*', 'WBTC/*'],
      ],
      [TradeType.EXACT_OUTPUT, ['USDC/WRON', '*/WRON', 'USDC/WETH', '*/WETH', '*/USDC']],
    ]),
  ],
])
