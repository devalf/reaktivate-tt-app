import { BookStore } from '../book-store';
import booksRepository from '../../repository/books';
import { ApiAddBookParams, ApiBook } from '../../../src/types';

jest.mock('../../repository/books');

const mockUserNickname = 'testUser';
const mockBooks: ApiBook[] = [
  { id: 1, name: 'Book 1', author: 'Author 1', ownerId: '1a' },
  { id: 2, name: 'Book 2', author: 'Author 2', ownerId: '2a' },
];

const createMockRootStore = () =>
  ({
    userStore: {
      userNickname: mockUserNickname,
    },
  }) as any;

describe('BookStore testing', () => {
  let store: BookStore;
  let rootStore: any;

  const setupBooksRepositoryMocks = (overrides: Partial<typeof booksRepository> = {}) => {
    (booksRepository.getBooks as jest.Mock).mockResolvedValue(mockBooks);
    (booksRepository.addBook as jest.Mock).mockResolvedValue(true);
    (booksRepository.resetBooks as jest.Mock).mockResolvedValue(true);
    Object.assign(booksRepository, overrides);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    rootStore = createMockRootStore();
    store = new BookStore(rootStore);
    setupBooksRepositoryMocks();
  });

  describe('books getter', () => {
    it('returns the current books list', () => {
      (store as any)._books = mockBooks;

      expect(store.books).toEqual(mockBooks);
    });
  });

  describe('fetchBooks', () => {
    it('fetches books and updates state on success', async () => {
      await store.fetchBooks();

      expect(booksRepository.getBooks).toHaveBeenCalledWith(mockUserNickname);
      expect(store.books).toEqual(mockBooks);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('handles error and sets error state on failure', async () => {
      (booksRepository.getBooks as jest.Mock).mockRejectedValue(new Error('fail fetch'));

      await store.fetchBooks();

      expect(store.books).toEqual([]);
      expect(store.loading).toBe(false);
      expect(store.error).toBe('fail fetch');
    });
  });

  describe('addBook', () => {
    const params: ApiAddBookParams = { title: 'New Book', author: 'New Author' } as any;

    it('adds a book and fetches books on success', async () => {
      (booksRepository.getBooks as jest.Mock).mockResolvedValue([
        ...mockBooks,
        { id: '3', ...params },
      ]);

      await store.addBook(params);

      expect(booksRepository.addBook).toHaveBeenCalledWith(mockUserNickname, params);
      expect(store.books).toEqual([...mockBooks, { id: '3', ...params }]);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('sets error if addBook fails', async () => {
      (booksRepository.addBook as jest.Mock).mockResolvedValue(false);

      await store.addBook(params);

      expect(store.error).toBe('Failed to add book');
      expect(store.loading).toBe(false);
    });

    it('handles error thrown by addBook', async () => {
      (booksRepository.addBook as jest.Mock).mockRejectedValue(new Error('add error'));

      await store.addBook(params);

      expect(store.error).toBe('add error');
      expect(store.loading).toBe(false);
    });
  });

  describe('resetBooks', () => {
    it('resets books and fetches books on success', async () => {
      (booksRepository.getBooks as jest.Mock).mockResolvedValue([]);

      await store.resetBooks();

      expect(booksRepository.resetBooks).toHaveBeenCalledWith(mockUserNickname);
      expect(store.books).toEqual([]);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('sets error if resetBooks fails', async () => {
      (booksRepository.resetBooks as jest.Mock).mockResolvedValue(false);

      await store.resetBooks();

      expect(store.error).toBe('Failed to reset books');
      expect(store.loading).toBe(false);
    });

    it('handles error thrown by resetBooks', async () => {
      (booksRepository.resetBooks as jest.Mock).mockRejectedValue(new Error('reset error'));

      await store.resetBooks();

      expect(store.error).toBe('reset error');
      expect(store.loading).toBe(false);
    });
  });

  describe('loading state', () => {
    it('sets loading true during fetchBooks, addBook, resetBooks', async () => {
      (booksRepository.getBooks as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockBooks), 10))
      );

      const fetchPromise = store.fetchBooks();

      expect(store.loading).toBe(true);

      await fetchPromise;

      expect(store.loading).toBe(false);
    });
  });
});
