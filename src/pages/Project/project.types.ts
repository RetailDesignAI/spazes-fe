export enum DropdownValues {
  Prompt = 'editByPrompt',
  Image = 'editByImage',
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
  imageId: string;
  addImage: (image: IImage) => void;
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
];

export enum Feedback {
  Dislike = -1,
  Neutral,
  Like,
}
