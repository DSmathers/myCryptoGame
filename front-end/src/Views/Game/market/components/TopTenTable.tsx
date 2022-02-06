import axios from 'axios';
import {useState, useEffect} from 'react';
import { Coins } from '../../../../Models/Coins';
import Coin from './Coin';


const TopTenTable = () => {
    const [ coins, setCoins ] = useState<Coins[]>()
    const [ error, setError ] = useState(false)

    //Timeout function to set intervals between API calls and update watchlist.
    const [ timeInterval, setTimeInterval ] = useState(0);

    // URL Endpoint for relevant data /API/markets/get-top-ten
    let url: string | undefined = process.env.REACT_APP_TOP_TEN_ENDPOINT;


    setTimeout(() => {
        setTimeInterval(timeInterval + 1)
    }, 30000);

    useEffect(() => {
        if(!url){throw new Error("API Fetch Unsucessful")}
        axios
            .get(url)
            .then(res => {
                setCoins(res.data)
                if(res.status !== 200){
                    setError(true)
                }
            })
            .catch(err => {
                setError(err);
                console.log(err)
            })
    }, [timeInterval, error, url])
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
        {coins && coins.map(coin => {
            return(
                <tr key={coin.id + 'row'}>
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
