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

  let url: string | undefined = process.env.REACT_APP_TOP_TEN_ENDPOINT;

  let [sampleArray, setSampleArray ] = useState<Coins[]>();
  useEffect(() => {
    if(!url){throw 'api address not defined'}
    axios.get(url).then((res) => {
    console.log(res.data)
    setSampleArray(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
  }, [])

  return(
    <>
    {sampleArray && sampleArray.map((i) => {
      return (
      <div key={i.id}>
        <p>{i.name}</p>
        <p>{i.current_price}</p>
        <p>{i.dayChange}</p>
      </div>)
    })}
    </>
  )
};

export default Main;
