import { Outlet } from 'react-router'
import Header from '../../../../Components/Main_Header/Header'

const GameLayoutMobile = ({userContext}:any) => {
    console.log(typeof userContext)
    //
  return (
    <div id="mobile_gv_wrapper">
        <Header />
        <main id="mobile_content_wrapper">
          <Outlet context={userContext} />
        </main>
    </div>
  )
}

export default GameLayoutMobile