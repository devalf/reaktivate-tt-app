import { makeAutoObservable } from 'mobx';
import { ApiUser } from '../types';

export class UserStore {
  user: ApiUser | null = null;
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(userData: ApiUser) {
    this.user = userData;
    this.isLoggedIn = true;
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
  }
}
