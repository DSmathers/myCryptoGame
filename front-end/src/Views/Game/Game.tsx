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
    const url = process.env.REACT_APP_ADD_TO_WATCHLIST_ENDPOINT
    if(!token){throw new Error('Authorization Error')}
    if(!url){throw new Error('Error fetching URL')}
    await axios.patch(url, ({data: coinId}), ({headers: {authorization: token}})).then((res) => {
    console.log(res.status)}).catch((error) => {throw new Error(error)}).finally(() => getUserData())
  };

  const removeFromWatchlist = async (coinId:string) => {
    const token = await getUserToken();
    const url = process.env.REACT_APP_RM_FROM_WATCHLIST_ENDPOINT
    if(!token){throw new Error('Authorization Error')}
    if(!url){throw new Error('URL fetch unsuccessful')}
    await axios.patch(url, ({data: coinId}), ({headers: {authorization: token}})).then((res) => {
    console.log(res.status)}).catch((error) => {throw new Error(error)}).finally(() => getUserData())
  };

  const getUserData = async () => {
    setLoading(true);
    let url = process.env.REACT_APP_GET_USER
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
      addToWatchlist,
      removeFromWatchlist
    }


  return (
    width < breakpoint?<GameLayoutMobile userContext={context} />:<GameLayout userContext={context} />
  )
}

export default Game

interface UserContext {
  userData:User | null,
  getUserData: FunctionExpression,
  addToWatchlist: Function,
  removeFromWatchlist: Function
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}



