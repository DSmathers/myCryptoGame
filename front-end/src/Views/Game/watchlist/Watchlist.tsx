import React from 'react';
import { useUserContext } from '../Game'

const Watchlist = () => {
  const { userData, removeFromWatchlist } = useUserContext();
  const handleRemoveFromWatchlist = (e:React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    return removeFromWatchlist(e.currentTarget.id)
  }
  
  return ( 
    <>
      <h2>Watchlist Tab</h2>
      {userData?.watchlist?.map((coin) => {
        return <p key={coin}>{coin} <button onClick={handleRemoveFromWatchlist} id={coin}>Remove</button></p>
      })}
    </>
  )
}

export default Watchlist;
