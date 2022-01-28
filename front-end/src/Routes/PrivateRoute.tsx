import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'


const PrivateRoute =  ({children}:any) => {
    console.log('testing')
    let { isAuthenticated, loading } = useUserAuth();
    if(loading){
        return <h2>Loading....</h2>
    }
    else if(!loading && !isAuthenticated){
        return <Navigate to='/main' />
    }
    else return children
}

export default PrivateRoute;