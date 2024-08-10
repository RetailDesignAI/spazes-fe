import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    screenWidth,
    isScreenSmall: screenWidth <= 600,
  };
};

export default useScreenSize;
