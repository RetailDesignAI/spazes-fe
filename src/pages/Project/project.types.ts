export enum DropdownValues {
  Prompt = 'editByPrompt',
  Image = 'editByImage',
  Structure = 'editByStructure',
}

export interface IFeedback {
  isGiven: boolean;
  isLiked?: boolean;
}

export interface IImage {
  url: string;
  _id: string;
  prompt: string;
  feedback?: IFeedback;
}

export const buttons = [
  {
    value: DropdownValues.Prompt,
    label: 'Edit by Prompt',
  },
  {
    value: DropdownValues.Image,
    label: 'Edit by Image',
  },
  {
    value: DropdownValues.Structure,
    label: 'Edit by Structure',
  },
];
