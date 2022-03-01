import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useOutletContext } from 'react-router';
import { User } from '../../Models/UserModel';
import { getUserToken, NEWgetUserToken } from '../../Services/Firebase/firebaseMethods';
import GameLayout from './layout_components/full_screen/GameLayout';
import GameLayoutMobile from './layout_components/mobile/GameLayoutMobile';

const Game = () => {
  const width = window.innerWidth;
  const breakpoint = 500;

  const [ userData, setUserData ] = useState<User | null>(null);
  const [ purchaseCoin, setPurchaseCoin ] = useState('')
  const [ loading, setLoading ] = useState<boolean>();


  const NEWaddToWatchlist= (coinId:string) => {
    const url = process.env.REACT_APP_ADD_TO_WATCHLIST_ENDPOINT
    if(!url){
      throw new Error('Error fetching API endpoint')
    }
    else NEWgetUserToken().then((token) => {
      axios.patch(url, ({data: coinId}), ({headers: {authorization: token}}))
        .then((res) => {
          if(res.status === 200){
            return console.log('success')
          } else throw new Error(res.statusText)
        })
        .catch((err) => {
          return console.log(err)
        })
        .finally(() => {
          setLoading(false);
          return getUserData()
        })
    })
  }

 

  const addToWatchlist = async (coinId:string) => {
    const token = await getUserToken();
    const url = process.env.REACT_APP_ADD_TO_WATCHLIST_ENDPOINT
    if(!token){throw new Error('Authorization Error')}
    if(!url){throw new Error('Error fetching URL')}
    await axios.patch(url, ({data: coinId}), ({headers: {authorization: token}}))
      .then((res) => {
        console.log(res.status)})
      .catch((error) => {throw new Error(error)})
      .finally(() => getUserData())
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
    axios.get(url, ({headers: {authorization: token}}))
      .then((res) => {
        return setUserData(res.data);
    }).catch((err) => {
      throw new Error(err)
    }).finally(() => {
      return setLoading(false)
      })
    }


    useEffect(() => {
      getUserData();
    }, [])

    const context = {
      userData,
      getUserData,
      setUserData,
      addToWatchlist,
      NEWaddToWatchlist,
      removeFromWatchlist,
      setPurchaseCoin,
      purchaseCoin,
      loading,
      setLoading
    }


  return (
    width < breakpoint?<GameLayoutMobile userContext={context} />:<GameLayout userContext={context} />
  )
}

export default Game

interface UserContext {
  userData:User | null,
  getUserData: Function,
  setUserData: React.Dispatch<React.SetStateAction<User>>
  addToWatchlist: Function,
  NEWaddToWatchlist: Function,
  removeFromWatchlist: Function,
  purchaseCoin: string | undefined,
  setPurchaseCoin: React.Dispatch<React.SetStateAction<string>>,
  loading: Boolean,
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}



