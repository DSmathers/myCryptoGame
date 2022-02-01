import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'
import Loading from '../Components/Loading';

type Children = {
    children: JSX.Element;
}


const PrivateRoute =  ({children}:Children) => {
    let { isAuthenticated, loading } = useUserAuth();
    if(loading){
        return <Loading />
    }
    else if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    else return children
}

export default PrivateRoute;