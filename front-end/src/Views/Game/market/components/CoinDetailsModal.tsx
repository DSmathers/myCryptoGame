import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { useState } from 'react'


const CoinDetailsModal = ({ selectedCoin, setSelectedCoin }:any) => {
   const [ coinData, setCoinData ]: null | any = useState(null);
  
    const getCoinDetails = async() => {
        await axios.get('https://api.coingecko.com/api/v3/coins/'+selectedCoin).then((res) => {
            if(res.status === 200){
                setCoinData(res.data);  
                console.log(res.data.market_data)
            }
            else {throw new Error(res.statusText)}
            
        }).catch((error) => {
            throw new Error(error)
        });
    };

    // Note to self: This is the text description of the selected cryptocurrency. I needed
    // to use (i think) a weird method (to me) to make the <a> tags actually render... 
    const parser = new DOMParser();
    let parsed = parser.parseFromString(coinData?.description.en, "text/html")
    let justHoldingThisHere = <p dangerouslySetInnerHTML={{ __html: parsed.body.innerHTML}}></p>

  return (
    <Modal show={selectedCoin?true:false} fullscreen='lg-down' centered onShow={()=>{getCoinDetails()}} onHide={()=>{setSelectedCoin(null)}}>
        <Modal.Header closeButton>
        
            {coinData? 
            <div>
                <p>{coinData?.name} price</p>
                <p>${coinData?.market_data.current_price.usd.toLocaleString()}</p>
                <p>${coinData?.market_data.price_change_24h_in_currency.usd.toLocaleString()} ({coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%)</p>
            </div>:<></>}
        </Modal.Header>
        <Modal.Body style={{overflowY: 'auto'}}>
            <div>
                // Price Chart Box / Div Goes Here //
            </div>
            <div> // Market Data Section Goes Here // 
            {/* Market Data Values
                TODO: Decide which values to add for initial launch and make it pretty.
                can always add more later.  */}
            
            </div>
            <div>
                {/* The parsed html string mentioned above.(Text details about selected currency) */}
                {justHoldingThisHere}    
            </div>
            

        </Modal.Body>
        <Modal.Footer>
            // Buy / Sell / Trade Links Go Here //
        </Modal.Footer>
    </Modal>
  );
};

export default CoinDetailsModal;
