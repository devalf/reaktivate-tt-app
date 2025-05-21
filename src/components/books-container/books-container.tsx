import { FC } from 'react';
import { BooksControl } from '../add-book';
import { useBooksContainer } from './use-books-container';
import { PrivateBooksList } from '../private-books-list';
import { PublicBooksList } from '../public-books-list';

export const BooksContainer: FC = () => {
  const { activeTab, tabs, handleTabChange } = useBooksContainer();

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 1 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '2rem',
          }}
        >
          <PublicBooksList />
          <BooksControl />
        </div>
      )}

      {activeTab === 2 && (
        <div style={{ textAlign: 'left' }}>
          <PrivateBooksList />
        </div>
      )}
    </div>
  );
};
