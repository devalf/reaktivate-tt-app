import React, { FC } from 'react';

import { ApiBook } from '../types';



type BooksListProps = {
  books: ApiBook[];
  loading: boolean;
  error: string | null;
};

export const BooksList: FC<BooksListProps> = ({ books, loading, error }) => {
  if (!books.length && loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ marginTop: 0 }}>
        Books: {loading && <span style={{ fontSize: '.85rem' }}>loading...</span>}
      </h3>

      {books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        books.map((book: ApiBook, idx) => (
          <div
            key={String(book.id) + idx}
            style={{
              borderBottom: idx !== books.length - 1 ? '1px dashed' : 'none',
              padding: '1rem 0',
            }}
          >
            {book.name}
          </div>
        ))
      )}
    </div>
  );
};
