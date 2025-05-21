import { useState } from 'react';

export type TabType = {
  id: number;
  label: string;
};

/**
 * this is a very basic sample of how we can manage tabs switching. It's done so simply just in the DEMO purposes
 * */
export const useBooksContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs: TabType[] = [
    { id: 1, label: 'Public Books' },
    { id: 2, label: 'Private Books' },
  ];

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return {
    activeTab,
    tabs,
    handleTabChange,
  };
};
