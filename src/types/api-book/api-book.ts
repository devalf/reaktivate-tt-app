export type ApiBook = {
  id: number;
  name: string;
  ownerId: string;
  author: string;
};

export type ApiAddBookParams = {
  name: string;
  author: string;
};
