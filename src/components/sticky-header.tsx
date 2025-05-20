import React, { FC } from 'react';
import { useStore } from '../context/store-context';
import { observer } from 'mobx-react-lite';

export const StickyHeader: FC = observer(() => {
  const { booksStore } = useStore();

  if (!booksStore.privateBooks.length && booksStore.loadingPrivateBooks) {
    return <div>Loading...</div>;
  }

  if (booksStore.error) {
    return <div>Error: {booksStore.errorPrivateBooks}</div>;
  }

  return (
    <div style={{ textAlign: 'left' }}>Private books count: {booksStore.privateBooks.length}</div>
  );
});
