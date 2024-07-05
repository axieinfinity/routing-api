import { ChainId } from "@uniswap/sdk-core"

export declare enum RoninChainId {
    RONIN_MAINNET = 2020,
    SAIGON_TESTNET = 2021,
} 

type IChainID = RoninChainId | ChainId

export type { IChainID }