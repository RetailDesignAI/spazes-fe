export type Project = {
  _id: number;
  name: string;
  images: {
    url: string;
    prompt: string;
  }[];
  createdAt: string;
};

export type Filters = {
  Latest: string;
  Oldest: string;
  Images: string;
};
