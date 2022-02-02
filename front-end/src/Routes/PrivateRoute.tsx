import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'

type Children = {
    children: JSX.Element;
}


export default function PrivateRoute({children}:Children){
    let { isAuthenticated } = useUserAuth();
    return isAuthenticated?children:<Navigate to='/login' />
}

//export default PrivateRoute;