export interface Coins {
    current_price: number,
    dayChange: number,
    id: string,
    image: string,
    market_cap: bigint,
    market_cap_rank: number,
    name: string,
    symbol: string
  }


  export interface CoinDetails {
    name: string,
    price: number,
    market_cap: number,
  }