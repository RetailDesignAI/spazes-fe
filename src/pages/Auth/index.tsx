import useAuth from '@/hooks/useAuth';
import { AppRoutes } from '@/lib/constants/routes';
import { Navigate, Outlet } from 'react-router-dom';

const AuthPage = () => {
  const isAuthed = useAuth();

  if (isAuthed) {
    return <Navigate to={AppRoutes.Home} />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthPage;
