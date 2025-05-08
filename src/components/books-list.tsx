import React, { FC, useEffect } from 'react';
import { useStore } from '../context/store-context';
import { observer } from 'mobx-react-lite';
import { ApiBook } from '../types';

export const BooksList: FC = observer(() => {
  const { booksStore } = useStore();

  useEffect(() => {
    booksStore.fetchBooks();
  }, [booksStore]);

  if (!booksStore.books.length && booksStore.loading) {
    return <div>Loading...</div>;
  }

  if (booksStore.error) {
    return <div>Error: {booksStore.error}</div>;
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ marginTop: 0 }}>
        Books: {booksStore.loading && <span style={{ fontSize: '.85rem' }}>loading...</span>}
      </h3>

      {booksStore.books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        booksStore.books.map((book: ApiBook, idx) => (
          <div
            key={String(book.id) + idx}
            style={{
              borderBottom: idx !== booksStore.books.length - 1 ? '1px dashed' : 'none',
              padding: '1rem 0',
            }}
          >
            {book.name}
          </div>
        ))
      )}
    </div>
  );
});
