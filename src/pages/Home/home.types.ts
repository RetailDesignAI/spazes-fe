export enum Loading {
  Prompts = 'Prompts',
  SinglePrompt = 'SinglePrompt',
  ImagineAll = 'ImagineAll',
  None = 'None',
}

export type HomeInputProps = {
  handleImageGeneration: (prompts: string[], loadingType: Loading) => void;
  loading: Loading;
  setLoading: (loadingType: Loading) => void;
};
