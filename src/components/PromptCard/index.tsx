import { useState } from 'react';
import { Button } from '../ui/button';
import { CardType, PromptHoverCardProps } from './promptCards.types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const PromptCard = ({ triggerElement, prompt, type }: PromptHoverCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    setCopied(true);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (type === CardType.Popover) {
    return (
      <Popover>
        <PopoverTrigger>{triggerElement}</PopoverTrigger>
        <PopoverContent className="w-[300px] dark">
          <div className="text-xs">
            <div className="w-full">{prompt}</div>
            <div className="text-end">
              <Button onClick={copyPrompt} variant={'outline'} size={'sm'} className="mt-2 text-xs">
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger>{triggerElement}</HoverCardTrigger>
      <HoverCardContent className="w-[300px]">
        <div className="text-xs">
          <div className="w-full">{prompt}</div>
          <div className="text-end">
            <Button onClick={copyPrompt} variant={'outline'} size={'sm'} className="mt-2 text-xs">
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PromptCard;
