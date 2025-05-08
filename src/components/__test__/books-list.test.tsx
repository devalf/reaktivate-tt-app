import React from 'react';
import { render, screen } from '@testing-library/react';

import { BooksList } from '../books-list';
import { useStore } from '../../context/store-context';
import { ApiBook } from '../../types';

jest.mock('../../context/store-context');

const mockFetchBooks = jest.fn();

const setupStore = ({
  books = [],
  loading = false,
  error = '',
}: {
  books?: ApiBook[];
  loading?: boolean;
  error?: string;
}) => {
  (useStore as jest.Mock).mockReturnValue({
    booksStore: {
      books,
      loading,
      error,
      fetchBooks: mockFetchBooks,
    },
  });
};

describe('BooksList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchBooks on mount', () => {
    setupStore({});
    render(<BooksList />);
    expect(mockFetchBooks).toHaveBeenCalled();
  });

  it('shows loading when loading and no books', () => {
    setupStore({ books: [], loading: true });
    render(<BooksList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message if error exists', () => {
    setupStore({ error: 'Failed to fetch' });
    render(<BooksList />);
    expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
  });

  it('shows no books found if books is empty and not loading', () => {
    setupStore({ books: [], loading: false });
    render(<BooksList />);
    expect(screen.getByText('No books found.')).toBeInTheDocument();
  });

  it('renders a list of books', () => {
    const books: ApiBook[] = [
      { id: 1, name: 'Book One', ownerId: 'test-owner', author: 'Author One' },
      { id: 2, name: 'Book Two', ownerId: 'test-owner', author: 'Author Two' },
    ];

    setupStore({ books });
    render(<BooksList />);
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  it('shows loading... in header if loading and books exist', () => {
    const books: ApiBook[] = [
      { id: 1, name: 'Book One', ownerId: 'test-owner', author: 'Author One' },
    ];

    setupStore({ books, loading: true });
    render(<BooksList />);
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
  });
});
