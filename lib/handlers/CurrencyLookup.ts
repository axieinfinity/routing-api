import { ITokenListProvider, ITokenProvider } from '@axieinfinity/smart-order-router'
import Logger from 'bunyan'
import { isAddress } from '../util/isAddress'

import {
  Ether,
  NativeCurrency,
  Currency,
  Token,
} from '@uniswap/sdk-core';
import { ChainId } from '../util/testNets'

export enum NativeCurrencyName {
  RON = 'RON',
}

export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.testnet]: [
    'RON',
    'RON',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
};

export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrencyName } = {
  [ChainId.testnet]: NativeCurrencyName.RON,
};

export const WRAPPED_NATIVE_CURRENCY = {
  [ChainId.testnet]: new Token(
    1,
    '0xa959726154953bae111746e265e6d754f48570e6',
    18,
    'WRON',
    'Wrapped Ron'
  ),
};
export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WRAPPED_NATIVE_CURRENCY) {
      return WRAPPED_NATIVE_CURRENCY[2021];
    }
    throw new Error('Unsupported chain ID');
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};

export function nativeOnChain(chainId: number): NativeCurrency {
  if (cachedNativeCurrency[chainId] != undefined) {
    return cachedNativeCurrency[chainId]!;
  }
    cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);
  return cachedNativeCurrency[chainId]!;
}

/**
 * CurrencyLookup searches native tokens, token lists, and on chain to determine
 * the token details (called Currency by the sdk) for an inputted string.
 */
export class CurrencyLookup {
  constructor(
    private readonly tokenListProvider: ITokenListProvider,
    private readonly tokenProvider: ITokenProvider,
    private readonly log: Logger
  ) {}

  public async searchForToken(tokenRaw: string, chainId: number): Promise<Currency | undefined> {
    const nativeToken = this.checkIfNativeToken(tokenRaw, chainId)
    if (nativeToken) {
      return nativeToken
    }

    // At this point, we know this is not a NativeCurrency based on the check above, so we can explicitly cast to Token.
    const tokenFromTokenList: Token | undefined = await this.checkTokenLists(tokenRaw)
    if (tokenFromTokenList) {
      return tokenFromTokenList
    }

    return await this.checkOnChain(tokenRaw)
  }

  checkIfNativeToken = (tokenRaw: string, chainId: number): Currency | undefined => {
    if (!NATIVE_NAMES_BY_ID[chainId] || !NATIVE_NAMES_BY_ID[chainId].includes(tokenRaw)) {
      return undefined
    }

    const nativeToken = nativeOnChain(chainId)
    this.log.debug(
      {
        tokenAddress: nativeToken.wrapped.address,
      },
      `Found native token ${tokenRaw} for chain ${chainId}: ${nativeToken.wrapped.address}}`
    )
    return nativeToken
  }

  checkTokenLists = async (tokenRaw: string): Promise<Token | undefined> => {
    let token: Token | undefined = undefined
    if (isAddress(tokenRaw)) {
      token = await this.tokenListProvider.getTokenByAddress(tokenRaw)
    }

    if (!token) {
      token = await this.tokenListProvider.getTokenBySymbol(tokenRaw)
    }

    if (token) {
      this.log.debug(
        {
          tokenAddress: token.wrapped.address,
        },
        `Found token ${tokenRaw} in token lists.`
      )
    }

    return token
  }

  checkOnChain = async (tokenRaw: string): Promise<Token | undefined> => {
    this.log.debug(`Getting input token ${tokenRaw} from chain`)

    // The ITokenListProvider interface expects a list of addresses to lookup tokens.
    // If this isn't an address, we can't do the lookup.
    // https://github.com/Uniswap/smart-order-router/blob/71fac1905a32af369e30e9cbb52ea36e971ab279/src/providers/token-provider.ts#L23
    if (!isAddress(tokenRaw)) {
      return undefined
    }

    const tokenAccessor = await this.tokenProvider.getTokens([tokenRaw])
    return tokenAccessor.getTokenByAddress(tokenRaw)
  }
}
