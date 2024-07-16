export enum DropdownValues {
  Prompt = 'editByPrompt',
  Image = 'editByImage',
  Structure = 'editByStructure',
}

export interface IImage {
  url: string;
  _id: string;
  prompt: string;
}

export type DropdownProps = {
  value: string;
  changeValue: (value: DropdownValues) => void;
};

export type EditPromptsProps = {
  dropdownValue: DropdownValues;
};

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

export enum Feedback {
  Dislike = -1,
  Neutral,
  Like,
}
