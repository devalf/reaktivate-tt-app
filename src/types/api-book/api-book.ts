export type ApiBook = {
  id: number;
  name: string;
  ownerId: string;
  author: string;
};

export type ApiAddBookParams = {
  id: number;
  name?: string; // TODO figure out do we really need it
};
