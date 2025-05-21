import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/store-context';
import { BooksList } from './books-list';

export const PrivateBooksList: FC = observer(() => {
  const { booksStore } = useStore();

  return (
    <>
      <BooksList
        books={booksStore.privateBooks}
        loading={booksStore.loadingPrivateBooks}
        error={booksStore.errorPrivateBooks}
      />
    </>
  );
});
