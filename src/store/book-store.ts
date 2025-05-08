import { computed, makeAutoObservable, runInAction } from 'mobx';

import booksRepository from '../repository/books';
import { ApiAddBookParams, ApiBook } from '../../src/types';

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

  async fetchBooks() {
    this.loading = true;
    this.error = null;

    try {
      const books = await booksRepository.getBooks(this.rootStore.userStore.userNickname);

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

  async addBook(params: ApiAddBookParams) {
    this.loading = true;
    this.error = null;

    try {
      const userNickname = this.rootStore.userStore.userNickname;
      const success = await booksRepository.addBook(userNickname, params);

      if (success) {
        await this.fetchBooks();
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

  async resetBooks() {
    this.loading = true;
    this.error = null;

    try {
      const userNickname = this.rootStore.userStore.userNickname;
      const success = await booksRepository.resetBooks(userNickname);

      if (success) {
        await this.fetchBooks();
      } else {
        runInAction(() => {
          this.error = 'Failed to reset books';
          this.loading = false;
        });
      }
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || 'Failed to reset books';
        this.loading = false;
      });
    }
  }
}
