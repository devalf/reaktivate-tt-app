import { computed, makeAutoObservable, runInAction } from 'mobx';
import booksRepository from '../repository/books';
import { ApiAddBookParams, ApiBook, ApiUserNickname } from '../../src/types';

import { RootStore } from './root-store';

export class BookStore {
  rootStore: RootStore;
  loading: boolean = false;
  error: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
      books: computed,
    });
  }

  private _books: ApiBook[] = [];

  get books(): ApiBook[] {
    return this._books;
  }

  async fetchBooks(userNickname: ApiUserNickname) {
    this.loading = true;
    this.error = null;

    try {
      const books = await booksRepository.getBooks(userNickname);

      runInAction(() => {
        this._books = books || [];
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || 'Failed to fetch books';
        this.loading = false;
      });
    }
  }

  async addBook(userNickname: ApiUserNickname, params: ApiAddBookParams) {
    this.loading = true;
    this.error = null;

    try {
      const success = await booksRepository.addBook(userNickname, params);

      if (success) {
        await this.fetchBooks(userNickname);
      } else {
        runInAction(() => {
          this.error = 'Failed to add book';
          this.loading = false;
        });
      }
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || 'Failed to add book';
        this.loading = false;
      });
    }
  }
}
