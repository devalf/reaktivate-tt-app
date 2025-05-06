import { FC } from 'react';

import './app.css';

import { BooksList } from './components/books-list';

export const App: FC = () => {
  return (
    <div className="App">
      <h1>Testing task. Stack: React, Mobx</h1>
      <BooksList />
    </div>
  );
};
