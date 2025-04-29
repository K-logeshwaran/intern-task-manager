import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // assuming user is null when not logged in

  if (!user) {
    return <Navigate to="/" replace />; // redirect to signup page
  }

  return <Outlet />;
};

export default ProtectedRoute;
