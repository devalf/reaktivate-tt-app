import React, { FC } from 'react';
import { ApiBook } from '../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/store-context';

export const PrivateBooksList: FC = observer(() => {
  const { booksStore } = useStore();

  return (
    <div>
      {booksStore.privateBooks.length === 0 ? (
        <div>No books found.</div>
      ) : (
        booksStore.privateBooks.map((book: ApiBook, idx) => (
          <div
            key={String(book.id) + idx}
            style={{
              borderBottom: idx !== booksStore.privateBooks.length - 1 ? '1px dashed' : 'none',
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
