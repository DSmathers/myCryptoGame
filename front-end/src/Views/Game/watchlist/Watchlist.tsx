import { useUserContext } from '../Game'

const Watchlist = () => {
  const { userData } = useUserContext();
  
  return ( 
    <>
      <h2>Watchlist Tab</h2>
      {userData?.watchlist?.map((coin) => {
        return <p key={coin}>{coin}</p>
      })}
    </>
  )
}

export default Watchlist;
