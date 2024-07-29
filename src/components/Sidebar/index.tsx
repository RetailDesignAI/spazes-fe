import useScreenSize from '@/hooks/useScreenSize';
import SmallScreenSidebar from './SmallScreenSidebar';
import LargeScreenSidebar from './LargeScreenSidebar';

const SidebarControl = () => {
  const { isScreenSmall } = useScreenSize();

  return <div>{isScreenSmall ? <SmallScreenSidebar /> : <LargeScreenSidebar />}</div>;
};

export default SidebarControl;
