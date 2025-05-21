import { ApiAddBookParams, ApiBook, ApiCommonResponseStatus } from '../../src/types';
import ApiGateway from '../http/api-gateway';
import { ApiUserNickname } from '../types/api-user/api-user';

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (userNickname: ApiUserNickname) => {
    return await this.httpGateway.get<ApiBook[]>(`/v1/books/${userNickname}`);
  };

  addBook = async (userNickname: ApiUserNickname, params: ApiAddBookParams) => {
    const response = await this.httpGateway.post<ApiCommonResponseStatus>(
      `/v1/books/${userNickname}`,
      {
        ...params,
      }
    );

    return response && response.status === 'ok';
  };

  resetBooks = async (userNickname: ApiUserNickname) => {
    return await this.httpGateway.put<ApiCommonResponseStatus>(`/v1/books/${userNickname}/reset`);
  };

  getPrivateBooks = async (userNickname: ApiUserNickname) => {
    return await this.httpGateway.get<ApiBook[]>(`/v1/books/${userNickname}/private`);
  };
}

const booksRepository = new BooksRepository();

export default booksRepository;
