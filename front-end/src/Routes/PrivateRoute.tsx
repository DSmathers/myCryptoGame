import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'
import Loading from '../Views/Loading';

type Children = {
    children: JSX.Element;
}


const PrivateRoute =  ({children}:Children) => {
    let { isAuthenticated, loading } = useUserAuth();
    if(loading){
        return <Loading />
    }
    else if(!loading && !isAuthenticated){
        return <Navigate to='/main' />
    }
    else return children
}

export default PrivateRoute;