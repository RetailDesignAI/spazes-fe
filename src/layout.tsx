// import { motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { SIDEBAR_DEFAULT_WIDTH } from './lib/constants';

const AppLayout = () => {
  const [sidebarWidth, setSidebarWidth] = useState<string>(SIDEBAR_DEFAULT_WIDTH);

  const changeSidebarWidth = (width: string) => setSidebarWidth(width);

  return (
    <div className="flex w-screen h-screen dark">
      <Sidebar changeWidth={changeSidebarWidth} />
      <div className={`w-screen h-screen xl:w-[calc(100vw - ${sidebarWidth})] bg-slate-700 overflow-auto`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
