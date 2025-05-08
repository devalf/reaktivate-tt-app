import React, { FC } from 'react';

import { useStore } from '../context/store-context';

export const UserProfile: FC = () => {
  const { userStore } = useStore();

  return (
    <div
      style={{
        background: '#505050',
        marginBottom: '2rem',
        padding: '2rem',
        textAlign: 'left',
      }}
    >
      Default user `nickname`: {userStore.userNickname}
      <div
        style={{
          marginTop: '1rem',
          fontSize: '0.85rem',
        }}
      >
        it is used as identifier in the endpoint to fetch data
      </div>
    </div>
  );
};
