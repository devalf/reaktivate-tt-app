import React, { FC, useEffect } from 'react';
import { useStore } from '../context/store-context';
import { observer } from 'mobx-react-lite';
import { ApiBook } from '../types';

export const BooksList: FC = observer(() => {
  const { booksStore } = useStore();

  useEffect(() => {
    booksStore.fetchBooks('a'); // TODO provide getting  correct user name from the store
  }, [booksStore]);

  if (booksStore.loading) {
    return <div>Loading...</div>;
  }

  if (booksStore.error) {
    return <div>Error: {booksStore.error}</div>;
  }

  return (
    <div>
      {booksStore.books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        booksStore.books.map((book: ApiBook, idx) => (
          <div key={String(book.id) + idx}>{book.name}</div>
        ))
      )}
    </div>
  );
});
