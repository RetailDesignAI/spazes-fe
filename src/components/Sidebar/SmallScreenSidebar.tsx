import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { FolderClosed, Home, Menu, MoveUpRight, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import './Sidebar.css';

const containerVariants = {
  close: {
    width: 0,
    opacity: 0,
    padding: 0,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.2,
    },
  },
  open: {
    width: '80vw',
    opacity: 1,
    padding: '4px 16px 4px 16px',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.2,
    },
  },
};

const SmallScreenSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start('open');
    } else {
      containerControls.start('close');
    }
  }, [isOpen, containerControls]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="absolute top-6 left-6">
        <Menu className="w-5 h-5 cursor-pointer" onClick={handleOpen} />
      </div>

      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className={`absolute top-0 left-0 flex flex-col h-full gap-3 shadow bg-custom-secondary shadow-neutral-600 z-[1001] overflow-clip`}
      >
        <div className="w-full py-3 flex justify-between items-center pl-[14px]">
          <h1 className="text-xl font-bold text-white">Spazes</h1>
          <X onClick={handleClose} className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-3 h-[60%] py-3">
          <NavigationLink to="/" name="Home">
            <Home className="stroke-[1.25] min-w-5 w-5" />
          </NavigationLink>
          <NavigationLink to="/projects" name="Projects">
            <FolderClosed className="stroke-[1.25] min-w-5 w-5" />
          </NavigationLink>
        </div>
        <div className="h-[30%] flex flex-col justify-end gap-5 py-3">
          <div
            className={`border-[0.01em] gap-4 ${
              isOpen ? 'p-4' : 'p-2'
            } flex flex-col justify-center items-center border-purple upgrade-plan rounded-lg overflow-clip line-clamp-1 whitespace-nowrap`}
          >
            {isOpen && <p className="text-center text-[13px] text-custom-gray">Out of credits?</p>}
            <Button
              className={`rounded-lg bg-gradient-to-r from-[#7D4AEA] to-[#9B59B6] ${!isOpen && '!w-[30px] !h-[30px]'}`}
            >
              {isOpen ? (
                <>
                  Upgrade to
                  <span className="p-1 ml-1 text-sm bg-black rounded-md">PRO</span>
                </>
              ) : (
                <MoveUpRight className="text-white stroke-[1.25] min-w-5 w-5" />
              )}
            </Button>
          </div>
          <div
            className={`flex gap-3 transition-colors duration-200 rounded-lg cursor-pointer hover:stroke-neutral-100 stroke-neutral-400 text-custom-gray hover:text-neutral-100 place-items-center p-2 overflow-clip whitespace-nowrap`}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>HJ</AvatarFallback>
            </Avatar>
            <p className="text-sm tracking-wide text-inherit font-poppins overflow-clip whitespace-nowrap">Hrishabh Jain</p>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default SmallScreenSidebar;
