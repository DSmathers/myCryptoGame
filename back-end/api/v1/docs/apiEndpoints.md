

# Add New User
`POST /api/v1/users/new-user`

# Get Supported Coins Data
## Returns market data for supported coins. 

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

# Get Selected Coin Details 
## Returns details for selected coin. 

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
  market_cap_rank: 1,
  market_data: {
    current_price: 38456,
    ath: 69045,
    ath_change_percentage: -44.26786,
    ath_date: '2021-11-10T14:24:11.849Z',
    market_cap: 729445776350,
    market_cap_rank: undefined,
    total_volume: 17026630071,
    high_24h: 39668,
    low_24h: 38254,
    price_change_24h: -1007.5428936914,
    price_change_percentage_24h: -2.55312,
    price_change_percentage_7d: -1.62342,
    price_change_percentage_14d: -4.32206,
    price_change_percentage_30d: 3.65014,
    price_change_percentage_60d: -16.28808,
    price_change_percentage_200d: -13.64977,
    price_change_percentage_1y: -21.66596,
    market_cap_change_24h: -18751384506.013,
    market_cap_change_percentage_24h: -2.50621
  },
  last_updated: '2022-03-06T23:50:36.193Z'
}
````


