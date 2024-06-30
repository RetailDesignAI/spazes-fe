import { ReactNode } from 'react';
import { Button } from './button';
import CustomTooltip from './customTooltip';

type CustomTooltipButtonProps = {
  tooltipContent: string;
  buttonContent: ReactNode | string;
  onClick: () => void;
};

const CustomTooltipButton = ({ tooltipContent, buttonContent, onClick }: CustomTooltipButtonProps) => {
  return (
    <CustomTooltip
      tooltipContent={tooltipContent}
      triggerElement={
        <Button
          onClick={onClick}
          className="bg-[#7D4AEA] text-white rounded-full p-2 border-2 border-transparent hover:border-[#7D4AEA] w-10 h-10"
        >
          {buttonContent}
        </Button>
      }
    />
  );
};

export default CustomTooltipButton;
