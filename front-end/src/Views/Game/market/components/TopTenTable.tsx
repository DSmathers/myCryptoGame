import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap';
import { Coins } from '../../../../Models/Coins';
import Coin from './Coin';


const TopTenTable = ({setSelectedCoin}:any) => {
    const [ coins, setCoins ] = useState<Coins[]>()
    const [ error, setError ] = useState<Error>()

    const handleCoinSelect = (e:React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        return setSelectedCoin(e.currentTarget.id);
    }

    useEffect(() => {
        fetchTopTen();
        let timer = setInterval(fetchTopTen, 30000)
        function fetchTopTen(){
            // URL Endpoint for relevant data /API/markets/get-top-ten
            let url: string | undefined = process.env.REACT_APP_TOP_TEN_ENDPOINT;
            if(!url){throw new Error("URL not defined.")}
            const unsub = axios
                .get(url)
                .then(res => {
                    setCoins(res.data)
                    if(res.status !== 200){
                        clearInterval(timer)
                        setError(new Error('Error getting data from API.'))
                    }
                })
                .catch(err => {
                    setError(err);
                    console.log(err);
                    clearInterval(timer);
                });
        };
        return () => clearInterval(timer);
    }, [])


  return (
      <table id="market_table">
          <thead>
            <tr>
                <th>Rank</th>
                <th>Asset</th>
                <th>Price</th>
                <th>Day Change</th>
                <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
              {error && <Alert variant="danger">{error.message}</Alert>}
        {coins && coins.map(coin => {
            return(
                <tr key={coin.id + 'row'} onClick={handleCoinSelect} id={coin.id} className="market_table_row">
                    <Coin
                        id={coin.id}
                        current_price={coin.current_price}
                        market_cap={coin.market_cap}
                        market_cap_rank={coin.market_cap_rank}
                        image={coin.image}
                        dayChange={coin.dayChange}
                        name={coin.name}
                        symbol={coin.symbol}
                    />
                </tr>
            )
        })}
        </tbody>
      </table>
  );
};

export default TopTenTable;
