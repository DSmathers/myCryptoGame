import React, { useState, useEffect, useRef } from 'react'
import { useUserContext } from '../Game';
import axios from 'axios'
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getUserToken } from '../../../Services/Firebase/firebaseMethods';


const SellCryptoScreen = () => {
    
    const { purchaseCoin, userData, setUserData } = useUserContext();
    const [ currentPrice, setCurrentPrice ] = useState<number | undefined>();
    const [ saleAmount, setSaleAmount ] = useState<number>(0);
    const [ error, setError ] = useState<Error>()
    const [ maxSaleAmount, setMaxSaleAmount ] = useState(0);
    const saleTotal = useRef<HTMLInputElement | null>()
    const balances:any = new Object(userData?.wallet);

    const navigate = useNavigate();

    const setSaleDefaultButtons = (e:React.KeyboardEvent | React.MouseEvent, percent:number) => {
        e.preventDefault();
        return setSaleAmount(maxSaleAmount*(percent/100))
    }

    const getPrice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/'+ purchaseCoin).then((res) => {
            return setCurrentPrice(res.data.market_data.current_price.usd);
        }).catch((err) => setError(err))
    }

    const getBalance = () => {
        let maxSale = 0
        return new Promise<number>((resolve, reject) => {
            try {
                for(let i in balances){
                    if(i === purchaseCoin){
                        maxSale = balances[i]
                    }
                } 
                resolve(maxSale)
            } catch (error) {
                reject(error)
            }
        })
    }

    const saleAmountSetter = (e:any) => {
        e.preventDefault()
        setSaleAmount(Number(e.target.value))
    }

    const handleSubmitSale = async (e:React.FormEvent) =>  {
        e.preventDefault()
        console.log(saleAmount)
        const token = await getUserToken();
        const URL = process.env.REACT_APP_NEW_SALE_ENDPOINT;
        if(!token || !URL){
            throw new Error('Error connecting with API')
        }
        axios.patch(URL, ({assetId: purchaseCoin, saleAmount: saleAmount}), ({headers: {authorization: token}})).then((res) => {
            if(res.status !== 200){
                throw new Error(res.statusText)
            }
            else{
                setUserData(res.data)
                return navigate('/wallet')
            }
        }).catch((err) => {setError(err.message)})
        
    }

    useEffect(() => {
        getBalance().then((res) => {
            setMaxSaleAmount(res)
        }).then(() => {
            getPrice()
        }).catch((err) => {
            setError(err)
        })
    }, [])

  return (
      <>{error?<Alert variant="danger">Oops, there seems to have been an error while loading the data. <Link to='/wallet'>Go To Wallet</Link></Alert>:
      <>
        <div>Sell {purchaseCoin?.toUpperCase()}</div>
        <div>Current Balance: {maxSaleAmount.toFixed(8)}</div>
        <div>Current Price: ${currentPrice?.toLocaleString()}</div>
        <form onSubmit={handleSubmitSale}>
            {saleTotal && <input type="number" max={maxSaleAmount} step=".00000001" id="sale_input" value={saleAmount} onChange={(e => {saleAmountSetter(e)})}/> }
            <div>Estimated Proceeds: ${currentPrice && (saleAmount * currentPrice).toLocaleString()}</div>
            <div><button onClick={(e) => setSaleDefaultButtons(e, 10)}>10%</button> | <button onClick={(e) => setSaleDefaultButtons(e, 25)}>25%</button> | <button onClick={(e) => setSaleDefaultButtons(e, 50)}>50%</button> | <button onClick={(e) => setSaleDefaultButtons(e, 100)}>MAX</button> </div>
            <button type="submit">Submit</button>
        </form>
        </> }
      </>
    
  )
}

export default SellCryptoScreen