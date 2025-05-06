import React, { createContext, useContext } from 'react';
import { RootStore } from '../store/root-store';

const StoreContext = createContext<RootStore | null>(null);

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const rootStore = new RootStore();

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStore = (): RootStore => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
};
