import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './Views/Main';
import { UserAuthContextProvider } from './Contexts/AuthContext'
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './Views/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/login-form/Login';
import Signup from './Components/signup-form/Signup';
import PublicRoute from './Routes/PublicRoute';


function App() {
  return (
    <UserAuthContextProvider>
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
          <Route path='/dashboard' element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  )
}

export default App;
