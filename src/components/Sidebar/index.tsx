import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { ChevronRightIcon, FolderClosed, Home, MoveUpRight } from 'lucide-react';
import { SIDEBAR_DEFAULT_WIDTH, SIDEBAR_MIN_WIDTH } from '@/lib/constants';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import './Sidebar.css';

type Props = {
  changeWidth: (width: string) => void;
};

const containerVariants = {
  close: {
    width: SIDEBAR_MIN_WIDTH,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: SIDEBAR_DEFAULT_WIDTH,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const Navigation = ({ changeWidth }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start('open');
      svgControls.start('open');
    } else {
      containerControls.start('close');
      svgControls.start('close');
    }
  }, [isOpen, containerControls, svgControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    changeWidth(isOpen ? SIDEBAR_DEFAULT_WIDTH : SIDEBAR_MIN_WIDTH);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className={`relative top-0 left-0 z-10 flex flex-col h-full gap-3 px-4 py-1 shadow bg-custom-secondary shadow-neutral-600`}
      >
        <motion.div
          variants={svgVariants}
          animate={svgControls}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          onClick={handleOpenClose}
          className="flex cursor-pointer absolute w-[20px] h-[20px] rounded-full top-5 -right-[12px] bg-[#7D4AEA]  items-center justify-center"
        >
          <ChevronRightIcon className="w-4 h-4" color="white" />
        </motion.div>
        <div className="w-full py-3 logo">
          <h1 className="h-[10%] text-xl font-bold text-center text-white">{isOpen ? 'Logo' : 'L'}</h1>
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

export default Navigation;
