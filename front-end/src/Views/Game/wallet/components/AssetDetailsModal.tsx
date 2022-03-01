import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useUserContext } from '../../Game'

interface ModalParams{
    selectedCoin: string,
    setSelectedCoin: React.Dispatch<React.SetStateAction<null | string>>,
    walletBalance: number
};


const AssetDetailsModal = ({selectedCoin, setSelectedCoin, walletBalance}:ModalParams) => {
    const navigate = useNavigate();
    const { setPurchaseCoin } = useUserContext()
    const [ coinData, setCoinData ] = useState<any>()


    const handleBuy = (e:React.KeyboardEvent | React.MouseEvent) => {
        setPurchaseCoin(selectedCoin);
        setSelectedCoin(null);
        return navigate('/trade/buy')
    }

    const handleSell = (e:React.KeyboardEvent | React.MouseEvent) => {
        setPurchaseCoin(selectedCoin);
        setSelectedCoin(null)
        return navigate('/trade/sell')
    }

    console.log(coinData)
    const getCoinDetails = () => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`)
        .then((res) => {
            if(!res || res.status!==200){
                throw new Error(res.statusText)
            }
            else return setCoinData(res.data)
        })
        .catch((err) => {
            throw new Error(err.message)
        })
    }

  return (
    <Modal fullscreen centered show={selectedCoin?true:false} onShow={() => getCoinDetails()} onHide={() => {setSelectedCoin(null)}}>
        <Modal.Header closeButton>
            <img src={coinData?.image.small} /><p>{coinData?.symbol.toUpperCase()} | {coinData?.name}</p>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div>Currently Held: {walletBalance}</div>
                <div>Current Price: ${coinData?.market_data.current_price.usd.toLocaleString()}</div>
                <div>Position Value: ${coinData && (walletBalance * coinData?.market_data.current_price.usd).toLocaleString()}</div>
                <div>Market Data</div>
                <div>Last Updated: {new Date(coinData?.last_updated).toLocaleTimeString()}, {new Date(coinData?.last_updated).toLocaleDateString()}</div>
                
                <div>24H Low: ${coinData?.market_data.low_24h.usd.toLocaleString()}</div>
                <div>24H High: ${coinData?.market_data.high_24h.usd.toLocaleString()}</div>
                <div>Price Change 24h: ${coinData?.market_data.price_change_24h_in_currency.usd.toFixed(2)}</div>
                <div>1 Hour: {coinData?.market_data.price_change_percentage_1h_in_currency.usd.toLocaleString()}% </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
            <div>${coinData?.market_data.current_price.usd.toLocaleString()} </div>
            <Button onClick={handleBuy}>Buy</Button><Button onClick={handleSell}>Sell</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AssetDetailsModal