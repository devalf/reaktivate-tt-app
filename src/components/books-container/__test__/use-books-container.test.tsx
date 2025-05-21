import { act, renderHook } from '@testing-library/react';

import { useBooksContainer } from '../use-books-container';

describe('useBooksContainer', () => {
  it('should initialize with the first tab active', () => {
    const { result } = renderHook(() => useBooksContainer());

    expect(result.current.activeTab).toBe(1);
  });

  it('should have the correct tabs defined', () => {
    const { result } = renderHook(() => useBooksContainer());

    expect(result.current.tabs).toEqual([
      { id: 1, label: 'Public Books' },
      { id: 2, label: 'Private Books' },
    ]);
  });

  it('should change the active tab when handleTabChange is called', () => {
    const { result } = renderHook(() => useBooksContainer());

    expect(result.current.activeTab).toBe(1);

    act(() => {
      result.current.handleTabChange(2);
    });

    expect(result.current.activeTab).toBe(2);

    act(() => {
      result.current.handleTabChange(1);
    });

    expect(result.current.activeTab).toBe(1);
  });

  it('should not change the active tab if the same tab is selected', () => {
    const { result } = renderHook(() => useBooksContainer());

    expect(result.current.activeTab).toBe(1);

    act(() => {
      result.current.handleTabChange(1);
    });

    expect(result.current.activeTab).toBe(1);
  });
});
