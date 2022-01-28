import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './Views/Main';
import { UserAuthContextProvider } from './Contexts/AuthContext'
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './Views/Dashboard';


function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path='/main' element={<Main />} />
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
