import { Outlet } from 'react-router-dom'
import Header from '../../../../Components/Main_Header/Header'

export default function GameLayout ({userContext}:any) {
  const { loading } = userContext
  return (
    <>
      <Header />
      <main>
        {loading || loading==undefined?<div>Loading...</div>:<Outlet context={ userContext } />}
      </main>
  
    </>
  )
}

/* 
export function useUserContext() {
  return useOutletContext<User>();
} */