import { FC } from 'react';

import './app.css';

import { App as OriginalApp } from './original-code';

export const App: FC = () => {
  return (
    <>
      <OriginalApp />
    </>
  );
};
