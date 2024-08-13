import { Navigate, Outlet } from 'react-router-dom';
import SidebarControl from './components/Sidebar';
import { useAppSelector } from './hooks/useRedux';
import { AppRoutes } from './lib/constants/routes';

const isAuthed = true;

const AppLayout = () => {
  // const { isAuthed, handleAuth } = useRequireAuth();
  const { sidebarWidth } = useAppSelector((state) => state.ui);

  return isAuthed ? (
    <div className="flex w-screen h-screen dark">
      <SidebarControl />
      <div className={`w-screen h-screen xl:w-[calc(100vw - ${sidebarWidth})] bg-slate-700 overflow-auto`}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={AppRoutes.Auth} replace={true} />
  );
};

export default AppLayout;
