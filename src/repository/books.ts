import { ApiAddBookParams, ApiBook, ApiCommonResponseStatus } from '../../src/types';
import ApiGateway from '../http/api-gateway';
import { ApiUserNickname } from '../types/api-user/api-user';

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (userNickname: ApiUserNickname) => {
    const booksDto = await this.httpGateway.get<ApiBook[]>(`/v1/books/${userNickname}`);

    return booksDto;
  };

  addBook = async (userNickname: ApiUserNickname, params: ApiAddBookParams) => {
    const bookAddDto = await this.httpGateway.post<ApiCommonResponseStatus>(
      `/books/${userNickname}`,
      {
        ...params,
      }
    );

    return bookAddDto && bookAddDto.status === 'ok';
  };
}

const booksRepository = new BooksRepository();

export default booksRepository;
