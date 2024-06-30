import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type CustomTooltipProps = {
  triggerElement: React.ReactNode;
  tooltipContent: string;
};

const CustomTooltip = ({ triggerElement, tooltipContent }: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{triggerElement}</TooltipTrigger>
        <TooltipContent className="text-white shadow border-[#2e3136] bg-custom-secondary">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
