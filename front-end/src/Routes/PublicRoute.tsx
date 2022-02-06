import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../Contexts/AuthContext'

type Children = {
    children: JSX.Element;
}

const PublicRoute =  ({children}:Children) => {
    let { isAuthenticated } = useUserAuth();
    return isAuthenticated?<Navigate to='/market' />:children;
}
    
export default PublicRoute;