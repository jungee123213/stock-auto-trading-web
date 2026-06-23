import { useState, useEffect } from 'react';
import type { ScreenerResult } from '../types/screener';
import { getUsScreener, getKrScreener, runScreener } from '../api/screenerApi';

export type MarketTab = 'US' | 'KR';

// 데스크톱/모바일 화면이 공유하는 스크리너 데이터 로직
export interface UseScreenerReturn {
  activeTab: MarketTab;
  setActiveTab: (tab: MarketTab) => void;
  results: ScreenerResult[];
  loading: boolean;
  error: string | null;
  handleRunScreener: () => void;
  refetch: () => void;
}

export function useScreener(): UseScreenerReturn {
  const [activeTab, setActiveTab] = useState<MarketTab>('US');
  const [results, setResults] = useState<ScreenerResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScreener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchScreener = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = activeTab === 'US' ? await getUsScreener() : await getKrScreener();
      setResults(data);
    } catch {
      setError('데이터 조회에 실패했습니다.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScreener = async () => {
    setLoading(true);
    setError(null);
    try {
      await runScreener(activeTab);
      await fetchScreener();
    } catch {
      setError('스크리너 실행에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    results,
    loading,
    error,
    handleRunScreener,
    refetch: fetchScreener,
  };
}
