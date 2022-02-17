import axios from 'axios';
import {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router';
import { FunctionExpression } from 'typescript';
import Loading from '../../Components/Loading';
import { User } from '../../Models/UserModel';
import { getUserToken } from '../../Services/Firebase/firebaseMethods';
import GameLayout from './layout_components/full_screen/GameLayout';
import GameLayoutMobile from './layout_components/mobile/GameLayoutMobile';

const Game = () => {
  const width = window.innerWidth;
  const breakpoint = 500;

  const [ userData, setUserData ] = useState<User | null>(null)
  const [ loading, setLoading ] = useState<boolean>();

  const addToWatchlist = async (coinId:string) => {
    const token = await getUserToken();
    if(!token){throw new Error('Authorization Error')}
    await axios.patch('http://192.168.0.4:8000/api/users/user/watchlist', ({data: coinId}), ({headers: {authorization: token}})).then((res) => {
    console.log(res.status)}).catch((error) => {throw new Error(error)}).finally(() => getUserData())
  };

  const getUserData = async () => {
    setLoading(true);
    let url = process.env.REACT_APP_GET_WATCHLIST
    const token = await getUserToken();
    if(!token){throw new Error('Authorization Failed')}
    if(!url){throw new Error('Failed to fetch watchlist data')}
    await axios.get(url, ({headers: {authorization: token}})).then((res) => {
      setUserData(res.data);
    }).finally(() => {setLoading(false)})
    }

    useEffect(() => {
      getUserData();
    }, [])

    const context = {
      userData,
      getUserData,
      addToWatchlist
    }


  return (
    width < breakpoint?<GameLayoutMobile userContext={context} />:<GameLayout userContext={context} />
  )
}

export default Game

interface UserContext {
  userData:User | null,
  getUserData: FunctionExpression,
  addToWatchlist: Function
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}


/* export const addToWatchlist = async (coinId:string) => {
  const token = await getUserToken();
  if(!token){throw new Error('Authorization Error')}
  await axios.patch('http://192.168.0.4:8000/api/users/user/watchlist', ({data: coinId}), ({headers: {authorization: token}})).then((res) => {
  console.log(res.status)}).catch((error) => {throw new Error(error)})
}; */

