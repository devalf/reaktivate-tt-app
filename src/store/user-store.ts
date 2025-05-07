import { ApiUserNickname } from '../types';

export class UserStore {
  private _userNickname: ApiUserNickname = 'blackmore'; // default hardcoded value

  get userNickname(): ApiUserNickname {
    return this._userNickname;
  }
}
