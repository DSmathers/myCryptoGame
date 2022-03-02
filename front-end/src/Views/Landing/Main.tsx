import { Outlet } from 'react-router'
import Header from '../../Components/Main_Header/Header'
import Landing_Head from './landing_page_components/Landing_Head'

const Main = () => {
  return(
    <>
      <Landing_Head />
      <Outlet />
    </>
  )
};

export default Main;
