import Header from "../Components/Main_Header/Header";
import axios from 'axios'
import { useEffect, useState } from 'react'

const Main = () => {

  interface Coins {
    current_price: number,
    dayChange: number,
    id: string,
    image: string,
    market_cap: bigint,
    market_cap_rank: number,
    name: string,
    symbol: string
  }

  

  let [sampleArray, setSampleArray ] = useState<Coins[]>();
  useEffect(() => {
    axios.get('http://localhost:8000/API/markets/get-top-ten').then((res) => {
    console.log(res.data)
    setSampleArray(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
  }, [])

  return(
    <>
    <Header />
    {sampleArray && sampleArray.map((i) => {
      return <div key={i.id}>{i.symbol}</div>
    })}
    </>
  )
};

export default Main;
