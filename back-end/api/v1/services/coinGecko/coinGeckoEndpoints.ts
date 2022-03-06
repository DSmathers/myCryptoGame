import axios from 'axios'

const supportedCoinsList = ["bitcoin", "ethereum", "tether", "binancecoin","ripple",
"terra-luna","solana","cardano","avalanche-2","polkadot","dogecoin","shiba-inu",
"matic-network","crypto-com-chain","cosmos","litecoin","near",
"chainlink","ftx-token","tron","bitcoin-cash","algorand","leo-token","okb",
"fantom","stellar","hedera-hashgraph","uniswap","internet-computer","ethereum-classic","decentraland",
"axie-infinity","vechain","osmosis","the-sandbox","filecoin","monero",
"elrond-erd-2","klay-token","theta-token","frax","tezos"]


export const getSupportedCoinsData = async (coins:string[] = supportedCoinsList) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${[...coins]}&order=market_cap_desc&per_page=25&page=1&sparkline=false`
    let responseData = await axios.get(url);
    return responseData;
}


export const getSelectedCoinDetails = async (coin:string) => {
    if(supportedCoinsList.indexOf(coin) === -1){
        return new Error('Selected Coin Not Currently Supported.')
    }
    const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    let responseData = await axios.get(url);
    const responseObject = {
        "id": responseData.data.id,
        "symbol": responseData.data.symbol,
        "name": responseData.data.name,
        "description": responseData.data.description.en,
        "image": responseData.data.image,
        "market_cap_rank": responseData.data.market_cap_rank,
        "market_data": {
            "current_price": responseData.data.market_data.current_price.usd,
            "ath": responseData.data.market_data.ath.usd,
            "ath_change_percentage": responseData.data.market_data.ath_change_percentage.usd,
            "ath_date": responseData.data.market_data.ath_date.usd,
            "market_cap": responseData.data.market_data.market_cap.usd,
            "market_cap_rank": responseData.data.market_data.market_cap_rank.usd,
            "total_volume": responseData.data.market_data.total_volume.usd,
            "high_24h": responseData.data.market_data.high_24h.usd,
            "low_24h": responseData.data.market_data.low_24h.usd,
            "price_change_24h": responseData.data.market_data.price_change_24h,
            "price_change_percentage_24h": responseData.data.market_data.price_change_percentage_24h,
            "price_change_percentage_7d": responseData.data.market_data.price_change_percentage_7d,
            "price_change_percentage_14d": responseData.data.market_data.price_change_percentage_14d,
            "price_change_percentage_30d": responseData.data.market_data.price_change_percentage_30d,
            "price_change_percentage_60d": responseData.data.market_data.price_change_percentage_60d,
            "price_change_percentage_200d": responseData.data.market_data.price_change_percentage_200d,
            "price_change_percentage_1y": responseData.data.market_data.price_change_percentage_1y,
            "market_cap_change_24h": responseData.data.market_data.market_cap_change_24h,
            "market_cap_change_percentage_24h": responseData.data.market_data.market_cap_change_percentage_24h
        },
        "last_updated": responseData.data.last_updated
    }

    console.log(responseObject)
    return responseData.data;
}
