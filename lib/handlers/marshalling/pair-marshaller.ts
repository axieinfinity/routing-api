import { CustomPair } from '@sky-mavis/katana-core'
import { CurrencyAmountMarshaller, MarshalledCurrencyAmount } from './currency-amount-marshaller'
import { Protocol } from '@uniswap/router-sdk'
import { Pair } from '@uniswap/v2-sdk'

export interface MarshalledPair {
  protocol: Protocol
  currencyAmountA: MarshalledCurrencyAmount
  tokenAmountB: MarshalledCurrencyAmount
}

export class PairMarshaller {
  public static marshal(pair: Pair): MarshalledPair {
    return {
      protocol: Protocol.V2,
      currencyAmountA: CurrencyAmountMarshaller.marshal(pair.reserve0),
      tokenAmountB: CurrencyAmountMarshaller.marshal(pair.reserve1),
    }
  }

  public static unmarshal(marshalledPair: MarshalledPair): Pair {
    return new CustomPair(
      CurrencyAmountMarshaller.unmarshal(marshalledPair.currencyAmountA),
      CurrencyAmountMarshaller.unmarshal(marshalledPair.tokenAmountB)
    )
  }
}
