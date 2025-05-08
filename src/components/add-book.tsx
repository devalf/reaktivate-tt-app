import React, { FC } from 'react';
import { useStore } from '../context/store-context';

const hardcodedNewBookParams = {
  name: 'Arch of Triumph',
  author: 'Erich Maria Remarque',
};

export const BooksControl: FC = () => {
  const { booksStore } = useStore();

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <button
        type="button"
        style={{ padding: '1rem 2rem', fontSize: '1rem', background: '#66ad49' }}
        onClick={() => booksStore.addBook(hardcodedNewBookParams)}
        disabled={booksStore.loading}
      >
        add book
      </button>
      <button
        type="button"
        style={{ padding: '1rem 2rem', fontSize: '1rem', background: '#f2b553' }}
        onClick={() => booksStore.resetBooks()}
        disabled={booksStore.loading}
      >
        reset books
      </button>
    </div>
  );
};
