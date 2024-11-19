import { ChainId } from '@sky-mavis/katana-core'
import {
  CachingTokenListProvider,
  ITokenListProvider,
  ITokenProvider,
  NodeJSCache,
} from '@sky-mavis/smart-order-router'
import NodeCache from 'node-cache'

// const TOKEN_LIST_CACHE = new NodeCache({ stdTTL: 600, useClones: false })

const DEFAULT_TEMPLATE = {
  "name": "Uniswap Labs Default",
  "timestamp": "2024-11-18T15:56:01.725Z",
  "version": {
    "major": 12,
    "minor": 26,
    "patch": 0
  },
  "tags": {},
  "logoURI": "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
  "keywords": [
    "uniswap",
    "default"
  ],
  "tokens": [
    {
      "chainId": 1,
      "address": "0x3E5A19c91266aD8cE2477B91585d1856B84062dF",
      "name": "Ancient8",
      "symbol": "A8",
      "decimals": 18,
      "logoURI": "https://assets.coingecko.com/coins/images/39170/standard/A8_Token-04_200x200.png?1720798300"
    },
  ]
}

export class AWSTokenListProvider extends CachingTokenListProvider {
  public static async fromTokenListS3Bucket(
    chainId: ChainId,
    // bucket: string,
    // tokenListURI: string
  ): Promise<ITokenListProvider & ITokenProvider> {
    // const s3 = new S3({ correctClockSkew: true, maxRetries: 3 })
    // const cachedTokenList = TOKEN_LIST_CACHE.get<TokenList>(tokenListURI)
    const tokenCache = new NodeCache({ stdTTL: 360, useClones: false })
    return super.fromTokenList(chainId, DEFAULT_TEMPLATE, new NodeJSCache(tokenCache))

    // if (cachedTokenList) {
    //   log.info(`Found token lists for ${tokenListURI} in local cache`)
    //   return super.fromTokenList(chainId, DEFAULT_TEMPLATE, new NodeJSCache(tokenCache))
    // }

    // try {
    //   log.info(`Getting tokenLists from s3.`)
    //   const tokenListResult = await s3.getObject({ Key: encodeURIComponent(tokenListURI), Bucket: bucket }).promise()

    //   const { Body: tokenListBuffer } = tokenListResult

    //   if (!tokenListBuffer) {
    //     return super.fromTokenListURI(chainId, tokenListURI, new NodeJSCache(tokenCache))
    //   }

    //   const tokenList = JSON.parse(tokenListBuffer.toString('utf-8')) as TokenList

    //   log.info(`Got both tokenLists from s3. ${tokenList.tokens.length} tokens in main list.`)

    //   TOKEN_LIST_CACHE.set<TokenList>(tokenListURI, tokenList)

    //   return new CachingTokenListProvider(chainId, tokenList, new NodeJSCache(tokenCache))
    // } catch (err) {
    //   log.info({ err }, `Failed to get tokenLists from s3.`)
    //   return super.fromTokenListURI(chainId, tokenListURI, new NodeJSCache(tokenCache))
    // }
  }
}
