import { UserStore } from './user-store';
import { BookStore } from './book-store';

export class RootStore {
  public booksStore: BookStore;
  public userStore: UserStore;

  constructor() {
    this.booksStore = new BookStore(this);
    this.userStore = new UserStore();
  }
}
