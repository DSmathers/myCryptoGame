import axios from 'axios'

type TrimmedCoin = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: bigint,
    market_cap: bigint,
    market_cap_rank: number,
    price_change_percentage_24h: number
}

export async function getTopTen(){
    let trimmedResponse:any = [];
    try {
        const {data:response} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&order=market_cap_desc')
            response.map((coin:TrimmedCoin) => {
                 let trimmedCoin = {
                    "id": coin.id, 
                    "market_cap_rank":coin.market_cap_rank, 
                    "image":coin.image,
                    "name": coin.name,
                    "symbol":coin.symbol,     
                    "current_price":coin.current_price,
                    "dayChange": coin.price_change_percentage_24h,
                    "market_cap":coin.market_cap
                } 
                trimmedResponse.push(trimmedCoin)
            })
            return trimmedResponse;
    } catch (error) {
        console.log(error)
    }
}