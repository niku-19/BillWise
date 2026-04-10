import { Navigate, Outlet } from 'react-router-dom';
import DashboadLayout from '../layout/DashboadLayout';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <DashboadLayout>
      {children ? children : <Outlet />}
    </DashboadLayout>
  )
}

export default ProtectedRoutes