import { FC } from 'react';

import './app.css';

import { BooksList } from './components/books-list';
import { UserProfile } from './components/user-profile';
import { BooksControl } from './components/add-book';

export const App: FC = () => {
  return (
    <div>
      <h1>Testing task. Stack: React, Mobx</h1>

      <UserProfile />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <BooksList />
        <div>
          <BooksControl />
        </div>
      </div>
    </div>
  );
};
