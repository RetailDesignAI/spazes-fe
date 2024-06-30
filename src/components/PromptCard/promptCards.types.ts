import { ReactNode } from 'react';

export enum CardType {
  Hover = 'hover',
  Popover = 'popover',
}

export type PromptHoverCardProps = {
  triggerElement: ReactNode;
  prompt: string;
  type: CardType;
};
