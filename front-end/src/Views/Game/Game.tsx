import axios from 'axios';
import {useState, useLayoutEffect} from 'react'
import { useOutletContext } from 'react-router';
import { User } from '../../Models/UserModel';
import { getUserToken } from '../../Services/Firebase/firebaseMethods';
import GameLayout from './layout_components/full_screen/GameLayout';
import GameLayoutMobile from './layout_components/mobile/GameLayoutMobile';

const Game = () => {
  const width = window.innerWidth;
  const breakpoint = 500;


  const [ userContext, setUserContext ] = useState<User | null>(null)
  const [ loading, setLoading ] = useState<boolean>();

  const getUserData = async () => {
    let url = process.env.REACT_APP_GET_WATCHLIST
    const token = await getUserToken();
    if(!token){throw new Error('Authorization Failed')}
    if(!url){throw new Error('Failed to fetch watchlist data')}
    await axios.get(url, ({headers: {authorization: token}})).then((res) => {
      setUserContext(res.data);
    }).finally(() => {setLoading(false)})
    }

    useLayoutEffect(() => {
      setLoading(true);
      getUserData();
    }, [])



  return (
    width < breakpoint?<GameLayoutMobile userContext={userContext} />:<GameLayout userContext={userContext} />
  )
}

export default Game

export function useUserContext() {
  return useOutletContext<User>();
}