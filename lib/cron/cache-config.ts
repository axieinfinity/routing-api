import { Protocol } from '@uniswap/router-sdk'
import { V2SubgraphProvider, V3SubgraphProvider } from '@axieinfinity/smart-order-router'
import { ChainId } from '../util/testNets'

export const v3TrackedEthThreshold = 0.01 // Pools need at least 0.01 of trackedEth to be selected
const v3UntrackedUsdThreshold = 25000 // Pools need at least 25K USD (untracked) to be selected (for metrics only)

export const v2TrackedEthThreshold = 0.025 // Pairs need at least 0.025 of trackedEth to be selected
const v2UntrackedUsdThreshold = Number.MAX_VALUE // Pairs need at least 1K USD (untracked) to be selected (for metrics only)

export const chainProtocols = [
  // V3.
  // TODO: Uncomment when mainnet subgraph is ready.
  // {
  //   protocol: Protocol.V3,
  //   chainId: ChainId.mainnet,
  //   timeout: 90000,
  //   provider: new V3SubgraphProvider(ChainId.mainnet, 3, 90000, true, v3TrackedEthThreshold, v3UntrackedUsdThreshold),
  // },

  {
    protocol: Protocol.V3,
    chainId: ChainId.testnet,
    timeout: 90000,
    provider: new V3SubgraphProvider(2021, 3, 90000, true, v3TrackedEthThreshold, v3UntrackedUsdThreshold),
  },

  // V2.
  // {
  //   protocol: Protocol.V2,
  //   chainId: ChainId.mainnet,
  //   timeout: 840000,
  //   provider: new V2SubgraphProvider(
  //     ChainId.mainnet,
  //     5,
  //     900000,
  //     true,
  //     1000,
  //     v2TrackedEthThreshold,
  //     v2UntrackedUsdThreshold
  //   ), // 1000 is the largest page size supported by thegraph
  // },

  {
    protocol: Protocol.V2,
    chainId: ChainId.testnet,
    timeout: 840000,
    provider: new V2SubgraphProvider(
      2021,
      5,
      900000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold
    ), // 1000 is the largest page size supported by thegraph
  },
]
