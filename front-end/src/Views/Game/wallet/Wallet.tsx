import axios from "axios";
import { useUserContext } from "../Game";
import React, { useLayoutEffect, useState } from 'react'

const Wallet = () => {
  const { userData, loading } = useUserContext();
  const walletObj:any = new Object(userData?.wallet);
  const [ walletInfo, setWalletInfo ] = useState<CryptoData>();


  interface CryptoData{
    total_value: number,
    coin_data: [{
      id: string,
      name: string,
      held: string,
      cur_price: number,
      held_value: number
    } | null]
  }

  const fetchKeys = (wallet:any) => {
    return new Promise<string[]>((res, rej) => {
      if(wallet){
        res(Object.keys(wallet))
      }
      else rej('Error Fetching Wallet Keys')
      
    })
  }

  const fetchAssetValues = async (keys:string[]) => {
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+keys+'&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    return await axios.get(url)
      .then((res) => {return res.data})
      .catch((error) => {throw new Error(error.message)})
  }

  const walletValue = (resData:any) => {
    return new Promise<CryptoData>((res,rej) => {
      try {
        let cryptoData:CryptoData = {
          total_value: 0,
          coin_data: [null]
        }
        for(let i in walletObj){
          for(let j in resData){
            if(i === resData[j].id){
              cryptoData.total_value += (walletObj[i]*resData[j].current_price)
              cryptoData.coin_data.push({
                id: resData[j].id,
                name: resData[j].name,
                held: walletObj[i].toFixed(8),
                cur_price: resData[j].current_price,
                held_value: (walletObj[i]*resData[j].current_price)
                });
              }
            }
          }
        res(cryptoData)
      } catch (error) {
        console.log(error)
      }
    })
  }

  const calculateAssetBalances = () => {
    fetchKeys(userData?.wallet).then((keys) => {
      fetchAssetValues(keys).then((resData) => {
        walletValue(resData).then((data) => {
          setWalletInfo(data);
        });
      });
    }).catch((error) => {
      throw new Error(error);
    });
  };

  useLayoutEffect(() => {
    console.log('layout effect fired')
      if(userData !== null)calculateAssetBalances()
  }, [userData])

  return(
      <>
        {userData && <div>Available: ${userData.wallet.usd.toLocaleString()}</div>}
        {userData && walletInfo && <div>Total Portfolio Value: ${(userData.wallet.usd + walletInfo?.total_value).toLocaleString()}</div>}
      
        <div>
          {walletInfo && <div>Total Crypto Holdings: ${walletInfo.total_value.toLocaleString()}</div> }
          {loading===true||loading===undefined?<div>Loading</div>:
            walletInfo && walletInfo.coin_data.map((i) => {
              if(i){
                return(
                  <div key={i?.name} id={i.id} style={{border: '1px solid black', margin: '2px auto', textAlign: 'center', maxWidth: '60%'}} onClick={(e:React.MouseEvent) => console.log('clicked: ' + e.currentTarget.id)}>
                    <div>{i?.name}</div>
                    <div>Total Held: {i?.held}</div>
                    <div>Current Price: ${i?.cur_price.toLocaleString()}</div>
                    <div>Position Value: ${i?.held_value.toLocaleString()}</div>
                  </div>
                )
              }
            })
          }
        </div>
      </>
  );
};

export default Wallet;
