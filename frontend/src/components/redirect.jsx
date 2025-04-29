import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CheckLoggedin=({children})=>{
    const { user } = useAuth(); // assuming user is null when not logged in
 
    if (user) {
        return <Navigate to="/dashboard" replace/>
    }else{
        return children;
    }
}

export default CheckLoggedin;