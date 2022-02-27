import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../Game'
import { getUserToken } from '../../../Services/Firebase/firebaseMethods';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Transaction = () => {
    const { purchaseCoin, userData, setUserData } = useUserContext();
    const [ currentPrice, setCurrentPrice ] = useState<number | undefined>();
    const [ purchaseAmount, setPurchaseAmount ] = useState<number>(0);
    const [ error, setError ] = useState<Error>()

    const navigate = useNavigate();

    const getPrice = async () => {
        await axios.get('https://api.coingecko.com/api/v3/coins/'+ purchaseCoin).then((res) => {
            return setCurrentPrice(res.data.market_data.current_price.usd);
        })
    }

    let maxPurchase = () => {
        if(userData && currentPrice)
        return userData?.wallet.usd / currentPrice
    }

    const setToTen = (e:React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault()
        let max:number = Number(maxPurchase()?.toFixed(8));
        setPurchaseAmount(max/10)
    }

    const setToTwentyFive = (e:React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault()
        let max:number = Number(maxPurchase()?.toFixed(8));
        setPurchaseAmount(max/4)
    }

    const setToFifty = (e:React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault()
        let max:number = Number(maxPurchase()?.toFixed(8));
        setPurchaseAmount(max/2)
    }

    const submitPurchaseRequest = async (e:React.FormEvent) => {
        e.preventDefault();
        let URL = process.env.REACT_APP_NEW_TRANSACTION_ENDPOINT;
        let token = await getUserToken();
        console.log(purchaseAmount.toFixed(8))
        if(!URL){return setError(new Error('Error fetching URL endpoint')) }
        if(!token){return setError(new Error('Error fetching auth token'))}
        await axios.patch(URL, ({data: {coinId: purchaseCoin, purchaseAmount: purchaseAmount, currencyUsed: 'usd'}}), ({headers: {authorization: token}})).then((res) => {
            if(res.status !== 200){setError(new Error('Error'))}
            setUserData(res.data);
            navigate('/wallet')
        }).catch((error) => {setError(error.message)})
    }
    

    useEffect(() => {
        getPrice()
    }, [])

  return (
      <>
    <div>Transaction</div>
    {error && <Alert variant="danger">{error.message}</Alert>}
    {purchaseCoin  && <><div>{purchaseCoin.toUpperCase()}</div>
    <div>Current Price: ${currentPrice?.toLocaleString()}</div>
    <div>USD Balance: ${userData?.wallet.usd.toLocaleString()}</div>
    <div>Max Purchase: {maxPurchase()?.toFixed(8)}</div>
    <div>
        <form onSubmit={submitPurchaseRequest}>
            <input type="number" min="0" max={maxPurchase()} step='.00000001' value={Number(purchaseAmount.toFixed(8))} onChange={(e) => {setPurchaseAmount(Number(e.target.value))}} id="purchaseAmount"/>
            <button onClick={setToTen}>10%</button> | <button onClick={setToTwentyFive}> 25% </button> | <button onClick={setToFifty}> 50% </button>
            <button type="submit">Submit</button>
        </form>
        <div>Total Price: ${currentPrice && (purchaseAmount * currentPrice).toLocaleString()}</div>
    </div></>}
  </>)
}

export default Transaction