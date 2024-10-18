import { ChainId } from '../../../util/testNets'

export type QuoteProviderTrafficSwitchConfiguration = {
  switchExactInPercentage: number
  samplingExactInPercentage: number
  switchExactOutPercentage: number
  samplingExactOutPercentage: number
}

export const QUOTE_PROVIDER_TRAFFIC_SWITCH_CONFIGURATION = (
  chainId: ChainId
): QuoteProviderTrafficSwitchConfiguration => {
  switch (chainId) {
    case ChainId.mainnet:
      return {
        switchExactInPercentage: 100,
        samplingExactInPercentage: 0,
        switchExactOutPercentage: 100,
        samplingExactOutPercentage: 0,
      } as QuoteProviderTrafficSwitchConfiguration
    case ChainId.testnet:
      return {
        switchExactInPercentage: 100,
        samplingExactInPercentage: 0,
        switchExactOutPercentage: 100,
        samplingExactOutPercentage: 0,
      } as QuoteProviderTrafficSwitchConfiguration
    // If we accidentally switch a traffic, we have the protection to shadow sample only 0.1% of traffic
    default:
      return {
        switchExactInPercentage: 0.0,
        samplingExactInPercentage: 0.1,
        switchExactOutPercentage: 0.0,
        samplingExactOutPercentage: 0.1,
      } as QuoteProviderTrafficSwitchConfiguration
  }
}
