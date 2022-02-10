import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router';


const CoinDetailsModal = ({ selectedCoin, setSelectedCoin }:any) => {
   const [ coinData, setCoinData ]: null | any = useState(null);
   const navigate = useNavigate();

    const getCoinDetails = async() => {
        await axios.get('https://api.coingecko.com/api/v3/coins/'+selectedCoin).then((res) => {
            if(res.status === 200){
                setCoinData(res.data);  
                //console.log(res.data)
                //console.log(res.data.market_data)
            }
            else {throw new Error(res.statusText)}
            
        }).catch((error) => {
            throw new Error(error)
        });
    };

    const getDate = (dateString:Date) => {
        return new Date(dateString);
    }

   

    // Note to self: This is the text description of the selected cryptocurrency. I needed
    // to use (i think) a weird method (to me) to make the <a> tags actually render... 
    const parser = new DOMParser();
    let parsed = parser.parseFromString(coinData?.description.en, "text/html")
    let coinDescription = <p dangerouslySetInnerHTML={{ __html: parsed.body.innerHTML}}></p>

  return (
    <Modal show={selectedCoin?true:false} fullscreen centered onShow={()=>{getCoinDetails()}} onHide={()=>{setSelectedCoin(null)}}>
        <Modal.Header closeButton>
            <h4 style={{margin: "auto"}}>
                {coinData?.symbol.toUpperCase()} ${coinData?.market_data.current_price.usd.toLocaleString()}
            </h4>
        </Modal.Header>
            
        <Modal.Body style={{overflowY: 'auto'}}>

            {coinData?<>
            <section id="selectedCoin_topSection">
                <p>{coinData?.name} price</p>
                <p>${coinData?.market_data.current_price.usd.toLocaleString()}</p>
                <p>${coinData?.market_data.price_change_24h_in_currency.usd.toLocaleString()} ({coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%)</p>
            </section>

            <section id="selectedCoin_priceChart">
                // Price Chart Box / Div Goes Here //
                <canvas id="selectedCoin_chart"></canvas>
            </section>

            <section id="selected_coin_overview">
                {/* TOO: Add a read more button to expand/shrink this description for a better UX */}
                <header className="selectedCoinModal_section_header" id="selectedCoinModal_AboutSection_header">About {coinData?.name}</header>
                {/* The parsed html string mentioned above.(Text details about selected currency) */}
                {coinDescription}    
            </section>

            <section id="selectedCoin_marketData">
            <header id="selectedCoinModal_MarketSection_header">Market Data</header>
            {coinData?.market_data.market_cap.usd && <p>Market Cap: ${coinData?.market_data.market_cap.usd.toLocaleString()}</p>}
            {coinData?.market_data.ath.usd && <p>All Time High: ${coinData?.market_data.ath.usd.toLocaleString()}</p>}
            {coinData?.market_data.ath_date.usd && <p>All Time High Date: {getDate(coinData.market_data.ath_date.usd).toLocaleDateString()}</p>}
            {coinData?.market_data.circulating_supply && <p>Circulating Supply: {coinData.market_data.circulating_supply.toLocaleString()}</p>}
            {coinData?.market_data.total_supply && <p>Max Supply: {coinData.market_data.total_supply.toLocaleString()}</p>}
            </section>
            
            </>:<>Loading....</>}
            
        </Modal.Body>

        <Modal.Footer>
            <Button variant="">Add to Watchlist</Button><Button onClick={() => navigate('/')} variant="danger">Trade</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default CoinDetailsModal;
