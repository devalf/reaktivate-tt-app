import { FC, useEffect } from 'react';

import './app.css';
import { UserProfile } from './components/user-profile';
import { useStore } from './context/store-context';
import { StickyHeader } from './components/sticky-header';
import { BooksContainer } from './components/books-container/books-container';

export const App: FC = () => {
  const { booksStore } = useStore();

  useEffect(() => {
    booksStore.fetchAllBooks();
  }, [booksStore]);

  return (
    <div>
      <h1>Testing task. Stack: React, Mobx</h1>

      <UserProfile />

      <StickyHeader />

      <BooksContainer />
    </div>
  );
};
