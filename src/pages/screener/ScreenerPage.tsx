import { useState, useEffect } from 'react';
import type { ScreenerResult } from '../../types/screener';
import { getUsScreener, runScreener } from '../../api/screenerApi';

function ScreenerPage() {
  const [results, setResults] = useState<ScreenerResult[]>([]);
  const [loading, setLoading] = useState(false);

  // 페이지 진입 시 자동 조회
  useEffect(() => {
    fetchScreener();
  }, []);

  const fetchScreener = async () => {
    setLoading(true);
    const data = await getUsScreener();
    setResults(data);
    setLoading(false);
  };

  const handleRunScreener = async () => {
    setLoading(true);
    await runScreener('NASDAQ');
    await fetchScreener();
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>미장 스크리너 (52주 신고가 + 20일선 5% 이내)</h2>
        <button onClick={handleRunScreener} style={styles.button}>
          {loading ? '조회 중...' : '스크리너 실행'}
        </button>
      </div>

      {results.length === 0 ? (
        <p>조건에 맞는 종목이 없습니다.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>티커</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>52주 신고가</th>
              <th>20일선</th>
              <th>20일선 대비(%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.ticker}>
                <td>{result.ticker}</td>
                <td>{result.name}</td>
                <td>${result.currentPrice.toFixed(2)}</td>
                <td>${result.high52Week.toFixed(2)}</td>
                <td>${result.ma20.toFixed(2)}</td>
                <td style={{
                  color: result.ma20Diff >= 0 ? '#00c853' : '#ff1744'
                }}>
                  {result.ma20Diff.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'center' as const,
  },
};

export default ScreenerPage;