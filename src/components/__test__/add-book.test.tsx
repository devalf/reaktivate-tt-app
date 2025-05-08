import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { BooksControl } from '../add-book';
import { useStore } from '../../context/store-context';

jest.mock('../../context/store-context');

const mockAddBook = jest.fn();
const mockResetBooks = jest.fn();

const setupStore = ({ loading = false } = {}) => {
  (useStore as jest.Mock).mockReturnValue({
    booksStore: {
      loading,
      addBook: mockAddBook,
      resetBooks: mockResetBooks,
    },
  });
};

describe('BooksControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls addBook when add book button is clicked', () => {
    setupStore();
    render(<BooksControl />);

    const addButton = screen.getByText('add book');

    fireEvent.click(addButton);

    expect(mockAddBook).toHaveBeenCalledWith({
      name: 'Arch of Triumph',
      author: 'Erich Maria Remarque',
    });
  });

  it('calls resetBooks when reset books button is clicked', () => {
    setupStore();
    render(<BooksControl />);

    const resetButton = screen.getByText('reset books');

    fireEvent.click(resetButton);

    expect(mockResetBooks).toHaveBeenCalled();
  });

  it('disables buttons when loading is true', () => {
    setupStore({ loading: true });
    render(<BooksControl />);

    expect(screen.getByText('add book')).toBeDisabled();
    expect(screen.getByText('reset books')).toBeDisabled();
  });

  it('enables buttons when loading is false', () => {
    setupStore({ loading: false });
    render(<BooksControl />);

    expect(screen.getByText('add book')).not.toBeDisabled();
    expect(screen.getByText('reset books')).not.toBeDisabled();
  });
});
