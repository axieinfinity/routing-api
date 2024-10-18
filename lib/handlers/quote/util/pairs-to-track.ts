import {  TradeType } from '@uniswap/sdk-core'
import { ChainId } from '../../../util/testNets'

export const PAIRS_TO_TRACK: Map<ChainId, Map<TradeType, string[]>> = new Map([])
