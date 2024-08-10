import { Outlet } from 'react-router-dom';
import SidebarControl from './components/Sidebar';
import { useAppSelector } from './hooks/useRedux';

const AppLayout = () => {
  const { sidebarWidth } = useAppSelector((state) => state.ui);

  return (
    <div className="flex w-screen h-screen dark">
      <SidebarControl />
      <div className={`w-screen h-screen xl:w-[calc(100vw - ${sidebarWidth})] bg-slate-700 overflow-auto`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
