import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './Views/Main';
import PrivateRoute from './Routes/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/login-form/Login';
import Signup from './Components/signup-form/Signup';
import PublicRoute from './Routes/PublicRoute';
import MarketTab from './Views/Game/components/market/MarketTab';
import Watchlist from './Views/Game/components/watchlist/Watchlist';
import Wallet from './Views/Game/components/wallet/Wallet';
import Header from './Components/Main_Header/Header';


function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path='/signup' element={
            <PublicRoute>
              <Signup />
            </PublicRoute>} />
            <Route path='/market' element={
            <PrivateRoute>
              <MarketTab />    
            </PrivateRoute>
          } />
          <Route path='/watchlist' element={
            <PrivateRoute>
              <Watchlist />       
            </PrivateRoute>
          } />
          <Route path='/wallet' element={
            <PrivateRoute>
              <Wallet />        
            </PrivateRoute>
          } />  
        </Routes>
      </Router>
  )
}

export default App;
