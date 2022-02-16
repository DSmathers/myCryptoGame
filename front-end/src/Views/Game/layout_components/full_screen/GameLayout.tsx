import { Outlet } from 'react-router-dom'
import Header from '../../../../Components/Main_Header/Header'

export default function GameLayout ({userContext}:any) {

  return (
    <>
      <Header />
      <main>
        <Outlet context={ userContext } />
      </main>
  
    </>
  )
}

/* 
export function useUserContext() {
  return useOutletContext<User>();
} */