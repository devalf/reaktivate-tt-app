import React from 'react';
import { render, screen } from '@testing-library/react';
import { BooksList } from '../books-list';
import { ApiBook } from '../../types';

describe('BooksList', () => {
  const mockBooks: ApiBook[] = [
    { id: 1, name: 'Test Book 1', ownerId: 'user1', author: 'Author 1' },
    { id: 2, name: 'Test Book 2', ownerId: 'user1', author: 'Author 2' },
  ];

  it('renders loading state when loading is true', () => {
    render(<BooksList books={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    const errorMessage = 'Failed to load books';

    render(<BooksList books={[]} loading={false} error={errorMessage} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('displays "No books found" when books array is empty', () => {
    render(<BooksList books={[]} loading={false} error={null} />);
    expect(screen.getByText('No books found.')).toBeInTheDocument();
  });

  it('renders list of books when books are provided', () => {
    render(<BooksList books={mockBooks} loading={false} error={null} />);
    mockBooks.forEach((book) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    });
  });

  it('shows loading indicator when loading with existing books', () => {
    render(<BooksList books={mockBooks} loading={true} error={null} />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
    mockBooks.forEach((book) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    });
  });

  it('uses correct styling for the list items', () => {
    render(<BooksList books={mockBooks} loading={false} error={null} />);
    const bookElements = screen.getAllByText(/Test Book/);

    expect(bookElements[0].closest('div')).toHaveStyle('border-bottom: 1px dashed');
    expect(bookElements[0]).toHaveTextContent('Test Book 1');

    expect(bookElements[1].closest('div')).toHaveStyle('border-bottom: none');
    expect(bookElements[1]).toHaveTextContent('Test Book 2');
  });
});
