import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './Views/Main';
import PrivateRoute from './Routes/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/login-form/Login';
import Signup from './Components/signup-form/Signup';
import PublicRoute from './Routes/PublicRoute';
import MarketTab from './Views/Game/market/MarketTab';
import Watchlist from './Views/Game/watchlist/Watchlist';
import Wallet from './Views/Game/wallet/Wallet';
import Game from './Views/Game/Game';


function App() {
  return (
      <Router>
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

  
          <Route element={<PrivateRoute><Game /></PrivateRoute>}>
            <Route path='/market' element={<MarketTab />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/watchlist' element={<Watchlist />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App;
