
# User Control Endpoints

## Add New User

`POST /api/v1/users/new-user`

## Add to watchlist

`PATCH api/v1/users/user/addToWatchlist`



## Remove from watchlist

`PATCH api/v1/users/user/addToWatchlist`

## Buy Cryptocurrency with USD

`PATCH api/v1/users/user/addToWatchlist`

## Sell Cryptocurrency for USD

`PATCH api/v1/users/user/addToWatchlist`




# Market Data Endpoints

## Get data on all supported coins. 

 `GET /api/v1/coins/getSupported`

Example response object:

````JavaScript
{
    ath: 69045
    ath_change_percentage: -43.70372
    ath_date: "2021-11-10T14:24:11.849Z"
    atl: 67.81
    atl_change_percentage: 57222.23816
    atl_date: "2013-07-06T00:00:00.000Z"
    circulating_supply: 18974562
    current_price: 38972
    fully_diluted_valuation: 817504308663
    high_24h: 42659
    id: "bitcoin"
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    last_updated: "2022-03-04T22:59:28.471Z"
    low_24h: 38760
    market_cap: 738656485237
    market_cap_change_24h: -69771158273.30579
    market_cap_change_percentage_24h: -8.63048
    market_cap_rank: 1
    max_supply: 21000000
    name: "Bitcoin"
    price_change_24h: -3596.958760005517
    price_change_percentage_24h: -8.44973
    roi: null
    symbol: "btc"
    total_supply: 21000000
    total_volume: 24283459397
}
````

 
## Get market details on selected coin.
> :selectedCoinId must be a supported cryptocurrency.  

`GET api/v1/coins/getSelected/:selectedCoinId`

Example Response Object: 

```` JavaScript
{
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  description: '<Description redacated to save space. Returns up to multiple paragraphs about the selected cryptocurrency>',
  image: {
    thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
    large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
  },
  market_cap_rank: 4,
  market_data: {
    current_price: 374.96,
    ath: 686.31,
    ath_change_percentage: -45.44103,
    ath_date: '2021-05-10T07:24:17.097Z',
    market_cap: 62922769046,
    market_cap_rank: undefined,
    total_volume: 667992692,
    high_24h: 387.05,
    low_24h: 373.94,
    price_change_24h: -11.728030311706,
    price_change_percentage_24h: -3.03297,
    price_change_percentage_7d: 3.78139,
    price_change_percentage_14d: -1.73453,
    price_change_percentage_30d: -6.27337,
    price_change_percentage_60d: -21.32326,
    price_change_percentage_200d: -6.5222,
    price_change_percentage_1y: 65.42972,
    market_cap_change_24h: -2042354067.6193,
    market_cap_change_percentage_24h: -3.14377,
    total_supply: 168137035.9,
    max_supply: 168137035.9,
    circulating_supply: 168137035.9
  },
  last_updated: '2022-03-07T00:39:09.914Z'
}
````


