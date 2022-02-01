import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'
import Loading from '../Components/Loading';

type Children = {
    children: JSX.Element;
}


const PublicRoute =  ({children}:Children) => {
    let { isAuthenticated, loading  } = useUserAuth();
    if(loading){
        return <Loading />
    }

    else if(isAuthenticated){
        return <Navigate to='/dashboard' />
    }

    else return children;
}
    
export default PublicRoute;